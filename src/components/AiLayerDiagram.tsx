/**
 * Inline SVG of the AI-layer coordination architecture. Inline (not an
 * image file) so colors follow the theme and text stays crisp; the
 * title/desc pair carries the flow for screen readers.
 */

const BOX =
  "fill-white stroke-neutral-300 dark:fill-neutral-900 dark:stroke-neutral-700";
const ACCENT_BOX =
  "fill-accent-50 stroke-accent-600 dark:fill-accent-950 dark:stroke-accent-400";
const RAIL =
  "fill-neutral-100 stroke-neutral-300 dark:fill-neutral-800 dark:stroke-neutral-700";
const TEXT = "fill-neutral-700 dark:fill-neutral-300";
const TEXT_ACCENT = "fill-accent-800 dark:fill-accent-300";
const TEXT_MUTED = "fill-neutral-500";
const ARROW = "stroke-neutral-400";

const AGENTS = [
  "Sales",
  "Procurement",
  "Inventory",
  "Delivery",
  "Warranty",
  "Finance",
] as const;

export function AiLayerDiagram() {
  return (
    <svg
      viewBox="0 0 800 400"
      role="img"
      aria-labelledby="ai-diagram-title ai-diagram-desc"
      className="h-auto w-full"
    >
      <title id="ai-diagram-title">AI layer coordination architecture</title>
      <desc id="ai-diagram-desc">
        A user request or business event passes through the AI gateway to the
        supervisor orchestrator, which delegates scoped tasks to six domain
        agents (sales, procurement, inventory, delivery, warranty, finance) and
        receives typed results back. Outputs flow through the business rules
        engine and human approval before business microservices execute changes
        against authoritative data stores. Guardrails constrain inputs, data,
        and tools; audit and workflow state record every step.
      </desc>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path
            d="M1,1 L7,4 L1,7"
            fill="none"
            className={ARROW}
            strokeWidth="1.5"
          />
        </marker>
      </defs>

      {/* Spine */}
      <rect x="250" y="8" width="300" height="30" rx="8" className={BOX} />
      <text
        x="400"
        y="27"
        textAnchor="middle"
        className={`${TEXT} text-[12px]`}
      >
        User request or business event
      </text>
      <line
        x1="400"
        y1="38"
        x2="400"
        y2="50"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />

      <rect x="250" y="52" width="300" height="30" rx="8" className={BOX} />
      <text
        x="400"
        y="71"
        textAnchor="middle"
        className={`${TEXT} text-[12px]`}
      >
        AI gateway — authentication &amp; policy
      </text>
      <line
        x1="400"
        y1="82"
        x2="400"
        y2="94"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />

      <rect
        x="230"
        y="96"
        width="340"
        height="44"
        rx="8"
        className={ACCENT_BOX}
      />
      <text
        x="400"
        y="114"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[13px] font-semibold`}
      >
        Supervisor orchestrator
      </text>
      <text
        x="400"
        y="131"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[11px]`}
      >
        intent · execution plan · permissions
      </text>
      <line
        x1="400"
        y1="140"
        x2="400"
        y2="160"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />
      <text x="412" y="154" className={`${TEXT_MUTED} text-[10px]`}>
        scoped tasks ⇅ typed results
      </text>

      {AGENTS.map((agent, i) => (
        <g key={agent}>
          <rect
            x={150 + i * 84.4}
            y="162"
            width="78"
            height="32"
            rx="8"
            className={ACCENT_BOX}
          />
          <text
            x={189 + i * 84.4}
            y="182"
            textAnchor="middle"
            className={`${TEXT_ACCENT} text-[11px]`}
          >
            {agent}
          </text>
        </g>
      ))}
      <text
        x="400"
        y="208"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        each agent: own identity · least-privilege tools · domain RAG knowledge
        base
      </text>
      <line
        x1="400"
        y1="212"
        x2="400"
        y2="224"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />

      <rect x="250" y="226" width="300" height="30" rx="8" className={BOX} />
      <text
        x="400"
        y="245"
        textAnchor="middle"
        className={`${TEXT} text-[12px]`}
      >
        Business rules engine — conflict resolution
      </text>
      <line
        x1="400"
        y1="256"
        x2="400"
        y2="268"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />

      <rect x="250" y="270" width="300" height="30" rx="8" className={BOX} />
      <text
        x="400"
        y="289"
        textAnchor="middle"
        className={`${TEXT} text-[12px]`}
      >
        Human approval — consequential actions
      </text>
      <line
        x1="400"
        y1="300"
        x2="400"
        y2="312"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />

      <rect x="210" y="314" width="380" height="32" rx="8" className={BOX} />
      <text
        x="400"
        y="334"
        textAnchor="middle"
        className={`${TEXT} text-[12px]`}
      >
        Business microservices — approved APIs · systems of record
      </text>
      <line
        x1="400"
        y1="346"
        x2="400"
        y2="358"
        className={ARROW}
        markerEnd="url(#arrowhead)"
      />

      <rect x="250" y="360" width="300" height="30" rx="8" className={BOX} />
      <text
        x="400"
        y="379"
        textAnchor="middle"
        className={`${TEXT} text-[12px]`}
      >
        Authoritative data stores
      </text>

      {/* Guardrails rail */}
      <rect
        x="24"
        y="52"
        width="150"
        height="98"
        rx="8"
        strokeDasharray="4 3"
        className={RAIL}
      />
      <text
        x="99"
        y="72"
        textAnchor="middle"
        className={`${TEXT} text-[12px] font-semibold`}
      >
        Guardrails
      </text>
      <text
        x="99"
        y="92"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        input · prompt injection
      </text>
      <text
        x="99"
        y="108"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        data access control
      </text>
      <text
        x="99"
        y="124"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        tool allow-lists
      </text>
      <text
        x="99"
        y="140"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        user ∩ agent ∩ tool ∩ policy
      </text>
      <line
        x1="174"
        y1="118"
        x2="228"
        y2="118"
        strokeDasharray="4 3"
        className={ARROW}
      />

      {/* Audit rail */}
      <rect
        x="626"
        y="52"
        width="150"
        height="98"
        rx="8"
        strokeDasharray="4 3"
        className={RAIL}
      />
      <text
        x="701"
        y="72"
        textAnchor="middle"
        className={`${TEXT} text-[12px] font-semibold`}
      >
        Audit &amp; state
      </text>
      <text
        x="701"
        y="92"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        workflow state
      </text>
      <text
        x="701"
        y="108"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        prompts · models · tools
      </text>
      <text
        x="701"
        y="124"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        retrievals · confidence
      </text>
      <text
        x="701"
        y="140"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        approvals · outcomes
      </text>
      <line
        x1="626"
        y1="118"
        x2="572"
        y2="118"
        strokeDasharray="4 3"
        className={ARROW}
      />
    </svg>
  );
}
