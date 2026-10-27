/**
 * Local retrieval corpus for the chat widget.
 *
 * Deliberately not an LLM: the widget scores these entries against the
 * visitor's question and returns the best match. That keeps the site fully
 * static, costs nothing to run, and never invents a fact about Juveriyah.
 */

export type KnowledgeEntry = {
  id: string;
  /** Terms that should pull this entry up. Order doesn't matter. */
  keywords: string[];
  answer: string;
  link?: { href: string; label: string };
};

export const suggestedQuestions = [
  "What has she actually shipped?",
  "What does Juveriyah do?",
  "What tools does she use?",
  "Tell me about Invixy",
  "Is she available for hire?",
] as const;

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "products",
    keywords: [
      "shipped", "built", "live", "product", "products", "app", "apps",
      "deployed", "launch", "portfolio", "demo", "url", "link", "site",
    ],
    answer:
      "Four products, all live and clickable: Invixy (invoice lifecycle platform — recurring billing, automated reminders, multi-currency, GST/e-invoicing), Enterprise RAG / KV DocAI (citation-first document intelligence over ISO manuals, spec sheets and supplier contracts), Synapse AI (options chain plus live news, synthesised to surface where they diverge), and Manufacture OS (live per-SKU costing with what-if price simulation and margin-at-risk alerts).",
    link: { href: "/#products", label: "See all four with links" },
  },
  {
    id: "invixy",
    keywords: ["invixy", "invoice", "invoicing", "billing", "finance", "gst", "payments", "collections"],
    answer:
      "Invixy is a finance operations platform covering the full invoice lifecycle — creation, billing, compliance and settlement. It handles recurring invoices, automated payment reminders, multi-currency billing across 135+ currencies, GST and e-invoicing, and cash-flow forecasting. It grew out of the freelance engagement where she specified a redesigned SaaS invoice management platform, so the problem definition came before the code. Live at invixy.com.",
    link: { href: "/#products", label: "Open the products section" },
  },
  {
    id: "rag",
    keywords: ["rag", "docai", "document", "documents", "retrieval", "gemini", "iso", "contracts", "citation", "enterprise"],
    answer:
      "Enterprise RAG (live as KV DocAI) is a document intelligence system for a valve manufacturer. Staff upload ISO 9001 manuals, product spec sheets, supplier contracts and export certifications, then ask questions in plain language — and every answer cites the exact source it came from. The citation requirement is the point: without it the output is unusable in a quality-managed environment. Built on Gemini 2.5.",
    link: { href: "/#products", label: "Open the products section" },
  },
  {
    id: "synapse",
    keywords: ["synapse", "options", "trading", "market", "nifty", "stocks", "finance", "news", "chain"],
    answer:
      "Synapse AI reads the live options chain and real-world news in one terminal, then synthesises both to surface where they diverge — the thesis being that the gap between what derivatives are pricing and what the news says is the signal worth acting on. Watchlist covers NIFTY 50, BANK NIFTY, SENSEX and large-cap single names.",
    link: { href: "/#products", label: "Open the products section" },
  },
  {
    id: "manufacture-os",
    keywords: ["manufacture", "manufacturing", "financeos", "costing", "margin", "sku", "profitability", "pricing"],
    answer:
      "Manufacture OS (live as FinanceOS) is a costing and profitability workspace for manufacturers who know revenue precisely and per-SKU margin only roughly. It keeps live costing across the catalogue, simulates the margin impact of a price change before it is committed, and raises margin-at-risk alerts. The live URL sits behind a sign-in.",
    link: { href: "/#products", label: "Open the products section" },
  },
  {
    id: "intro",
    keywords: ["who", "about", "yourself", "introduce", "background", "do", "summary", "hi", "hello", "hey"],
    answer:
      "Juveriyah is a Business Analyst with two years bridging business stakeholders and technical teams — requirements gathering, user stories, BRD/FRD documentation, process mapping and UAT. What makes her unusual is that she also ships: four products of her own are live, each one growing out of a problem she had already documented as an analyst. Computer Science degree from Chandigarh University.",
    link: { href: "/#about", label: "See the career timeline" },
  },
  {
    id: "experience",
    keywords: ["experience", "years", "career", "worked", "mindsprint", "job", "history", "timeline", "engineer"],
    answer:
      "Two years. B.E. Computer Science at Chandigarh University (2020–2024, GPA 8.23/10), then Junior Engineer (Business Analyst) at Mindsprint Digital in Chennai from Jul 2024 to Dec 2025 — three international client engagements, UAT across mobile and desktop, a 20% latency reduction and a 30% lift in user engagement. Then freelance Business Analyst for Dynamic Traders And Distributors (Jan–Jul 2026) on a redesigned SaaS invoice management platform. Alongside that, four products of her own shipped live.",
    link: { href: "/#about", label: "Expand each milestone" },
  },
  {
    id: "ai-projects",
    keywords: ["ai", "automation", "llm", "openai", "gpt", "copilot", "rag", "langchain", "prompt", "agent"],
    answer:
      "Three AI builds: the AI Business Analyst Copilot (turns a BRD or meeting notes into epics, stories, acceptance criteria, test cases and Jira tickets), the AI Resume Tailoring Platform, and the AI Dashboard Generator (upload a CSV, get KPIs, charts and an executive summary). The Copilot is the flagship.",
    link: { href: "/projects/ai-business-analyst-copilot", label: "Open the Copilot case study" },
  },
  {
    id: "copilot",
    // "copilot" also appears on the ai-projects entry; the extra terms here
    // break the tie toward this more specific answer.
    keywords: ["copilot", "flagship", "brd", "prd", "epics", "stories", "jira", "backlog", "test cases", "project", "traceability"],
    answer:
      "The AI Business Analyst Copilot ingests a BRD, PRD or raw meeting notes and produces a traceable backlog: extracted requirements → epics → user stories → acceptance criteria → test cases → UAT scripts → suggested KPIs and dashboards, plus a functional spec and process diagrams. Every generated artefact links back to the source line it came from, which is the part that makes it usable in a real governance process.",
    link: { href: "/projects/ai-business-analyst-copilot", label: "Read the full case study" },
  },
  {
    id: "ba-work",
    keywords: ["business", "analyst", "requirements", "brd", "frd", "user stories", "uat", "elicitation", "stakeholder", "agile", "scrum"],
    answer:
      "Core BA toolkit: requirements elicitation, BRDs and FRDs, user stories with testable acceptance criteria, process mapping, stakeholder workshops, sprint planning, UAT coordination, and Jira/Confluence for traceability. The DHV and Invictus case studies show the full documentation trail.",
    link: { href: "/projects", label: "Browse the projects" },
  },
  {
    id: "analytics",
    keywords: ["sql", "power bi", "powerbi", "analytics", "data", "dashboard", "excel", "python", "pandas", "etl", "visualization"],
    answer:
      "Analytics side: SQL for extraction and validation, Power BI for stakeholder-facing dashboards, Python and pandas for the heavier transformations, plus ETL design and root-cause analysis. There's an interactive SQL walkthrough on the homepage showing how she thinks about query execution order.",
    link: { href: "/#skills", label: "See the full skill matrix" },
  },
  {
    id: "product",
    keywords: ["product", "roadmap", "prioritization", "metrics", "wireframe", "journey", "pm", "management", "discovery"],
    answer:
      "Product work covers roadmapping, feature prioritisation, product metrics, wireframing and user-journey mapping. She also publishes self-directed teardowns — Swiggy checkout, LinkedIn job search and the Amazon return experience — each with a journey map, competitive analysis and success metrics.",
    link: { href: "/case-studies", label: "Read the product teardowns" },
  },
  {
    id: "dhv",
    keywords: ["dhv", "sales", "tracking", "visits", "field", "reps"],
    answer:
      "DHV Sales Tracking Platform replaced manual visit logging for field sales reps. She ran the requirements gathering, wrote the BRD and user stories, designed the Power BI dashboards and coordinated UAT. Outcome: a 30% improvement in operational visibility.",
    link: { href: "/projects/dhv-sales-tracking", label: "Open the case study" },
  },
  {
    id: "invictus",
    keywords: ["invictus", "procurement", "sap", "rfq", "purchase", "approval", "workflow"],
    answer:
      "Invictus Procurement Portal integrated with SAP to handle purchase requests, RFQs and a multi-level approval workflow. The work was heavy on process mapping and stakeholder workshops — the approval matrix alone took four sessions to pin down. Outcome: materially reduced procurement cycle complexity.",
    link: { href: "/projects/invictus-procurement-portal", label: "Open the case study" },
  },
  {
    id: "resume-tool",
    keywords: ["resume", "tailoring", "cover letter", "job description", "match score", "interview"],
    answer:
      "The AI Resume Tailoring Platform reads a resume and a job description, computes a match score, suggests targeted edits, and drafts a cover letter, HR email and likely interview questions. Built with OpenAI, Python and Next.js; it cuts application time by roughly 90%.",
    link: { href: "/projects/ai-resume-tailoring", label: "Open the case study" },
  },
  {
    id: "dashboard-gen",
    keywords: ["csv", "generator", "insights", "executive summary", "recommendations", "upload"],
    answer:
      "The AI Dashboard Generator takes a raw CSV, profiles it, and returns proposed KPIs, the right chart for each question, written insights, recommendations, an executive summary and a Power BI build plan. It's aimed at the first hour of any analysis — the part that's usually manual and slow.",
    link: { href: "/projects/ai-dashboard-generator", label: "Open the case study" },
  },
  {
    id: "resume-file",
    keywords: ["cv", "download", "pdf", "hire", "hiring", "recruiter", "available", "availability", "contact", "email", "reach"],
    answer:
      "Yes — she's open to Business Analyst and Product Analyst roles. The resume is downloadable from the Resume page, and the contact form goes straight to her inbox.",
    link: { href: "/contact", label: "Get in touch" },
  },
  {
    id: "writing",
    keywords: ["blog", "article", "writing", "medium", "post", "read"],
    answer:
      "She writes about the craft of business analysis — AI's effect on the role, writing better user stories, using ChatGPT as a BA, Power BI practices, a requirements-gathering framework and prompt engineering for analysts.",
    link: { href: "/blog", label: "Read the articles" },
  },
  {
    id: "certifications",
    keywords: ["certification", "certified", "credential", "course", "qualification", "degree", "education"],
    answer:
      "B.E. in Computer Science from Chandigarh University (2020–2024), GPA 8.23/10. The resume page has the full education and experience detail.",
    link: { href: "/resume", label: "See the resume" },
  },
];
