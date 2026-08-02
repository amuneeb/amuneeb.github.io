import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackingAttributes } from "@/lib/analytics";

export type TrackableLinkProps = {
  /** Umami click-event name; omitted = no tracking. */
  trackEvent?: string;
  /** Extra event data, rendered as data-umami-event-* attributes. */
  trackData?: Record<string, string>;
};

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  TrackableLinkProps & {
    href: string;
    children: ReactNode;
  };

/**
 * Anchor that opens in a new tab. Announces the new-tab behavior to
 * screen readers, which the visual context alone does not convey.
 */
export function ExternalLink({
  children,
  trackEvent,
  trackData,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...trackingAttributes(trackEvent, trackData)}
      {...rest}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
