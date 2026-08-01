"use client";

import { useMemo, useState } from "react";
import { buildCorpus } from "@/data/corpus";
import {
  createIndex,
  search,
  URL_PATTERN,
  type SearchResult,
} from "@/lib/retrieval";
import { InlineLink } from "@/components/ui/InlineLink";

const SUGGESTED_QUESTIONS = [
  "Has Muneeb built agentic AI systems?",
  "What did he build at Microsoft?",
  "What impact did his AI platforms have?",
] as const;

/**
 * "Ask about my experience": client-side retrieval over the site's
 * own content. Returns matching passages verbatim — no generation, no
 * server, no cost, no hallucination.
 */
export function AskExperience() {
  const index = useMemo(() => createIndex(buildCorpus()), []);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [askedHadUrl, setAskedHadUrl] = useState(false);
  const [results, setResults] = useState<readonly SearchResult[]>([]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    // Display the question without any pasted link; tokenize() already
    // ignores URLs for scoring. Fresh non-global regex: URL_PATTERN has
    // the g flag, which makes .test() stateful.
    const withoutUrls = trimmed
      .replace(URL_PATTERN, "")
      .replace(/\s+/g, " ")
      .trim();
    setAsked(withoutUrls || "your question");
    setAskedHadUrl(new RegExp(URL_PATTERN.source, "i").test(trimmed));
    setResults(search(index, trimmed));
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          ask(query);
        }}
        className="flex flex-wrap gap-3"
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask a question about my experience
        </label>
        <input
          id="ask-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Has Muneeb built agentic systems on Azure?"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-sm placeholder:text-neutral-400 dark:border-neutral-700 dark:placeholder:text-neutral-600"
        />
        <button
          type="submit"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Ask
        </button>
      </form>

      <ul aria-label="Example questions" className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((question) => (
          <li key={question}>
            <button
              type="button"
              onClick={() => ask(question)}
              className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-6">
        {askedHadUrl && (
          <p className="mb-4 rounded-lg bg-neutral-100 px-4 py-3 text-sm leading-relaxed text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            Looks like you pasted a link — this panel can&apos;t open external
            pages. It searched the rest of your question instead. To match a
            specific role, paste the job description text into the fit checker
            below.
          </p>
        )}
        {asked && results.length > 0 && (
          <>
            <h3 className="text-sm font-semibold break-words">
              Most relevant to “{asked}”
            </h3>
            <ul className="mt-3 space-y-3">
              {results.map(({ passage }) => (
                <li
                  key={passage.id}
                  className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <p className="text-sm font-medium">
                    <InlineLink href={passage.href}>{passage.title}</InlineLink>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {passage.text}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
        {asked && results.length === 0 && (
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            No strong match for “{asked}” — try different wording, or{" "}
            <InlineLink href="/Muneeb-Abbasi-Resume.pdf">
              download the resume
            </InlineLink>{" "}
            and <InlineLink href="/#contact-heading">get in touch</InlineLink>.
          </p>
        )}
      </div>

      <details className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <summary className="cursor-pointer font-medium">How this works</summary>
        <p className="mt-2 max-w-2xl leading-relaxed">
          Your question is matched against this site&apos;s content with BM25
          ranking, entirely in your browser — no server, no API calls, no
          tracking. Results are my actual experience, verbatim, so nothing is
          AI-generated or hallucinated. A conversational, Claude-powered version
          is on the roadmap.
        </p>
      </details>
    </div>
  );
}
