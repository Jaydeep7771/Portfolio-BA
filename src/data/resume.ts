/**
 * Structured resume content, taken from the resume PDF.
 *
 * Everything factual here — titles, employers, dates, locations, metrics and
 * the education line — matches that document. Keep it that way: the rendered
 * /resume page and the downloadable PDF should never disagree.
 */

export const resume = {
  summary:
    "Results-driven Business Analyst with 2 years of experience acting as a bridge between business stakeholders and technical teams. Proven expertise in gathering, analysing and documenting business requirements, preparing user stories, and mapping processes to identify areas for operational improvement. Highly skilled in using MS Excel, SQL and documentation tools to translate complex business problems into clear, actionable technical requirements. Adept at coordinating with developers throughout the software development lifecycle, supporting requirement clarification, and leading UAT to ensure successful implementation.",

  experience: [
    {
      title: "Business Analyst (Freelance)",
      org: "Dynamic Traders And Distributors",
      period: "Jan 2026 — Jul 2026",
      location: "Remote",
      points: [
        "Gathered, analysed and documented business requirements for a redesigned SaaS invoice management platform, translating them into clear functional specifications.",
        "Acted as the primary bridge between business stakeholders and the technical development team, organising cross-functional workshops to translate ambiguous needs into actionable, engineering-ready tasks.",
        "Prepared and maintained detailed requirement documentation, process flows and user stories for automated data extraction pipelines.",
      ],
    },
    {
      title: "Junior Engineer (Business Analyst)",
      org: "Mindsprint Digital Pvt Ltd",
      period: "Jul 2024 — Dec 2025",
      location: "Chennai, India",
      points: [
        "Coordinated closely with developers and other stakeholders throughout the project lifecycle across three international client engagements.",
        "Supported requirement clarification and executed comprehensive User Acceptance Testing (UAT) across mobile and desktop interfaces to verify implementations ahead of production releases.",
        "Documented real-time system integrations and defined data flow requirements, translating business problems into technical optimisations that reduced latency by 20%.",
        "Contributed to process improvement initiatives by authoring functional specifications that lifted overall user engagement by 30%.",
      ],
    },
  ],

  projects: [
    {
      title: "DHV — Sales Tracking Platform",
      meta: "Agile, Process Mapping, MS Excel · 2024",
      points: [
        "Prepared and documented 50+ user stories for a mobile and web-based tracking platform, ensuring clear translation of business operational workflows to the technical team.",
        "Used advanced MS Excel and Power BI to analyse operational processes, coordinating with developers to automate KPI reporting engines.",
      ],
    },
    {
      title: "Invictus — SAP-Integrated Operational Portal",
      meta: "UAT, Requirement Analysis · 2025",
      points: [
        "Analysed complex supply chain operations to draft 40+ user stories across customer, sales and purchasing roles.",
        "Supported testing and implementation phases by coordinating stakeholder UAT walkthroughs to resolve usability gaps and improve business process transparency.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering in Computer Science",
      org: "Chandigarh University · Punjab, India",
      period: "2020 — 2024",
      points: ["GPA: 8.23 / 10"],
    },
  ],

  highlights: [
    { label: "Products built and shipped live", value: "4" },
    { label: "User stories authored across projects", value: "90+" },
    { label: "Latency reduction delivered", value: "20%" },
    { label: "User engagement lift", value: "30%" },
  ],

  skillGroups: [
    {
      title: "Business Analysis",
      items: [
        "Requirement Gathering",
        "Business Process Analysis",
        "User Stories",
        "BRD / FRD Documentation",
        "Process Flow Mapping",
        "Requirement Clarification",
        "Process Improvement",
      ],
    },
    {
      title: "Software Development & QA",
      items: [
        "SDLC",
        "Agile / Scrum",
        "User Acceptance Testing (UAT)",
        "Defect Tracking",
        "Cross-Functional Technical Coordination",
      ],
    },
    {
      title: "Tools & Technologies",
      items: [
        "MS Excel (Advanced)",
        "Jira",
        "Confluence",
        "SQL",
        "Power BI",
      ],
    },
    {
      title: "Core Competencies",
      items: [
        "Analytical Thinking",
        "Problem Solving",
        "Stakeholder Management",
        "Clear Technical Communication",
        "Bridge Building (Business to IT)",
      ],
    },
  ],
} as const;
