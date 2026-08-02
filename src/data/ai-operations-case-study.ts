/**
 * Content for the AI inventory & operations platform case study
 * (/ai-operations-platform). Sanitized for publication: no employer
 * name, no internal system names, only approved metrics.
 */

export type ArchitectureLayer = {
  /** Stable id used for DOM ids and React keys. */
  id: string;
  name: string;
  /** One-line summary shown under the layer name. */
  tagline: string;
  /** What lives in this layer, as short bullets. */
  points: readonly string[];
};

export type Decision = {
  id: string;
  title: string;
  /** What was chosen, in one or two sentences. */
  choice: string;
  /** The trade-offs and reasoning, as bullets. */
  rationale: readonly string[];
};

export type StackGroup = {
  group: string;
  items: readonly string[];
};

export type AiSubsection = {
  id: string;
  title: string;
  body: string;
  points?: readonly string[];
};

export type CoordinationMechanic = {
  id: string;
  title: string;
  body: string;
  points?: readonly string[];
};

export const aiOperationsCaseStudy = {
  slug: "ai-operations-platform",
  name: "AI inventory & operations platform",
  badge: "Production" as const,
  kicker: "Enterprise case study",
  role: "Architect & AI lead — hands-on",
  team: "4 in-house engineers + 10 offshore",
  period: "Feb 2025 – present",
  company: "Global e-commerce & retail company",
  metaDescription:
    "Case study: an AI-first ERP platform for e-commerce and retail operations — domain-scoped AI agents, RAG grounding, and an event-driven microservices backbone on AWS.",
  problem:
    "Before the platform, the business ran on disconnected systems — no single source of truth. Quoting depended on individual salespeople carrying deep product knowledge in their heads: suggesting the right items and pricing a quote required experience no system could back up. Inventory wasn't reliably tracked, so stock decisions ran on guesswork; financial reporting was largely manual or missing. The result: slow quotes, error-prone reconciliation between systems, and operational decisions made without data.",
  approach:
    "The answer was an AI-first ERP platform built as an integrated whole: fourteen domain microservices on an event-driven backbone, with an AI layer woven through every workflow — domain-scoped agents for quoting, procurement, warehouse, delivery, warranty, and finance; RAG grounding over enterprise data; predictive models for demand, inventory, and delivery; and guardrails with human approval on consequential actions. I own the architecture end to end and lead the AI platform hands-on.",
  outcomes: [
    {
      stat: "90%",
      label: "reduction in manual reconciliation",
    },
  ],
  qualitativeOutcomes: [
    "Quoting no longer depends on tribal knowledge — agents ground suggestions in the catalog, pricing rules, and policies",
    "One platform replaced disconnected systems: inventory, orders, procurement, delivery, and warranty share a single source of truth",
    "Financial and operational reporting generated from live data instead of manual assembly",
  ],
  layers: [
    {
      id: "channels",
      name: "User channels",
      tagline: "Every audience gets a purpose-built surface",
      points: [
        "Web apps for sales teams and managers; customer web portal",
        "Mobile apps for sales, delivery, and service; technician and driver apps",
        "Supplier portal plus EDI / API access for partners",
      ],
    },
    {
      id: "edge",
      name: "Edge & security",
      tagline: "One hardened front door for every channel",
      points: [
        "Route 53 → CloudFront → WAF/Shield → load balancer → API Gateway",
        "Separate identity paths: Cognito for customers, IAM Identity Center for employees",
        "KMS encryption, Secrets Manager, GuardDuty and Security Hub monitoring",
      ],
    },
    {
      id: "ai",
      name: "AI platform",
      tagline: "The intelligence layer — agents, RAG, prediction, guardrails",
      points: [
        "Domain-scoped agents: quote assistant, procurement, warehouse, delivery exception, warranty, finance and executive insight",
        "Bedrock LLMs with RAG knowledge bases over the product catalog, pricing, policies, and operational data (OpenSearch vectors)",
        "Predictive ML on SageMaker: demand forecasting, inventory optimization, delivery ETA, warranty risk, anomaly detection",
        "Document intelligence for OCR, entity extraction, and PII handling",
        "Guardrails: content filtering, prompt-injection protection, data access control, tool allow-lists, action approval, audit logging",
      ],
    },
    {
      id: "services",
      name: "Business microservices",
      tagline: "Fourteen domain services, independently owned and scaled",
      points: [
        "Customer, sales & quote, order, product & catalog, pricing & promotion, inventory, procurement, warehouse, logistics & delivery, installation & service, warranty & RMA, notifications, reporting, documents",
        "Internal gateway patterns: service discovery, circuit breakers, rate limiting, idempotency, schema registry",
      ],
    },
    {
      id: "data",
      name: "Data layer",
      tagline: "Transactional truth plus analytics at scale",
      points: [
        "Aurora PostgreSQL (multi-AZ) with read replicas for transactions",
        "S3 document and data lake with Glacier retention; Redshift for enterprise analytics",
        "OpenSearch for search and vectors; ElastiCache Redis for caching and distributed locks",
      ],
    },
    {
      id: "integration",
      name: "Integration layer",
      tagline: "The platform meets the outside world",
      points: [
        "Payments, shipping carriers, EDI suppliers, accounting, and tax systems",
        "Identity verification, email/SMS/WhatsApp messaging, BI tooling",
      ],
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      tagline: "Containerized, reproducible, observable",
      points: [
        "ECS on Fargate in a multi-AZ VPC, with auto scaling",
        "Infrastructure as code with AWS CDK (TypeScript)",
        "CloudWatch and X-Ray/OpenTelemetry observability",
        "GitHub Actions + CodePipeline CI/CD with blue/green and canary deploys; cross-region disaster recovery",
      ],
    },
    {
      id: "events",
      name: "Event-driven backbone",
      tagline: "Domain events keep every service in sync without coupling",
      points: [
        "Business events (order created, inventory reserved, …) published to EventBridge",
        "SNS fan-out and SQS queues decouple consumers; Lambda for async processing",
        "Step Functions orchestrate long-running, multi-service workflows",
      ],
    },
  ] satisfies readonly ArchitectureLayer[],
  decisions: [
    {
      id: "domain-agents",
      title: "Domain-scoped agents instead of one general copilot",
      choice:
        "The platform runs a fleet of narrow agents — quote assistant, procurement, warehouse, delivery exception, warranty, finance insight — each with 8–15 highly relevant tools, rather than a single agent with access to everything.",
      rationale: [
        "Least privilege: a general agent would need access to almost every business service — an unacceptable security posture. Each domain agent gets only the permissions its job requires.",
        "Tool-selection accuracy: with a 100-tool catalog, models start confusing near-neighbors — inventory transfer vs. inventory adjustment, customer refund vs. supplier payment, quote cancellation vs. order cancellation, delivery return vs. warranty replacement. At 8–15 tools per agent, selection stays reliable.",
        "Context economics: one agent spanning sales, finance, warehouse, delivery, warranty, and procurement simultaneously means more tokens, higher latency and cost, noisier retrieval, and more chances to ground on the wrong information. Narrow agents keep context small and relevant.",
      ],
    },
    {
      id: "human-in-the-loop",
      title: "Agents propose; humans approve consequential actions",
      choice:
        "Guardrails enforce an action-approval boundary: agents can read, draft, and recommend freely, but state-changing operations with business impact route through a human approval step, with tool allow-lists and audit logging underneath.",
      rationale: [
        "Financial and inventory operations are unforgiving — a wrong automated refund or stock adjustment costs real money and trust.",
        "Approval workflows build operator confidence during adoption; autonomy can be widened per action type as accuracy is proven.",
        "The audit trail makes every agent action explainable after the fact — a requirement for finance-adjacent automation.",
      ],
    },
    {
      id: "rag-grounding",
      title: "RAG grounding over fine-tuning",
      choice:
        "Agents ground on live enterprise data — catalog, pricing and promotions, policies, customer and order data — through Bedrock knowledge bases and vector search, rather than fine-tuning models on business data.",
      rationale: [
        "Prices, stock, and policies change daily; retrieval reflects them instantly, while a fine-tuned model is stale the day it ships.",
        "Retrieval scopes per domain keep answers grounded in the right slice of the business and citable back to source.",
        "No business data baked into model weights simplifies the security and compliance story.",
      ],
    },
    {
      id: "event-backbone",
      title: "An event-driven backbone between domain services",
      choice:
        "Services communicate through domain events on EventBridge with SQS/SNS delivery, rather than synchronous call chains.",
      rationale: [
        "An order touching inventory, procurement, delivery, and notifications as a synchronous chain fails as a unit; as events, each consumer retries independently.",
        "New capabilities — including AI features that react to business events — subscribe without changing producers.",
        "Domains scale on their own traffic patterns instead of the busiest service setting the pace for all.",
      ],
    },
  ] satisfies readonly Decision[],
  aiLayer: {
    intro:
      "The AI layer is where the platform earns its name. Four things make it production-grade rather than a demo: disciplined intent handling, domain-scoped retrieval, layered guardrails, and — most importantly — a coordination model that treats agents like services, not chat participants.",
    subsections: [
      {
        id: "nlp",
        title: "From language to intent",
        body: "Every request — a typed question, a voice query, or a business event — enters through the AI gateway, which authenticates the caller before any model runs. The supervisor orchestrator then classifies the request: the user's intent, the business domains involved, the caller's role and permissions, whether the request is informational or action-oriented, and whether human approval will be required. Free-form language becomes a controlled execution plan before a single agent is engaged.",
      },
      {
        id: "rag",
        title: "Grounded retrieval, scoped per domain",
        body: "Each agent retrieves from its own domain knowledge base — catalog, pricing and promotions, policies, supplier and operational data — through embeddings, vector search, and reranking. Retrieval scope follows both the agent's domain and the caller's permissions, so an agent can't surface information its user couldn't otherwise see. Answers carry supporting evidence and confidence scores rather than bare assertions.",
      },
      {
        id: "guardrails",
        title: "Guardrails as layered defense",
        body: "Safety isn't one filter — it's three boundaries a request must cross:",
        points: [
          "Input: content filtering, prompt-injection protection, and topic restrictions before a request reaches any agent",
          "Data: PII protection and data access control — an agent's effective permissions are the intersection of user, agent, tool, and business policy, which structurally prevents privilege escalation",
          "Action: tool allow-lists, business-rules validation, human approval for sensitive operations (price overrides, refunds, inventory write-offs, delivery cancellations, supplier changes), and audit logging of every step",
        ],
      },
    ] satisfies readonly AiSubsection[],
    coordination: {
      title: "How the agents coordinate",
      summary:
        "The platform uses a supervisor-orchestrated, domain-agent architecture. Agents never communicate freely with each other: they coordinate through a central orchestrator using structured requests, approved tools, and controlled outputs.",
      mechanics: [
        {
          id: "execution-plan",
          title: "A controlled execution plan, not a group chat",
          body: 'For a question like "which delayed factory orders will affect deliveries next week?", the orchestrator identifies the domains involved — procurement, inventory, delivery — and delegates a narrowly scoped task to each agent: the minimum context required, its authorized tools, its domain knowledge base, and the output schema it must return. An agent never receives data its task doesn\'t need.',
        },
        {
          id: "structured-contracts",
          title: "Structured contracts between agents",
          body: "Agents return typed, structured results to the orchestrator — never unrestricted prose to one another. Structured contracts are easier to validate, test, and audit, and they make coordination independent of conversational wording.",
        },
        {
          id: "services-not-databases",
          title: "Agents call services, never databases",
          body: "Agents work through approved APIs exposed by the deterministic business services — purchase orders, availability, reservations, delivery schedules. Agents may interpret information, but the microservices remain the systems of record, preserving every domain boundary the platform already enforces.",
        },
        {
          id: "parallel-sequential",
          title: "Parallel when independent, sequential when dependent",
          body: "The orchestrator decides execution shape from task dependencies: independent lookups fan out in parallel to cut latency; dependent chains — find delayed items, then check substitutes, then assess delivery impact — run in order.",
        },
        {
          id: "conflict-resolution",
          title: "Conflicts resolved by rules, not negotiation",
          body: "When agents produce competing recommendations — say three domains each want the same high-demand unit — they don't negotiate. The orchestrator routes proposals to a deterministic business rules engine: reservation priority, customer-order commitments, eligibility, override rules. Only genuine judgment calls escalate to a manager.",
        },
        {
          id: "failure-isolation",
          title: "Failure isolation",
          body: "One agent timing out doesn't fail the workflow. The orchestrator can retry, switch to a fallback model, call the underlying API directly, return a partial answer, or open a manual-review task — and every agent runs with timeout limits, maximum steps, cost ceilings, and circuit breakers.",
        },
        {
          id: "state-and-audit",
          title: "Central state, distinct identities, full audit",
          body: "The orchestrator owns workflow state — agents share no hidden conversational memory and receive explicit context per task. Each agent has its own identity and permission set, and every workflow is auditable end to end: who asked, which prompt and model version ran, what was retrieved, which APIs were called, what was recommended with what confidence, who approved, and what finally executed.",
        },
      ] satisfies readonly CoordinationMechanic[],
      structuredOutputExample: `{
  "delayedPurchaseOrders": [{
    "purchaseOrderId": "PO-1045",
    "supplierId": "SUP-18",
    "delayDays": 12,
    "affectedOrderLineIds": ["OL-8001", "OL-8002"],
    "confidence": 0.96
  }]
}`,
      workedExample: {
        question:
          "A container is delayed by two weeks. Which customers are affected, and what should we do?",
        steps: [
          "The AI gateway authenticates the manager; the orchestrator classifies the request as procurement + inventory + orders + delivery + customer communication",
          "Procurement agent retrieves the container, its purchase-order lines, the updated ETA, and supplier delay details",
          "Inventory agent maps the lines to SKUs, checks stock across locations, identifies substitutes, and checks existing reservations",
          "Order agent maps affected items to customer sales orders and flags priority and partial-fulfilment status",
          "Delivery agent identifies scheduled deliveries, calculates schedule impact, and drafts rescheduling options",
          "Customer service agent drafts customer-specific communications — without sending them",
          "The orchestrator consolidates: affected customers, substitutions, delivery changes, recommended actions",
          "The business rules engine validates reservation priority, partial-delivery rules, and approval requirements",
          "The manager reviews the impact summary, evidence, recommendations, and draft communications — then approves",
          "Only then do the order, delivery, and notification services execute the approved changes, with the audit service recording the complete workflow",
        ],
      },
    },
  },
  stack: [
    {
      group: "Frontend & mobile",
      items: ["React + TypeScript", "React Native"],
    },
    {
      group: "Backend & compute",
      items: [
        ".NET 8 / ASP.NET Core",
        "Python / FastAPI (AI services)",
        "ECS on Fargate",
        "AWS Lambda",
        "Step Functions",
      ],
    },
    {
      group: "AI & ML",
      items: [
        "Amazon Bedrock",
        "Bedrock Knowledge Bases (RAG)",
        "Embedding & reranking models",
        "Amazon SageMaker",
        "Amazon OpenSearch (vectors)",
      ],
    },
    {
      group: "Data & analytics",
      items: [
        "Aurora PostgreSQL",
        "ElastiCache Redis",
        "Amazon S3 + Glue + Athena",
        "Amazon Redshift",
        "Amazon QuickSight",
      ],
    },
    {
      group: "Eventing & integration",
      items: [
        "Amazon EventBridge",
        "Amazon SQS / SNS",
        "Amazon API Gateway",
        "Amazon SES",
      ],
    },
    {
      group: "Security & identity",
      items: [
        "AWS WAF + Shield",
        "Amazon Cognito",
        "IAM Identity Center",
        "AWS KMS + Secrets Manager",
        "GuardDuty / Security Hub / Inspector",
      ],
    },
    {
      group: "Delivery & operations",
      items: [
        "AWS CDK (TypeScript)",
        "GitHub Actions + CodePipeline",
        "Blue/green & canary deploys",
        "CloudWatch + X-Ray / OpenTelemetry",
        "Multi-AZ + cross-region DR",
      ],
    },
  ] satisfies readonly StackGroup[],
} as const;
