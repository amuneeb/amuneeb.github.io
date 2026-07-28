import type { Role } from "@/data/profile";

export function ExperienceItem({ role }: { role: Role }) {
  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">
          {role.title} · {role.company}
        </h3>
        <p className="text-sm text-neutral-500">{role.period}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {role.summary}
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span
              aria-hidden="true"
              className="text-accent-600 dark:text-accent-400"
            >
              —
            </span>
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
