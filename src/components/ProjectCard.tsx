import type { Project } from "@/data/profile";
import { InlineLink } from "@/components/ui/InlineLink";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

const CARD_IMAGE_CLASSES =
  "h-auto w-full border-b border-neutral-200 dark:border-neutral-800";

const BADGE_CLASSES =
  "rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-medium text-accent-800 dark:bg-accent-950 dark:text-accent-300";

const STACK_ITEM_CLASSES =
  "rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400";

export function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
    >
      {project.image && (
        <ImageLightbox
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          protect={project.image.protect}
          thumbnailClassName={CARD_IMAGE_CLASSES}
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 id={headingId} className="font-semibold">
            {project.name}
          </h3>
          <span className={BADGE_CLASSES}>{project.badge}</span>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>
        {project.impact && (
          <p className="text-accent-700 dark:text-accent-400 mt-2 text-sm font-medium">
            {project.impact}
          </p>
        )}
        <ul
          aria-label="Technologies used"
          className="mt-4 mb-4 flex flex-1 flex-wrap content-start gap-1.5"
        >
          {project.stack.map((tech) => (
            <li key={tech} className={STACK_ITEM_CLASSES}>
              {tech}
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <ul className="flex gap-3 text-sm font-medium">
            {project.links.map((link) => (
              <li key={link.href}>
                <InlineLink href={link.href} external>
                  {link.label}
                  <span aria-hidden="true"> →</span>
                </InlineLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
