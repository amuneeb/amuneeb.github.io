import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  ExternalLink,
  type TrackableLinkProps,
} from "@/components/ui/ExternalLink";
import { trackingAttributes } from "@/lib/analytics";

const INLINE_LINK_CLASSES =
  "text-accent-700 hover:underline dark:text-accent-400";

type InlineLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  TrackableLinkProps & {
    href: string;
    /** Renders via ExternalLink (new tab + screen-reader announcement). */
    external?: boolean;
    children: ReactNode;
  };

/** Accent-colored text link. The single source of inline-link styling. */
export function InlineLink({
  external = false,
  trackEvent,
  trackData,
  children,
  ...rest
}: InlineLinkProps) {
  if (external) {
    return (
      <ExternalLink
        className={INLINE_LINK_CLASSES}
        trackEvent={trackEvent}
        trackData={trackData}
        {...rest}
      >
        {children}
      </ExternalLink>
    );
  }
  return (
    <a
      className={INLINE_LINK_CLASSES}
      {...trackingAttributes(trackEvent, trackData)}
      {...rest}
    >
      {children}
    </a>
  );
}
