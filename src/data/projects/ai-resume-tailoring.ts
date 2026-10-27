import type { Project } from "../types";

export const aiResumeTailoring: Project = {
  slug: "ai-resume-tailoring",
  title: "AI Resume Tailoring Platform",
  summary:
    "Reads a resume and a job description, scores the match, and generates targeted edits, a cover letter, an HR email and likely interview questions.",
  role: "Product Owner & Builder",
  org: "Self-directed",
  period: "2024",
  tags: ["AI", "Product"],
  tools: ["OpenAI", "Python", "Next.js", "TypeScript", "Vercel"],
  accent: "emerald",
  impact: { value: "−90%", label: "time per application" },
  lessons: [
    "The first version rewrote resumes freely and produced claims the candidate couldn't back up in an interview. Constraining the model to reframing existing evidence — never adding new evidence — was the change that made the tool defensible.",
    "A match score is only useful if the user can see what drove it. The opaque 0–100 version got ignored; the version that listed the specific missing requirements got used.",
    "I built keyword extraction before checking whether it mattered. It barely did — the gap was almost always in how an experience was framed, not in missing keywords. I should have run five manual tailoring sessions before writing code.",
    "Users pasted job descriptions with the company's boilerplate attached. Handling messy real-world input well mattered more than any model-quality improvement.",
  ],
  sections: [
    {
      kind: "prose",
      title: "Overview",
      body: [
        "Tailoring a resume properly for a single role takes about forty minutes: read the job description closely, work out which of your experiences map to its requirements, re-frame bullets so the mapping is obvious to a reader who will spend six seconds on the page, then write a cover letter that doesn't just restate the resume.",
        "Most candidates don't do it. They send the same resume to thirty roles and absorb the lower hit rate, because forty minutes times thirty applications is a full working week.",
        "This platform compresses that forty minutes to about four. It reads both documents, identifies where the evidence for each requirement already exists in the candidate's history, and produces a tailored draft plus the supporting artefacts — with the explicit constraint that it may reframe what's there and never invent what isn't.",
      ],
    },
    {
      kind: "prose",
      title: "The Business Problem",
      body: [
        "The underlying problem is an asymmetry. A hiring team reads a resume against a specific requirement list. A candidate writes a resume against their own career. The mismatch isn't usually a lack of relevant experience — it's that the relevance isn't visible in the six seconds the document gets.",
        "Generic AI resume tools make this worse rather than better. They optimise for keyword density and produce documents that read as machine-written, which is now a negative signal to experienced recruiters. Worse, they fabricate: given a requirement the candidate doesn't meet, a naively prompted model will happily write a bullet claiming they do. The candidate then has to defend it in an interview.",
        "So the product problem was not 'generate a tailored resume'. It was 'surface the genuine evidence a candidate already has for each requirement, help them frame it well, and be honest about the gaps'.",
      ],
    },
    {
      kind: "list",
      title: "Challenges",
      items: [
        {
          title: "Preventing fabrication without making output useless",
          body: "The constraint 'never add a claim not supported by the source resume' is easy to state and hard to enforce. Too loose and the model invents; too tight and it refuses to rephrase anything, which is the entire value. The resolution was structural: a retrieval step that pins every generated bullet to a specific source line, and a validation pass that rejects any output bullet without a pin.",
        },
        {
          title: "Messy real-world input",
          body: "Job descriptions get pasted with navigation text, cookie notices and company boilerplate. Resumes arrive as PDFs with two-column layouts that extract into interleaved nonsense. More engineering went into normalising input than into any model interaction.",
        },
        {
          title: "Match scores that mean something",
          body: "An unexplained number is noise. The score had to decompose into the individual requirements, each marked as strongly evidenced, weakly evidenced or absent, with the supporting line cited for the first two.",
        },
        {
          title: "Cost per application",
          body: "A naive implementation made six separate model calls per application. At realistic usage that was uneconomic. Restructuring to a single extraction pass plus targeted generation cut per-application cost by roughly 70%.",
        },
      ],
    },
    {
      kind: "prose",
      title: "Research",
      body: [
        "I ran fifteen manual tailoring sessions before building anything beyond a prototype — my own applications and, with permission, those of five people in my network. For each, I recorded what I changed and why.",
        "The finding that shaped the product: in 13 of 15 cases, the candidate already had genuine evidence for the requirement they appeared to be missing. It was buried in a bullet written for a different audience, or described in the vocabulary of their previous industry. Only twice was there an actual gap.",
        "That inverted my design assumption. I had been building something that would help candidates write new material. What they actually needed was something that found and re-framed existing material — a retrieval problem much more than a generation one.",
        "I also timed the sessions. The expensive part was not writing; it was reading the job description carefully enough to extract its real requirements, which averaged eleven minutes. That became the first thing to automate.",
      ],
    },
    {
      kind: "flow",
      title: "Process Flow",
      intro:
        "The validation gate is the part that distinguishes this from a prompt wrapper.",
      nodes: [
        { id: "upload", label: "Upload resume + paste JD", kind: "start" },
        { id: "normalise", label: "Normalise & segment", meta: "Strip boilerplate, fix layout", kind: "system" },
        { id: "extract-jd", label: "Extract requirements", meta: "Structured, prioritised", kind: "system" },
        { id: "index", label: "Index resume evidence", meta: "Line-level", kind: "system" },
        { id: "match", label: "Evidence retrieval & scoring", meta: "Per requirement", kind: "system" },
        { id: "gap", label: "Requirement evidenced?", kind: "decision" },
        { id: "reframe", label: "Reframe existing bullet", meta: "Pinned to source line", kind: "step" },
        { id: "flag", label: "Flag as genuine gap", meta: "Honest, not papered over", kind: "step" },
        { id: "validate", label: "Validation pass", meta: "Reject unpinned claims", kind: "system" },
        { id: "generate", label: "Generate artefacts", meta: "Resume, letter, email, questions", kind: "step" },
        { id: "review", label: "Candidate reviews & edits", kind: "end" },
      ],
      edges: [
        { from: "upload", to: "normalise" },
        { from: "normalise", to: "extract-jd" },
        { from: "normalise", to: "index" },
        { from: "extract-jd", to: "match" },
        { from: "index", to: "match" },
        { from: "match", to: "gap" },
        { from: "gap", to: "reframe", label: "Yes" },
        { from: "gap", to: "flag", label: "No" },
        { from: "reframe", to: "validate" },
        { from: "flag", to: "validate" },
        { from: "validate", to: "generate" },
        { from: "generate", to: "review" },
      ],
    },
    {
      kind: "prose",
      title: "The Solution",
      body: [
        "Five outputs from two inputs, with a hard constraint running through all of them.",
        "The match score decomposes. Each extracted requirement is marked strongly evidenced, weakly evidenced or absent, and the first two cite the exact resume line supporting them. The headline number is a weighted roll-up, but the number is the least important part of the view.",
        "Resume suggestions are reframings, never additions. Every proposed bullet is pinned to a source line, shown side by side with the original, and accepted or rejected individually. The validation pass rejects any generated bullet that can't be traced back, which happens often enough that the gate earns its place.",
        "The cover letter is built from the three strongest evidence matches rather than from the resume as a whole, which is what stops it reading as a restatement. The HR email is short and specific. The interview questions are generated from the weak and absent requirements — these are precisely what the candidate will be probed on, so preparing against them is the highest-value output in the set.",
        "Gaps are reported plainly. If a role wants five years of something the candidate has one year of, the tool says so and suggests how to address it honestly rather than obscuring it.",
      ],
    },
    {
      kind: "architecture",
      title: "Architecture",
      layers: [
        {
          title: "Ingestion",
          nodes: [
            { label: "PDF / DOCX parser", meta: "multi-column aware" },
            { label: "Boilerplate stripper", meta: "heuristic + model" },
            { label: "Section segmenter", meta: "experience, skills, education" },
          ],
        },
        {
          title: "Understanding",
          subtitle: "One extraction pass, reused downstream",
          nodes: [
            { label: "Requirement extractor", meta: "structured output" },
            { label: "Evidence indexer", meta: "line-level embeddings" },
            { label: "Retrieval + scoring", meta: "per requirement" },
          ],
        },
        {
          title: "Generation",
          subtitle: "Constrained to retrieved evidence",
          nodes: [
            { label: "Bullet reframer", meta: "pinned to source" },
            { label: "Cover letter", meta: "top-3 evidence" },
            { label: "HR email", meta: "short form" },
            { label: "Interview questions", meta: "from gaps" },
          ],
        },
        {
          title: "Safeguards",
          nodes: [
            { label: "Pin validator", meta: "rejects unsupported claims" },
            { label: "Gap reporter", meta: "explicit, not hidden" },
            { label: "Diff view", meta: "per-bullet accept / reject" },
          ],
        },
      ],
    },
    {
      kind: "sequence",
      title: "Sequence — One Application",
      actors: ["Candidate", "App", "Extraction", "Retrieval", "Generation"],
      steps: [
        { from: "Candidate", to: "App", label: "Upload resume + JD" },
        { from: "App", to: "Extraction", label: "Normalise and extract requirements" },
        { from: "Extraction", to: "App", label: "Requirement list (prioritised)", kind: "return" },
        { from: "App", to: "Retrieval", label: "Find evidence per requirement" },
        { from: "Retrieval", to: "App", label: "Matches + confidence + source lines", kind: "return" },
        { from: "App", to: "Generation", label: "Reframe (constrained to matches)" },
        { from: "Generation", to: "App", label: "Draft bullets, each pinned", kind: "return" },
        { from: "App", to: "App", label: "Validate pins; drop unsupported" },
        { from: "App", to: "Candidate", label: "Score, diff, letter, email, questions", kind: "return" },
      ],
    },
    {
      kind: "stories",
      title: "User Stories",
      items: [
        {
          id: "RES-03",
          as: "job seeker",
          want: "to see which specific requirements my resume evidences and which it doesn't",
          so: "that I know whether this application is worth forty minutes of my time",
          points: 8,
          priority: "Must",
          criteria: [
            "Given a resume and a job description, when analysis completes, then every extracted requirement is listed as strongly evidenced, weakly evidenced or absent.",
            "Given an evidenced requirement, when I expand it, then the supporting resume line is quoted.",
            "Given an absent requirement, when I view it, then no resume line is cited and the gap is stated plainly.",
          ],
        },
        {
          id: "RES-11",
          as: "job seeker",
          want: "every suggested edit traced to something already in my resume",
          so: "that I can defend every line of the document in an interview",
          points: 13,
          priority: "Must",
          criteria: [
            "Given a suggested bullet, when I view it, then the original line it was derived from is shown alongside it.",
            "Given a generated bullet with no traceable source, when validation runs, then the bullet is discarded and not shown.",
            "Given any suggestion, when I reject it, then the original wording is retained in the output.",
          ],
        },
        {
          id: "RES-18",
          as: "job seeker",
          want: "interview questions generated from my weakest matches",
          so: "that I prepare for what I'll actually be challenged on",
          points: 5,
          priority: "Should",
          criteria: [
            "Given requirements marked weak or absent, when questions are generated, then at least one question addresses each.",
            "Given a generated question, when I view it, then the requirement it probes is identified.",
          ],
        },
      ],
    },
    {
      kind: "criteria",
      title: "Acceptance Criteria — Integrity",
      intro: "The constraints that make the output usable rather than merely fluent.",
      groups: [
        {
          title: "No fabrication",
          items: [
            "No output bullet may assert an employer, title, date, technology or metric absent from the source resume.",
            "Every output bullet carries a reference to its source line; unreferenced bullets are discarded before display.",
            "Where a requirement has no supporting evidence, the output states the gap rather than generating a plausible claim.",
          ],
        },
        {
          title: "Input robustness",
          items: [
            "Two-column PDF resumes extract into correctly ordered sections, verified against a 20-document fixture set.",
            "Job descriptions containing navigation text, cookie notices or boilerplate yield a requirement list free of those artefacts.",
            "A resume that fails to parse returns a specific, actionable error rather than a degraded result.",
          ],
        },
      ],
    },
    {
      kind: "kpis",
      title: "Impact",
      items: [
        {
          label: "Time per tailored application",
          value: 90,
          suffix: "%",
          prefix: "−",
          note: "~40 minutes to ~4, measured across 15 sessions",
        },
        {
          label: "Requirements with evidence found",
          value: 87,
          suffix: "%",
          note: "Evidence existed but was not visible to a reader",
        },
        {
          label: "Fabricated claims reaching output",
          value: 0,
          note: "Pin validation; 240-application sample",
        },
        {
          label: "Cost per application",
          value: 70,
          suffix: "%",
          prefix: "−",
          note: "After consolidating six model calls into two",
        },
      ],
    },
    {
      kind: "stack",
      title: "Tech Stack",
      groups: [
        { title: "AI", items: ["OpenAI API", "Structured outputs", "Embeddings", "Prompt evaluation harness"] },
        { title: "Backend", items: ["Python", "FastAPI", "PDF/DOCX parsing"] },
        { title: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { title: "Infrastructure", items: ["Vercel", "Usage metering"] },
      ],
    },
  ],
};
