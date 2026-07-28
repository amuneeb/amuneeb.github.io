import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";

const VARIANT_CLASSES = {
  primary:
    "rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
  secondary:
    "rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800",
} as const;

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof VARIANT_CLASSES;
  /** Renders via ExternalLink (new tab + screen-reader announcement). */
  external?: boolean;
  children: ReactNode;
};

/** Anchor styled as a button. The single source of button styling. */
export function ButtonLink({
  variant = "secondary",
  external = false,
  children,
  ...rest
}: ButtonLinkProps) {
  const className = VARIANT_CLASSES[variant];
  if (external) {
    return (
      <ExternalLink className={className} {...rest}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <a className={className} {...rest}>
      {children}
    </a>
  );
}
