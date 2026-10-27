# Juveriyah — Portfolio

A portfolio site for a Business Analyst / Product Analyst / AI automation engineer.
Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Radix primitives,
lucide-react. Fully static — no backend, no API keys, no environment variables.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (26 static pages)
npm start
```

## Before you publish — the 5-minute checklist

Everything personal lives in two places.

1. **`src/data/profile.ts`** — name, email, LinkedIn / GitHub / Medium URLs, location,
   and `siteUrl`. Every `TODO` in that file is a placeholder. Nothing else in the
   codebase hardcodes contact details, so changing them here changes them everywhere,
   including metadata, the footer, the contact page and the sitemap.
2. **`public/resume.pdf`** — currently a generated placeholder. Replace it with the
   real PDF; the filename is referenced as `profile.resumePath`.

Optional: `src/data/resume.ts` holds the structured resume rendered at `/resume`.
Keep it in sync with the PDF.

## How the content is organised

Pages are thin renderers over typed data. Adding a project, teardown or article means
adding a data object, not a page.

```
src/data/
  types.ts              Every content type. The case-study section union lives here.
  profile.ts            Contact details and headline stats.  ← edit this
  timeline.ts           Career timeline (the About section).
  skills.ts             Skill categories and certifications.
  resume.ts             Structured resume for /resume.
  knowledge-base.ts     Corpus the chat widget answers from.
  blog.ts               Six articles, as typed blocks rather than markdown.
  case-studies.ts       Three product teardowns.
  projects/             One file per project case study, plus an index.
```

### Adding a project

Create `src/data/projects/my-project.ts` exporting a `Project`, then add it to the
array in `src/data/projects/index.ts`. The route, the index card, the search index,
the tag filter, the table of contents and the sitemap all pick it up automatically.

A project's body is `sections: CaseStudySection[]` — a discriminated union of
`prose | list | kpis | flow | architecture | sequence | stories | criteria | stack | table`.
`CaseStudySectionBlock` switches on `kind`, so a malformed section is a type error
rather than a broken page.

### Adding an article

Append a `BlogPost` to `blogPosts` in `src/data/blog.ts`. The `body` is
`ArticleBlock[]` (`p`, `h2`, `h3`, `ul`, `ol`, `quote`, `callout`, `code`, `table`).

## Design system

Tokens are CSS custom properties on `:root` in `src/app/globals.css`, redefined under
`:root[data-theme="dark"]`. Dark mode is a token swap, not a second stylesheet — so a
new component themes correctly for free provided it uses the semantic classes
(`bg-surface`, `text-secondary`, `border-border`) rather than literal colours.

Three primitives carry the visual identity:

- `<Surface>` — the rounded card, with the standard hover lift.
- `<Reveal>` / `<StaggerGroup>` — scroll-triggered entrance.
- `<Button>` / `<Badge>` — CVA variants.

### Colour and contrast

`--accent` (`#0EA5E9`) is the brand colour and is **only 2.77:1 on white**, so it
must never be used for text. Use `text-accent-text` for type and `--accent` for
fills, bars, rules and icons. The same applies to the semantic tones — use
`text-positive`, `text-warning`, `text-critical` and `text-violet` rather than
Tailwind's numbered colours, which fail contrast in one theme or the other. Every
token is verified at ≥4.5:1 against all three surfaces in both themes.

### A note on scroll animation

Scroll reveals are CSS (`.reveal` / `.reveal-in`) driven by a plain
IntersectionObserver in `useRevealed` — no animation library. Two things it handles
that a naive `whileInView` does not:

- Content a hash link jumps *past* never intersects the viewport, so it would stay
  at `opacity: 0` forever. `useRevealed` also reveals anything already at or above
  the fold and re-checks on scroll.
- Without JS the observer never runs, so a `<noscript>` rule in the document head
  forces `.reveal` visible.

Do **not** put `content-visibility: auto` on sections. It cut homepage LCP from
3.5s to 1.9s but skipped subtrees are not laid out, so the observer never fires and
sections stay invisible after you scroll past them. There is a comment in
`globals.css` recording this.

All motion is suppressed under `prefers-reduced-motion`, globally in CSS.

### Keep the root layout library-free

Anything imported by `SiteNav`, `ThemeToggle`, `Preloader` or `PageTransition` is
downloaded on **every** route. These are deliberately plain CSS/React. Moving Framer
Motion out of them took the content routes from 163 kB to 117 kB first-load JS.
Framer now ships only on routes that actually have interactive visualisations.

### Above the fold

The hero is a server component with CSS entrances and no hydration. Two things to
preserve if you edit it:

- Don't animate opacity on the LCP element. Chrome will not accept an element as an
  LCP candidate while its opacity is 0. Use `.rise-up` (transform only).
- Don't reintroduce a full-screen loading curtain. The hero paints underneath it but
  isn't *visible* until it leaves, which cost ~1.7s of LCP on throttled mobile. The
  loader is a slim top bar for exactly this reason.

### Hash links

`PageTransition` keys `<main>` on the pathname to replay the route animation, which
remounts the subtree and loses the browser's scroll-to-anchor. It re-applies the
hash itself on mount. Removing that breaks every `#section` deep link, including the
chat widget's.

## The chat widget

`src/components/chat/chat-widget.tsx` is **not** an LLM. It scores the visitor's
question against `src/data/knowledge-base.ts` by token overlap and returns the best
entry, or says it doesn't know. That keeps the site free to run and means it cannot
invent a fact. To teach it something, add a `KnowledgeEntry`.

## The contact form

No backend. On submit it validates, then opens the visitor's mail client with the
message prefilled — nothing is transmitted until they press send themselves. To make
it a real endpoint, replace the `window.location.href` assignment in
`src/components/contact-form.tsx` with a `fetch` to a route handler.

## Measured Lighthouse (production build, all 7 route types)

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | **100** on every route | **100** | **100** | **100** |
| Mobile | 84–94 (median ~90) | **100** | **100** | **100** |

Zero failing accessibility, best-practices or SEO audits in either mode. CLS is 0
everywhere.

Mobile performance does not reach 95. The remaining cost is React hydration of the
interactive visualisations — the timeline, skill matrix, animated diagrams and SQL
walkthrough — under Lighthouse's 4× CPU throttle. Getting to 95 on mobile means
removing those, which would cost more than the number is worth. Scores also vary
±5 between runs on the same build, so treat any single run with suspicion.

## Deployment

Static-friendly; works on Vercel, Netlify or any Node host with no configuration.
Set `profile.siteUrl` before deploying so canonical URLs, Open Graph tags and the
sitemap resolve correctly.
