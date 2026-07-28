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
};

export type Project = {
  /** Stable id used for DOM ids and keys. */
  slug: string;
  name: string;
  status: "Live demo" | "MVP" | "In progress";
  description: string;
  stack: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  /** Path under /public to a screenshot, plus its alt text. */
  image: { src: string; alt: string } | null;
};

export const projects: Project[] = [
  {
    slug: "career-vault",
    name: "Career Vault",
    status: "Live demo",
    description:
      "AI-powered career dashboard — track applications, tailor resumes with LLMs, and surface insights about your job search in one place.",
    stack: ["React", "FastAPI", "LLM agents", "PostgreSQL"],
    demoUrl: null,
    repoUrl: null,
    image: null,
  },
  {
    slug: "falah-academy",
    name: "Falah Academy",
    status: "MVP",
    description:
      "Website for Kent's first full-time Islamic school — programs, admissions, and events, designed and shipped end to end on a custom domain.",
    stack: ["Web design", "Static site", "GitHub Pages"],
    demoUrl: "https://www.falahacademywa.org",
    repoUrl: null,
    image: {
      src: "/images/falah-academy.png",
      alt: "Screenshot of the Falah Academy website homepage",
    },
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "Global e-commerce & retail company",
    title: "Principal AI Engineer",
    period: "Feb 2025 – Present",
    summary:
      "Enterprise AI platform for inventory, supply chain, and customer operations — LLMs, RAG, AI agents, and semantic search over unified enterprise data.",
    highlights: [
      "Reduced manual reconciliation by 90% with LLM- and agent-powered workflows",
      "Designed and delivered the platform end to end: Python, FastAPI, React, PostgreSQL, microservices",
      "Led customer-facing discovery, architecture, and solution demos through to production adoption",
    ],
  },
  {
    company: "Microsoft",
    title: "Senior Software Engineer",
    period: "Oct 2014 – Jan 2025",
    summary:
      "A decade building cloud-native automation and AI platforms for Microsoft's global network infrastructure — from workflow orchestration to enterprise AI copilots.",
    highlights: [
      "Built an AI copilot (LLMs + RAG + telemetry) that increased engineering productivity by 35%",
      "Cut engineering research time by 60% with an enterprise AI knowledge platform",
      "Reduced manual network device scheduling by 60%; 99.9% platform availability",
      "Shipped event-driven microservices on .NET Core and Azure Functions at global scale",
    ],
  },
];

export type SkillGroup = {
  group: string;
  items: string[];
};

export const skills: SkillGroup[] = [
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
