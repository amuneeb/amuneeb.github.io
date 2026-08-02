import { describe, expect, it } from "vitest";
import { buildCorpus } from "../data/corpus";
import { createIndex } from "./retrieval";
import { assessFit, STRONG_MATCH_THRESHOLD } from "./fit";

const index = createIndex(buildCorpus());

const AI_PLATFORM_JD = `
  Principal AI Engineer. Design and build enterprise AI platforms using
  LLMs, RAG, AI agents, and semantic search. Architect cloud-native
  microservices with Python, FastAPI, React, and PostgreSQL on Azure.
  Deploy with Docker, Kubernetes, and GitHub Actions. Partner with
  stakeholders on solution architecture, technical discovery, and
  production delivery. Build vector search and prompt engineering
  pipelines, event-driven workflows, telemetry, and operational
  analytics for supply chain and inventory operations.
`;

const FRONTEND_JD = `
  Senior Frontend Developer. Build pixel-perfect interfaces with React,
  TypeScript, CSS, HTML, Tailwind, and Figma designs. Optimize webpack
  bundles, write Storybook stories, Jest snapshot tests, and Cypress
  suites. Craft animations, responsive layouts, design tokens, and
  component libraries with accessibility audits and browser testing.
`;

const NURSING_JD = `
  Registered Nurse. Provide bedside patient care in a clinical hospital
  setting, administer medication, monitor vitals, chart treatment plans,
  coordinate with physicians, support families, and maintain infection
  control standards across rotating shifts in the emergency department.
`;

describe("assessFit", () => {
  it("scores a matching AI platform posting above the interest bar", () => {
    const fit = assessFit(AI_PLATFORM_JD, index);
    expect(fit).not.toBeNull();
    expect(fit!.score).toBeGreaterThanOrEqual(STRONG_MATCH_THRESHOLD);
    expect(fit!.verdict).toBe("strong");
    expect(fit!.matchedTerms.length).toBeGreaterThan(5);
  });

  it("scores an adjacent-but-different posting in the middle", () => {
    const fit = assessFit(FRONTEND_JD, index);
    expect(fit).not.toBeNull();
    expect(fit!.score).toBeLessThan(STRONG_MATCH_THRESHOLD);
    expect(fit!.score).toBeGreaterThan(2);
  });

  it("scores an unrelated posting as weak", () => {
    const fit = assessFit(NURSING_JD, index);
    expect(fit).not.toBeNull();
    expect(fit!.score).toBeLessThan(4);
    expect(fit!.verdict).toBe("weak");
  });

  it("declines to score text that is too short", () => {
    expect(assessFit("senior engineer role", index)).toBeNull();
  });
});
