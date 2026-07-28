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
      className="text-accent-700 dark:text-accent-400 text-sm font-medium tracking-widest uppercase"
    >
      {children}
    </h2>
  );
}
