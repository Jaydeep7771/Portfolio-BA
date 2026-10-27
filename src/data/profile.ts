/**
 * Single source of truth for personal details.
 *
 * Values below marked VERIFY came from the resume PDF (J Business Analyst.pdf)
 * via text extraction — the contact line was glyph-encoded, so please confirm
 * the email reads correctly before publishing.
 */

export const profile = {
  firstName: "Juveriyah",
  fullName: "Juveriyah", // TODO: add surname if you want it shown
  roles: ["Business Analyst", "Product Analyst", "AI Workflow Automation"],
  tagline:
    "I bridge business strategy, analytics, product thinking and AI automation to build scalable digital solutions.",
  shortBio:
    "Business Analyst with two years bridging business stakeholders and technical teams — requirements, user stories, process mapping and UAT — who also ships the products. Four are live.",
  location: "Jaunpur, India", // VERIFY — from resume contact line
  availability: "Open to Business Analyst & Product Analyst roles",

  email: "juveriyah@gmail.com", // VERIFY — decoded from the resume's contact line
  links: {
    linkedin: "https://linkedin.com/in/your-handle", // TODO: not in the resume
    github: "https://github.com/your-handle", // TODO: not in the resume
    medium: "https://medium.com/@your-handle", // TODO: not in the resume
  },

  /** Place the PDF at /public/resume.pdf for the download button to resolve. */
  resumePath: "/resume.pdf",

  /** Used for metadata, sitemap and OG URLs. */
  siteUrl: "https://juveriyah.dev", // TODO
} as const;

export const headlineStats = [
  { label: "Products built and shipped live", value: 4, suffix: "" },
  { label: "User stories authored", value: 90, suffix: "+" },
  { label: "Latency reduction delivered", value: 20, suffix: "%" },
  { label: "User engagement lift", value: 30, suffix: "%" },
] as const;
