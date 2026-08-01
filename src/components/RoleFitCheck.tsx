"use client";

import { useMemo, useState } from "react";
import { buildCorpus } from "@/data/corpus";
import { createIndex } from "@/lib/retrieval";
import { assessFit, INTEREST_THRESHOLD, type FitAssessment } from "@/lib/fit";
import { InlineLink } from "@/components/ui/InlineLink";

const VERDICT_COPY: Record<FitAssessment["verdict"], string> = {
  strong: `Clears Muneeb's interest bar (${INTEREST_THRESHOLD}+). He'd likely be interested — get in touch.`,
  partial: `Below the ${INTEREST_THRESHOLD} interest bar, but close — could be worth a conversation.`,
  weak: "Not a strong match for this profile.",
};

/**
 * Paste-a-job-description fit checker. Scores keyword coverage against
 * the site corpus in the browser and answers with Muneeb's stated
 * interest threshold.
 */
export function RoleFitCheck() {
  const index = useMemo(() => createIndex(buildCorpus()), []);
  const [text, setText] = useState("");
  const [fit, setFit] = useState<FitAssessment | null>(null);
  const [tooShort, setTooShort] = useState(false);

  const score = (input: string) => {
    const assessment = assessFit(input, index);
    setFit(assessment);
    setTooShort(assessment === null);
  };

  return (
    <div>
      <h3 className="font-semibold">Would he be interested in your role?</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Paste the job description (at least its requirements) and get a fit
        score against Muneeb&apos;s profile — his bar for new roles is{" "}
        {INTEREST_THRESHOLD} out of 10. Scored in your browser; nothing you
        paste leaves this page.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          score(text);
        }}
        className="mt-4"
      >
        <label htmlFor="fit-input" className="sr-only">
          Job description to score
        </label>
        <textarea
          id="fit-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          placeholder="Paste the job description here…"
          className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-3 text-sm placeholder:text-neutral-400 dark:border-neutral-700 dark:placeholder:text-neutral-600"
        />
        <button
          type="submit"
          className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Score the fit
        </button>
      </form>

      <div aria-live="polite" className="mt-5">
        {tooShort && (
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            That&apos;s not enough text to score meaningfully — paste more of
            the job description, ideally its requirements section.
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
              terms, computed entirely in your browser. A Claude-powered
              semantic assessment is on the roadmap.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
