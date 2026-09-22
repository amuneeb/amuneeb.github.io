/**
 * Inline SVG of the AI-layer coordination architecture. Inline (not an
 * image file) so colors follow the theme and text stays crisp; the
 * title/desc pair carries the flow for screen readers. Numbered
 * callouts 1–10 trace the worked example in the deep dive.
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

/** Seven domain agents, roster order, as up-to-two-line labels. */
const AGENTS: readonly { l1: string; l2?: string }[] = [
  { l1: "Quote", l2: "Assistant" },
  { l1: "Procurement" },
  { l1: "Inventory &", l2: "Warehouse" },
  { l1: "Delivery", l2: "Exception" },
  { l1: "Warranty &", l2: "Service" },
  { l1: "Finance", l2: "Insight" },
  { l1: "Executive", l2: "Insight" },
];

const AGENT_X = (i: number) => 40 + i * 106;
const AGENT_W = 96;
const AGENT_C = (i: number) => AGENT_X(i) + AGENT_W / 2;

/** Worked-example callouts: number + placement. */
const CALLOUTS: readonly { n: string; x: number; y: number }[] = [
  { n: "1", x: 270, y: 73 },
  { n: "7", x: 52, y: 126 },
  { n: "2", x: AGENT_C(1) - 34, y: 230 },
  { n: "3", x: AGENT_C(2) - 34, y: 230 },
  { n: "5", x: AGENT_C(3) - 36, y: 230 },
  { n: "6", x: AGENT_C(3) - 18, y: 230 },
  { n: "4", x: 802, y: 246 },
  { n: "8", x: 62, y: 410 },
  { n: "9", x: 246, y: 410 },
  { n: "10", x: 412, y: 410 },
  { n: "10", x: 596, y: 410 },
];

export function AiLayerDiagram() {
  return (
    <svg
      viewBox="0 0 820 662"
      role="img"
      aria-labelledby="ai-diagram-title ai-diagram-desc"
      className="h-auto w-full"
    >
      <title id="ai-diagram-title">AI layer coordination architecture</title>
      <desc id="ai-diagram-desc">
        A user request or business event enters through the AI Gateway to the AI
        Orchestrator, which routes work to a Model Router and Tool Registry and
        delegates scoped tasks to seven domain agents — Quote Assistant,
        Procurement, Inventory &amp; Warehouse, Delivery Exception, Warranty
        &amp; Service, Finance Insight, Executive Insight — that return typed
        JSON. Agents ground on Bedrock Knowledge Bases over OpenSearch and
        Aurora pgvector and read operational truth from business APIs, while the
        orchestrator can call those APIs directly for lookups. Proposals cross
        an action boundary — Business Policy Service validation, human approval,
        deterministic execution, and audit — and a footer band records
        four-layer evaluation and end-to-end tracing. Numbered callouts one to
        ten trace the worked example.
      </desc>
      <defs>
        <marker
          id="ai-arrowhead"
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

      {/* Entry row */}
      <rect x="90" y="12" width="270" height="34" rx="8" className={BOX} />
      <text
        x="225"
        y="33"
        textAnchor="middle"
        className={`${TEXT} text-[11px]`}
      >
        User request (NL / voice / copilot)
      </text>
      <rect x="450" y="12" width="270" height="34" rx="8" className={BOX} />
      <text
        x="585"
        y="33"
        textAnchor="middle"
        className={`${TEXT} text-[11px]`}
      >
        Business event (EventBridge)
      </text>
      <line
        x1="225"
        y1="46"
        x2="345"
        y2="63"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />
      <line
        x1="585"
        y1="46"
        x2="475"
        y2="63"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />

      {/* AI Gateway */}
      <rect x="260" y="64" width="300" height="34" rx="8" className={BOX} />
      <text
        x="410"
        y="85"
        textAnchor="middle"
        className={`${TEXT} text-[11px]`}
      >
        AI Gateway — authn · quotas · model allow-list
      </text>
      <line
        x1="410"
        y1="98"
        x2="410"
        y2="110"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />

      {/* Orchestrator band */}
      <rect
        x="40"
        y="112"
        width="740"
        height="58"
        rx="8"
        className={ACCENT_BOX}
      />
      <text
        x="410"
        y="132"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[13px] font-semibold`}
      >
        AI Orchestrator
      </text>
      <text
        x="410"
        y="148"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[10px]`}
      >
        classify intent &amp; domain · build execution plan · own workflow state
      </text>
      <text
        x="410"
        y="162"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[10px]`}
      >
        bounded: 60 s/agent · 10 steps · 12 tool calls · $1 ceiling
      </text>

      {/* Model Router + Tool Registry */}
      <rect x="120" y="178" width="270" height="26" rx="7" className={BOX} />
      <text
        x="255"
        y="195"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Model Router → Bedrock: Claude · Titan · Llama
      </text>
      <rect x="430" y="178" width="270" height="26" rx="7" className={BOX} />
      <text
        x="565"
        y="195"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Tool Registry · OpenAPI · per-agent allow-lists
      </text>
      <line x1="410" y1="170" x2="410" y2="212" className={ARROW} />

      {/* Orchestrator → agents fan-out */}
      <line x1="88" y1="212" x2="724" y2="212" className={ARROW} />
      {AGENTS.map((agent, i) => (
        <g key={agent.l1}>
          <line
            x1={AGENT_C(i)}
            y1="212"
            x2={AGENT_C(i)}
            y2="221"
            className={ARROW}
            markerEnd="url(#ai-arrowhead)"
          />
          <rect
            x={AGENT_X(i)}
            y="222"
            width={AGENT_W}
            height="46"
            rx="8"
            className={ACCENT_BOX}
          />
          {agent.l2 ? (
            <>
              <text
                x={AGENT_C(i)}
                y="242"
                textAnchor="middle"
                className={`${TEXT_ACCENT} text-[9px]`}
              >
                {agent.l1}
              </text>
              <text
                x={AGENT_C(i)}
                y="253"
                textAnchor="middle"
                className={`${TEXT_ACCENT} text-[9px]`}
              >
                {agent.l2}
              </text>
            </>
          ) : (
            <text
              x={AGENT_C(i)}
              y="248"
              textAnchor="middle"
              className={`${TEXT_ACCENT} text-[9px]`}
            >
              {agent.l1}
            </text>
          )}
        </g>
      ))}
      <text
        x="410"
        y="284"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[9px]`}
      >
        each agent: 8–15 tools · own identity · scoped knowledge
      </text>
      <text
        x="410"
        y="297"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[9px]`}
      >
        typed JSON contracts back to the orchestrator — never prose between
        agents
      </text>

      {/* Knowledge band (left) */}
      <rect x="40" y="316" width="360" height="32" rx="7" className={RAIL} />
      <text
        x="220"
        y="330"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Bedrock Knowledge Bases → OpenSearch
      </text>
      <text
        x="220"
        y="342"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[9px]`}
      >
        hybrid + rerank · metadata-first filters
      </text>
      <rect x="40" y="354" width="360" height="26" rx="7" className={RAIL} />
      <text
        x="220"
        y="371"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Aurora pgvector (catalog embeddings)
      </text>
      {/* grounding arrows (dotted) */}
      <line
        x1={AGENT_C(1)}
        y1="268"
        x2="190"
        y2="315"
        className={ARROW}
        strokeDasharray="1 3"
        markerEnd="url(#ai-arrowhead)"
      />
      <line
        x1={AGENT_C(4)}
        y1="268"
        x2="320"
        y2="315"
        className={ARROW}
        strokeDasharray="1 3"
        markerEnd="url(#ai-arrowhead)"
      />
      <text x="150" y="306" className={`${TEXT_MUTED} text-[8px]`}>
        grounding
      </text>

      {/* Business APIs band (right) */}
      <rect x="420" y="316" width="360" height="64" rx="7" className={BOX} />
      <text
        x="600"
        y="332"
        textAnchor="middle"
        className={`${TEXT} text-[10px] font-semibold`}
      >
        Business APIs — operational truth
      </text>
      <text
        x="600"
        y="350"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Order · Inventory · Procurement · Delivery
      </text>
      <text
        x="600"
        y="364"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Warranty · Pricing · Customer
      </text>
      {/* direct-lookup arrow (orchestrator → business APIs, no agent) */}
      <polyline
        points="780,150 800,150 800,330 782,330"
        fill="none"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />
      <text
        x="806"
        y="290"
        className={`${TEXT_MUTED} text-[8px]`}
        transform="rotate(90 806 290)"
      >
        direct lookups (no agent needed)
      </text>

      {/* Action boundary band (dashed) */}
      <rect
        x="40"
        y="392"
        width="740"
        height="72"
        rx="8"
        strokeDasharray="5 3"
        className={RAIL}
      />
      <text x="48" y="388" className={`${TEXT} text-[9px] font-semibold`}>
        Action boundary
      </text>
      <line
        x1="136"
        y1="381"
        x2="136"
        y2="405"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />
      {/* BPS */}
      <rect x="52" y="406" width="168" height="46" rx="7" className={BOX} />
      <text
        x="136"
        y="424"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Business Policy Service
      </text>
      <text
        x="136"
        y="437"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[8px]`}
      >
        validate(proposal) →
      </text>
      <text
        x="136"
        y="447"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[8px]`}
      >
        allow / requires-approval / deny
      </text>
      <line
        x1="220"
        y1="429"
        x2="234"
        y2="429"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />
      {/* Human approval */}
      <rect x="236" y="406" width="150" height="46" rx="7" className={BOX} />
      <text
        x="311"
        y="429"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Human approval
      </text>
      <text
        x="311"
        y="441"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[8px]`}
      >
        (manager)
      </text>
      <line
        x1="386"
        y1="429"
        x2="400"
        y2="429"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />
      {/* Deterministic execution */}
      <rect x="402" y="406" width="168" height="46" rx="7" className={BOX} />
      <text
        x="486"
        y="424"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Deterministic execution
      </text>
      <text
        x="486"
        y="441"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[8px]`}
      >
        Order · Delivery · Notification
      </text>
      <line
        x1="570"
        y1="429"
        x2="584"
        y2="429"
        className={ARROW}
        markerEnd="url(#ai-arrowhead)"
      />
      {/* Audit */}
      <rect x="586" y="406" width="180" height="46" rx="7" className={BOX} />
      <text
        x="676"
        y="424"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Audit
      </text>
      <text
        x="676"
        y="437"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[8px]`}
      >
        prompt · model · index versions
      </text>
      <text
        x="676"
        y="447"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[8px]`}
      >
        retrieved docs · API calls · approver
      </text>

      {/* Footer band */}
      <rect x="40" y="482" width="740" height="30" rx="8" className={RAIL} />
      <text
        x="410"
        y="501"
        textAnchor="middle"
        className={`${TEXT} text-[9px]`}
      >
        Evaluation &amp; tracing — 4-layer evals · golden dataset ~1,200 ·
        regression → shadow → canary · every workflow traced end to end
      </text>

      {/* Legend */}
      <rect x="520" y="528" width="260" height="96" rx="8" className={RAIL} />
      <text x="536" y="548" className={`${TEXT} text-[10px] font-semibold`}>
        Legend
      </text>
      <line x1="536" y1="566" x2="576" y2="566" className={ARROW} />
      <text x="586" y="569" className={`${TEXT_MUTED} text-[9px]`}>
        synchronous
      </text>
      <line
        x1="536"
        y1="588"
        x2="576"
        y2="588"
        className={ARROW}
        strokeDasharray="5 3"
      />
      <text x="586" y="591" className={`${TEXT_MUTED} text-[9px]`}>
        asynchronous / event
      </text>
      <line
        x1="536"
        y1="610"
        x2="576"
        y2="610"
        className={ARROW}
        strokeDasharray="1 3"
      />
      <text x="586" y="613" className={`${TEXT_MUTED} text-[9px]`}>
        grounding / data
      </text>

      {/* Worked-example callouts */}
      {CALLOUTS.map((c, i) => (
        <g key={`${c.n}-${i}`}>
          <circle cx={c.x} cy={c.y} r="8" className="fill-accent-700" />
          <text
            x={c.x}
            y={c.y + 3}
            textAnchor="middle"
            className="fill-white text-[9px] font-semibold"
          >
            {c.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
