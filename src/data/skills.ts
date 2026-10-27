import {
  BarChart3,
  Boxes,
  Brain,
  ClipboardList,
  Users,
} from "lucide-react";
import type { Certification, SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "business-analysis",
    title: "Business Analysis",
    blurb:
      "Turning what stakeholders say into something a delivery team can build and test.",
    icon: ClipboardList,
    skills: [
      { name: "Requirements Gathering", level: 95 },
      { name: "User Stories", level: 94 },
      { name: "BRD", level: 92 },
      { name: "FRD", level: 90 },
      { name: "Acceptance Criteria", level: 93 },
      { name: "Process Mapping", level: 89 },
      { name: "Agile", level: 90 },
      { name: "Sprint Planning", level: 87 },
      { name: "UAT", level: 91 },
      { name: "Jira", level: 92 },
      { name: "Confluence", level: 88 },
    ],
  },
  {
    id: "product",
    title: "Product",
    blurb:
      "Deciding what to build next and being able to defend the decision with evidence.",
    icon: Boxes,
    skills: [
      { name: "Roadmaps", level: 88 },
      { name: "Feature Prioritization", level: 90 },
      { name: "Product Metrics", level: 87 },
      { name: "Wireframes", level: 82 },
      { name: "User Journey", level: 89 },
      { name: "Product Thinking", level: 91 },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    blurb:
      "Getting to a defensible number, then making it legible to people who won't read the query.",
    icon: BarChart3,
    skills: [
      { name: "SQL", level: 92 },
      { name: "Power BI", level: 90 },
      { name: "Excel", level: 93 },
      { name: "Python", level: 84 },
      { name: "Pandas", level: 83 },
      { name: "Visualization", level: 88 },
      { name: "ETL", level: 80 },
      { name: "Root Cause Analysis", level: 89 },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    blurb:
      "Using models where they genuinely help, and knowing the places they quietly don't.",
    icon: Brain,
    skills: [
      { name: "OpenAI", level: 90 },
      { name: "Prompt Engineering", level: 92 },
      { name: "LangChain", level: 81 },
      { name: "Workflow Automation", level: 88 },
      { name: "Copilot", level: 86 },
      { name: "ChatGPT", level: 93 },
      { name: "RAG", level: 84 },
      { name: "LLMs", level: 85 },
      { name: "Python Automation", level: 86 },
    ],
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    blurb:
      "The part of the job that determines whether any of the above actually lands.",
    icon: Users,
    skills: [
      { name: "Stakeholder Management", level: 93 },
      { name: "Communication", level: 94 },
      { name: "Leadership", level: 86 },
      { name: "Problem Solving", level: 92 },
    ],
  },
];

/**
 * Certifications.
 *
 * Deliberately empty. An earlier version of this file carried six invented
 * certifications with invented credential IDs (e.g. "PL-300-TRK"), which the
 * resume does not mention — a recruiter trying to verify one would have found
 * nothing, which is worse than showing none at all.
 *
 * TODO(juveriyah): add your real certifications here and they will appear
 * automatically on the homepage and the resume page. Both sections hide
 * themselves while this list is empty.
 */
export const certifications: Certification[] = [];
