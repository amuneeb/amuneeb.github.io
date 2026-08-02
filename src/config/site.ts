/** Single source of truth for site-level configuration. */
export const site = {
  url: "https://amuneeb.github.io",
  title: "Muneeb Abbasi — Principal AI Engineer",
  description:
    "Principal AI Engineer building enterprise AI platforms — LLMs, RAG, AI agents, and cloud-native systems on AWS and Azure. 15+ years of experience, ex-Microsoft.",
  ogDescription:
    "Enterprise AI platforms: LLMs, RAG, AI agents, and cloud-native systems on AWS and Azure.",
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
  analytics: {
    /** Umami Cloud website id; empty string disables analytics entirely. */
    umamiWebsiteId: "370f2b31-f4fe-4010-8ea8-9cbacf6d122d",
    umamiScriptUrl: "https://cloud.umami.is/script.js",
  },
} as const;
