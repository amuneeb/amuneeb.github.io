/** Single source of truth for site-level configuration. */
export const site = {
  url: "https://amuneeb.github.io",
  title: "Muneeb Abbasi — Principal AI Engineer",
  description:
    "Principal AI Engineer building enterprise AI platforms — LLMs, RAG, AI agents, and cloud-native systems on Azure. 15+ years of experience, ex-Microsoft.",
  ogDescription:
    "Enterprise AI platforms: LLMs, RAG, AI agents, and cloud-native systems on Azure.",
  keywords: [
    "Muneeb Abbasi",
    "AI Engineer",
    "LLM",
    "RAG",
    "AI agents",
    "Azure",
    "Seattle",
  ],
  ogImage: {
    path: "/images/og.png",
    width: 1200,
    height: 630,
    alt: "Muneeb Abbasi — Principal AI Engineer. LLMs, RAG & agentic systems, 15+ years, ex-Microsoft.",
  },
} as const;
