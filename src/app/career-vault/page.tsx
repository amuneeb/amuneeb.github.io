import type { Metadata } from "next";
import { careerVaultCaseStudy as study, profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InlineLink } from "@/components/ui/InlineLink";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { BADGE_CLASSES, STACK_ITEM_CLASSES } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: `${study.name} — ${profile.name}`,
  description: study.metaDescription,
};

export default function CareerVaultPage() {
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
          {study.pitch}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {study.links.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              external
              variant={link.primary ? "primary" : "secondary"}
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>
        <p className="mt-3 text-sm text-neutral-500">{study.demoNote}</p>
      </header>

      {study.image && (
        <section
          aria-label={`${study.name} screenshot`}
          className="mb-14 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
        >
          <ImageLightbox
            src={study.image.src}
            alt={study.image.alt}
            width={study.image.width}
            height={study.image.height}
            protect={study.image.protect}
            thumbnailClassName="h-auto w-full"
          />
        </section>
      )}

      <section aria-labelledby="highlights-heading" className="mb-14">
        <SectionHeading id="highlights-heading">Highlights</SectionHeading>
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-md bg-neutral-100 px-2.5 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      {study.architecture && (
        <section aria-labelledby="architecture-heading" className="mb-14">
          <SectionHeading id="architecture-heading">
            Architecture
          </SectionHeading>
          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <ImageLightbox
              src={study.architecture.src}
              alt={study.architecture.alt}
              width={study.architecture.width}
              height={study.architecture.height}
              protect={study.architecture.protect}
              thumbnailClassName="h-auto w-full"
            />
          </div>
        </section>
      )}

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
