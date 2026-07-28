import type { SkillGroup as SkillGroupData } from "@/data/profile";

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{group.group}</h3>
      <ul aria-label={group.group} className="flex flex-wrap gap-1.5">
        {group.items.map((skill) => (
          <li
            key={skill}
            className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
