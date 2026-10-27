import type { Project } from "../types";

export const aiDashboardGenerator: Project = {
  slug: "ai-dashboard-generator",
  title: "AI Dashboard Generator",
  summary:
    "Upload a CSV and get back proposed KPIs, the right chart for each question, written insights, recommendations, an executive summary and a Power BI build plan.",
  role: "Product Owner & Builder",
  org: "Self-directed",
  period: "2025",
  tags: ["AI", "Analytics", "Power BI", "Product"],
  tools: ["OpenAI", "Python", "Pandas", "Next.js", "Power BI"],
  accent: "amber",
  impact: { value: "−83%", label: "time to first credible draft" },
  lessons: [
    "Profiling the data deterministically before involving a model was the decision that made this work. Statistics come from pandas; only the interpretation comes from the model. Asking an LLM to compute a correlation is asking for a confident wrong number.",
    "The first version generated insights from column names alone and produced plausible nonsense. It needs the distributions, not the headers.",
    "Users wanted the executive summary first and the charts second — the opposite of the order I built it in, and the opposite of how analysts think.",
    "I under-invested in messy-CSV handling. Mixed date formats in one column, thousands separators, and 'N/A' as a string broke more runs than any model issue.",
    "Recommendations were the least trusted output and I nearly cut them. What saved them was requiring each one to cite the specific finding it rested on.",
  ],
  sections: [
    {
      kind: "prose",
      title: "Overview",
      body: [
        "The first hour with an unfamiliar dataset is almost entirely mechanical: work out what each column is, check the distributions, find the obvious data-quality problems, decide what's worth measuring, and sketch which chart answers which question. Only after that does the actual analysis begin.",
        "This tool compresses that hour. You upload a CSV; it profiles the data deterministically, then uses a model to interpret the profile — proposing KPIs, selecting appropriate visualisations, writing out the findings and their implications, and producing a Power BI build plan a developer can work from.",
        "The division of labour is the point. Every number is computed in pandas. The model never calculates anything; it interprets what pandas computed. That constraint is what makes the output trustworthy enough to show a stakeholder.",
      ],
    },
    {
      kind: "prose",
      title: "The Business Problem",
      body: [
        "Two distinct audiences have the same bottleneck. Analysts spend the first hour of every new dataset doing identical mechanical work. Non-analysts — operations managers, founders, team leads — have data and no route from it to a decision; they either wait in a reporting queue or build a spreadsheet chart that misleads them.",
        "The common failure mode is picking the wrong measure. Someone plots an average where the distribution is heavily skewed, or trends a metric whose definition changed partway through the period. These are not sophisticated mistakes; they're the mistakes that an experienced analyst avoids by reflex and a non-analyst makes constantly.",
        "Existing AI data tools mostly generate charts. Generating a chart is the easy part. The valuable part is knowing which question is worth asking of this dataset, which measure answers it honestly, and what caveat belongs beside the answer.",
      ],
    },
    {
      kind: "list",
      title: "Challenges",
      items: [
        {
          title: "Models cannot be trusted with arithmetic",
          body: "An LLM asked to compute a median from raw rows will produce a number that looks right and often isn't. The architecture had to separate computation from interpretation absolutely: pandas computes, the model explains. No statistic in the output originates from the model.",
        },
        {
          title: "Real CSVs are hostile",
          body: "Mixed date formats within a single column, currency symbols and thousands separators in numeric fields, 'N/A' and '-' and empty string all meaning null in the same file, duplicated headers, trailing junk rows. Robust type inference consumed more effort than every model interaction combined.",
        },
        {
          title: "Choosing the right chart is a judgement, not a lookup",
          body: "A simple mapping from data type to chart type produces technically valid, analytically useless output. The selection had to consider cardinality, distribution shape, time structure and the question being asked — and had to explain its choice so the user could disagree.",
        },
        {
          title: "Recommendations invite overreach",
          body: "A model asked for recommendations will confidently suggest business actions it has no basis for. Requiring every recommendation to cite the specific finding supporting it cut the output volume by more than half and made what remained defensible.",
        },
      ],
    },
    {
      kind: "prose",
      title: "Research",
      body: [
        "I timed myself across twelve first-hour sessions on datasets I hadn't seen before, logging each activity. Profiling and quality checking took 24 minutes on average, deciding what to measure took 14, and chart sketching took 11 — roughly 49 minutes of the first hour before any analysis proper.",
        "I then ran a smaller study on the failure side. I collected sixteen dashboards built by non-analysts in the organisations I'd consulted for and reviewed each for analytical soundness. Nine contained at least one materially misleading element: an average over a bimodal distribution, a trend line across a definitional change, a percentage with an unstated denominator, or a pie chart with eleven segments.",
        "That second finding changed the product's emphasis. The value wasn't primarily speed for analysts; it was preventing a specific, common and consequential class of error for everyone else. The caveats attached to each output are, in that light, the most important thing the tool produces.",
      ],
    },
    {
      kind: "table",
      title: "The First Hour, Measured",
      intro: "Twelve sessions on unfamiliar datasets.",
      columns: ["Activity", "Mean duration", "Deterministic?", "Automated"],
      rows: [
        ["Type inference and column profiling", "11 min", "Yes", "Fully"],
        ["Data-quality checks (nulls, duplicates, outliers)", "13 min", "Yes", "Fully"],
        ["Deciding what is worth measuring", "14 min", "No", "Proposed, user confirms"],
        ["Choosing visualisations", "11 min", "Partly", "Proposed with rationale"],
        ["Writing up initial findings", "9 min", "No", "Drafted from computed stats"],
        ["Actual analysis", "—", "No", "Not automated — this is the point"],
      ],
    },
    {
      kind: "flow",
      title: "Process Flow",
      intro:
        "Everything left of the model boundary is deterministic. The model only ever sees a computed profile.",
      nodes: [
        { id: "upload", label: "Upload CSV", kind: "start" },
        { id: "parse", label: "Robust parse & type inference", meta: "Dates, currency, nulls", kind: "system" },
        { id: "profile", label: "Statistical profile", meta: "pandas — all numbers here", kind: "system" },
        { id: "quality", label: "Quality report", meta: "Nulls, dupes, outliers, drift", kind: "system" },
        { id: "blocking", label: "Blocking quality issue?", kind: "decision" },
        { id: "warn", label: "Surface issue, require ack", meta: "Before any analysis", kind: "step" },
        { id: "interpret", label: "Model interprets profile", meta: "No computation", kind: "system" },
        { id: "kpis", label: "Propose KPIs", meta: "With definitions", kind: "step" },
        { id: "charts", label: "Select charts + rationale", meta: "Cardinality & shape aware", kind: "step" },
        { id: "insights", label: "Write insights", meta: "Each cites a statistic", kind: "step" },
        { id: "recs", label: "Recommendations", meta: "Each cites a finding", kind: "step" },
        { id: "summary", label: "Executive summary", meta: "Shown first", kind: "step" },
        { id: "pbi", label: "Power BI build plan", meta: "Model, measures, layout", kind: "end" },
      ],
      edges: [
        { from: "upload", to: "parse" },
        { from: "parse", to: "profile" },
        { from: "profile", to: "quality" },
        { from: "quality", to: "blocking" },
        { from: "blocking", to: "warn", label: "Yes" },
        { from: "blocking", to: "interpret", label: "No" },
        { from: "warn", to: "interpret", label: "Acknowledged" },
        { from: "interpret", to: "kpis" },
        { from: "interpret", to: "charts" },
        { from: "kpis", to: "insights" },
        { from: "charts", to: "insights" },
        { from: "insights", to: "recs" },
        { from: "recs", to: "summary" },
        { from: "summary", to: "pbi" },
      ],
    },
    {
      kind: "architecture",
      title: "Architecture",
      intro:
        "The boundary between the deterministic layer and the model is the most important line in the system.",
      layers: [
        {
          title: "Ingestion",
          subtitle: "Where most of the engineering actually went",
          nodes: [
            { label: "Delimiter & encoding sniffer", meta: "incl. BOM, semicolon" },
            { label: "Type inference", meta: "mixed date formats" },
            { label: "Null normaliser", meta: "'N/A', '-', '', 'null'" },
            { label: "Header repair", meta: "duplicates, blanks" },
          ],
        },
        {
          title: "Deterministic analysis",
          subtitle: "Every number in the output originates here",
          nodes: [
            { label: "Column profiler", meta: "pandas" },
            { label: "Distribution analysis", meta: "skew, modality" },
            { label: "Quality checks", meta: "nulls, dupes, outliers" },
            { label: "Relationship scan", meta: "correlation, cardinality" },
          ],
        },
        {
          title: "Interpretation",
          subtitle: "Model sees the profile, never the raw rows",
          nodes: [
            { label: "KPI proposer", meta: "with definitions" },
            { label: "Chart selector", meta: "rationale required" },
            { label: "Insight writer", meta: "cites a statistic" },
            { label: "Recommendation writer", meta: "cites a finding" },
            { label: "Executive summary", meta: "non-technical" },
          ],
        },
        {
          title: "Output",
          nodes: [
            { label: "Interactive dashboard", meta: "in-app preview" },
            { label: "Power BI build plan", meta: "model + DAX measures" },
            { label: "Caveat register", meta: "attached per output" },
          ],
        },
      ],
    },
    {
      kind: "stories",
      title: "User Stories",
      items: [
        {
          id: "DBG-04",
          as: "operations manager with no analytics background",
          want: "an executive summary before any charts",
          so: "that I know what the data says before I'm asked to interpret a visual",
          points: 5,
          priority: "Must",
          criteria: [
            "Given a completed analysis, when the results render, then the executive summary is the first element on the page.",
            "Given the summary, when I read it, then it contains no unexplained statistical terminology.",
            "Given a finding with a material caveat, when it appears in the summary, then the caveat appears with it.",
          ],
        },
        {
          id: "DBG-11",
          as: "analyst",
          want: "every stated number traceable to a computed statistic",
          so: "that I can put this in front of a stakeholder without re-deriving it",
          points: 13,
          priority: "Must",
          criteria: [
            "Given any numeric claim in the output, when I expand it, then the computed statistic and the column it came from are shown.",
            "Given a generated narrative, when it is produced, then no number in it originates from the model.",
            "Given a statistic the profile did not compute, when the model references it, then the claim is rejected before display.",
          ],
        },
        {
          id: "DBG-17",
          as: "analyst",
          want: "the chart selection explained",
          so: "that I can overrule it where my domain knowledge differs",
          points: 8,
          priority: "Should",
          criteria: [
            "Given a proposed chart, when I view it, then the rationale references the column's cardinality, distribution or time structure.",
            "Given a proposed chart, when I change the type, then the rationale updates to reflect the new choice's trade-offs.",
          ],
        },
        {
          id: "DBG-25",
          as: "BI developer",
          want: "a build plan rather than an exported file",
          so: "that the result fits our existing model and naming conventions",
          points: 8,
          priority: "Should",
          criteria: [
            "Given a completed analysis, when I open the build plan, then it specifies the star schema, the measures as DAX, and a page layout.",
            "Given a proposed measure, when I review it, then its business definition accompanies the expression.",
          ],
        },
      ],
    },
    {
      kind: "criteria",
      title: "Acceptance Criteria — Analytical Soundness",
      intro:
        "These exist because of the sixteen-dashboard review; each one maps to an error found there.",
      groups: [
        {
          title: "Honest measures",
          items: [
            "A mean is not proposed as a headline measure for a column with significant skew or detected multimodality; the median is proposed with the distribution noted.",
            "Any percentage presented states its denominator.",
            "A trend is not drawn across a period where the underlying column's completeness changes by more than 20%, without an explicit warning.",
            "A categorical chart with more than seven categories groups the tail rather than rendering all of them.",
          ],
        },
        {
          title: "Quality transparency",
          items: [
            "Null rates above 5% are reported per column before any analysis of that column is shown.",
            "Detected duplicate rows are reported with a count and are excluded from aggregates by default, stated explicitly.",
            "Outliers are reported, never silently removed.",
          ],
        },
        {
          title: "Grounded narrative",
          items: [
            "Every insight cites at least one computed statistic.",
            "Every recommendation cites at least one insight.",
            "Recommendations requiring context absent from the data are not produced.",
          ],
        },
      ],
    },
    {
      kind: "kpis",
      title: "Impact",
      items: [
        {
          label: "Time to first credible draft",
          value: 83,
          suffix: "%",
          prefix: "−",
          note: "49 minutes to about 8, including review",
        },
        {
          label: "Misleading elements in output",
          value: 0,
          note: "Against 9 of 16 in the human-built dashboard review",
        },
        {
          label: "Proposed KPIs kept by the analyst",
          value: 71,
          suffix: "%",
          note: "The rest replaced with domain-specific measures",
        },
        {
          label: "Messy CSVs parsed without manual fixing",
          value: 94,
          suffix: "%",
          note: "Across a 50-file adversarial fixture set",
        },
      ],
    },
    {
      kind: "stack",
      title: "Tech Stack",
      groups: [
        { title: "AI", items: ["OpenAI API", "Structured outputs", "Grounding validation"] },
        { title: "Analysis", items: ["Python", "Pandas", "NumPy", "SciPy"] },
        { title: "Frontend", items: ["Next.js", "TypeScript", "Charting layer"] },
        { title: "Output", items: ["Power BI build plan", "DAX measure generation"] },
      ],
    },
  ],
};
