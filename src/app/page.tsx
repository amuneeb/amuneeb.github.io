import { profile, projects, experience, skills } from "@/data/profile";
import { ExternalLink } from "@/components/ExternalLink";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SkillGroup } from "@/components/SkillGroup";

export default function Home() {
  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium text-teal-700 dark:text-teal-400">
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
            <a
              href="#projects"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              View projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Download resume<span className="sr-only"> (PDF)</span>
            </a>
            <ExternalLink
              href={profile.github}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              GitHub
            </ExternalLink>
            <ExternalLink
              href={profile.linkedin}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              LinkedIn
            </ExternalLink>
          </div>
        </header>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="mb-20 scroll-mt-8"
        >
          <SectionHeading id="projects-heading">Featured projects</SectionHeading>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
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
            Open to Principal / Staff AI engineering and applied AI roles. The
            fastest way to reach me is email.
          </p>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="text-teal-700 hover:underline dark:text-teal-400"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <ExternalLink
                href={profile.github}
                className="text-teal-700 hover:underline dark:text-teal-400"
              >
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={profile.linkedin}
                className="text-teal-700 hover:underline dark:text-teal-400"
              >
                LinkedIn
              </ExternalLink>
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
