// Site content. Identity, links and metrics come from brand/profile.json so the
// website, email templates and future automation all quote the same numbers.
import brandProfile from "@/brand/profile.json";

export const profile = brandProfile;

export type InquiryType = "fulltime" | "remote" | "freelance";

export const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: "fulltime", label: "Full-time role (Relocation)" },
  { value: "remote", label: "Remote role" },
  { value: "freelance", label: "Freelance project" },
];

export const heroAvailability = [
  { icon: "location", label: "Karachi, Pakistan → Open to relocate" },
  { icon: "world", label: "Remote · Worldwide" },
  { icon: "briefcase", label: "Freelance" },
] as const;

// Tightened for clarity (was 502 chars / a heavier AnimatedText render): lead with
// role + stack, back it with specific proof points, close with a direct persona CTA.
export const aboutText =
  "Senior Full Stack & Frontend Developer — React, Next.js, TypeScript, Node.js. I architect fintech and food-tech platforms serving 100K+ users, cut load times 35%, and automate workflows that remove 80% of manual ops, hardened to PCI DSS and OWASP Top 10. Open to relocation, remote roles, and freelance work — let's talk about your team.";

export const marqueeImages = [
  { src: "/assets/projects/admin-portal-dashboard.png", alt: "Nayapay admin portal dashboard" },
  { src: "/assets/projects/nayapay_business.png", alt: "Nayapay business portal" },
  { src: "/assets/projects/nayapay_website.png", alt: "Nayapay public website" },
  { src: "/assets/projects/nayapay_adminportal.png", alt: "Nayapay admin portal screens" },
  { src: "/assets/projects/ecommerce-dashboard.png", alt: "E-commerce dashboard" },
  { src: "/assets/projects/design-system-components.png", alt: "Design system component library" },
  { src: "/assets/projects/feedback-system-interface.png", alt: "Feedback system interface" },
  { src: "/assets/projects/ad_roots.png", alt: "Abundantly Developed Roots website" },
  { src: "/assets/projects/borntobuild.png", alt: "Born to Build LLC website" },
  { src: "/assets/projects/foreverus_in_love.png", alt: "Foreverusinlove social platform" },
  { src: "/assets/projects/generic-tech-website.png", alt: "Tech company website" },
];

export const domainFit = [
  {
    title: "Food-tech & marketplaces",
    audience: "Delivery and marketplace platforms",
    points: [
      "Multi-vendor e-commerce backend handling 500+ monthly transactions with zero chargebacks",
      "Schef food-service dashboard for order tracking and analytics",
      "Merchant onboarding engine: 5 days → 1 day, 80% less manual work",
      "Partner and merchant portals built for thousands of operators",
    ],
  },
  {
    title: "Fintech & payments",
    audience: "Wallets, lending and payment platforms",
    points: [
      "Nayapay admin and business portals serving 100K+ users",
      "KYC/KYB automation and fraud case registration workflows",
      "PCI DSS and OWASP Top 10 hardening, 3 audits with zero critical findings",
      "CRM and banking portals for a US lending fintech (Lendotics)",
    ],
  },
];

export const services = [
  {
    name: "Frontend Architecture",
    description:
      "Scalable React and Next.js architectures, design systems and 50+ component Storybook libraries shared across product teams.",
  },
  {
    name: "Full-Stack Web Apps",
    description:
      "End-to-end products with Next.js, Node.js or Laravel, REST APIs and PostgreSQL, MySQL or MongoDB, from MVP to production.",
  },
  {
    name: "Fintech Security & Compliance",
    description:
      "Secure authentication, RBAC and PCI DSS / OWASP Top 10 practices, with mitigation of XSS, CSRF and SQL injection.",
  },
  {
    name: "Performance & SEO",
    description:
      "Core Web Vitals, code-splitting, virtual scrolling, SSR and structured data. One public site gained 50% organic traffic in 4 months.",
  },
  {
    name: "Admin Portals & Dashboards",
    description:
      "Role-based operations dashboards with real-time data, reporting and workflow automation for internal teams.",
  },
];

export interface CaseStudy {
  category: string;
  title: string;
  image: string;
  link?: string;
  problem: string;
  role: string;
  impact: string[];
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    category: "Fintech",
    title: "Nayapay Admin Portal",
    image: "/assets/projects/admin-portal-dashboard.png",
    problem:
      "Operations, compliance and support teams managed 100K+ wallet users through slow, manual tooling.",
    role: "Led frontend architecture: React, Redux Toolkit, TypeScript and Material UI, with RBAC and real-time data.",
    impact: [
      "35% faster load: FCP 4.2s → 2.7s via virtual scrolling, lazy loading and code-splitting",
      "Notification segmentation reaching 2M+ users with no developer involvement per campaign",
      "3 consecutive security audits with zero critical findings",
    ],
    stack: ["React", "TypeScript", "Redux", "Material UI", "Laravel", "MongoDB", "AWS"],
  },
  {
    category: "Merchant Platform",
    title: "MerchantArc / Business Portal",
    image: "/assets/projects/nayapay_business.png",
    problem: "Merchant onboarding took 5 days of manual KYC/KYB checks and back-and-forth.",
    role: "Designed and shipped the onboarding automation engine and the merchant-facing business portal.",
    impact: [
      "Onboarding cut from 5 days to under 24 hours",
      "80% improvement in operational throughput",
      "Reusable component library adopted by 4 product teams (60% faster UI work)",
    ],
    stack: ["React", "TypeScript", "Redux", "Laravel", "Material UI"],
  },
  {
    category: "Web & SEO",
    title: "Nayapay Website",
    image: "/assets/projects/nayapay_website.png",
    link: "https://nayapay.com/",
    problem: "Content updates needed engineers, and organic acquisition was flat.",
    role: "Rebuilt rendering for SEO and automated the CMS end-to-end with Node.js and Laravel APIs.",
    impact: [
      "+50% organic traffic in 4 months from SSR and structured data",
      "20+ engineering hours saved per week on content updates",
    ],
    stack: ["Next.js", "React", "Tailwind", "Node.js", "SEO"],
  },
];

export type LearningStatus = "Learning" | "Building" | "Applied";

export const aiLab: { name: string; detail: string; status: LearningStatus }[] = [
  {
    name: "LLM API integration",
    detail: "Calling Claude and OpenAI SDKs from Next.js route handlers: streaming, tool use, error handling.",
    status: "Building",
  },
  {
    name: "Prompt engineering & structured output",
    detail: "Reliable JSON outputs, evaluation prompts and guardrails for product features.",
    status: "Building",
  },
  {
    name: "RAG fundamentals",
    detail: "Embeddings, vector search and chunking strategies for document Q&A.",
    status: "Learning",
  },
  {
    name: "Python for AI workflows",
    detail: "Automation scripts and data preparation alongside my TypeScript stack.",
    status: "Learning",
  },
  {
    name: "AI-assisted development",
    detail: "Using AI coding tools in daily work for reviews, refactors and test generation.",
    status: "Applied",
  },
];

export const workModes: {
  inquiry: InquiryType;
  title: string;
  points: string[];
  cta: string;
}[] = [
  {
    inquiry: "fulltime",
    title: "Full-time · Open to Relocate",
    points: [
      "Open to relocating internationally for the right role",
      "Senior Full Stack, Frontend or product-engineering roles",
      "Fintech, payments, delivery and marketplace platforms",
    ],
    cta: "Discuss a role",
  },
  {
    inquiry: "remote",
    title: "Remote · Worldwide",
    points: [
      "Based in PKT (GMT+5) with flexible overlap for US, EU, GCC and APAC teams",
      "Comfortable with async work, written specs and PR-driven teams",
      "Worked remotely for a US fintech (Lendotics)",
    ],
    cta: "Discuss remote work",
  },
  {
    inquiry: "freelance",
    title: "Freelance · Projects",
    points: [
      "Admin portals and dashboards",
      "Next.js marketing sites with SEO",
      "Full-stack MVPs and performance audits",
    ],
    cta: "Start a project",
  },
];

// Answers written for both readers and AI extraction: self-contained, ~40-60 words,
// factual, one claim per answer (see ai-seo skill — structured Q&A + FAQPage schema
// lifts AI-search citation rates). Targets what recruiters, talent acquisition
// specialists, remote-hiring managers and relocation-sponsoring employers actually
// search or ask an AI assistant.
export const recruiterFaq: { id: string; question: string; answer: string }[] = [
  {
    id: "relocation",
    question: "Is Ahsan Khan open to relocation?",
    answer:
      "Yes. Ahsan is based in Karachi, Pakistan, and is open to relocating internationally for a senior full-time engineering role, including fintech, food-tech and delivery-platform companies. He has 5+ years of experience and can discuss sponsorship and onboarding timelines directly through the contact form.",
  },
  {
    id: "remote",
    question: "Does Ahsan Khan work remotely?",
    answer:
      "Yes. Ahsan has worked fully remotely for a US fintech company (Lendotics) from PKT (GMT+5), handling async collaboration, written specs and PR-driven workflows. He's available for remote full-time roles or contract work with teams across the US, EU, GCC and APAC time zones.",
  },
  {
    id: "stack",
    question: "What is Ahsan Khan's tech stack?",
    answer:
      "React, Next.js, TypeScript and Node.js on the frontend and full-stack layer; Laravel, REST APIs, MongoDB, MySQL and PostgreSQL on the backend; AWS, Docker, Git and CI/CD for deployment. He also implements PCI DSS and OWASP Top 10 security practices, standard requirements for fintech and payments roles.",
  },
  {
    id: "fintech",
    question: "Does Ahsan Khan have fintech and food-tech experience?",
    answer:
      "Yes. Ahsan led frontend architecture for Nayapay's admin, business and public portals — 100K+ users, PCI DSS compliant — and built a merchant onboarding automation engine. He also has food-tech-adjacent experience with multi-vendor e-commerce platforms and a food-service ordering dashboard (Schef).",
  },
  {
    id: "freelance",
    question: "Is Ahsan Khan available for freelance or contract work?",
    answer:
      "Yes. Alongside full-time role conversations, Ahsan takes on freelance and contract projects: admin portals and dashboards, Next.js marketing sites with SEO, and full-stack MVPs. Budget and project scope can be specified directly in the contact form on this site.",
  },
  {
    id: "contact",
    question: "How can a recruiter or hiring manager contact Ahsan Khan?",
    answer:
      "The fastest way is LinkedIn (linkedin.com/in/ahsankhaan) or the contact form on this site, which lets you specify a full-time, remote or freelance inquiry. His CV is available on request through a verified email link at ahsankhaan.vercel.app/cv.",
  },
];

export const socialLinks = [
  { title: "LinkedIn", href: profile.links.linkedin },
  { title: "GitHub", href: profile.links.github },
  { title: "Email", href: `mailto:${profile.email}` },
];

