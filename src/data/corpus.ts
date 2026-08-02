import {
  profile,
  featuredProjects,
  enterpriseProjects,
  careerVaultCaseStudy,
  experience,
  skills,
} from "@/data/profile";
import { aiOperationsCaseStudy } from "@/data/ai-operations-case-study";
import type { Passage } from "@/lib/retrieval";

/**
 * Retrieval corpus for the "Ask about my experience" panel, derived
 * from the same data that renders the site so answers can never drift
 * from the visible content.
 */
export function buildCorpus(): Passage[] {
  const passages: Passage[] = [
    {
      id: "about",
      title: `About ${profile.name}`,
      text: `${profile.title} — ${profile.tagline}. Based in ${profile.location}. ${profile.intro}`,
      href: "/",
    },
    {
      id: "availability",
      title: "Availability and contact",
      text: `Muneeb is available to interview now and can start after a standard two-week notice period. He is a US citizen, authorized to work in the US, and needs no visa sponsorship. Willing to relocate for the right role. Based in ${profile.location} (Seattle area). Reachable by email at ${profile.email}, or on GitHub and LinkedIn.`,
      href: "/#contact-heading",
    },
    {
      id: "role-preferences",
      title: "What Muneeb is looking for",
      text: "Interested in new opportunities: Principal and Staff AI engineering and applied AI roles — remote, hybrid, or on-site depending on the role. He prefers hands-on individual contributor (IC) work, and is also open to tech lead roles that keep him close to the code.",
      href: "/#contact-heading",
    },
    {
      id: "education",
      title: "Education",
      text: "Master of Business Information Systems (MBS) from University College Cork, and a Bachelor of Engineering in Information Technology from Hamdard University.",
      href: profile.resumeUrl,
    },
    {
      id: "case-study-career-vault",
      title: `${careerVaultCaseStudy.name} — how it's built`,
      text: `${careerVaultCaseStudy.pitch} Highlights: ${careerVaultCaseStudy.highlights.join(", ")}. Built with ${careerVaultCaseStudy.stack.join(", ")}.`,
      href: "/career-vault",
    },
    {
      id: "case-study-ai-operations",
      title: `${aiOperationsCaseStudy.name} — case study`,
      text: `${aiOperationsCaseStudy.approach} Role: ${aiOperationsCaseStudy.role}; team of ${aiOperationsCaseStudy.team}. ${aiOperationsCaseStudy.problem}`,
      href: "/ai-operations-platform",
    },
    {
      id: "decision-domain-agents",
      title: "Architecture decision: domain-scoped AI agents",
      text: aiOperationsCaseStudy.decisions
        .map((decision) => `${decision.title}: ${decision.choice}`)
        .join(" "),
      href: "/ai-operations-platform",
    },
    {
      id: "agent-coordination",
      title: "How Muneeb's AI agents coordinate",
      text: `${aiOperationsCaseStudy.aiLayer.coordination.summary} ${aiOperationsCaseStudy.aiLayer.coordination.mechanics
        .map((mechanic) => mechanic.title)
        .join(
          ". ",
        )}. Guardrails: effective agent permissions are the intersection of user, agent, tool, and business policy.`,
      href: "/ai-operations-platform",
    },
  ];

  for (const project of featuredProjects) {
    passages.push({
      id: `project-${project.slug}`,
      title: `${project.name} (featured project)`,
      text: `${project.description} Built with ${project.stack.join(", ")}.`,
      href: "/#projects",
    });
  }

  for (const project of enterpriseProjects) {
    passages.push({
      id: `enterprise-${project.slug}`,
      title: `${project.name} (enterprise platform)`,
      text: `${project.description}${project.impact ? ` Outcome: ${project.impact}.` : ""} Built with ${project.stack.join(", ")}.`,
      href: "/#enterprise-heading",
    });
  }

  for (const role of experience) {
    const isCurrent = role.period.includes("Present");
    passages.push({
      id: `role-${role.company.toLowerCase().replace(/[^a-z]+/g, "-")}`,
      title: `${role.title} · ${role.company} (${role.period})`,
      text: `${
        isCurrent
          ? `Muneeb's current role: he works as ${role.title} at a ${role.company.toLowerCase()}. `
          : ""
      }${role.summary} ${role.highlights.join(". ")}.`,
      href: "/#experience-heading",
    });
  }

  for (const group of skills) {
    passages.push({
      id: `skills-${group.group.toLowerCase().replace(/[^a-z]+/g, "-")}`,
      title: `Skills — ${group.group}`,
      text: group.items.join(", "),
      href: "/#skills-heading",
    });
  }

  return passages;
}
