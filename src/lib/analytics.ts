/**
 * Thin wrapper over Umami's client API. Safe everywhere: no-ops during
 * SSR/prerender and when the analytics script is absent or blocked —
 * analytics must never break the page.
 */

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

export function track(event: string, data?: EventData): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, data);
  } catch {
    // Ad blockers can leave a broken stub; ignore.
  }
}
