import { profile, projects, experience, skills } from "@/data/profile";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      {/* Hero */}
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
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* Projects */}
      <section id="projects" className="mb-20 scroll-mt-8">
        <SectionHeading>Featured projects</SectionHeading>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-semibold">{p.name}</h3>
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  {p.status}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {p.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-sm font-medium">
                {p.demoUrl ? (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline dark:text-teal-400"
                  >
                    Live demo →
                  </a>
                ) : (
                  <span className="text-neutral-400 dark:text-neutral-600">
                    Demo coming soon
                  </span>
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline dark:text-teal-400"
                  >
                    View code →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-20">
        <SectionHeading>Experience</SectionHeading>
        <div className="mt-6 space-y-10">
          {experience.map((r) => (
            <article key={r.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  {r.title} · {r.company}
                </h3>
                <span className="text-sm text-neutral-500">{r.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {r.summary}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-teal-600 dark:text-teal-400">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <SectionHeading>Skills</SectionHeading>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="mb-2 text-sm font-semibold">{g.group}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <SectionHeading>Get in touch</SectionHeading>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Open to Principal / Staff AI engineering and applied AI roles. The
          fastest way to reach me is email.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <a
            href={`mailto:${profile.email}`}
            className="text-teal-700 hover:underline dark:text-teal-400"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 hover:underline dark:text-teal-400"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 hover:underline dark:text-teal-400"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-10 text-xs text-neutral-400 dark:text-neutral-600">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </main>
  );
}
