"use client";

import { useRef, useState, type ReactNode } from "react";
import type { ArchitectureLayer } from "@/data/ai-operations-case-study";
import { track } from "@/lib/analytics";

/**
 * Interactive layer-by-layer walkthrough of the platform architecture.
 * Implements the WAI-ARIA tabs pattern: arrow keys move between layers,
 * the panel updates in place. One layer may carry an expandable deep
 * dive, passed as children and revealed by a toggle inside its panel.
 */
export function ArchitectureExplorer({
  layers,
  expandLayerId,
  expandLabel,
  children,
}: {
  layers: readonly ArchitectureLayer[];
  /** Layer whose panel offers the expandable deep dive. */
  expandLayerId?: string;
  /** Toggle label for the deep dive. */
  expandLabel?: string;
  children?: ReactNode;
}) {
  const [activeId, setActiveId] = useState(layers[0].id);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const active = layers.find((layer) => layer.id === activeId) ?? layers[0];

  const activate = (id: string) => {
    setActiveId(id);
    track("architecture-layer", { layer: id });
    tabRefs.current.get(id)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = layers.length - 1;
    const target =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % layers.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + layers.length) % layers.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    activate(layers[target].id);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Architecture layers"
        className="flex flex-wrap gap-1.5"
      >
        {layers.map((layer, index) => {
          const selected = layer.id === active.id;
          return (
            <button
              key={layer.id}
              ref={(el) => {
                if (el) tabRefs.current.set(layer.id, el);
              }}
              role="tab"
              id={`layer-tab-${layer.id}`}
              aria-selected={selected}
              aria-controls="layer-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(layer.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                selected
                  ? "border-accent-700 bg-accent-50 text-accent-800 dark:border-accent-400 dark:bg-accent-950 dark:text-accent-300"
                  : "border-neutral-300 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {index + 1}. {layer.name}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="layer-panel"
        aria-labelledby={`layer-tab-${active.id}`}
        className="mt-4 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
      >
        <h3 className="font-semibold">{active.name}</h3>
        <p className="text-accent-700 dark:text-accent-400 mt-1 text-sm">
          {active.tagline}
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
          {active.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span
                aria-hidden="true"
                className="text-accent-600 dark:text-accent-400"
              >
                —
              </span>
              {point}
            </li>
          ))}
        </ul>
        {children && active.id === expandLayerId && (
          <details
            className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-800"
            onToggle={(event) => {
              if ((event.target as HTMLDetailsElement).open) {
                track("ai-layer-deep-dive");
              }
            }}
          >
            <summary className="text-accent-700 dark:text-accent-400 cursor-pointer text-sm font-semibold">
              {expandLabel}
            </summary>
            <div className="mt-4">{children}</div>
          </details>
        )}
      </div>
    </div>
  );
}
