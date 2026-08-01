import { describe, expect, it } from "vitest";
import { createIndex, search, tokenize, type Passage } from "./retrieval";

const passages: Passage[] = [
  {
    id: "agents",
    title: "AI agents work",
    text: "Built AI agents and agentic workflows with RAG and semantic search on Azure.",
    href: "/#a",
  },
  {
    id: "dotnet",
    title: "Microservices",
    text: "Designed event-driven microservices on .NET Core and Azure Functions.",
    href: "/#b",
  },
  {
    id: "school",
    title: "Falah Academy",
    text: "Website for a full-time school with programs, admissions, and events.",
    href: "/#c",
  },
];

describe("tokenize", () => {
  it("lowercases, drops stopwords, and singularizes plurals", () => {
    expect(tokenize("Has Muneeb built AI agents?")).toEqual([
      "build",
      "ai",
      "agent",
    ]);
  });

  it("normalizes aliases to the same tokens as their targets", () => {
    expect(tokenize("k8s")).toEqual(tokenize("Kubernetes"));
    expect(tokenize("GenAI")).toEqual(tokenize("generative"));
    expect(tokenize("chatbot")).toEqual(tokenize("copilot"));
  });
});

describe("search", () => {
  const index = createIndex(passages);

  it("ranks the passage about the queried topic first", () => {
    const results = search(index, "Has he built agentic AI systems?");
    expect(results[0].passage.id).toBe("agents");
  });

  it("matches plural/singular variants across query and corpus", () => {
    const results = search(index, "microservice experience");
    expect(results[0].passage.id).toBe("dotnet");
  });

  it("returns no results for out-of-domain queries", () => {
    expect(search(index, "underwater basket weaving")).toEqual([]);
  });

  it("returns nothing for stopword-only queries", () => {
    expect(search(index, "what did he do")).toEqual([]);
  });

  it("caps results at the requested limit", () => {
    expect(search(index, "azure school website", 1)).toHaveLength(1);
  });
});
