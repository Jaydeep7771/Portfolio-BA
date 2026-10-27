import type { ProductCaseStudy } from "./types";

const swiggyCheckout: ProductCaseStudy = {
  slug: "swiggy-checkout-redesign",
  product: "Swiggy",
  title: "Redesigning the Swiggy Checkout",
  summary:
    "A self-directed teardown of the food-delivery checkout, where the last four taps undo a lot of the goodwill the first forty earned.",
  category: "Consumer · Food Delivery",
  accent: "amber",
  context: [
    "Food delivery checkout is unusual: the user has already made the hard decision — what to eat — before checkout begins. By the time they reach payment, intent is near-maximal. Any friction here is pure loss, because nothing in the checkout flow is helping them decide anything.",
    "And yet checkout is where delivery apps stack their monetisation: tip prompts, membership upsells, insurance add-ons, donation requests, fee breakdowns. Each is individually defensible and collectively exhausting.",
    "I ran this teardown because the pattern is instructive beyond food delivery. It's a clean example of local optimisations — each added by a team with its own metric — producing a worse whole that no individual team owns.",
  ],
  journey: [
    {
      stage: "Cart review",
      action: "Opens the cart to confirm items before paying",
      thought: "Right, that's what I wanted. How much is this altogether?",
      emotion: 1,
      painPoint:
        "The total shown in the cart is not the total that will be charged. Fees and taxes appear only at the next step, so the first number the user anchors on is always wrong.",
    },
    {
      stage: "Address confirmation",
      action: "Confirms or changes the delivery address",
      thought: "That's the right address — though is it the flat or the office?",
      emotion: 0,
      painPoint:
        "Saved addresses are labelled inconsistently and the map pin is shown at a zoom level too coarse to distinguish adjacent buildings. Users who get this wrong find out forty minutes later.",
    },
    {
      stage: "Offers and coupons",
      action: "Scans available coupons, tries to find one that applies",
      thought: "There are eleven offers. Which of these actually works on my order?",
      emotion: -1,
      painPoint:
        "Offers are listed rather than evaluated. The user manually determines applicability against conditions written in small print, and discovers failure only on apply. This is work the system could trivially do.",
    },
    {
      stage: "Fee breakdown",
      action: "Expands the bill to understand the gap from item total to payable",
      thought: "Where did the extra come from? That's nearly a third more.",
      emotion: -2,
      painPoint:
        "Five separate line items — delivery, platform, packaging, surge, GST — presented at the moment of payment. This is the single largest emotional drop in the flow and the most common abandonment point.",
    },
    {
      stage: "Upsells",
      action: "Dismisses membership prompt, insurance add-on and donation request",
      thought: "I just want to pay.",
      emotion: -1,
      painPoint:
        "Three interstitials between decision and payment, each requiring an explicit dismissal. Dismissal is a cost the user pays for the platform's benefit.",
    },
    {
      stage: "Tip selection",
      action: "Chooses a tip amount from preset options",
      thought: "Is the default already included? Am I being cheap?",
      emotion: 0,
      painPoint:
        "A pre-selected default tip creates an uncomfortable removal action, and the relationship between tip and the fees already paid is unexplained.",
    },
    {
      stage: "Payment",
      action: "Selects a saved payment method and authenticates",
      thought: "Finally.",
      emotion: 1,
    },
    {
      stage: "Confirmation",
      action: "Lands on the order-tracking screen",
      thought: "Good — how long?",
      emotion: 2,
    },
  ],
  painPoints: [
    {
      title: "Price discovery happens at the worst possible moment",
      body: "The user forms a price expectation in the cart and has it violated at payment. Revealing the complete payable amount — including fees — at cart level would cost some conversion on price-sensitive orders and recover more on trust. The current design optimises the first number at the expense of the last.",
      severity: "High",
    },
    {
      title: "The user does the coupon engine's job",
      body: "Presenting eleven offers and letting the user determine applicability is a computation the platform could run instantly. The correct behaviour is to apply the best eligible offer automatically and show the alternatives as a secondary action.",
      severity: "High",
    },
    {
      title: "Dismissal debt",
      body: "Three sequential upsells, each requiring explicit dismissal, convert a two-tap action into a five-tap one. Each upsell has an owning team with a conversion metric; none owns the cumulative cost. This is an organisational problem expressed as a UI problem.",
      severity: "High",
    },
    {
      title: "Address precision is insufficient for the task",
      body: "The confirmation step shows a map at a zoom level that cannot distinguish adjacent buildings, and saved-address labels are free text. Failure is detected only at delivery, when recovery is expensive for everyone.",
      severity: "Medium",
    },
    {
      title: "Tip framing creates discomfort without increasing tips",
      body: "A pre-selected default makes reducing it feel like an active withdrawal. Published research on tip defaults suggests this increases short-term tip revenue while reducing repeat satisfaction — a trade that is rarely examined because the two metrics sit with different teams.",
      severity: "Medium",
    },
  ],
  competitors: [
    {
      name: "Zomato",
      strength:
        "Shows a consolidated 'to pay' figure earlier in the flow, which reduces the magnitude of the fee surprise.",
      gap: "Equally dense with upsells at checkout; the interstitial burden is comparable.",
    },
    {
      name: "Domino's (first-party)",
      strength:
        "Radically shorter checkout — a first-party merchant has no marketplace economics to surface, and it shows.",
      gap: "No cross-restaurant comparison, so the simplicity isn't transferable to a marketplace.",
    },
    {
      name: "Uber Eats",
      strength:
        "Automatic application of the best eligible promotion, with alternatives available behind a secondary tap. This is the behaviour Swiggy should adopt.",
      gap: "Fee disclosure remains late and the breakdown is similarly fragmented.",
    },
    {
      name: "Amazon (adjacent category)",
      strength:
        "One-tap purchase with all costs resolved before the action. The benchmark for how little a checkout can ask of a decided user.",
      gap: "Different category economics — no courier, no surge, no live-capacity pricing.",
    },
  ],
  hypotheses: [
    "Showing the complete payable amount at cart level will reduce checkout abandonment more than it reduces cart creation, producing a net conversion gain.",
    "Automatically applying the best eligible offer will reduce time-to-payment materially and reduce the share of orders where a user later discovers they missed a discount.",
    "Consolidating three upsells into one contextual prompt will not reduce total upsell revenue proportionally, because the current conversion is partly dismissal fatigue rather than genuine interest.",
    "Removing the pre-selected tip default will reduce average tip slightly and increase repeat order rate — a trade worth making if the second effect is real.",
  ],
  solutions: [
    {
      title: "Move the true total to the cart",
      body: "Display the all-in payable amount in the cart, with the breakdown available on tap. The fee surprise disappears because there is no surprise — the user commits to a number they have already seen. This is the single highest-impact change and also the most organisationally difficult, because it makes fees visible earlier.",
      effort: "M",
      impact: "High",
    },
    {
      title: "Auto-apply the best eligible offer",
      body: "Evaluate all offers against the cart server-side and apply the one producing the lowest payable amount. Show 'Best offer applied — see 10 others' as a secondary link. Removes an entire decision from the critical path.",
      effort: "S",
      impact: "High",
    },
    {
      title: "Collapse upsells into a single contextual slot",
      body: "One upsell per checkout, selected by expected value, placed after payment confirmation rather than before it. Post-payment placement preserves the revenue opportunity while removing it from the friction path entirely.",
      effort: "M",
      impact: "High",
    },
    {
      title: "Building-level address confirmation",
      body: "Default the map to a zoom level where adjacent buildings are distinguishable, and require a structured label — not free text — for new addresses. Prompt for confirmation only when the pin has low accuracy.",
      effort: "M",
      impact: "Medium",
    },
    {
      title: "Neutral tip presentation",
      body: "No pre-selection. Present options including a clearly available zero, with a short statement of how tips reach the courier. Monitor average tip and repeat rate together rather than separately.",
      effort: "S",
      impact: "Medium",
    },
  ],
  wireframes: [
    {
      title: "Cart — all-in pricing",
      caption:
        "The payable total is the primary number. The breakdown is one tap away for anyone who wants it, which is a minority.",
      blocks: [
        "Restaurant · delivery estimate",
        "Item list with quantity steppers",
        "Best offer applied — ₹80 off · see 10 others",
        "Total payable ₹486  ›  breakdown",
        "Primary: Proceed to pay",
      ],
    },
    {
      title: "Checkout — single screen",
      caption:
        "Address, payment and tip on one surface. No interstitials between the decision and the action.",
      blocks: [
        "Deliver to: Flat 402, Brigade Residency  ›  change",
        "Pay with: HDFC •••• 4412  ›  change",
        "Tip the courier: — ₹20 ₹30 ₹50 (none pre-selected)",
        "Total ₹486",
        "Primary: Pay ₹486",
      ],
    },
    {
      title: "Post-payment — the upsell slot",
      caption:
        "A single offer, after commitment. Revenue opportunity retained, friction cost removed.",
      blocks: [
        "Order confirmed · arriving 7:40–7:55 pm",
        "Live tracking map",
        "One contextual offer (membership OR insurance, not both)",
        "Secondary: Order details",
      ],
    },
  ],
  metrics: [
    {
      label: "Checkout abandonment",
      value: 18,
      suffix: "%",
      prefix: "−",
      note: "Primary success metric; target reduction",
    },
    {
      label: "Median time cart → payment",
      value: 42,
      suffix: "s → 19s",
      note: "Removing offer evaluation and interstitials",
    },
    {
      label: "Orders with best offer applied",
      value: 100,
      suffix: "%",
      note: "From an estimated 60% under manual selection",
    },
    {
      label: "Guardrail: upsell revenue per order",
      value: 95,
      suffix: "%",
      note: "Must retain ≥95% of baseline, or the change is reverted",
    },
  ],
  rollout: [
    "Instrument the current funnel properly first — per-step drop-off and time-on-step are not currently separable from the data available.",
    "A/B the auto-apply offer change alone. It is low-effort, low-risk, and establishes whether the measurement setup works.",
    "A/B all-in cart pricing at 5% of traffic in two cities, monitoring cart creation and checkout completion as a pair rather than individually.",
    "Move upsells post-payment last, with upsell revenue per order as a hard guardrail and automatic revert below 95% of baseline.",
    "Hold each test for two full weekly cycles — food delivery has strong day-of-week effects that will mislead a shorter read.",
  ],
};

const linkedinJobSearch: ProductCaseStudy = {
  slug: "linkedin-job-search",
  product: "LinkedIn",
  title: "Improving LinkedIn Job Search",
  summary:
    "A teardown of the job seeker's experience, where the core problem is not finding postings but judging them — and the product optimises for the wrong one.",
  category: "Professional Network · Marketplace",
  accent: "sky",
  context: [
    "LinkedIn's job search works well as a retrieval system. Enter a title and a location and you will get hundreds of relevant postings within seconds. Retrieval is solved.",
    "What is not solved is judgement. The seeker's real questions are: is this posting live, will a human read my application, do I actually meet the bar, and how many others have applied? The product answers none of these well, and the information asymmetry runs entirely in the employer's favour.",
    "I ran this teardown from the position of an active job seeker, which gave me a usefully frustrated perspective and a real data trail — 60 applications across three months, with outcomes.",
  ],
  journey: [
    {
      stage: "Search",
      action: "Enters a title and location, applies a few filters",
      thought: "Over 2,000 results. That seems like a lot of opportunity.",
      emotion: 1,
    },
    {
      stage: "Filtering",
      action: "Tries to narrow by experience level and date posted",
      thought: "Why are 'entry level' results asking for five years?",
      emotion: -1,
      painPoint:
        "Experience-level filters rely on employer self-classification, which is systematically inaccurate. The filter removes relevant results and retains irrelevant ones, so experienced users stop trusting it.",
    },
    {
      stage: "Scanning",
      action: "Reads titles and companies in the result list",
      thought: "I've seen this exact posting before. Is it new or re-listed?",
      emotion: -1,
      painPoint:
        "Re-posted roles appear as new. A seeker cannot distinguish a genuinely fresh vacancy from one that has been open and unfilled for four months, which are very different propositions.",
    },
    {
      stage: "Evaluating a posting",
      action: "Opens a posting and reads the requirements",
      thought: "Twelve requirements. Which of these are real?",
      emotion: 0,
      painPoint:
        "Requirement lists conflate must-haves with aspirations. The product offers no signal about which matter, so seekers either over-filter themselves out or apply indiscriminately.",
    },
    {
      stage: "Judging competition",
      action: "Looks at the applicant count",
      thought: "Over 100 applicants. Is it worth the forty minutes?",
      emotion: -2,
      painPoint:
        "Applicant count is shown without context — no indication of how many were screened out, whether the employer is actively reviewing, or when they last did. The number induces discouragement without informing a decision.",
    },
    {
      stage: "Applying",
      action: "Submits via Easy Apply or is redirected to an external ATS",
      thought: "Another account to create.",
      emotion: -1,
      painPoint:
        "The split between Easy Apply and external redirect is unpredictable and not signalled in the result list, so the seeker cannot budget their time before committing to a posting.",
    },
    {
      stage: "Waiting",
      action: "Checks the application status page",
      thought: "Three weeks. Has anyone even opened it?",
      emotion: -2,
      painPoint:
        "No meaningful status. 'Application viewed' is inconsistently populated and the absence of a signal is indistinguishable from rejection. This is the single largest source of frustration in the whole experience.",
    },
    {
      stage: "Outcome",
      action: "Receives a rejection, or more often nothing at all",
      thought: "I'll never know why.",
      emotion: -2,
      painPoint:
        "Silence is the modal outcome. The seeker cannot learn from it, so the next sixty applications are no better targeted than the first.",
    },
  ],
  painPoints: [
    {
      title: "The outcome is silence, and silence teaches nothing",
      body: "In my own 60-application sample, 71% received no response of any kind. A seeker running this loop gets no feedback signal, so cannot improve targeting. This is a marketplace failure: the platform has the data to tell a seeker whether their profile is being filtered out at screening, and does not.",
      severity: "High",
    },
    {
      title: "Posting freshness is unknowable",
      body: "A re-posted four-month-old role and a vacancy opened yesterday look identical. These have very different conversion odds and the seeker should be able to tell them apart. LinkedIn holds this history.",
      severity: "High",
    },
    {
      title: "Applicant count discourages without informing",
      body: "'Over 100 applicants' is the most-read and least-useful number on the page. Replacing it with employer-activity signals — last reviewed, share screened — would convert an anxiety trigger into a decision input.",
      severity: "High",
    },
    {
      title: "Filters that cannot be trusted stop being used",
      body: "Experience-level accuracy is poor because it depends on employer self-classification. Inferring level from the requirement text would be more accurate than the current field, and LinkedIn already does comparable inference elsewhere.",
      severity: "Medium",
    },
    {
      title: "Application route is not visible before commitment",
      body: "Whether a posting is Easy Apply or a 30-minute external ATS form is material to a seeker budgeting their week. It is not shown in the result list.",
      severity: "Medium",
    },
  ],
  competitors: [
    {
      name: "Indeed",
      strength:
        "Clearer posting age and a more reliable response-rate signal on employers.",
      gap: "Weaker professional graph, so no relationship-based context on the company.",
    },
    {
      name: "Hiring Cafe / niche aggregators",
      strength:
        "Aggressive de-duplication and explicit flagging of re-posted and stale roles — exactly the gap LinkedIn leaves.",
      gap: "Much smaller inventory; a complement rather than a substitute.",
    },
    {
      name: "Otta",
      strength:
        "Opinionated matching with explicit reasoning for why a role was surfaced, which builds trust in the ranking.",
      gap: "Narrow segment and geography.",
    },
    {
      name: "AngelList Talent",
      strength:
        "Salary disclosure is mandatory, which removes a whole category of wasted applications.",
      gap: "Startup-only inventory.",
    },
  ],
  hypotheses: [
    "Showing employer responsiveness — share of applications reviewed, median time to first action — will shift applications toward responsive employers and raise overall seeker satisfaction without reducing total application volume.",
    "Distinguishing fresh postings from re-posts will reduce wasted applications and increase per-application conversion enough to offset lower raw volume.",
    "Replacing raw applicant count with a review-activity signal will reduce abandonment at the posting page.",
    "Inferring experience level from requirement text will outperform employer self-classification on seeker-rated relevance.",
  ],
  solutions: [
    {
      title: "Employer responsiveness score",
      body: "A visible, computed signal on every posting: share of applications reviewed in the last 90 days and median time to first employer action. LinkedIn already holds this data. Publishing it realigns the marketplace by making unresponsiveness costly, which is the only mechanism likely to change employer behaviour.",
      effort: "M",
      impact: "High",
    },
    {
      title: "Posting lineage",
      body: "Show whether a posting is new, re-posted, or continuously open, with the original listing date. One line of text; materially changes the seeker's decision.",
      effort: "S",
      impact: "High",
    },
    {
      title: "Replace applicant count with review activity",
      body: "Swap 'over 100 applicants' for 'employer last reviewed applications 2 days ago · 40% screened'. Same data source, far better decision support, and less discouraging without being dishonest.",
      effort: "S",
      impact: "High",
    },
    {
      title: "Inferred requirement tiering",
      body: "Parse the posting to separate likely must-haves from likely nice-to-haves and present them in two groups, clearly labelled as inferred. Helps the seekers who currently filter themselves out of roles they'd get.",
      effort: "L",
      impact: "Medium",
    },
    {
      title: "Application route badge",
      body: "Label each result as Easy Apply or external, with an estimated completion time for the external route. Lets seekers allocate effort deliberately.",
      effort: "S",
      impact: "Medium",
    },
  ],
  wireframes: [
    {
      title: "Result card — with trust signals",
      caption:
        "Three added lines convert a retrieval result into something a seeker can actually judge.",
      blocks: [
        "Senior Business Analyst · Acme Corp · Bengaluru",
        "Posted 3 days ago · new listing (not re-posted)",
        "Employer reviews applications · last active 2 days ago",
        "Easy Apply · ~2 min",
        "Secondary: Save · Primary: Apply",
      ],
    },
    {
      title: "Posting page — requirement tiering",
      caption:
        "Inferred, clearly labelled as such. The seeker remains the judge; the product does the reading.",
      blocks: [
        "Role summary · salary range if disclosed",
        "Likely must-have (inferred): SQL, requirements documentation, 3+ yrs",
        "Likely preferred (inferred): Power BI, SAP exposure, Agile certification",
        "Employer activity: 40% of 112 applications screened",
        "Primary: Apply · Secondary: Why this was shown to you",
      ],
    },
    {
      title: "Application tracker — honest states",
      caption:
        "Replacing ambiguous silence with a definite state, including the unflattering ones.",
      blocks: [
        "Submitted · 14 Mar",
        "Viewed by employer · 16 Mar",
        "Status: not progressed · 02 Apr",
        "Employer median time to decision: 19 days",
        "Secondary: Similar roles at responsive employers",
      ],
    },
  ],
  metrics: [
    {
      label: "Applications receiving any response",
      value: 29,
      suffix: "% → 55%",
      note: "Primary metric; driven by shifting volume to responsive employers",
    },
    {
      label: "Wasted applications to stale postings",
      value: 40,
      suffix: "%",
      prefix: "−",
      note: "Via posting lineage disclosure",
    },
    {
      label: "Posting-page abandonment",
      value: 15,
      suffix: "%",
      prefix: "−",
      note: "Replacing applicant count with review activity",
    },
    {
      label: "Guardrail: total applications submitted",
      value: 90,
      suffix: "%",
      note: "Must stay ≥90% of baseline — fewer but better, not simply fewer",
    },
  ],
  rollout: [
    "Ship posting lineage first. It is one line of text, carries almost no risk, and immediately tests whether seekers change behaviour given better information.",
    "Replace applicant count with review activity behind an experiment, monitoring posting-page abandonment and application starts together.",
    "Pilot the employer responsiveness score as seeker-visible in two markets, with a 90-day notice period to employers — this is a behaviour-change mechanism and needs to be announced to work.",
    "Treat requirement tiering as a research project before a feature; validate inference accuracy against seeker judgement on a labelled sample before exposing it.",
    "Watch the guardrail closely. A drop in total applications is acceptable only if response rate rises more than proportionally.",
  ],
};

const amazonReturns: ProductCaseStudy = {
  slug: "amazon-return-experience",
  product: "Amazon",
  title: "Rethinking the Amazon Return Experience",
  summary:
    "A teardown of a flow that is genuinely well-built, to examine a harder question: what is left to improve when the obvious problems are already solved?",
  category: "E-commerce · Post-purchase",
  accent: "emerald",
  context: [
    "I chose Amazon returns deliberately because it is good. Teardowns of broken products are easy and teach little. The interesting question is what remains when a flow has already been optimised for a decade.",
    "Amazon's return flow is fast, the policy is clear, and drop-off is convenient in most markets. The friction that remains is not in the mechanics — it is in the uncertainty around money and in the fact that the return event is treated as an ending rather than as the richest feedback signal in the business.",
    "That second point is the one I'd push hardest in a product review. A return is a customer telling you precisely what was wrong with a purchase, at the moment they care most. Most of that signal is currently discarded.",
  ],
  journey: [
    {
      stage: "Realising there's a problem",
      action: "Opens the item, finds it unsuitable",
      thought: "This isn't what I expected from the listing.",
      emotion: -1,
    },
    {
      stage: "Finding the return option",
      action: "Navigates to Orders and selects Return",
      thought: "That was easy to find.",
      emotion: 1,
    },
    {
      stage: "Choosing a reason",
      action: "Selects from a list of return reasons",
      thought: "None of these is quite right. 'Not as described' is closest.",
      emotion: 0,
      painPoint:
        "The reason taxonomy is built for Amazon's operational routing, not for the customer's actual explanation. Customers round their real reason to the nearest available option, which systematically corrupts the data downstream.",
    },
    {
      stage: "Choosing a method",
      action: "Picks drop-off, pickup or locker",
      thought: "Drop-off is fine, there's one nearby.",
      emotion: 1,
    },
    {
      stage: "Understanding the refund",
      action: "Reads the refund terms",
      thought: "When exactly do I get my money? And how much?",
      emotion: -1,
      painPoint:
        "Refund timing is expressed as a conditional chain — after receipt, after inspection, then 3–5 business days — with no single date. For a high-value item this uncertainty is the dominant anxiety of the whole process.",
    },
    {
      stage: "Packing and dropping off",
      action: "Takes the item to a drop-off point and scans the code",
      thought: "Thirty seconds. Genuinely good.",
      emotion: 2,
    },
    {
      stage: "Waiting for the refund",
      action: "Checks the return status page periodically",
      thought: "It says 'in transit'. Still? It's been six days.",
      emotion: -2,
      painPoint:
        "Status granularity drops sharply after drop-off. The customer has surrendered the item and has no money and no information — the worst position in the transaction, and the longest.",
    },
    {
      stage: "Refund received",
      action: "Sees the refund on the payment method",
      thought: "Good. No notification though — I found out by checking.",
      emotion: 1,
      painPoint:
        "The resolution moment, which is the best opportunity in the whole flow to restore goodwill, passes without acknowledgement.",
    },
  ],
  painPoints: [
    {
      title: "The customer is item-less and money-less for the longest stretch",
      body: "Between drop-off and refund the customer has given up the goods and received nothing, and this is also the period with the least information. Everything else in the flow is optimised; this window is where the remaining dissatisfaction lives.",
      severity: "High",
    },
    {
      title: "Refund timing is a conditional chain, not a date",
      body: "Customers want one number: when will the money be there. Amazon has the data to forecast this with reasonable confidence — transit times and inspection durations are well-characterised — and instead presents the dependency chain.",
      severity: "High",
    },
    {
      title: "Return reasons are collected for routing, not for learning",
      body: "The taxonomy serves warehouse disposition. As a result the most valuable signal in e-commerce — a customer explaining, at the moment of maximum clarity, exactly how a listing misled them — is flattened into eight operational categories.",
      severity: "High",
    },
    {
      title: "Returns don't inform the listing",
      body: "If 30% of a garment is returned for sizing, that is decision-critical information for the next buyer and it is not surfaced. Showing it would reduce returns, increase trust, and cost a small amount of conversion on the affected items.",
      severity: "Medium",
    },
    {
      title: "Resolution passes silently",
      body: "The refund lands with no proactive notification. The single cheapest goodwill intervention available in the flow is simply not made.",
      severity: "Low",
    },
  ],
  competitors: [
    {
      name: "Zappos",
      strength:
        "Returns treated as a brand moment rather than a cost centre; generous windows and proactive communication throughout.",
      gap: "Economics only work in a high-margin, narrow category.",
    },
    {
      name: "ASOS",
      strength:
        "Surfaces fit and sizing feedback derived from returns directly on the product page — exactly the loop Amazon leaves closed.",
      gap: "Slower refunds and a less convenient drop-off network.",
    },
    {
      name: "Myntra",
      strength:
        "Instant refund to store credit at the moment of pickup, which eliminates the money-less window entirely for customers willing to take credit.",
      gap: "Store credit is not cash; it defers rather than removes the issue for some customers.",
    },
    {
      name: "IKEA",
      strength:
        "Immediate in-store refund — the benchmark for removing uncertainty, at the cost of requiring a physical visit.",
      gap: "Not applicable to a pure e-commerce model.",
    },
  ],
  hypotheses: [
    "A single forecast refund date, shown at initiation and held accurate, will reduce return-related contacts more than any improvement in actual refund speed.",
    "Instant refund at scan, for customers above a trust threshold, will increase repeat purchase rate enough to offset the fraud exposure on that segment.",
    "A return-reason taxonomy designed for learning rather than routing will materially improve the usefulness of the resulting data, at no cost to operational disposition if the operational code is captured separately.",
    "Surfacing aggregated return reasons on the product page will reduce the return rate for affected items by more than it reduces their conversion.",
  ],
  solutions: [
    {
      title: "One forecast refund date",
      body: "Replace the conditional chain with a single predicted date at initiation, updated at each milestone, and treat accuracy as the metric. Customers tolerate a long wait far better than an unknown one — the certainty is worth more than the speed.",
      effort: "M",
      impact: "High",
    },
    {
      title: "Instant refund at scan for trusted customers",
      body: "For customers above a return-behaviour trust threshold, refund at the moment of drop-off scan rather than after inspection. This removes the money-less window entirely for the majority of returns, and the fraud exposure is bounded by the threshold.",
      effort: "L",
      impact: "High",
    },
    {
      title: "Two-layer return reasons",
      body: "Capture a customer-facing reason designed for learning and an operational disposition code separately. Stop forcing one taxonomy to serve two purposes — this is the root cause of the data quality problem.",
      effort: "M",
      impact: "High",
    },
    {
      title: "Return insight on the product page",
      body: "Where a return reason is concentrated, state it: 'Frequently returned — 31% of buyers report it runs small.' This reduces returns, increases trust, and costs some conversion on the affected items. That trade is worth making and the data to evaluate it already exists.",
      effort: "M",
      impact: "High",
    },
    {
      title: "Acknowledge the resolution",
      body: "Notify on refund, with the amount and the method. Trivial to build; it converts a silent ending into a closed loop.",
      effort: "S",
      impact: "Medium",
    },
  ],
  wireframes: [
    {
      title: "Return initiation — reason for learning",
      caption:
        "A taxonomy that asks what actually happened, with the operational code derived behind it.",
      blocks: [
        "Returning: Linen shirt, size M",
        "What happened? Sizing · Quality below expectation · Listing inaccurate · Changed mind · Arrived damaged · Wrong item",
        "Follow-up (if sizing): too small / too large / inconsistent with size guide",
        "Optional: one line in your own words",
        "Primary: Continue",
      ],
    },
    {
      title: "Confirmation — one date",
      caption:
        "The conditional chain replaced by a commitment. Accuracy becomes the metric that matters.",
      blocks: [
        "Drop off by 18 Mar at any of 6 nearby points",
        "Refund of ₹2,499 expected by 24 Mar",
        "We'll notify you when it's sent",
        "Primary: Get drop-off code",
      ],
    },
    {
      title: "Product page — return insight",
      caption:
        "The loop closed. Costs some conversion on this item; saves the return and the trust.",
      blocks: [
        "Linen shirt · ₹2,499",
        "Frequently returned: 31% of buyers say it runs small",
        "Size guide · consider one size up",
        "Primary: Add to cart",
      ],
    },
  ],
  metrics: [
    {
      label: "Return-related support contacts",
      value: 35,
      suffix: "%",
      prefix: "−",
      note: "Primary metric; driven by refund-date certainty",
    },
    {
      label: "Refund date forecast accuracy",
      value: 95,
      suffix: "%",
      note: "Within the committed date — the number that makes the promise credible",
    },
    {
      label: "Return rate on items with surfaced insight",
      value: 22,
      suffix: "%",
      prefix: "−",
      note: "Fewer mismatched purchases reaching dispatch",
    },
    {
      label: "Guardrail: conversion on flagged items",
      value: 92,
      suffix: "%",
      note: "Expected to fall; acceptable only above this floor",
    },
  ],
  rollout: [
    "Ship the refund notification first — one day of work, immediate goodwill, and it establishes the notification channel the later changes depend on.",
    "Introduce the forecast refund date in one category, measuring forecast accuracy before exposing any promise language.",
    "Run the two-layer reason taxonomy in parallel with the existing one for a full quarter, so the learning data accumulates without disturbing operational routing.",
    "Pilot return insight on the product page in a category with high return concentration, and accept a conversion decline within the guardrail — the trade is deliberate.",
    "Hold instant refund at scan until the trust model is validated offline against at least two quarters of return history.",
  ],
};

export const productCaseStudies: ProductCaseStudy[] = [
  swiggyCheckout,
  linkedinJobSearch,
  amazonReturns,
];

export function getCaseStudy(slug: string) {
  return productCaseStudies.find((c) => c.slug === slug);
}
