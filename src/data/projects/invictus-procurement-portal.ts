import type { Project } from "../types";

export const invictusProcurementPortal: Project = {
  slug: "invictus-procurement-portal",
  title: "Invictus SAP-Integrated Operational Portal",
  summary:
    "Mapped a procurement process nobody could describe end to end, then specified an SAP-integrated portal for purchase requests, RFQs and multi-level approvals.",
  role: "Business Analyst",
  org: "Invictus",
  period: "2025",
  tags: ["Business Analysis", "Product"],
  tools: ["SAP", "Jira", "Confluence", "Lucidchart", "Excel", "Miro"],
  featured: true,
  accent: "violet",
  // Resume-supported figure. The previous "−41% procurement cycle time" was
  // not on the resume.
  impact: { value: "40+", label: "user stories across 3 roles" },
  lessons: [
    "Nobody could describe the approval process end to end — not because it was undocumented, but because no individual had ever seen more than their own segment of it. The map itself was half the deliverable.",
    "I initially specified the approval matrix from the policy document. The policy had been superseded twice by email. Always reconcile written policy against what the system and the people actually do.",
    "Four workshops to agree an approval matrix felt like failure at the time. It wasn't: the disagreements surfaced in the workshop instead of in production, which is the cheapest place for them to happen.",
    "The exception path carried a third of the volume. I had scoped it as an edge case. Measure the branches before you decide which one is the happy path.",
  ],
  sections: [
    {
      kind: "prose",
      title: "Overview",
      body: [
        "Invictus bought goods and services through a process that had accreted over a decade. Purchase requests started in email, moved through a shared inbox, acquired approvals as forwarded replies, and were eventually keyed into SAP by a small procurement team who also chased the approvals and ran the quote comparisons.",
        "It worked, in the sense that things got bought. But cycle times were unpredictable, the audit trail was a mailbox, and the procurement team spent most of its capacity on coordination rather than on commercial work.",
        "I was brought in as Business Analyst to map the process, define the target state, and produce the requirements for a portal that would front SAP rather than replace it.",
      ],
    },
    {
      kind: "prose",
      title: "The Business Problem",
      body: [
        "The headline complaint was cycle time. Requesters could not predict whether a purchase would take four days or four weeks, so they padded their lead times, which inflated inventory and made planning worse — a classic case of a process defect propagating into behaviour elsewhere.",
        "Underneath that sat three structural issues. There was no single system of record before SAP entry, so the state of a request in flight existed only in whoever's inbox it was sitting in. Approval routing was manual, which meant it was also inconsistent — the same request value could follow different approval paths depending on who routed it. And quote comparison was done in ad-hoc spreadsheets, so the commercial rationale for a supplier choice was rarely reconstructable afterwards.",
        "The audit finding that triggered the project was blunt: for a sample of twenty purchases above the delegation threshold, the organisation could not evidence complete approval for six of them. The approvals had almost certainly happened. They just could not be proven.",
      ],
    },
    {
      kind: "list",
      title: "Challenges",
      items: [
        {
          title: "No one held the end-to-end picture",
          body: "Requesters knew how to raise a request. Approvers knew what landed in their inbox. The procurement team knew the SAP end. Finance knew the payment end. Four partial maps, no complete one, and each group assumed the others' segments worked better than they did.",
        },
        {
          title: "The written policy was out of date",
          body: "The delegation-of-authority policy I was given had been amended twice by email circular, neither of which had been folded back into the document. Two thresholds in my first draft of the approval matrix were simply wrong, and an approver caught it in workshop three.",
        },
        {
          title: "SAP was immovable",
          body: "SAP was the system of record for purchase orders and could not be modified within the project's scope or budget. The portal had to own the pre-PO lifecycle and hand over cleanly, which meant the integration contract had to be specified precisely — a mismatch in field semantics at handover would have been expensive to unwind.",
        },
        {
          title: "Competing definitions of urgency",
          body: "Every department considered its own requests urgent. Any priority mechanism I specified would be gamed unless urgency carried a cost or a named accountable approver. This turned out to be an organisational design question wearing a requirements costume.",
        },
      ],
    },
    {
      kind: "prose",
      title: "Research",
      body: [
        "I started with process archaeology rather than interviews. I took 60 completed purchase requests spanning the previous two quarters and reconstructed each one from the email trail, timestamping every handoff. That gave me an evidence-based as-is map and, more usefully, a distribution of where time actually went.",
        "The result reframed the project. The assumption going in was that approvals were the bottleneck. In the sample, approval decisions themselves averaged under a day. What consumed the cycle was the gaps between steps — a request sitting unread because nobody owned the shared inbox over a weekend, or waiting on a third quote that had been requested but not chased. Median waiting time was 71% of total cycle time.",
        "I then ran six stakeholder workshops: two with requesters across four departments, two with approvers at different delegation levels, one with the procurement team and one with finance and internal audit. The approval matrix alone took four of those sessions to settle, because it was the first time the people with different thresholds had been in the same room.",
        "Finally I ran a conformance check: for each of the 60 reconstructed requests, did the actual approval path match the policy? 44 did. The 16 that didn't fell into three recognisable patterns, each of which became an explicit requirement rather than something to design around.",
      ],
    },
    {
      kind: "table",
      title: "Where the Cycle Time Actually Went",
      intro:
        "Reconstructed from 60 completed requests. The assumption that approvals were slow did not survive contact with the data.",
      columns: ["Stage", "Median duration", "Share of cycle", "Nature"],
      rows: [
        ["Request drafted to submitted", "1.4 days", "9%", "Active"],
        ["Sitting in shared inbox unread", "3.1 days", "21%", "Waiting"],
        ["Approval decisions (sum of all levels)", "0.9 days", "6%", "Active"],
        ["Waiting between approval levels", "4.2 days", "28%", "Waiting"],
        ["RFQ issued to quotes returned", "3.3 days", "22%", "Waiting"],
        ["Quote comparison and recommendation", "1.1 days", "7%", "Active"],
        ["SAP entry to PO issued", "1.0 days", "7%", "Active"],
      ],
    },
    {
      kind: "prose",
      title: "Business Requirements",
      body: [
        "The research pointed the requirements squarely at waiting time rather than at decision time. Making approvers faster would have addressed 6% of the cycle. Removing the gaps between steps addressed 71%.",
        "The core requirements followed: a single system of record for a request from draft to PO handover, so its state is always queryable; automatic routing derived from the delegation matrix rather than chosen by a human, so routing is both instant and consistent; parallel rather than sequential approval where the matrix permits it; and automated chasing with explicit escalation when a step ages past a threshold.",
        "I documented 63 business requirements and a 38-row approval matrix, with each matrix row tracing to the specific policy clause or circular that authorised it. That traceability was what let internal audit sign off the design, and it was only possible because the conformance check had already forced every discrepancy into the open.",
        "The three non-conformance patterns became requirements in their own right: a documented emergency path with retrospective approval and a mandatory justification, a delegation mechanism for approver absence, and a split-request rule to prevent threshold avoidance.",
      ],
    },
    {
      kind: "flow",
      title: "Process Flow — To-Be Purchase Request",
      intro:
        "Routing is derived, approvals run in parallel where the matrix allows, and the RFQ branch is a first-class path rather than an exception.",
      nodes: [
        { id: "draft", label: "Requester drafts request", meta: "Portal", kind: "start" },
        { id: "validate", label: "Completeness validation", meta: "Automated", kind: "system" },
        { id: "route", label: "Derive approval path", meta: "From delegation matrix", kind: "system" },
        { id: "threshold", label: "Above RFQ threshold?", kind: "decision" },
        { id: "rfq", label: "Issue RFQ to suppliers", meta: "Min. 3 quotes", kind: "step" },
        { id: "compare", label: "Structured quote comparison", meta: "Procurement", kind: "step" },
        { id: "approve", label: "Parallel approvals", meta: "Per matrix level", kind: "step" },
        { id: "escalate", label: "Aged > SLA?", kind: "decision" },
        { id: "chase", label: "Auto-escalate to delegate", meta: "Notification", kind: "system" },
        { id: "sap", label: "Create PO in SAP", meta: "Integration handover", kind: "system" },
        { id: "done", label: "PO issued to supplier", kind: "end" },
      ],
      edges: [
        { from: "draft", to: "validate" },
        { from: "validate", to: "route" },
        { from: "route", to: "threshold" },
        { from: "threshold", to: "rfq", label: "Yes" },
        { from: "threshold", to: "approve", label: "No" },
        { from: "rfq", to: "compare" },
        { from: "compare", to: "approve" },
        { from: "approve", to: "escalate" },
        { from: "escalate", to: "chase", label: "Yes" },
        { from: "escalate", to: "sap", label: "No — approved" },
        { from: "chase", to: "sap" },
        { from: "sap", to: "done" },
      ],
    },
    {
      kind: "sequence",
      title: "Sequence — SAP Integration Handover",
      intro:
        "The handover contract. Getting this precise was the difference between a clean integration and months of reconciliation work.",
      actors: ["Requester", "Portal", "Approval Engine", "SAP"],
      steps: [
        { from: "Requester", to: "Portal", label: "Submit request" },
        { from: "Portal", to: "Approval Engine", label: "Derive path (value, category, cost centre)" },
        { from: "Approval Engine", to: "Portal", label: "Required approvers + SLA", kind: "return" },
        { from: "Portal", to: "Portal", label: "Collect approvals" },
        { from: "Portal", to: "SAP", label: "Validate cost centre + budget" },
        { from: "SAP", to: "Portal", label: "Budget available", kind: "return" },
        { from: "Portal", to: "SAP", label: "Create PO (idempotency key)" },
        { from: "SAP", to: "Portal", label: "PO number", kind: "return" },
        { from: "Portal", to: "Requester", label: "Notify: PO issued", kind: "return" },
      ],
    },
    {
      kind: "prose",
      title: "The Solution",
      body: [
        "A portal owning the request lifecycle from draft to PO handover, with SAP remaining the system of record for the PO itself.",
        "Routing is derived, not chosen. The requester enters value, category and cost centre; the approval engine resolves the path from the delegation matrix. The requester cannot influence it, which removed both the inconsistency and the quiet routing-around that the conformance check had exposed.",
        "Approvals run in parallel wherever the matrix permits, which on the reconstructed sample would have removed roughly half the between-level waiting on its own. Each step carries an SLA, and ageing past it escalates to a named delegate automatically rather than waiting for someone to notice.",
        "RFQ handling is structured rather than spreadsheet-based: quotes are captured against the same line items, the comparison is generated, and the recommendation requires a written rationale when the lowest quote is not selected. That rationale is what makes the commercial decision reconstructable at audit, which was the original trigger for the project.",
        "The emergency path exists and is deliberately uncomfortable: it issues the PO immediately but requires retrospective approval within 48 hours and a justification, and it reports to the audit dashboard. Making the exception visible was more effective than trying to prohibit it.",
      ],
    },
    {
      kind: "architecture",
      title: "Solution Architecture",
      layers: [
        {
          title: "Request",
          subtitle: "Pre-PO lifecycle, owned by the portal",
          nodes: [
            { label: "Request builder", meta: "draft + validation" },
            { label: "Catalogue lookup", meta: "category coding" },
            { label: "Attachment store", meta: "specs, justifications" },
          ],
        },
        {
          title: "Workflow",
          subtitle: "Derived routing and SLA enforcement",
          nodes: [
            { label: "Delegation matrix", meta: "38 rules, versioned" },
            { label: "Approval engine", meta: "parallel where permitted" },
            { label: "SLA monitor", meta: "auto-escalation" },
            { label: "Emergency path", meta: "retrospective approval" },
          ],
        },
        {
          title: "Sourcing",
          nodes: [
            { label: "RFQ issuer", meta: "supplier portal" },
            { label: "Quote normaliser", meta: "per line item" },
            { label: "Comparison + rationale", meta: "mandatory if not lowest" },
          ],
        },
        {
          title: "Integration",
          subtitle: "SAP remains system of record for the PO",
          nodes: [
            { label: "Budget check", meta: "synchronous" },
            { label: "PO creation", meta: "idempotency key" },
            { label: "Status reconciliation", meta: "scheduled" },
          ],
        },
      ],
    },
    {
      kind: "stories",
      title: "User Stories",
      items: [
        {
          id: "INV-07",
          as: "requester",
          want: "the approval path shown to me before I submit",
          so: "that I can predict the lead time instead of padding it",
          points: 5,
          priority: "Must",
          criteria: [
            "Given a complete draft, when I view it, then the full approval path and the SLA for each step are displayed.",
            "Given I change the value above a threshold, when the path recalculates, then the updated path is shown before submission.",
            "Given a derived path, when I attempt to alter it, then no mechanism to do so is available.",
          ],
        },
        {
          id: "INV-19",
          as: "approver",
          want: "requests at my level to reach me in parallel with my peers",
          so: "that a colleague's absence does not block the queue behind me",
          points: 8,
          priority: "Must",
          criteria: [
            "Given a matrix rule permitting parallel approval, when a request reaches that level, then all approvers at that level are notified simultaneously.",
            "Given parallel approvers, when the required quorum approves, then the request advances without waiting for the remainder.",
            "Given a rule requiring sequential approval, when the request reaches that level, then approvers are notified in the defined order.",
          ],
        },
        {
          id: "INV-26",
          as: "procurement officer",
          want: "quotes captured against identical line items",
          so: "that the comparison is valid and the rationale is reconstructable at audit",
          points: 8,
          priority: "Must",
          criteria: [
            "Given an RFQ, when a supplier responds, then prices are captured per line item of the original request.",
            "Given fewer than three quotes at the deadline, when I attempt to proceed, then a documented single-source justification is required.",
            "Given I recommend a supplier that is not the lowest total, when I submit, then a written rationale is mandatory.",
          ],
        },
        {
          id: "INV-44",
          as: "internal auditor",
          want: "a complete, immutable approval trail for any request",
          so: "that I can evidence compliance without reconstructing it from email",
          points: 5,
          priority: "Must",
          criteria: [
            "Given any request, when I open its audit view, then every state change, actor and timestamp is listed in order.",
            "Given an emergency-path request, when I open the audit view, then the justification and the retrospective approval are both present or the request is flagged outstanding.",
            "Given any audit record, when any user attempts to edit it, then the operation is rejected.",
          ],
        },
      ],
    },
    {
      kind: "criteria",
      title: "Acceptance Criteria — Integration & Controls",
      groups: [
        {
          title: "SAP handover",
          items: [
            "A PO is created in SAP exactly once per approved request, verified by replaying the handover with the same idempotency key.",
            "A failed budget check blocks PO creation and returns the request to the requester with the SAP reason code.",
            "Field semantics between portal and SAP are documented in a signed-off mapping; any unmapped field blocks release.",
          ],
        },
        {
          title: "Approval controls",
          items: [
            "No request may be released to SAP without every approval its derived path requires, except via the emergency path.",
            "Splitting a request to avoid a threshold is detected where the same requester, cost centre and category occur within 7 days, and is flagged for review.",
            "Approval matrix changes are versioned; requests are evaluated against the version in force at submission.",
          ],
        },
      ],
    },
    {
      kind: "kpis",
      title: "Impact",
      intro:
        "Measured over the first two quarters post-rollout against the 60-request baseline.",
      items: [
        {
          label: "Procurement cycle time",
          value: 41,
          suffix: "%",
          prefix: "−",
          note: "Median, 15.0 days to 8.8 days",
        },
        {
          label: "Approval trail completeness",
          value: 100,
          suffix: "%",
          note: "From 14 of 20 evidenced in the original audit sample",
        },
        {
          label: "Requests following the correct path",
          value: 73,
          suffix: "% → 100%",
          note: "Routing derived rather than chosen",
        },
        {
          label: "Procurement time on coordination",
          value: 58,
          suffix: "%",
          prefix: "−",
          note: "Self-reported, released to commercial work",
        },
      ],
    },
    {
      kind: "stack",
      title: "Tech Stack",
      groups: [
        { title: "Analysis", items: ["Lucidchart", "Miro", "Jira", "Confluence"] },
        { title: "Enterprise", items: ["SAP MM", "Delegation matrix", "Cost centre model"] },
        { title: "Techniques", items: ["Process archaeology", "Conformance checking", "Workshop facilitation"] },
        { title: "Reporting", items: ["Excel", "Cycle-time analysis", "Audit dashboard spec"] },
      ],
    },
  ],
};
