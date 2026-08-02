"use client";

import { useMemo, useState } from "react";
import { buildCorpus } from "@/data/corpus";
import {
  createIndex,
  search,
  URL_PATTERN,
  type SearchResult,
} from "@/lib/retrieval";
import { assessFit, type FitAssessment } from "@/lib/fit";
import { track } from "@/lib/analytics";
import { InlineLink } from "@/components/ui/InlineLink";

const SUGGESTED_QUESTIONS = [
  "Has Muneeb built agentic AI systems?",
  "What did he build at Microsoft?",
  "What impact did his AI platforms have?",
] as const;

/** Inputs at or above this many words are treated as a pasted job
 * description and scored for fit instead of searched. */
const FIT_MODE_MIN_WORDS = 30;

const VERDICT_COPY: Record<FitAssessment["verdict"], string> = {
  strong: "Strong match with Muneeb's experience — get in touch.",
  partial: "Solid overlap — could be worth a conversation.",
  weak: "Not a strong match for this profile.",
};

/**
 * One input, two behaviors: short questions retrieve matching passages
 * from the site's content; pasted job descriptions get a fit score.
 * Both run entirely in the visitor's browser — no server, no cost,
 * nothing generated.
 */
export function AskExperience() {
  const index = useMemo(() => createIndex(buildCorpus()), []);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [askedHadUrl, setAskedHadUrl] = useState(false);
  const [results, setResults] = useState<readonly SearchResult[]>([]);
  const [fit, setFit] = useState<FitAssessment | null>(null);

  const ask = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setQuery(trimmed);

    const wordCount = trimmed.split(/\s+/).length;
    const jdFit =
      wordCount >= FIT_MODE_MIN_WORDS ? assessFit(trimmed, index) : null;
    if (jdFit) {
      // Disclosed policy: pasted job descriptions never leave the page;
      // only the outcome is recorded.
      track("fit-check", {
        score: jdFit.score,
        verdict: jdFit.verdict,
        words: wordCount,
      });
      setFit(jdFit);
      setAsked(null);
      setAskedHadUrl(false);
      setResults([]);
      return;
    }

    // Question mode. Display the question without any pasted link;
    // tokenize() already ignores URLs for scoring. Fresh non-global
    // regex: URL_PATTERN has the g flag, which makes .test() stateful.
    const withoutUrls = trimmed
      .replace(URL_PATTERN, "")
      .replace(/\s+/g, " ")
      .trim();
    const found = search(index, trimmed);
    // Disclosed policy: questions are logged anonymously (URLs stripped).
    track("ask-question", {
      question: withoutUrls || "(link only)",
      results: found.length,
    });
    setFit(null);
    setAsked(withoutUrls || "your question");
    setAskedHadUrl(new RegExp(URL_PATTERN.source, "i").test(trimmed));
    setResults(found);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          ask(query);
        }}
        className="flex flex-wrap items-start gap-3"
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask a question, or paste a job description to score the fit
        </label>
        <textarea
          id="ask-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              ask(query);
            }
          }}
          rows={2}
          placeholder="Ask a question — or paste a job description to score the fit…"
          autoComplete="off"
          className="min-w-0 flex-1 resize-y rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm placeholder:text-neutral-400 dark:border-neutral-700 dark:placeholder:text-neutral-600"
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
            pages, so it searched the rest of your question instead. To score a
            specific role, paste the job description&apos;s text here.
          </p>
        )}

        {fit && (
          <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
            <p className="flex flex-wrap items-baseline gap-3">
              <span
                className={`text-3xl font-semibold ${
                  fit.verdict === "strong"
                    ? "text-accent-700 dark:text-accent-400"
                    : ""
                }`}
              >
                {fit.score.toFixed(1)} / 10
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {VERDICT_COPY[fit.verdict]}
              </span>
            </p>
            {fit.verdict === "strong" && (
              <p className="mt-2 text-sm font-medium">
                <InlineLink href="/#contact-heading">
                  Get in touch about this role →
                </InlineLink>
              </p>
            )}
            {fit.matchedTerms.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  Matched from his experience
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {fit.matchedTerms.map((term) => (
                    <li
                      key={term}
                      className="bg-accent-50 text-accent-800 dark:bg-accent-950 dark:text-accent-300 rounded-md px-2 py-0.5 text-xs"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {fit.gapTerms.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  Not found in his profile
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {fit.gapTerms.map((term) => (
                    <li
                      key={term}
                      className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              Keyword-coverage estimate over {fit.consideredCount} distinct
              terms, computed entirely in your browser. The job description you
              pasted never leaves this page — only the score is recorded. A
              Claude-powered semantic assessment is on the roadmap.
            </p>
          </div>
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
          Questions are matched against this site&apos;s content with BM25
          ranking; pasted job descriptions are scored by keyword coverage
          against the same content — all entirely in your browser. Results are
          my actual experience, verbatim, so nothing is AI-generated or
          hallucinated. Privacy: questions are logged anonymously (via
          cookie-free analytics) so I can improve the answers; pasted job
          descriptions are never stored or transmitted — only their final score.
          A conversational, Claude-powered version is on the roadmap.
        </p>
      </details>
    </div>
  );
}
