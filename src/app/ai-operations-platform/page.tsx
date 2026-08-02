import type { Metadata } from "next";
import { profile, enterpriseProjects } from "@/data/profile";
import { aiOperationsCaseStudy as study } from "@/data/ai-operations-case-study";
import { InlineLink } from "@/components/ui/InlineLink";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { SectionHeading } from "@/components/SectionHeading";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { AiLayerDeepDive } from "@/components/AiLayerDeepDive";
import { BADGE_CLASSES, STACK_ITEM_CLASSES } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: `${study.name} — ${profile.name}`,
  description: study.metaDescription,
};

const diagram = enterpriseProjects.find(
  (project) => project.slug === study.slug,
)?.image;

export default function AiOperationsPlatformPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="mb-10 text-sm font-medium">
        <InlineLink href="/#enterprise-heading">
          <span aria-hidden="true">← </span>All projects
        </InlineLink>
      </nav>

      <header className="mb-14">
        <p className="text-accent-700 dark:text-accent-400 mb-3 text-sm font-medium tracking-widest uppercase">
          {study.kicker}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            {study.name}
          </h1>
          <span className={BADGE_CLASSES}>{study.badge}</span>
        </div>
        <p className="mt-3 text-sm text-neutral-500">
          {study.company} · {study.period}
        </p>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-neutral-500">My role</dt>
            <dd className="mt-0.5 text-neutral-700 dark:text-neutral-300">
              {study.role}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Team</dt>
            <dd className="mt-0.5 text-neutral-700 dark:text-neutral-300">
              {study.team}
            </dd>
          </div>
        </dl>
      </header>

      <section aria-labelledby="problem-heading" className="mb-14">
        <SectionHeading id="problem-heading">The problem</SectionHeading>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.problem}
        </p>
      </section>

      <section aria-labelledby="approach-heading" className="mb-14">
        <SectionHeading id="approach-heading">The platform</SectionHeading>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.approach}
        </p>
      </section>

      <section aria-labelledby="architecture-heading" className="mb-14">
        <SectionHeading id="architecture-heading">
          Explore the architecture
        </SectionHeading>
        <p className="mt-3 mb-5 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Eight layers, from user channels down to the event backbone. Click
          through them — or use the arrow keys. The AI platform layer opens into
          a full deep dive.
        </p>
        <ArchitectureExplorer
          layers={study.layers}
          expandLayerId="ai"
          expandLabel="Inside the AI layer — the full deep dive"
        >
          <AiLayerDeepDive />
        </ArchitectureExplorer>
        {diagram && (
          <details className="mt-5 text-sm text-neutral-600 dark:text-neutral-400">
            <summary className="cursor-pointer font-medium">
              View the full annotated diagram
            </summary>
            <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
              <ImageLightbox
                src={diagram.src}
                alt={diagram.alt}
                width={diagram.width}
                height={diagram.height}
                protect={diagram.protect}
                thumbnailClassName="h-auto w-full"
              />
            </div>
          </details>
        )}
      </section>

      <section aria-labelledby="decisions-heading" className="mb-14">
        <SectionHeading id="decisions-heading">
          Key decisions & trade-offs
        </SectionHeading>
        <div className="mt-5 space-y-3">
          {study.decisions.map((decision) => (
            <details
              key={decision.id}
              className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <summary className="cursor-pointer text-sm font-semibold">
                {decision.title}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {decision.choice}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                {decision.rationale.map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="text-accent-600 dark:text-accent-400"
                    >
                      —
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="outcomes-heading" className="mb-14">
        <SectionHeading id="outcomes-heading">Outcomes</SectionHeading>
        <div className="mt-5 flex flex-wrap gap-4">
          {study.outcomes.map((outcome) => (
            <div
              key={outcome.label}
              className="rounded-xl border border-neutral-200 px-5 py-4 dark:border-neutral-800"
            >
              <p className="text-accent-700 dark:text-accent-400 text-3xl font-semibold">
                {outcome.stat}
              </p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {outcome.label}
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-5 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
          {study.qualitativeOutcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2">
              <span
                aria-hidden="true"
                className="text-accent-600 dark:text-accent-400"
              >
                —
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack-heading" className="mb-14">
        <SectionHeading id="stack-heading">Built with</SectionHeading>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {study.stack.map((group) => (
            <div key={group.group}>
              <h3 className="mb-2 text-sm font-semibold">{group.group}</h3>
              <ul aria-label={group.group} className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className={STACK_ITEM_CLASSES}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <p className="text-sm font-medium">
          <InlineLink href="/#enterprise-heading">
            <span aria-hidden="true">← </span>Back to all projects
          </InlineLink>
        </p>
      </footer>
    </main>
  );
}
