/**
 * Independently built, publicly live products.
 *
 * Descriptions here are written from what each deployed site actually does,
 * not from a brief. If you change what a product does, change the copy.
 *
 * TODO(juveriyah): the role/year lines are my reading of your note — correct
 * any that are wrong, and add outcome metrics if you have them. I have
 * deliberately not invented usage or revenue numbers for live products.
 */

export type Product = {
  name: string;
  /** The name shown on the deployed site, when it differs from the one above. */
  deployedAs?: string;
  url: string;
  year: string;
  role: string;
  category: string;
  /** One line a recruiter can scan. */
  tagline: string;
  /** What it does, in two or three sentences. */
  description: string;
  /** Observable capabilities — things the live product demonstrably does. */
  highlights: string[];
  stack: string[];
  accent: "sky" | "violet" | "emerald" | "amber" | "rose";
  /** Set when the live URL lands on a sign-in wall. */
  gated?: string;
};

export const products: Product[] = [
  {
    name: "Invixy",
    url: "https://invixy.com",
    year: "2026",
    role: "Product Owner & Builder",
    category: "FinOps SaaS",
    tagline: "Invoice lifecycle management for finance teams.",
    description:
      "A finance operations platform covering the whole document lifecycle — invoice creation, billing, compliance and settlement — for teams that had been stitching the same workflow together out of spreadsheets and email. Built alongside the requirements work on a SaaS invoice management platform, which is where the problem definition came from.",
    highlights: [
      "Recurring invoices and automated payment reminders, so collection stops being a manual chase",
      "Multi-currency billing with tax and exchange handling, covering 135+ currencies",
      "GST and e-invoicing support for Indian compliance",
      "Cash-flow forecasting and outstanding/overdue tracking rather than a static ledger",
      "Tiered plans from a free starter through to enterprise SSO and custom API integration",
    ],
    stack: ["Next.js", "TypeScript", "Vercel"],
    accent: "sky",
  },
  {
    name: "Enterprise RAG",
    deployedAs: "KV DocAI",
    url: "https://enterprise-rag-beige.vercel.app",
    year: "2026",
    role: "Product Owner & Builder",
    category: "Applied AI · Document Intelligence",
    tagline: "Ask your compliance library a question, get a cited answer.",
    description:
      "A retrieval-augmented document intelligence system built for a valve manufacturer. Staff upload the documents the business actually runs on — ISO 9001 manuals, product specification sheets, supplier contracts, export certifications — and ask questions in plain language. Every answer cites the exact source it came from, which is the part that makes it usable in a quality-managed environment.",
    highlights: [
      "Citation-first answers: the response names the document and location it was drawn from",
      "Handles the real corpus — standards manuals, spec sheets, contracts and certifications",
      "Answers operational questions such as pressure ratings, ISO clause coverage and contract payment terms",
      "Replaces manual search through a compliance library that only a few people knew how to navigate",
    ],
    stack: ["Next.js", "Gemini 2.5", "RAG", "Vercel"],
    accent: "violet",
  },
  {
    name: "Synapse AI",
    url: "https://option-chain-ruby.vercel.app",
    year: "2026",
    role: "Product Owner & Builder",
    category: "Applied AI · Market Analytics",
    tagline: "Where the options math disagrees with the news.",
    description:
      "A terminal that reads the live options chain and real-world news in the same view, then synthesises the two to surface where they diverge. The thesis is that the gap between what the derivatives are pricing and what the news is saying is the signal worth looking at — so the product is built around surfacing that divergence rather than displaying two feeds side by side.",
    highlights: [
      "Live options chain analysis alongside a news feed, in one view",
      "AI synthesis step that reports the divergence rather than leaving the reader to spot it",
      "Watchlist across NIFTY 50, BANK NIFTY, SENSEX and large-cap single names",
      "Command-driven interface built for speed over chrome",
    ],
    stack: ["React", "LLM synthesis", "Market data APIs", "Vercel"],
    accent: "emerald",
  },
  {
    name: "Manufacture OS",
    deployedAs: "FinanceOS",
    url: "https://financeos-lyart.vercel.app/costs",
    year: "2026",
    role: "Product Owner & Builder",
    category: "Manufacturing · Costing & Profitability",
    tagline: "True cost and true margin per SKU, before you change the price.",
    description:
      "A costing and profitability workspace for manufacturers who know their revenue precisely and their per-SKU margin only approximately. It maintains live costing across the catalogue, simulates the margin impact of a price change before it is committed, and raises alerts where margin is at risk.",
    highlights: [
      "Live costing across every SKU rather than a quarterly costing exercise",
      "What-if price simulation, so the margin consequence is known before the decision",
      "Margin-at-risk alerts across the whole catalogue",
      "Multi-tenant, with a demo tenant standing in for a real brass fittings manufacturer",
    ],
    stack: ["Next.js", "TypeScript", "Vercel"],
    accent: "amber",
    gated: "Sign-in required — the costing workspace sits behind authentication.",
  },
];
