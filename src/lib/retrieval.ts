/**
 * Client-side lexical retrieval (BM25) over the site's content.
 *
 * Deliberately not embedding-based: the corpus is ~30 short passages,
 * so BM25 matches user questions accurately without shipping a
 * multi-megabyte embedding model to the visitor. Runs entirely in the
 * browser — no server, no API calls, no cost. The retriever interface
 * (createIndex/search) is the seam where a vector or LLM-backed
 * implementation can slot in later.
 */

export type Passage = {
  /** Stable id, unique across the corpus. */
  id: string;
  title: string;
  text: string;
  /** Where on the site this content lives. */
  href: string;
};

export type SearchResult = {
  passage: Passage;
  score: number;
};

export type SearchIndex = {
  passages: readonly Passage[];
  /** Token -> number of passages containing it. */
  documentFrequency: Map<string, number>;
  /** Per-passage token counts, parallel to `passages`. */
  termFrequencies: ReadonlyArray<Map<string, number>>;
  averageLength: number;
};

/** BM25 term-frequency saturation. */
const K1 = 1.5;
/**
 * BM25 length normalization, tuned below the 0.75 default: the corpus
 * mixes one-line skill lists with paragraph passages, and full
 * normalization lets the short lists outrank substantive content.
 */
const B = 0.4;

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "been",
  "but",
  "by",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "her",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "its",
  "me",
  "muneeb",
  "my",
  "of",
  "on",
  "or",
  "s",
  "she",
  "system",
  "systems",
  "tell",
  "that",
  "the",
  "their",
  "them",
  "they",
  "this",
  "to",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "you",
  "your",
]);

/** Domain synonyms folded to one canonical token before scoring. */
const ALIASES: ReadonlyMap<string, string> = new Map([
  ["genai", "generative"],
  ["gen-ai", "generative"],
  ["k8s", "kubernetes"],
  ["dotnet", "net"],
  [".net", "net"],
  ["js", "javascript"],
  ["ts", "typescript"],
  ["ml", "learning"],
  ["copilots", "copilot"],
  ["chatbot", "copilot"],
  ["chatbots", "copilot"],
  ["impact", "outcome"],
  ["result", "outcome"],
  ["results", "outcome"],
  ["built", "build"],
  ["building", "build"],
  ["builds", "build"],
  ["developed", "build"],
  ["study", "education"],
  ["studied", "education"],
  ["degree", "education"],
  ["degrees", "education"],
  ["working", "work"],
  ["worked", "work"],
  ["now", "currently"],
  ["today", "currently"],
  ["current", "currently"],
  ["job", "role"],
  ["employer", "company"],
  ["hire", "role"],
  ["hiring", "role"],
  ["interest", "interested"],
  ["opportunity", "opportunities"],
  ["live", "based"],
  ["lives", "based"],
  ["living", "based"],
  ["reside", "based"],
  ["resides", "based"],
  ["located", "based"],
  ["city", "seattle"],
  ["sponsor", "sponsorship"],
  ["sponsorships", "sponsorship"],
  ["citizenship", "citizen"],
  ["authorization", "authorized"],
  ["greencard", "citizen"],
  ["h1b", "sponsorship"],
  ["h-1b", "sponsorship"],
  ["relocation", "relocate"],
  ["relocating", "relocate"],
  ["relocated", "relocate"],
  ["manager", "lead"],
  ["management", "lead"],
]);

/** Matches URLs so pasted links don't pollute scoring with junk tokens. */
export const URL_PATTERN = /(?:https?:\/\/|www\.)\S+/gi;

/**
 * Lowercase, strip URLs and punctuation, drop stopwords, fold aliases,
 * and singularize plurals so "agents" matches "agent".
 */
export function tokenize(text: string): string[] {
  return text
    .replace(URL_PATTERN, " ")
    .toLowerCase()
    .split(/[^a-z0-9.+#-]+/)
    .map((raw) => {
      // Stopword check runs on the raw form too: stemming would turn
      // "does" into the non-stopword "doe".
      if (STOPWORDS.has(raw)) return "";
      const token = ALIASES.get(raw) ?? raw;
      return token.length > 3 && token.endsWith("s") && !token.endsWith("ss")
        ? token.slice(0, -1)
        : token;
    })
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

export function createIndex(passages: readonly Passage[]): SearchIndex {
  const documentFrequency = new Map<string, number>();
  const termFrequencies = passages.map((passage) => {
    const counts = new Map<string, number>();
    // Title tokens are indexed twice: a match on what a passage is
    // about should outweigh an incidental mention in another passage.
    for (const token of tokenize(
      `${passage.title} ${passage.title} ${passage.text}`,
    )) {
      counts.set(token, (counts.get(token) ?? 0) + 1);
    }
    for (const token of counts.keys()) {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    }
    return counts;
  });

  const totalLength = termFrequencies.reduce(
    (sum, counts) => sum + [...counts.values()].reduce((a, b) => a + b, 0),
    0,
  );

  return {
    passages,
    documentFrequency,
    termFrequencies,
    averageLength: totalLength / Math.max(passages.length, 1),
  };
}

/** Rank passages against the query; only positive-scoring results. */
export function search(
  index: SearchIndex,
  query: string,
  limit = 4,
): SearchResult[] {
  const queryTokens = [...new Set(tokenize(query))];
  if (queryTokens.length === 0) return [];

  const passageCount = index.passages.length;
  const scored = index.passages.map((passage, i) => {
    const counts = index.termFrequencies[i];
    const length = [...counts.values()].reduce((a, b) => a + b, 0);
    let score = 0;
    for (const token of queryTokens) {
      const tf = counts.get(token);
      if (!tf) continue;
      const df = index.documentFrequency.get(token) ?? 0;
      const idf = Math.log(1 + (passageCount - df + 0.5) / (df + 0.5));
      score +=
        (idf * tf * (K1 + 1)) /
        (tf + K1 * (1 - B + (B * length) / index.averageLength));
    }
    return { passage, score };
  });

  return scored
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
