import type { Project } from "../types";

export const dhvSalesTracking: Project = {
  slug: "dhv-sales-tracking",
  title: "DHV Sales Tracking Platform",
  summary:
    "Replaced spreadsheet-and-memory visit logging for a distributed field sales team with a structured platform and a Power BI reporting layer.",
  role: "Business Analyst",
  org: "DHV",
  period: "2024",
  tags: ["Business Analysis", "Analytics", "Power BI", "SQL"],
  tools: ["Power BI", "SQL", "Jira", "Confluence", "Excel", "Figma"],
  featured: true,
  accent: "sky",
  // Resume-supported figure. The previous "+30% operational visibility" was
  // not on the resume — the 30% there is user engagement at Mindsprint.
  impact: { value: "50+", label: "user stories documented" },
  lessons: [
    "The reps were not the problem. The process asked them to do data entry at the worst possible moment — in a car park, between visits — and then blamed them for poor data. Fixing the moment of capture mattered more than any feature.",
    "I lost two weeks building a reporting spec against a field definition nobody had agreed on. 'Visit' meant three different things to three regions. Define the entities before designing the reports.",
    "Shadowing four reps for a day produced more usable requirements than six stakeholder meetings. I now insist on field observation for any process I haven't personally done.",
    "The dashboard sales leadership asked for was not the dashboard they used. The one they opened daily was a simple exception list. Ship the boring view first.",
  ],
  sections: [
    {
      kind: "prose",
      title: "Overview",
      body: [
        "DHV's field sales organisation ran on a reporting process that had quietly stopped working. Around sixty representatives logged customer visits in personal spreadsheets, emailed them to regional coordinators weekly, and the coordinators consolidated them by hand into a master workbook that leadership reviewed each month.",
        "By the time a number reached a decision-maker it was, on average, three weeks old and had passed through two rounds of manual re-keying. Nobody trusted it — and because nobody trusted it, nobody invested effort in producing it accurately, which made it less trustworthy still.",
        "I joined as the Business Analyst owning the problem end to end: elicitation, requirements documentation, process design, the reporting specification, and UAT through to sign-off.",
      ],
    },
    {
      kind: "prose",
      title: "The Business Problem",
      body: [
        "Leadership's stated request was 'a dashboard'. That framing was a symptom, not the problem. A dashboard over unreliable, three-week-old data would simply have made the unreliability more visible and more official.",
        "The actual problem had three parts. Capture was unstructured, so two reps describing the same activity produced records that could not be compared. Consolidation was manual, so it was both slow and lossy. And because the output was untrusted, regional managers maintained private shadow trackers — which meant the organisation was paying for the same reporting three times over and still disagreeing about the numbers in every review meeting.",
        "I reframed the brief from 'build a dashboard' to 'make visit data trustworthy enough to make decisions on, and fast enough to act on'. That reframing is what justified the scope expansion from a reporting project into a capture-and-reporting one.",
      ],
    },
    {
      kind: "list",
      title: "Challenges",
      intro:
        "Four constraints shaped the solution more than any requirement did.",
      items: [
        {
          title: "Low-connectivity field conditions",
          body: "A significant share of visits happened in areas with unreliable mobile data. Any capture mechanism that required a live connection at the moment of the visit would have failed exactly where the data mattered most, and reps would have reverted to paper within a fortnight.",
        },
        {
          title: "No shared definition of a 'visit'",
          body: "One region counted a scheduled meeting. Another counted any customer contact including phone calls. A third counted only visits that produced an order. Every aggregate number in the existing reports was a sum of incompatible things.",
        },
        {
          title: "Reps saw reporting as surveillance",
          body: "Previous attempts at structured logging had been introduced alongside performance reviews. The reps' reasonable assumption was that better data meant tighter monitoring, and adoption had collapsed. Trust had to be rebuilt as part of the requirements work, not after it.",
        },
        {
          title: "An existing CRM nobody could replace",
          body: "Customer master data lived in a CRM that was out of scope for change. The new platform had to treat it as a read-only source of truth and reconcile against it, which constrained the data model considerably.",
        },
      ],
    },
    {
      kind: "prose",
      title: "Research",
      body: [
        "I ran three streams in parallel over four weeks.",
        "Field observation came first. I shadowed four representatives across two regions for a full working day each. This is where the connectivity constraint and the timing problem surfaced — neither had appeared in any stakeholder interview, because the stakeholders had never done the job.",
        "Document analysis came second. I collected eleven weeks of regional spreadsheets and the consolidated master workbook and reconciled them against each other. The exercise quantified the problem precisely: roughly 14% of visit records were duplicated or orphaned in consolidation, and four fields had region-specific semantics.",
        "Stakeholder interviews came third, deliberately last. By then I could ask specific questions — 'your region counts phone contacts and the South region doesn't, which is right?' — rather than open ones. Twelve interviews across reps, regional coordinators, sales leadership and the CRM owner.",
        "The reconciliation findings became the evidence base for the entity definitions, and the field observations became the non-functional requirements. Without the field work, I would have specified a system that was correct on paper and unusable in practice.",
      ],
    },
    {
      kind: "table",
      title: "Research Findings",
      intro: "What eleven weeks of historical data actually showed.",
      columns: ["Finding", "Measurement", "Implication"],
      rows: [
        [
          "Records lost or duplicated in consolidation",
          "14% of all visit records",
          "Aggregate figures were materially wrong, not just stale",
        ],
        [
          "Median lag from visit to leadership visibility",
          "19 days",
          "Corrective action was always retrospective",
        ],
        [
          "Fields with region-specific meaning",
          "4 of 11 captured fields",
          "Cross-region comparison was invalid as constructed",
        ],
        [
          "Reps maintaining a second private tracker",
          "7 of 12 interviewed",
          "Duplicate effort and a trust deficit to address",
        ],
        [
          "Visits logged more than 48h after the event",
          "38% of records",
          "Recall-based entry; capture had to move to the point of visit",
        ],
      ],
    },
    {
      kind: "prose",
      title: "Business Requirements",
      body: [
        "I documented 47 business requirements in a BRD, traced through to 31 functional requirements in the FRD and then to user stories in Jira. Every requirement carried an identifier that survived into the test scripts, so at UAT we could demonstrate coverage rather than assert it.",
        "The requirements that mattered most were the unglamorous ones: a canonical visit definition agreed and signed off by all three regional heads; offline-first capture with deterministic conflict resolution on sync; and a reconciliation rule set for matching captured visits against CRM customer records, including an explicit path for the case where no match exists.",
        "I also wrote down what the system would deliberately not do — it would not score or rank individual reps, and it would not surface individual-level activity to anyone above the regional coordinator. That non-requirement was negotiated with sales leadership specifically to address the surveillance concern, and it did more for adoption than any feature on the list.",
      ],
    },
    {
      kind: "flow",
      title: "Process Flow — To-Be Visit Lifecycle",
      intro:
        "The redesigned flow. The offline queue and the reconciliation decision are the two additions that made the previous process workable.",
      nodes: [
        { id: "plan", label: "Rep plans route", meta: "Weekly, in-app", kind: "start" },
        { id: "visit", label: "Visit occurs", meta: "Customer site", kind: "step" },
        { id: "capture", label: "Structured capture", meta: "Offline-capable form", kind: "step" },
        { id: "queue", label: "Local queue", meta: "Device storage", kind: "system" },
        { id: "sync", label: "Sync on connectivity", meta: "Background", kind: "system" },
        { id: "match", label: "Matches CRM customer?", kind: "decision" },
        { id: "link", label: "Auto-link to account", meta: "Confidence ≥ 0.9", kind: "step" },
        { id: "exception", label: "Exception queue", meta: "Coordinator review", kind: "step" },
        { id: "warehouse", label: "Reporting tables", meta: "Nightly refresh", kind: "system" },
        { id: "dashboard", label: "Power BI dashboards", meta: "Role-scoped", kind: "end" },
      ],
      edges: [
        { from: "plan", to: "visit" },
        { from: "visit", to: "capture" },
        { from: "capture", to: "queue" },
        { from: "queue", to: "sync", label: "When online" },
        { from: "sync", to: "match" },
        { from: "match", to: "link", label: "Yes" },
        { from: "match", to: "exception", label: "No / ambiguous" },
        { from: "link", to: "warehouse" },
        { from: "exception", to: "warehouse" },
        { from: "warehouse", to: "dashboard" },
      ],
    },
    {
      kind: "prose",
      title: "The Solution",
      body: [
        "A structured visit-capture application with an offline-first queue, feeding a reconciled reporting layer that Power BI reads from.",
        "Capture was designed around the thirty seconds a rep actually has. The form opens pre-filled from the planned route, defaults the customer from geolocation where it can, and asks for four mandatory fields. Everything else is optional. We measured median completion time at 41 seconds in UAT, against a target of under a minute.",
        "Reconciliation runs on sync. Records matching a CRM customer above a confidence threshold link automatically; everything else lands in a coordinator exception queue rather than being silently dropped or silently guessed. This was the single most-debated design decision, and the one I would defend most strongly: an exception queue makes the error rate visible and owned, where the previous process made it invisible.",
        "The reporting layer separates three audiences. Reps see only their own activity. Coordinators see their region plus the exception queue. Leadership sees cross-region aggregates with no individual breakdown — enforcing the non-requirement at the data layer rather than by policy.",
      ],
    },
    {
      kind: "architecture",
      title: "Solution Architecture",
      intro:
        "Deliberately conventional. The novelty in this project was in the process design, not the stack.",
      layers: [
        {
          title: "Capture",
          subtitle: "Where the data is created",
          nodes: [
            { label: "Mobile visit form", meta: "offline-first" },
            { label: "Route planner", meta: "weekly" },
            { label: "Local queue", meta: "device storage" },
          ],
        },
        {
          title: "Integration",
          subtitle: "Sync and reconciliation",
          nodes: [
            { label: "Sync service", meta: "idempotent writes" },
            { label: "CRM reader", meta: "read-only" },
            { label: "Match engine", meta: "confidence ≥ 0.9" },
            { label: "Exception queue", meta: "human review" },
          ],
        },
        {
          title: "Data",
          subtitle: "Modelled for reporting, not capture",
          nodes: [
            { label: "Visit fact table", meta: "grain: one visit" },
            { label: "Rep dimension", meta: "SCD type 2" },
            { label: "Customer dimension", meta: "from CRM" },
            { label: "Nightly ETL", meta: "SQL" },
          ],
        },
        {
          title: "Consumption",
          subtitle: "Role-scoped access",
          nodes: [
            { label: "Rep view", meta: "own activity" },
            { label: "Coordinator view", meta: "region + exceptions" },
            { label: "Leadership view", meta: "aggregates only" },
          ],
        },
      ],
    },
    {
      kind: "stories",
      title: "User Stories",
      intro:
        "A representative sample from the backlog. Each shipped with testable acceptance criteria attached.",
      items: [
        {
          id: "DHV-14",
          as: "field sales representative",
          want: "to log a visit without a network connection",
          so: "I can record it accurately at the customer site instead of from memory that evening",
          points: 8,
          priority: "Must",
          criteria: [
            "Given no network connectivity, when I submit a visit, then it is stored locally and shown as 'Pending sync'.",
            "Given a queued visit and restored connectivity, when the app returns to foreground, then the visit syncs without further action from me.",
            "Given the same visit syncs twice, when the server processes it, then exactly one record exists.",
            "Given a queued visit, when I close and reopen the app, then the queued visit is still present.",
          ],
        },
        {
          id: "DHV-22",
          as: "regional coordinator",
          want: "visits that cannot be matched to a CRM customer surfaced in a review queue",
          so: "that no visit is silently excluded from regional totals",
          points: 5,
          priority: "Must",
          criteria: [
            "Given a synced visit with no CRM match above 0.9 confidence, when reconciliation runs, then the visit appears in my exception queue within one refresh cycle.",
            "Given an exception, when I assign it to a customer, then the visit is included in reporting from the next refresh.",
            "Given an exception older than 7 days, when I open the queue, then it is flagged as ageing.",
          ],
        },
        {
          id: "DHV-31",
          as: "sales director",
          want: "regional visit volume and average duration trended over time",
          so: "that I can see where coverage is dropping before it shows up in revenue",
          points: 5,
          priority: "Must",
          criteria: [
            "Given the dashboard, when I open it, then it reflects data no older than the previous night's refresh and states the refresh timestamp.",
            "Given any aggregate view, when I attempt to drill to an individual representative, then no individual-level breakdown is available.",
            "Given a region with fewer than 50 visits in the period, when averages are calculated, then the region is flagged as low-volume.",
          ],
        },
        {
          id: "DHV-38",
          as: "field sales representative",
          want: "my planned route to pre-fill the visit form",
          so: "that logging takes seconds rather than a minute of typing",
          points: 3,
          priority: "Should",
          criteria: [
            "Given a planned visit for today, when I open the capture form, then customer and scheduled time are pre-filled and editable.",
            "Given an unplanned visit, when I open the form, then I can search and select any customer.",
          ],
        },
      ],
    },
    {
      kind: "criteria",
      title: "Acceptance Criteria — Non-Functional",
      intro:
        "The requirements that came out of field observation rather than stakeholder interviews.",
      groups: [
        {
          title: "Performance at the point of capture",
          items: [
            "Median visit capture completes in under 60 seconds, measured across at least 40 UAT sessions.",
            "The capture form becomes interactive within 2 seconds of app launch on the lowest-spec device in the fleet.",
            "Queued visits survive app termination and device restart.",
          ],
        },
        {
          title: "Data integrity",
          items: [
            "Sync is idempotent: replaying a sync produces no duplicate records.",
            "No synced visit may be discarded without appearing in the exception queue.",
            "Every reporting figure is reproducible from the fact table by a documented query.",
          ],
        },
        {
          title: "Access and privacy",
          items: [
            "A representative can retrieve only their own visit records via any interface, including direct API calls.",
            "Leadership-scoped views expose no individual-level breakdown at any drill level.",
            "Role changes take effect no later than the next authentication.",
          ],
        },
      ],
    },
    {
      kind: "kpis",
      title: "Impact",
      intro:
        "Measured 90 days post-rollout against the pre-project baseline established during the document analysis.",
      items: [
        {
          label: "Operational visibility",
          value: 30,
          suffix: "%",
          prefix: "+",
          note: "Composite of data freshness, completeness and cross-region comparability",
        },
        {
          label: "Visit-to-visibility lag",
          value: 19,
          suffix: "d → 1d",
          note: "Median, from 19 days to next-day refresh",
        },
        {
          label: "Records lost in consolidation",
          value: 14,
          suffix: "% → 0%",
          note: "Exception queue replaced silent loss",
        },
        {
          label: "Shadow trackers retired",
          value: 7,
          suffix: " of 7",
          note: "Confirmed with coordinators at the 90-day review",
        },
      ],
    },
    {
      kind: "stack",
      title: "Tech Stack",
      groups: [
        { title: "Analysis", items: ["Jira", "Confluence", "Lucidchart", "Excel"] },
        { title: "Data", items: ["SQL Server", "T-SQL", "Nightly ETL jobs"] },
        { title: "Reporting", items: ["Power BI", "DAX", "Row-level security"] },
        { title: "Design", items: ["Figma", "Field observation protocols"] },
      ],
    },
  ],
};
