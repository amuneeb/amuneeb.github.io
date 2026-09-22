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
  team: "3 in-house engineers + 15 offshore developers",
  period: "Feb 2025 – present",
  company: "Global e-commerce & retail company",
  metaDescription:
    "Case study: an AI-first ERP platform for e-commerce and retail operations — domain-scoped AI agents, RAG grounding, and an event-driven microservices backbone on AWS.",
  problem:
    "Before the platform, the business ran on disconnected systems with no single source of truth. Quoting configurable furniture depended on what individual salespeople carried in their heads; no system could back up a suggested configuration or a discount. Inventory was counted but not trusted — ten physical sofas were not ten sellable sofas once reservations, damage, allocation and transfers were accounted for — so stock decisions ran on guesswork. Orders, purchase orders, container receipts, inventory and payments lived in an ERP, spreadsheets, supplier emails and portals, and employees were the integration layer, reconciling them by hand across US and Canadian operations. Financial reporting was assembled manually or not at all. The question that shaped the design was not “how do we reconcile faster?” but “why should humans review normal records at all?”",
  approach:
    "The answer was an AI-first ERP built as an integrated whole on AWS: event-driven microservices across 18+ business domains as the system of record, with an AI layer — seven domain-scoped agents behind one orchestrator, retrieval grounded in enterprise knowledge, predictive models for demand, supply and delivery, and guardrails with human approval on consequential actions — as the system of intelligence. The rule that holds the two together: AI recommends; deterministic business services execute. The architecture is sized for domain complexity and governance, not throughput: eighteen business domains with country-specific rules across the US and Canada, a knowledge corpus of thousands of documents, an order-to-inventory reconciliation surface that was consuming the team, and a mandate to make the AI platform reusable across the group. We shipped the transactional core in seven months, reconciliation and knowledge retrieval by the end of 2025, and the agent platform through 2026. I own the architecture end to end and lead the AI platform hands-on, with three in-house engineers and fifteen offshore developers.",
  outcomes: [
    {
      stat: "90%",
      label: "reduction in manual reconciliation",
    },
  ],
  qualitativeOutcomes: [
    "Deterministic matching plus high-confidence semantic matching auto-clears ~90% of order → PO → receipt → inventory → payment records; people review only the ~10% exceptions, each surfaced with evidence and a recommended resolution. Measured against a four-week baseline of roughly 50–60 person-hours a week across ops and finance; effort tracked the exception rate almost one-to-one.",
    "Quoting no longer depends on tribal knowledge — agents ground suggestions in the catalog, pricing rules, and policies",
    "One platform replaced disconnected systems: inventory, orders, procurement, delivery, and warranty share a single source of truth",
    "Financial and operational reporting is generated from live data instead of manual assembly",
    "Agent recommendations are tracked as approved-as-is / modified / rejected; the target is ≥80% approved as-is, and an action type that stays above 95% for 90 days becomes a candidate for auto-execution with post-hoc review",
    "Latency budgets: p95 ≤ 10 s for a single-domain agent workflow; ≤ 45 s, asynchronous, for multi-agent analysis",
    "Cost: cents per workflow, about forty cents for a full multi-agent container-delay analysis, with a $1 hard ceiling per workflow",
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
        "Seven domain-scoped agents: Quote Assistant, Procurement, Inventory & Warehouse, Delivery Exception, Warranty & Service, Finance Insight, Executive Insight — each with 8–15 tools, its own identity, and its own knowledge scope, coordinated by one orchestrator",
        "Amazon Bedrock (Claude, Titan, Llama) behind an AI Gateway and Model Router; Bedrock Knowledge Bases over OpenSearch (hybrid + rerank) for documents; Aurora pgvector for catalog semantics",
        "Predictive ML on SageMaker: demand forecasting, supplier-delay risk, delivery ETA/risk, quote conversion, anomaly detection",
        "Document intelligence with Textract and Comprehend: OCR, extraction, classification, metadata",
        "Guardrails: content filtering, PII protection, prompt-injection protection, per-agent tool allow-lists, Business Policy Service validation, human approval, audit logging",
        "Evaluated in four layers — retrieval, generation, agent/tool, business outcome — with a ~1,200 case golden dataset, regression gates, shadow testing and canary release",
      ],
    },
    {
      id: "services",
      name: "Business microservices",
      tagline: "18+ domain services, independently owned and scaled",
      points: [
        "Customer, sales & quote, order, product & catalog, pricing & promotion, inventory, procurement, warehouse, logistics & delivery, installation & service, warranty & RMA, notifications, reporting, documents, Business Policy Service, Reconciliation Service, and more",
        "Internal gateway patterns: service discovery, circuit breakers, rate limiting, idempotency, transactional outbox, schema registry",
      ],
    },
    {
      id: "data",
      name: "Data layer",
      tagline: "Transactional truth plus analytics at scale",
      points: [
        "Aurora PostgreSQL (multi-AZ, read replicas) for transactions, with pgvector for catalog embeddings; DynamoDB for high-performance access",
        "S3 document and data lake with Glacier retention; Glue + Athena; Redshift and QuickSight for enterprise analytics",
        "OpenSearch for knowledge vectors (hybrid search), operational search and logs; ElastiCache Redis for caching and distributed locks",
      ],
    },
    {
      id: "integration",
      name: "Integration layer",
      tagline: "The platform meets the outside world",
      points: [
        "Payments (Square, Stripe, banks), shipping carriers, EDI suppliers, accounting (Odoo general ledger), and tax systems",
        "Identity verification, email/SMS/WhatsApp messaging, BI tooling",
      ],
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      tagline: "Containerized, reproducible, observable",
      points: [
        "Containers on EKS/ECS in a multi-AZ VPC, with auto scaling",
        "Infrastructure as code with AWS CDK (TypeScript)",
        "CloudWatch, X-Ray/OpenTelemetry, and CloudTrail observability",
        "GitHub Actions + CodePipeline CI/CD with blue/green and canary deploys; multi-AZ with cross-region pilot-light DR (RPO < 1 min, RTO ≤ 4 h)",
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
        "Transactional outbox on every producer; idempotent consumers; events carry timestamps, versions and correlation IDs",
      ],
    },
  ] satisfies readonly ArchitectureLayer[],
  decisions: [
    {
      id: "domain-agents",
      title: "Domain-scoped agents instead of one general copilot",
      choice:
        "The platform runs seven narrow agents — Quote Assistant, Procurement, Inventory & Warehouse, Delivery Exception, Warranty & Service, Finance Insight, Executive Insight — each with 8–15 highly relevant tools, rather than a single agent with access to everything.",
      rationale: [
        "Least privilege: a general agent would need access to almost every business service — an unacceptable security posture. Each domain agent gets only the permissions its job requires.",
        "Tool-selection accuracy: with a 100-tool catalog, models confuse near-neighbours — inventory transfer vs. adjustment, customer refund vs. supplier payment, quote vs. order cancellation, delivery return vs. warranty replacement. At 8–15 tools per agent, selection stays reliable.",
        "Context economics: one agent spanning every domain at once means more tokens, higher latency and cost, noisier retrieval, and more chances to ground on the wrong information. Narrow agents keep context small and relevant.",
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
    {
      id: "api-first",
      title: "API-first, never text-to-SQL against the ERP",
      choice:
        "Agents reach business data only through typed, approved domain-service APIs. The path is natural language → typed intent → approved API → domain service → database; controlled text-to-SQL is reserved for curated, read-only analytics.",
      rationale: [
        "Ten physical sofas are not ten sellable sofas — domain services encode reservations, damage, allocation, and authorization that a raw table read doesn't see.",
        "Syntactically correct SQL can be semantically wrong; a typed API contract can't silently bypass a business rule.",
        "Ad-hoc analytics still needs flexible queries, so text-to-SQL is allowed there — but only against curated, read-only views.",
      ],
    },
    {
      id: "two-vector-stores",
      title: "Two vector stores, split by what they hold",
      choice:
        "Knowledge documents live in OpenSearch; catalog embeddings live in Aurora pgvector, next to the catalog.",
      rationale: [
        "OpenSearch gives hybrid (BM25 + vector) search, Bedrock Knowledge Bases integration, and metadata filtering for the document corpus.",
        "pgvector keeps catalog semantics and hard constraints — price, in-stock, ships-to — resolvable in one query against one transaction boundary.",
        "The corpus (~250k chunks) would fit pgvector alone — the split is about query shape, not scale.",
      ],
    },
    {
      id: "pilot-light-dr",
      title: "Pilot-light DR, not warm standby",
      choice:
        "Disaster recovery runs pilot-light: RPO < 1 min via Aurora Global Database, RTO ≤ 4 h via a CDK rebuild of compute in the recovery region.",
      rationale: [
        "Aurora Global Database and S3 cross-region replication keep data within a minute of current; compute is rebuilt from CDK on failover.",
        "Warm standby was rejected on cost — paying to keep a second region hot is hard to justify for a 50-user business.",
      ],
    },
  ] satisfies readonly Decision[],
  decisionsNote:
    "With hindsight: I'd build the evaluation harness before the first agent, not after the first production incident — and I'd start with fewer, coarser services and split them as domains proved they needed independence.",
  aiLayer: {
    intro:
      "The AI layer is where the platform earns its name. Four things make it production-grade rather than a demo: disciplined intent handling, domain-scoped retrieval, layered guardrails, and — most importantly — a coordination model that treats agents like services, not chat participants. Every request travels one chain: AI Gateway → Orchestrator → Model Router → Bedrock → agents → Tool Registry → business APIs → Business Policy Service → approval → execution → audit.",
    subsections: [
      {
        id: "nlp",
        title: "From language to intent",
        body: "Every request — a typed question, a voice query, or a business event — enters through the AI gateway, which authenticates the caller before any model runs. Known business events bypass the LLM entirely and route deterministically to versioned workflows; only ambiguous requests use LLM-assisted intent and domain classification, followed by policy, capability and authorization checks. When the orchestrator does classify, it resolves the user's intent, the business domains involved, the caller's role and permissions, whether the request is informational or action-oriented, and whether human approval will be required. Hard constraints stay deterministic while semantic search handles the soft concepts: “couch under $3,000, pet-friendly, bluish” becomes a Sofa with max price 3000, the blue colour family, and approved performance-fabric attributes, resolved in one pgvector + SQL query against the catalog. Free-form language becomes a controlled execution plan before a single agent is engaged.",
      },
      {
        id: "rag",
        title: "Grounded retrieval, scoped per domain",
        body: "Retrieval scope follows both the agent's domain and the caller's permissions, so an agent can't surface information its user couldn't otherwise see. It is split across two stores. Knowledge documents — policies, manuals, warehouse procedures, supplier documents, service bulletins, resolved cases — go to Bedrock Knowledge Bases over OpenSearch, with hybrid BM25 + vector search, deduplication and reranking. Product and entity embeddings live in Aurora pgvector, colocated with the catalog so semantic similarity (“pet-friendly, bluish”) and hard constraints (price ≤ 3000, in stock, ships to CA) resolve in one query with one transaction boundary. Knowledge lives in OpenSearch; catalog semantics live next to the catalog. Metadata filters — document type, domain, country, audience, effective dates, version, approval status — are applied before search, not after, so an agent never reasons over a document it shouldn't have seen; live inventory, price and delivery state always come from the business APIs, never a vector store. An early production lesson made the point: a warranty-policy answer looked like a hallucination, but the traces showed the model reasoning correctly over an outdated document. The fix was retrieval, not the model — metadata-first filtering, hybrid search, reranking, and separate retrieval and generation evaluations.",
      },
      {
        id: "guardrails",
        title: "Guardrails as layered defense",
        body: "Safety isn't one filter — it's three boundaries a request must cross. Model guardrails protect the interaction; deterministic business services protect the business:",
        points: [
          "Input: content filtering, prompt-injection protection, and topic restrictions before a request reaches any agent",
          "Data: PII protection and data access control — an agent's effective permissions are the intersection of user, agent, tool, and business policy, which structurally prevents privilege escalation",
          "Action: per-agent tool allow-lists, then the Business Policy Service as the action boundary — human approval for consequential operations (price overrides, refunds, inventory write-offs, delivery cancellations, supplier changes), and audit logging of every step",
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
          body: "When agents produce competing recommendations — say three domains each want the same high-demand unit — they don't negotiate. The orchestrator routes each proposal to the Business Policy Service: a deterministic, versioned .NET service whose one contract is validate(proposal) → allow | requires_approval(level, reasons) | deny(reasons). Its rule sets — reservation priority, discount authority by role, partial-delivery eligibility, approval thresholds by dollar impact, override rules — are data-driven tables plus code, changed by PR with tests and owned by the domain team. Commercial rule engines were rejected as over-engineering for a few dozen rules. Only genuine judgment calls escalate to a manager.",
        },
        {
          id: "failure-isolation",
          title: "Failure isolation",
          body: "One agent timing out doesn't fail the workflow: the orchestrator can retry, switch to a fallback model, call the underlying API directly, return a partial answer, or open a manual-review task. The bounds are explicit. Per LLM call: 4k max output tokens. Per agent: 60s timeout, 10 steps, 12 tool calls, 2 retries with backoff, fallback model on circuit-open. Per workflow: 3-minute synchronous / 15-minute asynchronous ceiling, $1 cost ceiling. Breach → partial answer plus manual-review task, never a silent failure.",
        },
        {
          id: "state-and-audit",
          title: "Central state, distinct identities, full audit",
          body: "The orchestrator owns workflow state — agents share no hidden conversational memory and receive explicit context per task. Each agent has its own identity and permission set, and every workflow is auditable end to end: who asked, which prompt and model version ran, what was retrieved, which APIs were called, what was recommended with what confidence, who approved, and what finally executed. Prompt, tool-schema, model and index versions are recorded with every workflow.",
        },
        {
          id: "evaluation",
          title: "Evaluated before it ships",
          body: "Nothing ships on vibes. Evaluation runs in four layers — retrieval quality, generation quality, agent and tool behaviour, and business outcome. A golden dataset of ~1,200 cases covers them: 400 retrieval (query → relevant chunk IDs), 350 generation (groundedness and citations), 300 agent/tool trajectories (~40 per agent), and 150 adversarial and security cases (injection, PII, out-of-scope tool attempts). The gates are hard: no metric drops more than 2 points against the production baseline, zero tool-call escapes, zero PII leaks, and citations required by the validator. Changes run the regression suite against the baseline, then shadow testing, then a canary rollout; knowledge changes are proven in a temporary index before cutover. There is no fine-tuning, by design — prompts, RAG, tools, few-shot examples, structured outputs and guardrails carry the load. A fine-tuned intent classifier was considered and rejected because a small Bedrock model with few-shot examples already cleared ≥95% on the golden set; the only trained models are the SageMaker predictive ones.",
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
          "The AI Gateway authenticates the manager; the Orchestrator classifies the request as procurement + inventory + orders + delivery + customer communication and builds an execution plan: two parallel lookups, then a dependent chain.",
          "Procurement Agent retrieves the container, its purchase-order lines, the updated ETA, and the supplier's delay history.",
          "Inventory & Warehouse Agent (in parallel) maps the lines to SKUs, checks stock across locations, identifies substitutes, and checks existing reservations.",
          "The Orchestrator calls the Order service API directly to map affected items to customer sales orders with priority and partial-fulfilment status — a lookup, not a reasoning task, so no agent is involved.",
          "Delivery Exception Agent identifies scheduled deliveries, calculates schedule impact, and drafts rescheduling options.",
          "Delivery Exception Agent drafts customer-specific communications — drafts only, never sent.",
          "The Orchestrator consolidates: affected customers, substitutions, delivery changes, recommended actions, each with confidence and evidence.",
          "The Business Policy Service validates reservation priority, partial-delivery rules, and approval thresholds, returning allow / requires-approval / deny with reasons.",
          "The manager reviews the impact summary, evidence, recommendations, and draft communications — then approves.",
          "Only then do the order, delivery, and notification services execute the approved changes, and the audit service records the complete workflow: prompt, model and index versions, retrieved documents, API calls, recommendations, approver, and what executed.",
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
        ".NET 8 / ASP.NET Core (business services)",
        "Python / FastAPI (AI services)",
        "Amazon EKS / ECS",
        "AWS Lambda",
        "Step Functions",
      ],
    },
    {
      group: "AI & ML",
      items: [
        "Amazon Bedrock (Claude, Titan, Llama)",
        "Bedrock Knowledge Bases (RAG)",
        "Titan embeddings + reranking",
        "OpenSearch vectors (knowledge) + Aurora pgvector (catalog)",
        "Amazon SageMaker",
        "Textract & Comprehend",
        "Bedrock Guardrails",
      ],
    },
    {
      group: "Data & analytics",
      items: [
        "Aurora PostgreSQL (multi-AZ, read replicas)",
        "DynamoDB",
        "ElastiCache Redis",
        "Amazon S3 + Glue + Athena",
        "Amazon Redshift",
        "Amazon QuickSight",
        "OpenSearch",
      ],
    },
    {
      group: "Eventing & integration",
      items: [
        "Amazon EventBridge",
        "Amazon SQS / SNS",
        "Amazon API Gateway (REST/GraphQL)",
        "Amazon SES",
      ],
    },
    {
      group: "Security & identity",
      items: [
        "AWS WAF + Shield",
        "Amazon Cognito (customers)",
        "IAM Identity Center (employees)",
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
        "CloudWatch + X-Ray/OpenTelemetry + CloudTrail",
        "Multi-AZ + cross-region DR (pilot light)",
      ],
    },
  ] satisfies readonly StackGroup[],
} as const;
