import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Heading id, referenced by the parent section's aria-labelledby. */
  id: string;
  children: ReactNode;
};

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-sm font-medium tracking-widest uppercase text-teal-700 dark:text-teal-400"
    >
      {children}
    </h2>
  );
}
