import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { falahPlatformCaseStudy as study } from "@/data/falah-platform-case-study";
import { InlineLink } from "@/components/ui/InlineLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { SectionHeading } from "@/components/SectionHeading";
import { FalahArchitectureDiagram } from "@/components/FalahArchitectureDiagram";
import { BADGE_CLASSES, STACK_ITEM_CLASSES } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: `${study.name} — ${profile.name}`,
  description: study.metaDescription,
};

const BULLET =
  "mt-3 space-y-1.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300";

function Bullets({ points }: { points: readonly string[] }) {
  return (
    <ul className={BULLET}>
      {points.map((point) => (
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
  );
}

export default function FalahPlatformPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="mb-10 text-sm font-medium">
        <InlineLink href="/#projects">
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
        <p className="mt-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.tagline}
        </p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-neutral-500">My role</dt>
            <dd className="mt-0.5 text-neutral-700 dark:text-neutral-300">
              {study.role}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Timeline</dt>
            <dd className="mt-0.5 text-neutral-700 dark:text-neutral-300">
              {study.timeline}
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={study.live}
            external
            variant="primary"
            trackEvent="case-study-link"
            trackData={{ study: study.name, label: "Visit the site" }}
          >
            Visit falahacademywa.org
          </ButtonLink>
          <ButtonLink
            href={`${study.live}/platform/`}
            external
            variant="secondary"
            trackEvent="case-study-link"
            trackData={{ study: study.name, label: "Open the portal" }}
          >
            Open the portal
          </ButtonLink>
        </div>
        <p className="mt-3 text-sm text-neutral-500">{study.portalNote}</p>
      </header>

      <section aria-labelledby="problem-heading" className="mb-14">
        <SectionHeading id="problem-heading">The problem</SectionHeading>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.context}
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.problem.intro}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-300 text-left dark:border-neutral-700">
                <th className="py-2 pr-4 align-bottom font-semibold whitespace-nowrap">
                  Who
                </th>
                <th className="py-2 align-bottom font-semibold">
                  What was breaking
                </th>
              </tr>
            </thead>
            <tbody>
              {study.problem.rows.map((row) => (
                <tr
                  key={row.who}
                  className="border-b border-neutral-200 align-top dark:border-neutral-800"
                >
                  <td className="py-2 pr-4 font-medium whitespace-nowrap text-neutral-700 dark:text-neutral-300">
                    {row.who}
                  </td>
                  <td className="py-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {row.what}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.problem.closing}
        </p>
      </section>

      <section aria-labelledby="solution-heading" className="mb-14">
        <SectionHeading id="solution-heading">Solution overview</SectionHeading>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.solution.intro}
        </p>
        <figure className="mt-5">
          <div className="overflow-hidden rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
            <FalahArchitectureDiagram />
          </div>
          <figcaption className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            {study.solution.caption}
          </figcaption>
        </figure>
        <p className="mt-5 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.solution.callout}
        </p>
      </section>

      <section aria-labelledby="architecture-heading" className="mb-14">
        <SectionHeading id="architecture-heading">Architecture</SectionHeading>
        <div className="mt-4 space-y-6">
          {study.architecture.map((block) => (
            <div key={block.id}>
              <h3 className="font-semibold">{block.title}</h3>
              <Bullets points={block.points} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="screens-heading" className="mb-14">
        <SectionHeading id="screens-heading">Screens</SectionHeading>
        <p className="mt-3 mb-5 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Placeholders — final images will come from the seeded development
          environment (no real student or family appears).
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {study.screens.map((screen) => (
            <figure
              key={screen.src}
              className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
            >
              <ImageLightbox
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                thumbnailClassName="h-auto w-full border-b border-neutral-200 dark:border-neutral-800"
              />
              <figcaption className="p-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="decisions-heading" className="mb-14">
        <SectionHeading id="decisions-heading">
          Notable engineering decisions
        </SectionHeading>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-300 text-left dark:border-neutral-700">
                <th className="py-2 pr-4 align-bottom font-semibold">
                  Decision
                </th>
                <th className="py-2 pr-4 align-bottom font-semibold">Why</th>
                <th className="py-2 align-bottom font-semibold">
                  Trade-off accepted
                </th>
              </tr>
            </thead>
            <tbody>
              {study.decisions.map((decision) => (
                <tr
                  key={decision.decision}
                  className="border-b border-neutral-200 align-top dark:border-neutral-800"
                >
                  <td className="py-2 pr-4 font-medium text-neutral-700 dark:text-neutral-300">
                    {decision.decision}
                  </td>
                  <td className="py-2 pr-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {decision.why}
                  </td>
                  <td className="py-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {decision.tradeoff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="operations-heading" className="mb-14">
        <SectionHeading id="operations-heading">
          Operations tooling
        </SectionHeading>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {study.operations.intro}
        </p>
        <Bullets points={study.operations.points} />
      </section>

      <section aria-labelledby="results-heading" className="mb-14">
        <SectionHeading id="results-heading">Results</SectionHeading>
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
        <Bullets points={study.results} />
      </section>

      <section aria-labelledby="differently-heading" className="mb-14">
        <SectionHeading id="differently-heading">
          {"What I'd do differently"}
        </SectionHeading>
        <Bullets points={study.differently} />
      </section>

      <section aria-labelledby="stack-heading" className="mb-14">
        <SectionHeading id="stack-heading">Built with</SectionHeading>
        <ul
          aria-label="Technologies used"
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {study.stack.map((tech) => (
            <li key={tech} className={STACK_ITEM_CLASSES}>
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="skills-heading" className="mb-14">
        <SectionHeading id="skills-heading">Skills demonstrated</SectionHeading>
        <ul
          aria-label="Skills demonstrated"
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {study.skills.map((skill) => (
            <li key={skill} className={STACK_ITEM_CLASSES}>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <p className="mb-10 text-sm text-neutral-500 italic">
        Personal data note: the platform holds children&apos;s records. Every
        screenshot in this case study is from the seeded development
        environment; no real student or family appears.
      </p>

      <footer className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <p className="text-sm font-medium">
          <InlineLink href="/#projects">
            <span aria-hidden="true">← </span>Back to all projects
          </InlineLink>
        </p>
      </footer>
    </main>
  );
}
