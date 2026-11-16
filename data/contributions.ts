// GitHub contributions and agentic-AI work.
// Numbers come from the GitHub account export of 2026-11-11 (commit history and pull
// requests) and from each project's own README. Academic work, course exercises and
// small practice repositories are deliberately left out.

export const githubStats = [
  { value: "1,300+", label: "Commits authored across personal repositories" },
  { value: "50+", label: "Pull requests authored, each through CI checks" },
  { value: "21", label: "Claude Code agents in one gated pipeline" },
  { value: "9", label: "CI/CD workflows guarding a single template" },
];

// Commits authored per quarter (non-merge), 2020 Q1 to 2026 Q4.
export const commitActivity: { quarter: string; commits: number }[] = [
  ["2020-Q1", 113], ["2020-Q2", 172], ["2020-Q3", 310], ["2020-Q4", 130],
  ["2021-Q1", 0], ["2021-Q2", 16], ["2021-Q3", 24], ["2021-Q4", 6],
  ["2022-Q1", 50], ["2022-Q2", 28], ["2022-Q3", 6], ["2022-Q4", 0],
  ["2023-Q1", 0], ["2023-Q2", 0], ["2023-Q3", 0], ["2023-Q4", 0],
  ["2024-Q1", 27], ["2024-Q2", 6], ["2024-Q3", 0], ["2024-Q4", 56],
  ["2025-Q1", 20], ["2025-Q2", 7], ["2025-Q3", 32], ["2025-Q4", 37],
  ["2026-Q1", 0], ["2026-Q2", 15], ["2026-Q3", 9], ["2026-Q4", 122],
].map(([quarter, commits]) => ({ quarter: quarter as string, commits: commits as number }));

export const githubAchievements = [
  { name: "Pull Shark", detail: "Opened pull requests that were merged" },
  { name: "Quickdraw", detail: "Closed an issue or pull request within minutes of opening" },
  { name: "YOLO", detail: "Merged a pull request without a review" },
  { name: "Arctic Code Vault Contributor", detail: "Code preserved in the 2020 GitHub Archive Program" },
];

export type RepoStatus = "Pre-launch" | "Public repo" | "Private repo" | "In progress";

export interface FeaturedRepo {
  name: string;
  kicker: string;
  status: RepoStatus;
  summary: string;
  highlights: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  // Only set for work that can be opened by a visitor. Private repositories carry no link.
  link?: { href: string; label: string };
}

export const featuredRepos: FeaturedRepo[] = [
  {
    name: "AK Site Kit",
    kicker: "Agentic SEO site factory",
    status: "Private repo",
    summary:
      "A template that turns keyword research into a search-ready content website. A team of Claude Code agents does the work, deterministic scripts decide when each stage has passed, and the owner approves the idea, the design and every launch.",
    highlights: [
      "21 specialised agents, one per stage: orchestrator, competitor recon, keyword researcher, content strategist, designer, coder, code reviewer, SecOps reviewer, SEO and AI-search auditors, AdSense gatekeeper and DevSecOps deployer",
      "Automated code review on every change: the pipeline stops until the reviewer's verdict is PASS for that exact commit",
      "9 GitHub Actions workflows: CI, gitleaks and npm audit, CodeQL, Lighthouse CI, OWASP ZAP scans on previews, OpenSSF Scorecard and daily live checks",
      "Cloudflare Pages and Workers deploys that run only after the owner's GO for the exact commit",
      "Hooks block secrets, pushes to main and skipped checks before a tool runs, and every gate result lands in a ledger",
    ],
    stack: ["Claude Code", "Next.js", "TypeScript", "GitHub Actions", "Cloudflare Pages", "Cloudflare Workers", "Lighthouse CI", "CodeQL", "OWASP ZAP", "Playwright"],
    metrics: [
      { value: "21", label: "agents" },
      { value: "9", label: "workflows" },
      { value: "21", label: "merged PRs" },
    ],
  },
  {
    name: "Calculator Porch",
    kicker: "Programmatic SEO product",
    status: "Pre-launch",
    summary:
      "A calculator site in the calculator.net class: free calculators for math, money, building, food and everyday life, built on a config-driven engine and shipped as a static export.",
    highlights: [
      "Config-driven calculator engine: a new calculator is a validated config, not a new page of code",
      "Programmatic SEO families gated by search demand, with keyword clustering and build-enforced cannibalization rules",
      "FAQ markup, llms.txt and a link graph that keeps every page within two clicks of home",
      "120+ unit tests, 25 end-to-end tests and an axe WCAG 2.2 accessibility harness run before every release",
      "Release gate that blocks publishing until each calculator cites at least two sources",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Zod", "Vitest", "Playwright", "Cloudflare Pages"],
    metrics: [
      { value: "100+", label: "commits" },
      { value: "27", label: "merged PRs" },
      { value: "18", label: "agents" },
    ],
    link: { href: "https://calculatorporch.com", label: "calculatorporch.com" },
  },
  {
    name: "CIP-2026",
    kicker: "Backend architecture",
    status: "Public repo",
    summary:
      "Commodity Intelligence Platform: live gold, silver, copper, crypto and currency rates for the US, UK, Pakistan, India and the Gulf. Architected for 1 million monthly users on roughly $25 a month of infrastructure.",
    highlights: [
      "Write path on a Hetzner Cloud VPS: BullMQ job queues on local Redis under PM2 ingest metals every 60 seconds and crypto over a Binance WebSocket, with a fallback price provider",
      "Read path that never touches the price API: Cloudflare CDN and WAF, Next.js ISR, Upstash Redis with a 30-second TTL, then MongoDB time-series collections",
      "1-minute, 1-hour and 1-day candle aggregation jobs feeding TradingView-style charts",
      "Admin CMS behind Clerk MFA with a 4-stage publishing workflow, expiring preview URLs and a JSON-LD editor",
      "Pino structured logging to MongoDB with PII redaction, plus Vitest, Playwright and fast-check property tests",
    ],
    stack: ["Next.js 16", "TypeScript", "BullMQ", "Redis", "MongoDB", "Hetzner VPS", "Cloudflare", "Clerk MFA", "Pino", "Vitest"],
    metrics: [
      { value: "1M", label: "MAU design target" },
      { value: "60s", label: "price ingest" },
      { value: "~$25", label: "monthly infra" },
    ],
    link: { href: "https://github.com/AhsanKhaan/cip-2026", label: "github.com/AhsanKhaan/cip-2026" },
  },
  {
    name: "AK Client Kit",
    kicker: "Client website pipeline",
    status: "In progress",
    summary:
      "The agency version of the site factory: takes a client's requirements and produces a custom, animated Astro website with an optional private CMS. The first phase, the skeleton and provider layer, is built.",
    highlights: [
      "Astro as the site framework, so static sections ship no JavaScript and motion stays inside a performance budget",
      "Rules, agents and skills written once in a vendor-neutral format, then generated for Claude Code, OpenAI Codex, Gemini CLI and Qwen Code",
      "Append-only, hash-chained ledger of gate runs and approvals",
      "Git hooks and CI that block secrets, forced pushes and direct commits to main",
    ],
    stack: ["Astro", "Node.js", "Claude Code", "OpenAI Codex", "Gemini CLI", "Git hooks"],
    metrics: [
      { value: "4", label: "agent runtimes" },
      { value: "1/10", label: "phases built" },
    ],
  },
  {
    name: "career-ai",
    kicker: "Agentic automation",
    status: "Public repo",
    summary:
      "A Python command-line pipeline for a job search: it discovers roles from public job-board APIs, scores them against a profile, and prepares a tailored application that a person reviews before anything is submitted.",
    highlights: [
      "Reads Greenhouse, Lever and Ashby job-board APIs directly, with no scraping",
      "Batched scoring and tailored ATS resume generation through the Claude CLI",
      "Playwright fills the application form and pauses before submit, so a human makes the final call",
    ],
    stack: ["Python", "Typer", "Pydantic", "Playwright", "Claude CLI", "pytest"],
    metrics: [
      { value: "8", label: "CLI stages" },
      { value: "0", label: "auto-submits" },
    ],
    link: { href: "https://github.com/AhsanKhaan/career-ai", label: "github.com/AhsanKhaan/career-ai" },
  },
  {
    name: "This portfolio",
    kicker: "Brand system and site",
    status: "Public repo",
    summary:
      "The site you are reading: one set of brand tokens drives the website, the transactional emails and the LinkedIn assets, with a CV that is delivered by a verified email link instead of a public file.",
    highlights: [
      "Token-driven brand system shared by the site, email templates and social images",
      "Gated CV delivery with email validation, disposable-domain blocking and rate limiting",
      "Persona pages, FAQ schema and llms.txt written for both recruiters and AI search",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Nodemailer", "Vercel"],
    metrics: [{ value: "45+", label: "commits" }],
    link: { href: "https://github.com/AhsanKhaan/AhsankhanPortfolio", label: "github.com/AhsanKhaan/AhsankhanPortfolio" },
  },
];

// Earlier client work that lives in private or legacy repositories. No links on purpose.
export const earlierWork = [
  {
    name: "Multi-vendor pet marketplace",
    year: "2020",
    detail: "Vendor stores, classifieds, appointments, chat and checkout for a multi-vendor marketplace.",
    stack: "PHP, MySQL, JavaScript",
    commits: "225+ commits",
  },
  {
    name: "Canadian real-estate listings plugin",
    year: "2020",
    detail: "Listing search and detail pages fed by the CREA data feed over RETS.",
    stack: "PHP, WordPress, RETS",
    commits: "215+ commits",
  },
  {
    name: "Schef food-service platform",
    year: "2021 to 2022",
    detail: "Restaurant ordering and operations dashboard with order tracking and analytics.",
    stack: "Laravel 8, PHP, MySQL",
    commits: "85+ commits",
  },
];

export type CapabilityStatus = "Shipped" | "Building";

export const agenticCapabilities: { name: string; tool: string; detail: string; status: CapabilityStatus }[] = [
  {
    name: "Multi-agent pipelines",
    tool: "Claude Code",
    detail:
      "Subagents with one job each, an orchestrator that hands work between them, and a script that decides whether a stage passed.",
    status: "Shipped",
  },
  {
    name: "Guardrails and approvals",
    tool: "Claude Code hooks",
    detail:
      "Pre-tool hooks that block secrets and pushes to main, approvals pinned to a file hash, and deploys that wait for a GO on the exact commit.",
    status: "Shipped",
  },
  {
    name: "Agentic SEO and content",
    tool: "Claude Code skills",
    detail:
      "Keyword maps with one page per keyword, content briefs, an on-page SEO gate in every build and a separate AI-search review.",
    status: "Shipped",
  },
  {
    name: "Automated code review",
    tool: "Claude Code and CI",
    detail:
      "A reviewer agent reads each change before a pull request, alongside CodeQL, gitleaks, Lighthouse CI and OWASP ZAP in GitHub Actions.",
    status: "Shipped",
  },
  {
    name: "Vendor-neutral agents",
    tool: "OpenAI Codex, Gemini CLI, Qwen Code",
    detail:
      "Agent rules and skills authored once in AGENTS.md form and generated for each coding agent, so a pipeline is not tied to one vendor.",
    status: "Building",
  },
  {
    name: "LLM features in products",
    tool: "Claude and OpenAI APIs",
    detail:
      "Calling the Claude and OpenAI SDKs from Next.js route handlers: streaming, tool use, structured output and error handling.",
    status: "Building",
  },
];

export const pipelineStages = ["Idea", "Recon", "Keywords", "Content", "Design", "Build", "Review", "Your GO", "Live"];

export const agentLog = [
  { agent: "orchestrator", line: "stage keyword-map started" },
  { agent: "keyword-researcher", line: "1 keyword mapped to 1 page" },
  { agent: "gate", line: "keyword-map PASS, written to ledger" },
  { agent: "code-reviewer", line: "verdict PASS for this commit" },
  { agent: "secops-reviewer", line: "no secrets, no high findings" },
  { agent: "owner", line: "GO received, deploying to Cloudflare" },
];
