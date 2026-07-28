import type { Project } from "@/data/profile";
import { ExternalLink } from "@/components/ExternalLink";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="flex flex-col rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 id={`project-${project.slug}`} className="font-semibold">
          {project.name}
        </h3>
        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-950 dark:text-teal-300">
          {project.status}
        </span>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>
      <ul aria-label="Technologies used" className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm font-medium">
        {project.demoUrl ? (
          <ExternalLink
            href={project.demoUrl}
            className="text-teal-700 hover:underline dark:text-teal-400"
          >
            Live demo of {project.name} →
          </ExternalLink>
        ) : (
          <span className="text-neutral-500">Demo coming soon</span>
        )}
        {project.repoUrl && (
          <ExternalLink
            href={project.repoUrl}
            className="text-teal-700 hover:underline dark:text-teal-400"
          >
            Source code →
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
