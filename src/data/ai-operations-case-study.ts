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
