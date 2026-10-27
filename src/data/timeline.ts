import type { TimelineEntry } from "./types";

/**
 * Career timeline — education and roles only.
 *
 * Dates, employers, titles and metrics are taken from the resume PDF; the
 * one-line summaries are editorial. Do not add roles or dates that are not
 * on the resume.
 *
 * Projects and products deliberately do not belong here. DHV and Invictus
 * have their own case studies under /projects, and the four live products
 * have the Products section on the homepage — listing them again as timeline
 * milestones just said the same thing twice on one page.
 */

export const timeline: TimelineEntry[] = [
  {
    id: "degree",
    period: "2020 — 2024",
    title: "B.E. Computer Science",
    org: "Chandigarh University · Punjab, India",
    kind: "education",
    summary:
      "Four years of computer science, finishing with a GPA of 8.23/10 — enough engineering to read a schema and talk to developers in their own terms.",
    achievements: [
      "Graduated with a GPA of 8.23/10.",
      "Built the habit of decomposing a messy problem into components with clear interfaces before writing a line of code.",
      "Enough statistics to be sceptical of a chart — a disproportionately useful instinct in analytics.",
    ],
    skills: ["Computer Science", "Systems Thinking", "Problem Decomposition"],
  },
  {
    id: "mindsprint",
    period: "Jul 2024 — Dec 2025",
    title: "Junior Engineer (Business Analyst)",
    org: "Mindsprint Digital Pvt Ltd · Chennai, India",
    kind: "engineering",
    summary:
      "Worked across three international client engagements, sitting between developers and stakeholders for the whole project lifecycle.",
    achievements: [
      "Coordinated closely with developers and stakeholders throughout the project lifecycle across three international client engagements.",
      "Supported requirement clarification and executed comprehensive UAT across mobile and desktop interfaces, verifying implementations ahead of production releases.",
      "Documented real-time system integrations and defined data flow requirements, translating business problems into technical optimisations that reduced latency by 20%.",
      "Contributed to process improvement by authoring functional specifications that lifted overall user engagement by 30%.",
    ],
    skills: ["UAT", "Requirement Clarification", "System Integration", "SDLC", "Functional Specs"],
  },
  {
    id: "dynamic-traders",
    period: "Jan 2026 — Jul 2026",
    title: "Business Analyst (Freelance)",
    org: "Dynamic Traders And Distributors · Remote",
    kind: "consulting",
    summary:
      "Owned requirements for a redesigned SaaS invoice management platform — the engagement that became the problem definition behind Invixy.",
    achievements: [
      "Gathered, analysed and documented business requirements for a redesigned SaaS invoice management platform, translating them into clear functional specifications.",
      "Acted as the primary bridge between business stakeholders and the technical development team, organising cross-functional workshops to turn ambiguous needs into engineering-ready tasks.",
      "Prepared and maintained detailed requirement documentation, process flows and user stories for automated data extraction pipelines.",
    ],
    skills: ["Requirements", "Functional Specs", "Workshops", "Process Flows", "SaaS"],
  },
];
