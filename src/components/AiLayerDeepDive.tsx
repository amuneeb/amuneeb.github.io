import { aiOperationsCaseStudy as study } from "@/data/ai-operations-case-study";
import { AiLayerDiagram } from "@/components/AiLayerDiagram";

/**
 * The full "Inside the AI layer" deep dive, rendered inside the
 * architecture explorer's AI platform tab.
 */
export function AiLayerDeepDive() {
  return (
    <div>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {study.aiLayer.intro}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
        <AiLayerDiagram />
      </div>

      <div className="mt-6 space-y-6">
        {study.aiLayer.subsections.map((subsection) => (
          <div key={subsection.id}>
            <h4 className="text-sm font-semibold">{subsection.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {subsection.body}
            </p>
            {subsection.points && (
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                {subsection.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="text-accent-600 dark:text-accent-400"
                    >
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold">
          {study.aiLayer.coordination.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {study.aiLayer.coordination.summary}
        </p>
        <div className="mt-4 space-y-3">
          {study.aiLayer.coordination.mechanics.map((mechanic) => (
            <details
              key={mechanic.id}
              className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <summary className="cursor-pointer text-sm font-semibold">
                {mechanic.title}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {mechanic.body}
              </p>
              {mechanic.id === "structured-contracts" && (
                <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-100 p-4 font-mono text-xs leading-relaxed text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                  {study.aiLayer.coordination.structuredOutputExample}
                </pre>
              )}
            </details>
          ))}
        </div>
        <details className="mt-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <summary className="cursor-pointer text-sm font-semibold">
            Worked example: “{study.aiLayer.coordination.workedExample.question}
            ”
          </summary>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {study.aiLayer.coordination.workedExample.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  );
}
