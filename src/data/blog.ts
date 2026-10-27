import type { BlogPost } from "./types";

const aiTransformingBa: BlogPost = {
  slug: "ai-transforming-business-analysis",
  title: "How AI Is Transforming Business Analysis",
  excerpt:
    "Not by replacing analysts, and not in the ways the vendor decks suggest. A working account of what actually changed in my process over eighteen months.",
  date: "2025-09-18",
  category: "AI & BA",
  readingMinutes: 9,
  featured: true,
  accent: "sky",
  body: [
    {
      kind: "p",
      text: "Eighteen months ago I started using language models in my day-to-day analysis work. I want to describe what actually changed, because the gap between the vendor narrative and my experience is wide enough to be worth documenting.",
    },
    {
      kind: "p",
      text: "The short version: the mechanical 60% of the job compressed dramatically, the judgement-heavy 40% did not compress at all, and a new category of work appeared that did not exist before — verifying machine output. The net saving is real but smaller than the headline numbers suggest, and it lands in a different place than I expected.",
    },
    { kind: "h2", text: "What actually compressed" },
    {
      kind: "p",
      text: "Transformation work. Not thinking — transformation. Taking a requirement that is already understood and expressing it as a user story. Taking a story and deriving the obvious acceptance criteria. Taking criteria and writing the test cases that follow from them. Restructuring a document written for one audience so it works for another.",
    },
    {
      kind: "p",
      text: "This is a large share of a BA's week and almost none of it is where the value is. It is also exactly the shape of task that language models handle well, because the information is all present and the work is reorganising it.",
    },
    {
      kind: "p",
      text: "When I instrumented my own decomposition work, roughly 82% of the time between a signed-off requirements document and a sprint-ready backlog was transformation or transcription. That is the number that matters, and it is the one that moves.",
    },
    { kind: "h2", text: "What did not compress at all" },
    {
      kind: "p",
      text: "Everything that requires knowing something the documents do not contain.",
    },
    {
      kind: "ul",
      items: [
        "Knowing that the stakeholder who said 'this is critical' says that about everything, and the quiet one in the corner is the person whose objection will actually sink the project.",
        "Noticing that a requirement is technically clear and commercially wrong.",
        "Deciding which of two valid interpretations the organisation can actually live with.",
        "Recognising that the real constraint was never mentioned in any meeting because everyone present considers it too obvious to state.",
        "Judging when a process is bad enough to redesign rather than automate.",
      ],
    },
    {
      kind: "p",
      text: "A model has no access to any of this. It cannot have. It sees the documents, and the documents are the output of the elicitation process, not a substitute for it.",
    },
    {
      kind: "callout",
      title: "The distinction that matters",
      text: "Models are good at transformation and poor at judgement. Almost every disappointing AI-in-BA story I have heard comes from someone who deployed it against the second category and was surprised when it produced confident, fluent, wrong answers.",
    },
    { kind: "h2", text: "The new work: verification" },
    {
      kind: "p",
      text: "This is the part nobody mentions. Machine-generated artefacts have to be checked, and checking is not free.",
    },
    {
      kind: "p",
      text: "I learned this the hard way. An early version of a tool I built generated genuinely good user stories from a requirements document. A BA I tested it with told me she would not use it, because verifying thirty generated stories against a forty-page document would take her longer than writing them herself. She was right, and it was the most useful piece of feedback I received.",
    },
    {
      kind: "p",
      text: "The fix was structural rather than a matter of output quality: pin every generated artefact to the specific source text that produced it. Verification then becomes reading two adjacent paragraphs instead of searching a document. Same model, same output quality, completely different economics.",
    },
    {
      kind: "quote",
      text: "If verifying the output takes as long as producing it, the tool has no value regardless of how good the output is.",
    },
    { kind: "h2", text: "Where it goes quietly wrong" },
    {
      kind: "p",
      text: "Three failure modes I have hit repeatedly, none of which announce themselves.",
    },
    {
      kind: "h3",
      text: "Ambiguity gets silently resolved",
    },
    {
      kind: "p",
      text: "Give a model an ambiguous requirement and ask for acceptance criteria. It will not tell you the requirement is ambiguous. It will pick an interpretation — usually the most common one in its training data — and write confident, specific criteria for it. You now have a well-documented implementation of a decision nobody made.",
    },
    {
      kind: "p",
      text: "This is the most dangerous failure mode in the whole category, because the output looks like success. In my own tooling, detecting and flagging ambiguity turned out to be more valuable than any improvement in generation quality.",
    },
    { kind: "h3", text: "Plausible coverage replaces real coverage" },
    {
      kind: "p",
      text: "A generated backlog looks complete. Completeness is the thing it is best at simulating. Unless you are explicitly checking requirement-to-artefact coverage in both directions, a generated backlog can miss requirements just as a human one can, while looking considerably more thorough.",
    },
    { kind: "h3", text: "Fluency is mistaken for correctness" },
    {
      kind: "p",
      text: "Generated documents read better than most human-written specs. Reviewers consequently review them less carefully. I have caught myself doing this. The polish is doing work it has not earned.",
    },
    { kind: "h2", text: "What I would tell a BA starting now" },
    {
      kind: "ol",
      items: [
        "Automate transformation, never judgement. If the information needed to do the task is not in the document, the model cannot do the task.",
        "Demand traceability before quality. An artefact you cannot verify cheaply is worthless, however good it is.",
        "Treat flagged ambiguity as the primary output, not an error. A tool that tells you which of your requirements are unclear has already paid for itself.",
        "Measure coverage in both directions. Requirements with no artefact, and artefacts with no requirement.",
        "Stay in the elicitation room. The part of the job a model cannot touch is the part where you find out what is actually going on, and it is becoming the larger share of the role.",
      ],
    },
    { kind: "h2", text: "The honest summary" },
    {
      kind: "p",
      text: "My decomposition work went from about five days to a bit over one, including review. That is a real and substantial saving. It did not make me a better analyst — it moved my time from transformation to elicitation and judgement, which is where I was adding value anyway.",
    },
    {
      kind: "p",
      text: "The analysts who will struggle are the ones whose value was concentrated in producing documents. The ones who will do well are the ones whose value was in working out what the documents should say. That distinction existed before any of this; the technology has simply made it impossible to ignore.",
    },
  ],
};

const betterUserStories: BlogPost = {
  slug: "writing-better-user-stories",
  title: "Writing Better User Stories",
  excerpt:
    "Most story-writing advice optimises the template. The template was never the problem — what sits behind it is.",
  date: "2025-07-22",
  category: "Craft",
  readingMinutes: 8,
  featured: true,
  accent: "violet",
  body: [
    {
      kind: "p",
      text: "There is a lot of advice about user stories and most of it is about the sentence. As a X, I want Y, so that Z. Get the role right. Make the benefit real. Avoid writing solutions.",
      },
    {
      kind: "p",
      text: "This advice is fine and it is not where stories go wrong. In six years of reading other people's backlogs, I have almost never seen a project fail because the template was wrong. I have repeatedly seen projects fail because a perfectly formatted story concealed a decision nobody had made.",
    },
    { kind: "h2", text: "The real test" },
    {
      kind: "p",
      text: "A story is good if a developer can build it, a tester can verify it, and neither needs to find you. That is the whole bar. Everything else is in service of it.",
    },
    {
      kind: "p",
      text: "Apply that test to your last sprint's stories honestly. Count how many generated a clarifying question. That count is your actual story quality metric, and it is far more informative than any template audit.",
    },
    { kind: "h2", text: "Where stories actually fail" },
    { kind: "h3", text: "1. The benefit is circular" },
    {
      kind: "p",
      text: "'As a user, I want to filter the list, so that I can filter the list.' Restating the want as the benefit is the most common defect I see, and it signals that nobody asked why the feature exists.",
    },
    {
      kind: "p",
      text: "The fix is to push one level further. Why does filtering matter? Because the list has 400 rows and the user is looking for one. Now the story carries information — and a developer reading it might reasonably suggest search instead, which is a conversation worth having before the sprint rather than after.",
    },
    { kind: "h3", text: "2. The story hides a decision" },
    {
      kind: "p",
      text: "'As an admin, I want to deactivate a user, so that they can no longer access the system.' Reasonable-looking. But what happens to the records they own? Are their in-flight approvals reassigned or cancelled? Can they be reactivated, and does their history survive? Does their name still appear on historical records?",
    },
    {
      kind: "p",
      text: "None of this is in the story. Somebody will decide it — probably a developer, at 4pm on the last day of the sprint, without the context to decide it well. The decision gets made either way; the only question is whether it is made deliberately.",
    },
    {
      kind: "callout",
      title: "A useful habit",
      text: "Before a story enters a sprint, ask: what will a developer have to decide that isn't written here? If the answer isn't 'nothing', the story isn't ready — and the gap is usually in the acceptance criteria rather than the sentence.",
    },
    { kind: "h3", text: "3. Acceptance criteria restate the story" },
    {
      kind: "p",
      text: "If the story says the user can filter by status and the criteria say 'user can filter by status', the criteria have added nothing. Criteria exist to pin down the cases the story leaves open.",
    },
    {
      kind: "p",
      text: "What happens with no results? What happens when filters combine? Does the filter persist across navigation? What is the behaviour while the data loads? What about 10,000 rows?",
    },
    {
      kind: "p",
      text: "These are the questions a tester will ask. Writing them down before the sprint is cheaper than answering them during it.",
    },
    { kind: "h3", text: "4. The story is a solution wearing a story costume" },
    {
      kind: "p",
      text: "'As a user, I want a dropdown in the top-right corner, so that I can switch accounts.' The dropdown and the corner are design decisions that have been smuggled in. Sometimes that is legitimate — there may be a real constraint. Usually it means someone imagined an interface and wrote it down as a requirement, and the team has lost the chance to find a better one.",
    },
    { kind: "h2", text: "Criteria worth writing" },
    {
      kind: "p",
      text: "I use Given-When-Then, not because the format is magic but because it forces a precondition. Most ambiguity hides in the precondition.",
    },
    {
      kind: "code",
      language: "gherkin",
      code: `Given a visit queued offline
When connectivity is restored and the app returns to foreground
Then the visit syncs without further user action

Given the same visit is submitted twice
When the server processes both
Then exactly one record exists

Given a queued visit
When the app is closed and reopened
Then the queued visit is still present`,
    },
    {
      kind: "p",
      text: "Three criteria, three genuinely different situations. None restates the story. The second one — idempotency — is the kind of thing that never appears in a story sentence and always causes a production incident when it is missed.",
    },
    { kind: "h2", text: "A checklist that actually catches things" },
    {
      kind: "ol",
      items: [
        "Can a developer build this without asking me anything? If not, what would they ask? Write that down and answer it.",
        "Can a tester verify it without asking me anything? If the criteria don't say what 'done' looks like in the awkward cases, they aren't finished.",
        "Does the benefit say something the want doesn't? If not, push one level deeper.",
        "What does this story not cover that someone might assume it does? Say so explicitly — out-of-scope notes prevent more rework than any amount of detail.",
        "Does any criterion describe an interface element? If so, is that a real constraint or an assumption?",
      ],
    },
    { kind: "h2", text: "On splitting" },
    {
      kind: "p",
      text: "Split along behaviour, not along architecture. 'Backend for search' and 'frontend for search' are not two stories — neither delivers anything on its own, and you cannot demonstrate either.",
    },
    {
      kind: "p",
      text: "'Search by exact name' and 'search with fuzzy matching' are two stories. Each is independently valuable, independently demonstrable, and the first might turn out to be enough.",
    },
    {
      kind: "p",
      text: "That last point is the underrated benefit of splitting well: it exposes the possibility that you do not need the second half.",
    },
  ],
};

const chatgptAsBa: BlogPost = {
  slug: "using-chatgpt-as-a-business-analyst",
  title: "Using ChatGPT as a Business Analyst",
  excerpt:
    "Six prompt patterns I use weekly, three I abandoned, and the one rule that determines whether any of it helps.",
  date: "2025-06-10",
  category: "AI & BA",
  readingMinutes: 7,
  accent: "emerald",
  body: [
    {
      kind: "p",
      text: "This is a practical post. No discussion of whether AI will replace analysts — just the specific patterns I use, the ones I stopped using, and why.",
    },
    {
      kind: "callout",
      title: "The rule everything else follows from",
      text: "Use it where the information is already in front of you and the work is reorganising it. Never use it where the answer depends on something only a person in your organisation knows.",
    },
    { kind: "h2", text: "Patterns I use weekly" },
    { kind: "h3", text: "1. Adversarial requirement review" },
    {
      kind: "p",
      text: "The single highest-value use. Paste a requirement and ask for every way it could be misread.",
    },
    {
      kind: "code",
      language: "text",
      code: `Here is a requirement from a BRD:

"The system shall notify the manager when a request is overdue."

List every ambiguity. For each, give the competing
interpretations and the question I should ask to resolve it.
Do not resolve anything yourself.`,
    },
    {
      kind: "p",
      text: "This reliably finds four or five genuine ambiguities. Which manager — the requester's or the approver's? Overdue against what, submission or the current approval step? Notified how, and how often? Does it repeat? What if the manager is the one who is late?",
    },
    {
      kind: "p",
      text: "The 'do not resolve anything yourself' instruction matters. Without it the model picks an interpretation and proceeds, which is the opposite of what you want.",
    },
    { kind: "h3", text: "2. Stakeholder perspective rehearsal" },
    {
      kind: "p",
      text: "Before a difficult workshop, I describe the proposal and ask the model to respond as the finance director, the operations lead and the IT security reviewer in turn.",
    },
    {
      kind: "p",
      text: "It produces generic objections. That is fine — generic objections are still the ones you need answers to, and the exercise takes four minutes. It has caught gaps in my preparation often enough to keep doing it.",
    },
    { kind: "h3", text: "3. Test case derivation from criteria" },
    {
      kind: "p",
      text: "Given acceptance criteria, ask for the test cases including boundary and negative paths. This is pure transformation — everything needed is in the criteria — and it is where the model is most reliable.",
    },
    {
      kind: "p",
      text: "One constraint worth adding: derive the tests from the criteria only, not from the requirement. If a test cannot be traced to a criterion, either the test is invented or the criteria are incomplete. Both are worth knowing.",
    },
    { kind: "h3", text: "4. Audience translation" },
    {
      kind: "p",
      text: "Rewriting a technical section for an executive reader, or an executive summary for a development team. The content exists; the framing changes. Fast and reliable.",
    },
    { kind: "h3", text: "5. Document-structure critique" },
    {
      kind: "p",
      text: "Paste a BRD outline and ask what a reader would still need to know after reading it. Catches missing sections more reliably than my own re-reading does, because I know what I meant.",
    },
    { kind: "h3", text: "6. First-pass process notation" },
    {
      kind: "p",
      text: "Describe a process in prose, get back a structured step list with decision points. It gets the happy path right and misses exceptions — but correcting a draft is faster than starting blank.",
    },
    { kind: "h2", text: "Patterns I abandoned" },
    { kind: "h3", text: "Generating requirements from a brief" },
    {
      kind: "p",
      text: "Produces generic requirements for a generic system. They look plausible enough that reviewing them takes real time, and almost none survive contact with an actual stakeholder. Net negative.",
    },
    { kind: "h3", text: "Prioritising a backlog" },
    {
      kind: "p",
      text: "Prioritisation depends on commercial context, politics and timing that are not in any document. The model will produce a confident ranking based on nothing, and a confident ranking based on nothing is worse than no ranking.",
    },
    { kind: "h3", text: "Estimating" },
    {
      kind: "p",
      text: "Estimates depend on the team, the codebase and accumulated technical debt. The model has none of that. The numbers look reasonable, which makes them dangerous.",
    },
    { kind: "h2", text: "Things worth doing regardless of pattern" },
    {
      kind: "ul",
      items: [
        "Give it real artefacts, not descriptions of them. Paste the actual requirement, not your summary.",
        "Ask it to list what it is uncertain about. The uncertainty list is frequently more useful than the answer.",
        "Instruct it explicitly not to resolve ambiguity. Otherwise it will, silently.",
        "Never paste client-confidential material into a tool without checking your organisation's position first. This has ended careers.",
        "Keep your prompts. The good ones are reusable assets and you will not remember the phrasing that worked.",
      ],
    },
    { kind: "h2", text: "The thing to hold on to" },
    {
      kind: "p",
      text: "It is a very fast, very well-read colleague who has never met your stakeholders, does not know your politics, and will never admit to not knowing something. Use it accordingly, and the value is substantial. Forget any part of that description and it will cost you more than it saves.",
    },
  ],
};

const powerBiPractices: BlogPost = {
  slug: "power-bi-best-practices",
  title: "Power BI Practices That Survive Contact With Stakeholders",
  excerpt:
    "Not a feature tour. The handful of decisions that determine whether a dashboard gets used or quietly abandoned after week three.",
  date: "2025-04-29",
  category: "Analytics",
  readingMinutes: 8,
  accent: "amber",
  body: [
    {
      kind: "p",
      text: "Most Power BI advice is about Power BI. This is about the dashboards that get used, which is a different and mostly non-technical problem.",
    },
    {
      kind: "p",
      text: "I have built dashboards that were technically excellent and abandoned within a month, and crude ones that are still open on someone's second monitor two years later. The difference was never DAX.",
    },
    { kind: "h2", text: "Build the boring view first" },
    {
      kind: "p",
      text: "Stakeholders ask for a comprehensive overview. What they open daily is an exception list — the five things that need attention today.",
    },
    {
      kind: "p",
      text: "This has happened on every reporting project I have worked on. The requested artefact is the strategic overview; the used artefact is 'what is broken right now'. Build the second one first. It is faster to build, it generates the feedback that improves the first, and it establishes the habit of opening the report.",
    },
    { kind: "h2", text: "Agree the definitions before the visuals" },
    {
      kind: "p",
      text: "On the DHV project I lost two weeks building against a definition of 'visit' that three regions understood differently. Every number I produced was a sum of incompatible things, and I did not find out until a review meeting where two regional heads disagreed about a figure they were both reading correctly.",
    },
    {
      kind: "p",
      text: "Now I will not start a measure until the entity definitions are written down and signed off. It feels bureaucratic. It takes a day. It saves considerably more than that.",
    },
    {
      kind: "callout",
      title: "A cheap test",
      text: "Ask three stakeholders separately to define your central metric in one sentence. If the sentences differ, you do not have a measure yet — you have a disagreement that your dashboard is about to make official.",
    },
    { kind: "h2", text: "Model properly, even when it seems excessive" },
    {
      kind: "p",
      text: "A star schema on a small model looks like over-engineering. It is not. Flat tables work until the first stakeholder asks a question you did not anticipate, at which point you rebuild.",
    },
    {
      kind: "ul",
      items: [
        "Facts carry measures and keys. Dimensions carry descriptive attributes. Keep them separate.",
        "State the grain of every fact table in writing, in the model documentation. 'One row per visit' prevents a whole class of double-counting.",
        "Use a proper date dimension with fiscal periods. Auto date/time is convenient and will not survive your first fiscal-year question.",
        "Hide every key column from report view. If a user can drag a surrogate key onto a visual, eventually one will.",
        "Where history matters, decide on slowly-changing dimension handling before launch, not after someone notices a rep's region changed.",
      ],
    },
    { kind: "h2", text: "DAX habits that prevent later pain" },
    {
      kind: "p",
      text: "Measures over calculated columns, almost always. Columns consume memory and evaluate at refresh; measures evaluate in context.",
    },
    {
      kind: "code",
      language: "dax",
      code: `-- Fragile: breaks silently when a filter removes all rows
Avg Duration = AVERAGE(Visits[DurationMin])

-- Explicit about the empty case
Avg Duration =
VAR Result = AVERAGE(Visits[DurationMin])
RETURN IF(ISBLANK(Result), BLANK(), ROUND(Result, 1))

-- Explicit about low-volume groups, which is where
-- averages mislead most often
Avg Duration (reliable) =
VAR N = COUNTROWS(Visits)
RETURN IF(N < 50, BLANK(), [Avg Duration])`,
    },
    {
      kind: "p",
      text: "That last pattern has saved me more credibility than any other single thing. An average over four data points, displayed next to one over four thousand with no visual distinction, will eventually be quoted in a board paper.",
    },
    { kind: "h2", text: "Visual choices that matter" },
    {
      kind: "ul",
      items: [
        "An average over a skewed or bimodal distribution is misleading. Show the median, or show the distribution.",
        "Every percentage needs a visible denominator. 'Conversion up 40%' from 5 to 7 is not what the reader will assume.",
        "No pie chart beyond five segments. Beyond that it is a table pretending to be a picture.",
        "Do not trend across a definitional change without marking it. Add an annotation line at the change date.",
        "Suppress or flag groups below a volume threshold rather than rendering them identically to reliable ones.",
      ],
    },
    { kind: "h2", text: "Performance, in the order that matters" },
    {
      kind: "ol",
      items: [
        "Reduce the data. Most reports load far more history than anyone looks at. Ask what period is actually used.",
        "Remove unused columns. They cost memory whether or not anyone uses them.",
        "Keep relationships single-direction unless bidirectional is genuinely required; ambiguous filter paths are both slow and wrong.",
        "Fewer visuals per page. Every visual is a query. Twenty visuals is twenty queries on every interaction.",
        "Only then optimise DAX. It is rarely the first bottleneck and it is where people start.",
      ],
    },
    { kind: "h2", text: "Row-level security is a requirement, not a setting" },
    {
      kind: "p",
      text: "If different audiences should see different data, that is a business requirement with acceptance criteria, tested in UAT by actually logging in as each role. Not a configuration step at the end.",
    },
    {
      kind: "p",
      text: "On DHV, 'leadership sees no individual-level breakdown' was a negotiated commitment that made the whole project acceptable to the field team. Enforcing it in the data model rather than by convention was what made the commitment credible.",
    },
    { kind: "h2", text: "After launch" },
    {
      kind: "p",
      text: "Check usage statistics at thirty days. You will find that a third of your pages are never opened. Delete them — every unused page is maintenance cost and visual noise.",
    },
    {
      kind: "p",
      text: "And ask the people who do use it what they export to Excel. Whatever they export is the thing your dashboard is failing to do.",
    },
  ],
};

const requirementsFramework: BlogPost = {
  slug: "requirement-gathering-framework",
  title: "A Requirements Gathering Framework That Holds Up",
  excerpt:
    "Five phases, with the specific failure each one prevents. Built from the projects where I got it wrong first.",
  date: "2025-03-14",
  category: "Craft",
  readingMinutes: 10,
  accent: "violet",
  body: [
    {
      kind: "p",
      text: "Every requirements framework looks similar on a slide. The difference is in knowing which step prevents which failure, so you know what you are risking when you skip one — and you will skip some.",
    },
    {
      kind: "p",
      text: "This is the sequence I use. Each phase is here because omitting it has cost me something specific.",
    },
    { kind: "h2", text: "Phase 1 — Understand the problem, not the request" },
    {
      kind: "p",
      text: "Stakeholders present solutions. 'We need a dashboard.' 'We need an approval workflow.' The solution encodes an assumption about the problem, and the assumption is often wrong.",
    },
    {
      kind: "p",
      text: "At DHV the request was a dashboard. The problem was that visit data was unreliable and three weeks old. A dashboard over that data would have made the unreliability official. Reframing from 'build a dashboard' to 'make this data trustworthy and timely' is what justified the scope that actually solved it.",
    },
    {
      kind: "ul",
      items: [
        "What happens today without this? Walk through a real recent instance, not the general case.",
        "What does it cost? Get a number, even a rough one. 'It's frustrating' does not survive a budget conversation.",
        "What have you already tried? Tells you the constraints and saves you from re-proposing a failed idea.",
        "Who disagrees that this is a problem? The most informative question on the list, and the one most often skipped.",
      ],
    },
    {
      kind: "callout",
      title: "Failure this prevents",
      text: "Building exactly what was asked for and discovering it does not address the underlying problem. The most expensive failure mode, because everyone signed off.",
    },
    { kind: "h2", text: "Phase 2 — Map the current state from evidence" },
    {
      kind: "p",
      text: "Not from interviews. From evidence.",
    },
    {
      kind: "p",
      text: "People describe the process they believe they follow. The actual process includes workarounds they have stopped noticing. On the Invictus project, I reconstructed sixty completed purchase requests from their email trails and timestamped every handoff. The result overturned the project's central assumption: approvals were not slow, waiting between approvals was. Approval decisions took under a day; the gaps took eleven.",
    },
    {
      kind: "p",
      text: "Had I built from the interviews, I would have optimised the 6% and missed the 71%.",
    },
    {
      kind: "ul",
      items: [
        "Reconstruct completed cases from system logs, email trails or tickets.",
        "Shadow the work. One day of observation beats six interviews for process detail.",
        "Collect the artefacts people actually use — including the spreadsheets they maintain privately, which are the clearest statement of what the official system fails to do.",
        "Quantify. 'Slow' is not a finding; 'median 19 days, of which 13 is waiting' is.",
      ],
    },
    {
      kind: "callout",
      title: "Failure this prevents",
      text: "Optimising the part of the process that was never the bottleneck.",
    },
    { kind: "h2", text: "Phase 3 — Define the entities before anything else" },
    {
      kind: "p",
      text: "This is the step everyone skips and the one that costs most.",
    },
    {
      kind: "p",
      text: "Before any requirement is written, the core entities need agreed definitions. What is a visit. What is a request. What makes two records the same record. Who owns each entity.",
    },
    {
      kind: "p",
      text: "I lost two weeks at DHV to three regions meaning three different things by 'visit'. The definitions must be written down and signed off by everyone who will later quote a number derived from them.",
    },
    {
      kind: "callout",
      title: "Failure this prevents",
      text: "Requirements that are individually correct and collectively incoherent, discovered when two stakeholders disagree about a figure they are both reading correctly.",
    },
    { kind: "h2", text: "Phase 4 — Elicit against the map" },
    {
      kind: "p",
      text: "Only now do the main interviews happen — and they are much better interviews, because you can ask specific questions.",
    },
    {
      kind: "p",
      text: "'Your region counts phone contacts as visits and the South region doesn't. Which is right?' produces a decision. 'Tell me about your process' produces a description you already have.",
    },
    {
      kind: "ul",
      items: [
        "Interview the people who do the work, not only the people who own it. These are rarely the same people and they know different things.",
        "Workshop the contested areas. Where two stakeholders disagree, get them in a room — the disagreement is cheaper to resolve there than in production. The Invictus approval matrix took four sessions and was worth every one.",
        "Ask what happens when things go wrong. Exception paths carry more volume than anyone expects; at Invictus they were a third of it.",
        "Ask what must not change. Constraints surface late otherwise, usually after you have designed around their absence.",
      ],
    },
    { kind: "h2", text: "Phase 5 — Document with traceability from the start" },
    {
      kind: "p",
      text: "Every requirement gets an identifier at the moment it is written, and that identifier survives into the functional spec, the stories, the test cases and the UAT scripts.",
    },
    {
      kind: "p",
      text: "Retrofitting traceability is miserable and nobody ever does it properly. Done from the start it costs almost nothing, and at UAT you can demonstrate coverage rather than assert it — which is the difference between a sign-off meeting that takes an hour and one that takes a week.",
    },
    {
      kind: "p",
      text: "Write down the non-requirements too. At DHV, 'the system will not rank individual representatives' was a negotiated commitment that did more for adoption than any feature. If it is not written down, it is not a commitment.",
    },
    { kind: "h2", text: "What to do when you cannot do all of it" },
    {
      kind: "p",
      text: "You frequently cannot. The phases are not equally compressible.",
    },
    {
      kind: "table",
      columns: ["Phase", "Compressible?", "Minimum viable version"],
      rows: [
        ["Understand the problem", "Barely", "One hour, four questions, with the actual decision-maker"],
        ["Map current state", "Partly", "Reconstruct five real cases instead of sixty"],
        ["Define entities", "No", "Cannot be skipped — a half-day that prevents weeks"],
        ["Elicit", "Yes", "Workshop the contested areas only; interview the rest async"],
        ["Document with traceability", "No", "The identifiers cost nothing; retrofitting costs everything"],
      ],
    },
    {
      kind: "p",
      text: "If you take one thing: define the entities. It is the cheapest phase and the only one where skipping it invalidates everything downstream.",
    },
  ],
};

const promptEngineering: BlogPost = {
  slug: "prompt-engineering-for-analysts",
  title: "Prompt Engineering for Analysts",
  excerpt:
    "Prompting is requirements writing for a reader with perfect recall, no context and no inclination to ask you a question. Analysts have an advantage here.",
  date: "2025-01-28",
  category: "AI & BA",
  readingMinutes: 7,
  accent: "sky",
  body: [
    {
      kind: "p",
      text: "Analysts turn out to be good at prompting, and the reason is structural. Writing a prompt is writing a specification for a reader who has perfect recall, no organisational context, no judgement about what matters, and who will never ask you a clarifying question.",
    },
    {
      kind: "p",
      text: "That is a familiar problem. It is the same problem as writing a requirement for a developer you will never speak to — which is the discipline the job already trains.",
    },
    { kind: "h2", text: "The parallel is exact" },
    {
      kind: "table",
      columns: ["Requirements practice", "Prompting equivalent"],
      rows: [
        ["State the actor and the goal", "State the role and the objective"],
        ["Write testable acceptance criteria", "Specify the output format and constraints precisely"],
        ["Document assumptions and out-of-scope", "Say explicitly what not to do"],
        ["Provide context and references", "Supply the actual source material, not a summary"],
        ["Define the definition of done", "Define what a complete answer contains"],
        ["Flag ambiguity rather than resolving it", "Instruct it to surface uncertainty, not guess"],
      ],
    },
    { kind: "h2", text: "What actually improves output" },
    { kind: "h3", text: "Supply the real artefact" },
    {
      kind: "p",
      text: "The most common mistake is describing the input instead of providing it. 'I have a requirements document about an approval workflow' gives the model nothing. Paste the requirement.",
    },
    { kind: "h3", text: "Specify the output structure before the task" },
    {
      kind: "p",
      text: "Saying what the answer should look like constrains the answer more effectively than any instruction about quality. If you want a table with four named columns, say so. If you want at most five items, say so — otherwise you will get twelve, of declining relevance.",
    },
    { kind: "h3", text: "Write the negative constraints" },
    {
      kind: "p",
      text: "This is the one analysts underuse and it is the highest-leverage move available.",
    },
    {
      kind: "code",
      language: "text",
      code: `Derive test cases from the acceptance criteria below.

Constraints:
- Derive only from the criteria. Do not use the requirement text.
- If a criterion is untestable as written, say so and stop.
  Do not invent a testable version.
- Do not add test cases for behaviour the criteria don't specify.
- Mark every assumption you make explicitly.`,
    },
    {
      kind: "p",
      text: "Those four lines change the output more than any amount of rephrasing the task. Without them you get plausible tests for behaviour nobody specified.",
    },
    { kind: "h3", text: "Ask for the uncertainty" },
    {
      kind: "p",
      text: "Adding 'list what you were unsure about and what additional information would improve this' to the end of a prompt costs nothing and frequently produces the most useful part of the response. A model will not volunteer doubt, but it will report it when asked.",
    },
    { kind: "h2", text: "Patterns worth keeping" },
    { kind: "h3", text: "The adversarial review" },
    {
      kind: "p",
      text: "Give it your own work and ask it to find the problems. 'Here is my acceptance criteria set. What case have I not covered? What could a developer build that satisfies these and is not what I intended?' This is more reliable than asking it to generate, because checking is easier than creating for a model too.",
    },
    { kind: "h3", text: "The forced-choice question" },
    {
      kind: "p",
      text: "Instead of 'what do you think of this approach', ask 'here are two approaches, pick one and give the strongest argument against your own choice'. Open-ended evaluation produces balanced mush; forced choice with self-critique produces something usable.",
    },
    { kind: "h3", text: "The persona only where it means something" },
    {
      kind: "p",
      text: "'Act as a business analyst' does very little. 'Review this as an internal auditor whose primary concern is whether approval can be evidenced after the fact' does a lot, because it specifies a concern rather than a job title. The useful part of a persona is the thing it cares about.",
    },
    { kind: "h2", text: "Things that do not help" },
    {
      kind: "ul",
      items: [
        "Politeness. It costs tokens and changes nothing.",
        "Claiming the task is urgent or important. It does not try harder.",
        "Elaborate role-play framing with no specified concern.",
        "Asking for confidence as a percentage. The number is not calibrated and will mislead you.",
        "Very long prompts assembled from advice you have not tested. Length is not quality; most of my useful prompts are under fifteen lines.",
      ],
    },
    { kind: "h2", text: "Treat prompts as artefacts" },
    {
      kind: "p",
      text: "The prompts that work are reusable assets. Keep them in a file with a note on what each is for and where it fails. Version them when you change them.",
    },
    {
      kind: "p",
      text: "And test them the way you would test anything else: run the same prompt against three different inputs and check whether the output is consistently good or whether you got lucky once. A prompt validated on a single example is not validated.",
    },
    {
      kind: "quote",
      text: "A prompt is a specification. The discipline that makes a good requirement makes a good prompt, and the failure mode is identical — the reader did exactly what you said rather than what you meant.",
    },
  ],
};

export const blogPosts: BlogPost[] = [
  aiTransformingBa,
  betterUserStories,
  chatgptAsBa,
  powerBiPractices,
  requirementsFramework,
  promptEngineering,
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = [
  ...new Set(blogPosts.map((p) => p.category)),
];
