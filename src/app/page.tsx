import {
  profile,
  featuredProjects,
  enterpriseProjects,
  experience,
  skills,
} from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InlineLink } from "@/components/ui/InlineLink";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SkillGroup } from "@/components/SkillGroup";
import { AskExperience } from "@/components/AskExperience";

export default function Home() {
  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-20">
          <p className="text-accent-700 dark:text-accent-400 mb-3 text-sm font-medium">
            {profile.location}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
            {profile.title} — {profile.tagline}
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-neutral-700 dark:text-neutral-300">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">
              View projects
            </ButtonLink>
            <ButtonLink href={profile.resumeUrl} download>
              Download resume<span className="sr-only"> (PDF)</span>
            </ButtonLink>
            <ButtonLink href={profile.github} external>
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedin} external>
              LinkedIn
            </ButtonLink>
          </div>
        </header>

        <section
          id="ask"
          aria-labelledby="ask-heading"
          className="mb-20 scroll-mt-8"
        >
          <SectionHeading id="ask-heading">
            Ask about my experience
          </SectionHeading>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Ask a question about my work — or paste a whole job description to
            see how closely the role matches my experience, scored out of 10.
            Matching runs in your browser: questions are logged anonymously to
            improve this panel, and pasted job descriptions never leave the page
            — only their score.
          </p>
          <div className="mt-6">
            <AskExperience />
          </div>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="mb-20 scroll-mt-8"
        >
          <SectionHeading id="projects-heading">
            Featured projects
          </SectionHeading>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section aria-labelledby="enterprise-heading" className="mb-20">
          <SectionHeading id="enterprise-heading">
            Enterprise platform work
          </SectionHeading>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Production platforms I designed and delivered for Microsoft and a
            global e-commerce company. Proprietary systems — no public demos —
            but each shipped at enterprise scale with measured outcomes.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading" className="mb-20">
          <SectionHeading id="experience-heading">Experience</SectionHeading>
          <div className="mt-6 space-y-10">
            {experience.map((role) => (
              <ExperienceItem key={role.company} role={role} />
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="mb-20">
          <SectionHeading id="skills-heading">Skills</SectionHeading>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {skills.map((group) => (
              <SkillGroup key={group.group} group={group} />
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 pb-16">
        <section
          aria-labelledby="contact-heading"
          className="border-t border-neutral-200 pt-10 dark:border-neutral-800"
        >
          <SectionHeading id="contact-heading">Get in touch</SectionHeading>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Open to Principal / Staff AI engineering and applied AI roles —
            hands-on IC preferred, open to tech lead — and willing to relocate
            for the right one. US citizen, no visa sponsorship required,
            available on two weeks&apos; notice. The fastest way to reach me is
            email.
          </p>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            <li>
              <InlineLink href={`mailto:${profile.email}`}>
                {profile.email}
              </InlineLink>
            </li>
            <li>
              <InlineLink href={profile.github} external>
                GitHub
              </InlineLink>
            </li>
            <li>
              <InlineLink href={profile.linkedin} external>
                LinkedIn
              </InlineLink>
            </li>
          </ul>
          <p className="mt-10 text-xs text-neutral-500">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </section>
      </footer>
    </>
  );
}
