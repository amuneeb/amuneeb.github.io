/**
 * All site content in one place. Components render this data and never
 * hard-code copy, so editing the site means editing this file only.
 */

export type ProjectLink = {
  label: string;
  href: string;
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
    badge: "In progress",
    description:
      "AI-powered career dashboard — track applications, tailor resumes with LLMs, and surface insights about your job search in one place.",
    stack: ["React", "FastAPI", "LLM agents", "PostgreSQL"],
    links: [],
    image: null,
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

export const enterpriseProjects: readonly Project[] = [
  {
    slug: "ai-operations-platform",
    name: "AI inventory & operations platform",
    badge: "Production",
    description:
      "Enterprise AI platform unifying inventory, supply chain, procurement, and customer operations with LLMs, RAG, AI agents, and semantic search.",
    impact: "Reduced manual reconciliation by 90%",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Microservices"],
    links: [],
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
