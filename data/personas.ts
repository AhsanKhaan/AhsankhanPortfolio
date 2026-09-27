// Programmatic-SEO "Personas" playbook: `[Ahsan Khan] for [audience]`. Four pages,
// not fifty — quality over quantity per the programmatic-seo skill. Each page has a
// genuinely different opening hook, proof selection and CTA (not swapped variables
// over one template), matched to what that specific hiring persona actually searches
// or asks an AI assistant. All facts are pulled from data already verified elsewhere
// on the site (data/profile.ts) — nothing here is invented for a persona's benefit.
import type { InquiryType } from "./profile";

export interface PersonaPage {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  hook: string;
  vision: string;
  proofPoints: { value: string; label: string }[];
  stackNote: string;
  faqIds: string[];
  ctaInquiry: InquiryType;
  ctaLabel: string;
}

export const personas: PersonaPage[] = [
  {
    slug: "tech-recruiters",
    navLabel: "Tech Recruiters",
    metaTitle: "For Tech Recruiters",
    metaDescription:
      "Senior React & Full Stack Developer for tech recruiters: verifiable case studies, real metrics, React/Next.js/TypeScript stack, 5+ yrs fintech experience.",
    kicker: "For Tech Recruiters",
    h1: "A senior React & full-stack developer you can put in front of a hiring manager with confidence",
    hook:
      "Screening candidates who look strong on paper but can't back it up in a technical round wastes everyone's time — yours, the hiring manager's, and the candidate's.",
    vision:
      "Ahsan Khan is a Senior Full Stack & Frontend Developer with 5+ years of production work you can verify before the first call: real case studies with before/after metrics, a live portfolio built in the same stack he ships (React, Next.js, TypeScript), and 3 consecutive security audits with zero critical findings.",
    proofPoints: [
      { value: "5+", label: "Years, production fintech & food-tech apps" },
      { value: "100K+", label: "Users served by frontends he architected" },
      { value: "35%", label: "Faster load time (FCP 4.2s → 2.7s)" },
      { value: "4→2", label: "Junior engineers mentored, 2 promoted within 12 months" },
    ],
    stackNote: "React, Next.js, TypeScript, Node.js, Laravel, REST APIs, AWS, Docker, MongoDB, MySQL, PostgreSQL, PCI DSS, OWASP Top 10.",
    faqIds: ["stack", "fintech", "contact"],
    ctaInquiry: "fulltime",
    ctaLabel: "Shortlist Ahsan for a role",
  },
  {
    slug: "remote-hiring",
    navLabel: "Remote Hiring Managers",
    metaTitle: "For Remote Hiring Managers",
    metaDescription:
      "Hiring remote? Ahsan Khan, Senior Full Stack Developer, has a proven remote track record for a US fintech, async workflows, PKT (GMT+5).",
    kicker: "For Remote Hiring Managers",
    h1: "A remote engineer with a track record of shipping for a team he's never met in person",
    hook:
      "Hiring remote is a bet on communication, not just code — you're trusting someone to work async, document decisions clearly, and stay accountable without a desk beside them.",
    vision:
      "Ahsan has already made that bet pay off: he worked fully remote for a US fintech company (Lendotics) from Karachi, Pakistan (PKT, GMT+5), running on written specs, PR-driven workflows and async standups — not day-one theory, a track record.",
    proofPoints: [
      { value: "GMT+5", label: "PKT — flexible overlap with US, EU, GCC, APAC" },
      { value: "US", label: "Fintech client served fully remote (Lendotics)" },
      { value: "PR-driven", label: "Async workflow: written specs, code review, CI/CD" },
      { value: "5+", label: "Years professional engineering experience" },
    ],
    stackNote: "React, Next.js, TypeScript, Node.js, Laravel, AWS S3, RESTful APIs, Git, CI/CD.",
    faqIds: ["remote", "stack", "contact"],
    ctaInquiry: "remote",
    ctaLabel: "Discuss a remote role",
  },
  {
    slug: "relocation-sponsorship",
    navLabel: "Relocation & Sponsorship",
    metaTitle: "For Relocation & Sponsorship Employers",
    metaDescription:
      "Ahsan Khan is open to relocating for a senior role in fintech, food-tech or delivery platforms. 5+ yrs, React/Next.js/TypeScript, ready to discuss timelines.",
    kicker: "For Relocation & Sponsorship Employers",
    h1: "Ready to relocate for the right senior engineering role — not just open to it on paper",
    hook:
      "Sponsoring relocation is a real commitment on your side — the last thing you want is a candidate who cools off once the paperwork actually starts.",
    vision:
      "Ahsan is actively looking to relocate for a full-time senior role, with 5+ years directly relevant to fintech, food-tech and delivery-platform companies, and is ready to talk timeline, process and onboarding specifics as soon as you reach out.",
    proofPoints: [
      { value: "5+", label: "Years in fintech & food-tech platforms" },
      { value: "100K+", label: "Users served, PCI DSS compliant systems" },
      { value: "80%", label: "Manual ops automated (merchant onboarding: 5 days → 1)" },
      { value: "3", label: "Security audits passed, zero critical findings" },
    ],
    stackNote: "React, Next.js, TypeScript, Node.js, Laravel, AWS, PCI DSS, OWASP Top 10 — domain fit for regulated fintech and marketplace platforms.",
    faqIds: ["relocation", "fintech", "contact"],
    ctaInquiry: "fulltime",
    ctaLabel: "Start the conversation",
  },
  {
    slug: "talent-acquisition",
    navLabel: "Talent Acquisition",
    metaTitle: "For Talent Acquisition Specialists",
    metaDescription:
      "Quick-scan candidate profile: Ahsan Khan, Senior Full Stack Developer, 5+ yrs, React/Next.js/TypeScript/Node.js, open to full-time, remote or contract work.",
    kicker: "For Talent Acquisition Specialists",
    h1: "Everything you need to qualify Ahsan Khan against a role brief, in one place",
    hook:
      "Moving a candidate from \"looks interesting\" to \"scheduled a screen\" fast means not chasing scattered LinkedIn messages and a resume that's a year out of date.",
    vision:
      "This page is built for exactly that: a quick-scan fact sheet, a verifiable stack list, and one contact form that routes straight to Ahsan with the role type already flagged — full-time, remote or freelance.",
    proofPoints: [
      { value: "5+", label: "Years experience" },
      { value: "Karachi, PK", label: "Based, PKT (GMT+5) — open to relocate or remote" },
      { value: "Full-time / Remote / Freelance", label: "All three considered" },
      { value: "1 form", label: "Routes straight to Ahsan, no recruiter middleman" },
    ],
    stackNote: "React, Next.js, TypeScript, JavaScript, Node.js, Laravel, AWS, Docker, MongoDB, MySQL, PostgreSQL.",
    faqIds: ["contact", "freelance", "stack"],
    ctaInquiry: "fulltime",
    ctaLabel: "Get in touch",
  },
];
