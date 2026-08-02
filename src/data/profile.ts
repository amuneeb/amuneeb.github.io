/**
 * All site content in one place. Components render this data and never
 * hard-code copy, so editing the site means editing this file only.
 */

export type ProjectLink = {
  label: string;
  href: string;
  /** Same-site link: renders without new-tab behavior. */
  internal?: boolean;
};

export type ProjectImage = {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Apply casual-copy deterrents (no context menu, drag, or select). */
  protect?: boolean;
};

export type Project = {
  /** Stable id used for DOM ids and React keys. */
  slug: string;
  name: string;
  /** Short status label rendered as the card badge. */
  badge: "Live" | "In progress" | "Production";
  description: string;
  /** Headline outcome, rendered prominently on the card. */
  impact?: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
  image: ProjectImage | null;
};

export type CaseStudyLink = {
  label: string;
  href: string;
  /** Rendered as the primary (filled) button. */
  primary?: boolean;
};

/** A featured project with its own detail page. */
export type CaseStudy = {
  slug: string;
  name: string;
  badge: Project["badge"];
  /** Eyebrow label above the page title. */
  kicker: string;
  /** One-paragraph pitch rendered under the title. */
  pitch: string;
  /** Meta description for the page (~160 chars). */
  metaDescription: string;
  /** Caveat rendered beside the links. */
  demoNote: string;
  highlights: readonly string[];
  links: readonly CaseStudyLink[];
  stack: readonly string[];
  image: ProjectImage | null;
  /** Architecture diagram rendered in its own section. */
  architecture: ProjectImage | null;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights: readonly string[];
};

export type SkillGroup = {
  group: string;
  items: readonly string[];
};

export const profile = {
  name: "Muneeb Abbasi",
  title: "Principal AI Engineer",
  tagline: "LLMs, RAG & agentic systems · 15+ years · ex-Microsoft",
  location: "Kent, WA",
  email: "abbasiamuneeb@outlook.com",
  github: "https://github.com/amuneeb",
  linkedin: "https://www.linkedin.com/in/abdul-muneeb-abbasi/",
  resumeUrl: "/Muneeb-Abbasi-Resume.pdf",
  intro:
    "I build enterprise AI platforms that turn messy business workflows into intelligent, automated systems — from RAG knowledge platforms and AI copilots to cloud-native automation on Azure. I've spent 15+ years shipping software at enterprise scale, including a decade at Microsoft, and I care most about pairing hands-on engineering with real, measurable business outcomes.",
} as const;

export const featuredProjects: readonly Project[] = [
  {
    slug: "career-vault",
    name: "Career Vault",
    badge: "Live",
    description:
      "Autonomous job-search operations platform I built and operate — a GitHub Actions pipeline sweeps 7 free sources, scores every role against my profile, tracks application status from inbound email, and hands high-fit roles to a Claude agent that builds tailored application packages. Runs on $0 infrastructure. Public demo with synthetic data.",
    stack: ["Python", "React", "GitHub Actions", "Claude API / agents", "MCP"],
    links: [
      {
        label: "Try the live demo",
        href: "https://career-vault-demo.pages.dev/",
      },
      {
        label: "How it's built",
        href: "/career-vault",
        internal: true,
      },
    ],
    image: {
      src: "/images/career-vault.png",
      alt: "Screenshot of the Career Vault dashboard showing a two-week calendar and job-search stat tiles",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "falah-academy",
    name: "Falah Academy",
    badge: "Live",
    description:
      "Website for Kent's first full-time Islamic school — programs, admissions, and events, designed and shipped end to end on a custom domain. Launched as an MVP, with additional functionality in active development.",
    stack: ["Web design", "Static site", "GitHub Pages"],
    links: [{ label: "Visit website", href: "https://www.falahacademywa.org" }],
    image: {
      src: "/images/falah-academy.png",
      alt: "Screenshot of the Falah Academy website homepage",
      width: 800,
      height: 500,
    },
  },
];

export const careerVaultCaseStudy: CaseStudy = {
  slug: "career-vault",
  name: "Career Vault",
  badge: "Live",
  kicker: "Featured project",
  pitch:
    "Career Vault is an autonomous job-search operations platform I built and operate. A GitHub Actions pipeline sweeps seven free sources — email alert parsing, Dice, a company-scout engine probing public ATS APIs, a Workday watchlist, Hacker News Who-is-hiring, Remotive, and RemoteOK — scores every role against my profile, deduplicates, and tracks application status automatically from inbound email. High-fit roles are handed to a Claude agent that builds a tailored application package. The whole system runs on $0 infrastructure: the GitHub Actions free tier, Cloudflare Pages, and a git repo as the database.",
  metaDescription:
    "Career Vault: an autonomous job-search operations platform — 7 data sources, fit scoring, automated status tracking, and Claude-built application packages on $0 infrastructure.",
  demoNote:
    "Public demo with synthetic data — no real applications or personal information.",
  highlights: [
    "7 data sources",
    "Fit-scoring engine",
    "Automated status tracking",
    "Post-refresh integrity audit",
    "58 tests from real incidents",
    "$0 infrastructure",
  ],
  links: [
    {
      label: "Live demo",
      href: "https://career-vault-demo.pages.dev/",
      primary: true,
    },
    {
      label: "How it works (docs)",
      href: "https://github.com/amuneeb/career-vault-demo#readme",
    },
    {
      label: "Architecture & ADRs",
      href: "https://github.com/amuneeb/career-vault-demo/tree/main/docs",
    },
  ],
  stack: [
    "Python",
    "React",
    "GitHub Actions",
    "Cloudflare Pages",
    "Claude API / agents",
    "MCP",
  ],
  image: {
    src: "/images/career-vault.png",
    alt: "Screenshot of the Career Vault dashboard showing a two-week calendar and job-search stat tiles",
    width: 800,
    height: 500,
  },
  architecture: {
    src: "/images/career-vault-architecture.svg",
    alt: "Career Vault architecture diagram: sources (email accounts, company scout, job boards, GitHub activity) feed a seven-step GitHub Actions pipeline — fetch and parse, email triage, application and status tracking, fit scoring, hygiene, enrichment, and an integrity audit — writing to a git repository as the database, served by a React dashboard and API functions on Cloudflare Pages behind Zero Trust, with a human reviewing and applying and a Claude agent loop building tailored application packages",
    width: 940,
    height: 1660,
  },
};

export const enterpriseProjects: readonly Project[] = [
  {
    slug: "ai-operations-platform",
    name: "AI inventory & operations platform",
    badge: "Production",
    description:
      "Enterprise AI platform unifying inventory, supply chain, procurement, and customer operations with LLMs, RAG, AI agents, and semantic search.",
    impact: "Reduced manual reconciliation by 90%",
    stack: ["AWS", "Bedrock", "Python", ".NET 8", "React", "Microservices"],
    links: [
      {
        label: "Read the case study",
        href: "/ai-operations-platform",
        internal: true,
      },
    ],
    image: {
      src: "/images/ai-operations-architecture.png",
      alt: "Architecture diagram of the AI inventory and operations platform: user channels, edge and security, AI platform, business microservices, data, integration, and cloud infrastructure layers, connected by an event-driven backbone",
      width: 1100,
      height: 733,
      protect: true,
    },
  },
  {
    slug: "network-infrastructure-copilot",
    name: "Network Infrastructure Copilot",
    badge: "Production",
    description:
      "AI copilot at Microsoft giving engineers natural language access to telemetry, KPIs, and incidents — accelerating investigation and decision-making.",
    impact: "Increased engineering productivity by 35%",
    stack: ["LLMs", "RAG", "Semantic search", "Telemetry"],
    links: [],
    image: null,
  },
  {
    slug: "ai-knowledge-platform",
    name: "Enterprise AI knowledge platform",
    badge: "Production",
    description:
      "RAG and vector-search platform at Microsoft unifying knowledge across engineering systems, documentation, and operational repositories.",
    impact: "Cut engineering research time by 60%",
    stack: ["RAG", "Vector search", "Azure OpenAI"],
    links: [],
    image: null,
  },
  {
    slug: "network-device-automation",
    name: "Network device automation system",
    badge: "Production",
    description:
      "Cloud-native platform at Microsoft orchestrating scheduling, deployment, validation, and monitoring for global network infrastructure upgrades.",
    impact: "60% less manual scheduling · 99.9% availability",
    stack: [".NET Core", "Azure Functions", "Event-driven"],
    links: [],
    image: null,
  },
  {
    slug: "process-optimization-platform",
    name: "Business process optimization platform",
    badge: "Production",
    description:
      "Workflow orchestration platform at Microsoft combining telemetry, operational intelligence, and AI-driven recommendations to remove process bottlenecks.",
    impact: "Improved process efficiency by 40%",
    stack: ["Workflow orchestration", "Telemetry", "Operational analytics"],
    links: [],
    image: null,
  },
];

export const experience: readonly Role[] = [
  {
    company: "Global e-commerce & retail company",
    title: "Principal AI Engineer",
    period: "Feb 2025 – Present",
    summary:
      "Own end-to-end delivery of an enterprise AI platform for inventory, supply chain, and customer operations.",
    highlights: [
      "Partner directly with customers and stakeholders to translate business challenges into scalable AI solutions",
      "Lead technical discovery, solution architecture, workshops, and demonstrations through to production adoption",
    ],
  },
  {
    company: "Microsoft",
    title: "Senior Software Engineer",
    period: "Oct 2014 – Jan 2025",
    summary:
      "A decade building cloud-native automation and AI platforms for Microsoft's global network infrastructure — from workflow orchestration to enterprise AI copilots.",
    highlights: [
      "Led technical discovery and solution architecture with engineering customers, program managers, and infrastructure stakeholders",
      "Designed event-driven microservices on .NET Core and Azure Functions operating at global scale",
      "Presented architectures and technical demonstrations to stakeholders, owning solutions from requirements to production",
    ],
  },
];

export const skills: readonly SkillGroup[] = [
  {
    group: "AI & LLMs",
    items: [
      "LLMs",
      "RAG",
      "AI agents",
      "Agentic workflows",
      "Semantic & vector search",
      "Prompt engineering",
      "OpenAI / Azure OpenAI",
      "LangGraph",
    ],
  },
  {
    group: "Cloud & infrastructure",
    items: [
      "Microsoft Azure",
      "Azure Functions",
      "Event-driven architecture",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Azure DevOps",
    ],
  },
  {
    group: "Engineering",
    items: [
      "Python",
      "C# / .NET Core",
      "TypeScript",
      "React",
      "FastAPI",
      "Microservices",
      "REST APIs",
    ],
  },
  {
    group: "Data",
    items: [
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Vector databases",
      "Data pipelines",
      "Telemetry analytics",
    ],
  },
];
