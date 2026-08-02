import { tokenize, type SearchIndex } from "@/lib/retrieval";

/**
 * Keyword-coverage fit scoring for pasted job descriptions.
 *
 * Distinct, non-boilerplate terms from the posting are checked against
 * the site corpus vocabulary; the covered fraction maps to a 0–10
 * score. A deliberate heuristic, labeled as such in the UI — the
 * Claude-powered semantic assessment is the planned upgrade.
 */

export type FitVerdict = "strong" | "partial" | "weak";

export type FitAssessment = {
  /** 0–10, one decimal. */
  score: number;
  verdict: FitVerdict;
  /** Posting words found in the profile (display forms). */
  matchedTerms: string[];
  /** Posting words with no profile match (display forms). */
  gapTerms: string[];
  /** Distinct terms the score was computed over. */
  consideredCount: number;
};

/** At or above this score, a posting counts as a strong match. */
export const STRONG_MATCH_THRESHOLD = 7.5;
const PARTIAL_THRESHOLD = 5;
/** Coverage at which a posting earns a full 10 (postings always carry
 * company- and product-specific terms no profile could contain). */
const FULL_COVERAGE = 0.55;
/** Below this many distinct terms, a score would be noise. */
const MIN_DISTINCT_TERMS = 8;
const MAX_MATCHED_SHOWN = 12;
const MAX_GAPS_SHOWN = 6;

/** Vocabulary common to most job postings; carries no fit signal. */
const BOILERPLATE = new Set(
  [
    "ability",
    "about",
    "accommodation",
    "applicant",
    "apply",
    "background",
    "base",
    "benefit",
    "bonus",
    "candidate",
    "collaborate",
    "collaborative",
    "communication",
    "company",
    "compensation",
    "competitive",
    "culture",
    "dental",
    "description",
    "disability",
    "diversity",
    "employee",
    "employment",
    "environment",
    "equal",
    "equity",
    "excellent",
    "experience",
    "familiarity",
    "gender",
    "great",
    "growth",
    "health",
    "holiday",
    "hybrid",
    "identity",
    "include",
    "including",
    "insurance",
    "join",
    "location",
    "medical",
    "member",
    "mission",
    "must",
    "offer",
    "onsite",
    "orientation",
    "package",
    "paid",
    "passion",
    "passionate",
    "people",
    "perk",
    "plus",
    "position",
    "preferred",
    "qualification",
    "race",
    "range",
    "religion",
    "remote",
    "requirement",
    "responsibility",
    "responsibilities",
    "salary",
    "seeking",
    "skill",
    "status",
    "strong",
    "team",
    "vacation",
    "veteran",
    "will",
    "within",
    "work",
    "year",
    "years",
  ].flatMap((word) => tokenize(word)),
);

/**
 * Score a pasted job description against the corpus vocabulary.
 * Returns null when the text is too short to score meaningfully.
 */
export function assessFit(
  jobText: string,
  index: SearchIndex,
): FitAssessment | null {
  // Track display forms per stem so results show the posting's own words.
  const terms = new Map<string, { display: string; matched: boolean }>();

  for (const rawWord of jobText.split(/\s+/)) {
    const [stem] = tokenize(rawWord);
    if (!stem || BOILERPLATE.has(stem) || terms.has(stem)) continue;
    const display = rawWord
      .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9+#.]+$/g, "")
      .toLowerCase();
    if (!display) continue;
    terms.set(stem, {
      display,
      matched: index.documentFrequency.has(stem),
    });
  }

  if (terms.size < MIN_DISTINCT_TERMS) return null;

  const all = [...terms.values()];
  const matched = all.filter((term) => term.matched);
  const coverage = matched.length / all.length;
  const score =
    Math.round(Math.min(10, (coverage / FULL_COVERAGE) * 10) * 10) / 10;

  return {
    score,
    verdict:
      score >= STRONG_MATCH_THRESHOLD
        ? "strong"
        : score >= PARTIAL_THRESHOLD
          ? "partial"
          : "weak",
    matchedTerms: matched
      .slice(0, MAX_MATCHED_SHOWN)
      .map((term) => term.display),
    gapTerms: all
      .filter((term) => !term.matched)
      .slice(0, MAX_GAPS_SHOWN)
      .map((term) => term.display),
    consideredCount: all.length,
  };
}
