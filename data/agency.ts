// Content for /agency: freelance and agency services, selected work, pricing and
// freelance marketplace profiles.
import { profile } from "@/data/profile";

export const agencyIntro =
  "I build websites and web apps that are meant to be found: keyword research, content strategy, design, code and launch run as one checked pipeline, with AI agents doing the repetitive work and me accountable for the result.";

export const agencyServices = [
  {
    name: "Agentic SEO",
    description:
      "Keyword maps built from your own Keyword Planner data, one keyword per page, an on-page SEO gate in every build, structured data, llms.txt and a separate review for AI search.",
    tags: ["Keyword mapping", "Technical SEO", "AEO and GEO"],
  },
  {
    name: "AI agents and Claude Code",
    description:
      "Custom Claude Code agents, skills, hooks and MCP servers for your team: content, SEO, testing and code-review pipelines where agents propose, scripts decide and a person approves.",
    tags: ["Claude Code", "MCP", "Multi-agent"],
  },
  {
    name: "n8n automations",
    description:
      "n8n workflows that move leads from forms to your CRM, draft and schedule content with LLM steps, and send the reports your team now builds by hand.",
    tags: ["n8n", "Webhooks", "LLM steps"],
  },
  {
    name: "Marketing content strategy",
    description:
      "A content plan with topic hubs and a brief for every page: the reader's question, the outline, the sources to check and the voice. Each draft gets an editing pass before it ships.",
    tags: ["Content plans", "Page briefs", "Topic hubs"],
  },
  {
    name: "Websites and landing pages",
    description:
      "Custom, animated marketing sites in Next.js or Astro, held to Core Web Vitals budgets and deployed on Cloudflare or Vercel.",
    tags: ["Next.js", "Astro", "Motion design"],
  },
  {
    name: "Programmatic SEO and tool sites",
    description:
      "Calculators, converters and directories generated from validated data, with rules that stop thin, duplicate or competing pages from being built.",
    tags: ["Calculators", "Directories", "Static export"],
  },
  {
    name: "Web apps and dashboards",
    description:
      "Admin portals, merchant dashboards and full-stack MVPs with role-based access, real-time data and reporting, from first screen to production.",
    tags: ["React", "Node.js", "Laravel"],
  },
  {
    name: "Backend architecture",
    description:
      "Job queues with BullMQ, Redis caching, MongoDB time-series data and background workers on a Hetzner VPS, designed so the public site never waits on a third-party API.",
    tags: ["BullMQ", "Redis", "Hetzner VPS"],
  },
  {
    name: "CI/CD, security and code review",
    description:
      "GitHub Actions pipelines with automated code review, secret scanning, CodeQL, Lighthouse CI, OWASP ZAP and gated Cloudflare deploys.",
    tags: ["GitHub Actions", "Cloudflare", "OWASP"],
  },
];

export const agencyProcess = [
  { step: "Brief", detail: "You share the goal, the audience, competitors and any keyword data you have." },
  { step: "Plan", detail: "You get a keyword map, a content plan and a design direction to approve before anything is built." },
  { step: "Build", detail: "Agents draft, scripts check, and I review every change. You see previews as pages land." },
  { step: "Launch", detail: "Nothing goes live without your go-ahead. After launch you get a growth plan to follow." },
];

export interface AgencyWork {
  title: string;
  category: string;
  description: string;
  image?: string;
  link?: string;
}

export const agencyWork: AgencyWork[] = [
  {
    title: "Calculator Porch",
    category: "Programmatic SEO product",
    description: "A calculator site on a config-driven engine with demand-gated page families and a release gate for sources.",
    link: "https://calculatorporch.com",
  },
  {
    title: "AK Site Kit",
    category: "Agentic SEO pipeline",
    description: "21 Claude Code agents that take a site from keyword research to a gated Cloudflare launch.",
  },
  {
    title: "CIP-2026",
    category: "Backend architecture",
    description: "Live commodity and currency rates on BullMQ workers, Redis caching and MongoDB time-series data.",
    link: "https://github.com/AhsanKhaan/cip-2026",
  },
  {
    title: "Nayapay Website",
    category: "Web and SEO",
    description: "Rebuilt rendering for SEO and automated the CMS: organic traffic up 50% in 4 months.",
    image: "/assets/projects/nayapay_website.png",
    link: "https://nayapay.com/",
  },
  {
    title: "Abundantly Developed Roots",
    category: "Client website",
    description: "Website for a virtual holistic health centre and its practitioners.",
    image: "/assets/projects/ad_roots.png",
    link: "https://abundantlydevelopedroots.com/",
  },
  {
    title: "Born to Build LLC",
    category: "Client website",
    description: "Marketing site for a residential and commercial construction company.",
    image: "/assets/projects/borntobuild.png",
    link: "https://born2buildllc.com/",
  },
  {
    title: "Foreverusinlove",
    category: "Client platform",
    description: "Video-sharing social platform with uploads, sharing and chat.",
    image: "/assets/projects/foreverus_in_love.png",
    link: "https://foreverusinlove.com/",
  },
];

// Indicative starting prices at current freelance market rates. Edit freely.
export const agencyPackages = [
  {
    name: "SEO and content audit",
    price: "From $300",
    unit: "one-off",
    points: ["Technical and on-page SEO audit", "Keyword map for your existing pages", "AI-search readiness review", "Prioritised fix list"],
  },
  {
    name: "Marketing website",
    price: "From $800",
    unit: "per project",
    points: ["Custom design with motion", "Up to 6 pages in Next.js or Astro", "On-page SEO, structured data and llms.txt", "Deployed on Cloudflare or Vercel"],
  },
  {
    name: "Agentic SEO content site",
    price: "From $1,500",
    unit: "per project",
    featured: true,
    points: ["Keyword research and content plan", "Briefs and edited copy for each page", "SEO, security and speed gates in CI", "90-day growth plan after launch"],
  },
  {
    name: "Web app or dashboard",
    price: "From $3,000",
    unit: "per project",
    points: ["Admin portal, dashboard or MVP", "Role-based access and reporting", "Backend, queues and caching designed for scale", "Tests and CI/CD included"],
  },
];

export const quoteNote =
  "Prices follow current market rates and are starting points. Need something customised? Message me on LinkedIn with your scope and I will send a quote.";

export const quoteLink = profile.links.linkedin;

// Freelance marketplace profiles. Paste a profile URL into `href` and the card appears
// on /agency; entries with an empty href are not rendered.
export const freelanceProfiles: { platform: string; href: string; note: string }[] = [
  { platform: "LinkedIn", href: profile.links.linkedin, note: "Fastest way to reach me for a quote" },
  { platform: "Upwork", href: "", note: "Hourly and fixed-price contracts" },
  { platform: "Fiverr", href: "", note: "Fixed-scope packages" },
  { platform: "Freelancer", href: "", note: "Project bids" },
];

// The agent team behind every project. Each entry must match a file in .claude/agents/
// (tests/unit/content.test.ts enforces this), so the page never lists an agent that doesn't exist.
export type AgentGroup = "Strategy" | "Content" | "Build" | "Quality";

export const agentTeam: { id: string; name: string; group: AgentGroup; job: string; skills: string[] }[] = [
  { id: "content-strategist", name: "Content strategist", group: "Strategy", job: "Plans pages and writes a brief for each one", skills: ["content-strategy", "seo-content-brief", "jobs-to-be-done"] },
  { id: "keyword-researcher", name: "Keyword researcher", group: "Strategy", job: "Turns Keyword Planner data into one keyword per page", skills: ["keyword-research", "seo-cluster", "serp-analysis"] },
  { id: "marketing-strategist", name: "Marketing strategist", group: "Strategy", job: "Positioning, offers and one clear call to action per page", skills: ["marketing-ideas", "cro", "marketing-council"] },
  { id: "growth-strategist", name: "Growth strategist", group: "Strategy", job: "A 90-day plan: one growth task a day", skills: ["marketing-loops", "analytics"] },
  { id: "content-writer", name: "Content writer", group: "Content", job: "Writes copy from real facts, never invented ones", skills: ["copywriting", "ai-seo", "seo-geo"] },
  { id: "humanizer", name: "Humanizer", group: "Content", job: "Removes AI-writing patterns and tightens every line", skills: ["humanizer", "copy-editing"] },
  { id: "designer", name: "Designer", group: "Build", job: "Owns DESIGN.md: tokens, type, motion and contrast", skills: ["frontend-design", "ui-ux-pro-max", "web-design-guidelines"] },
  { id: "coder", name: "Coder", group: "Build", job: "Builds pages and components from the briefs and DESIGN.md", skills: ["react-best-practices", "composition-patterns"] },
  { id: "harness", name: "Test generator", group: "Build", job: "Writes Vitest unit tests that fail when behaviour breaks", skills: ["test-driven-development", "verification-before-completion"] },
  { id: "code-reviewer", name: "Code reviewer", group: "Quality", job: "Reviews every diff and gives a PASS or FAIL verdict", skills: ["pr-review-toolkit", "differential-review"] },
  { id: "secops-reviewer", name: "SecOps reviewer", group: "Quality", job: "Secrets, dependencies, workflows and headers", skills: ["security-review", "semgrep", "github-actions-hardening"] },
  { id: "seo-auditor", name: "SEO auditor", group: "Quality", job: "Titles, canonicals, schema, sitemap and robots", skills: ["seo-audit", "seo-technical", "schema"] },
  { id: "ai-search-auditor", name: "AI search auditor", group: "Quality", job: "Makes pages quotable by ChatGPT, Claude and Perplexity", skills: ["ai-seo", "seo-geo"] },
  { id: "performance-auditor", name: "Performance auditor", group: "Quality", job: "Lighthouse 100 budgets and Core Web Vitals", skills: ["core-web-vitals", "web-perf", "accessibility"] },
  { id: "responsive-checker", name: "Responsive checker", group: "Quality", job: "Every page from 320 to 1280 px, nothing cut off", skills: ["web-interface-guidelines"] },
];

export const agentPipeline = ["Brief", "Strategy", "Write", "Humanize", "Design", "Build", "Test", "Review", "Audit", "Your GO"];
