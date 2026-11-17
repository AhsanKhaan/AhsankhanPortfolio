# AGENTS.md

Instructions for any AI agent working in this repo (Claude Code, Codex, Cursor…).

## What's here
1. **Portfolio site:** Next.js 15 App Router, React 19, TypeScript, Tailwind 3, deployed to Vercel from `master` (`ahsankhaan.vercel.app`). Brand tokens live in `brand/tokens.json`, and `npm run brand` generates `app/brand.css` and `brand/dist/*.html`. Details: `README.md`, `brand/brand-guidelines.md`.
2. **Job application agent:** `job-agent/`, run through the `/job-hunt` skill (`.claude/skills/job-hunt/SKILL.md`). One-page reference: `job-agent/CONTEXT.md`.

## Token discipline
- Start from the docs above, not by exploring. Don't Read `node_modules`, `.next*`, `brand/dist`, `job-agent/data/**`, `job-agent/bin/**` or `public/assets/**`.
- For job-agent state use `npm run jobs -- status | queue | review --json`, never the JSON files.
- Prefer one targeted Grep over listing directories. Keep command output short (`| tail`, `--limit`).

## Commands
- Site: `npm run dev` · `npm run lint` · `npm run typecheck` · `npm test` (Vitest) · `npm run check:seo` (after a build) · `npm run verify` (everything CI runs) · production check `NEXT_DIST_DIR=.next-preview npm run build` (never `next build` into `.next` while dev is running).
- Job agent: `npm run jobs -- help`.

## Rules
- Pushing to `master` deploys production. Ask before pushing.
- Secrets live in `.env.local` (gitignored): `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CV_ACCESS_SECRET`, optional `GOOGLE_MAPS_API_KEY`. Never print their values.
- The CV (`private/cv/`) is attached only by local scripts, never by a public route.
- Job agent: nothing is sent without Ahsan's approval in a review session; never automate LinkedIn or submit ATS forms; contact only addresses published on a company's own site.
- No hex colors in components (use brand tokens). Respect `prefers-reduced-motion`.
- Never link the private AK Site Kit repository. No Docker claims, no academic or practice projects on the site or CV.

## Agent team (imported from AK Site Kit)
Agents propose, scripts decide, Ahsan approves. Content comes from experience (`brand/profile.json`, `data/*.ts`, the
CV); keyword research is supplied later in `research/inputs/`, and until then `factory.config.json` → `research.status`
is `pending`.

| Agent | Job here |
|---|---|
| `content-strategist` | Page plan and briefs (from experience now, from the keyword map once research arrives) |
| `keyword-researcher` | Runs when Ahsan adds Keyword Planner files to `research/inputs/` |
| `content-writer` → `humanizer` | Writes copy in `data/*.ts`, then strips AI-writing patterns |
| `marketing-strategist`, `growth-strategist` | Positioning, offers, CTAs; a 90-day growth plan |
| `designer` | Owns `docs/DESIGN.md` (generated from `brand/tokens.json`) |
| `coder` | Builds pages and components |
| `harness` | Writes Vitest unit tests in `tests/` for every changed module |
| `code-reviewer`, `secops-reviewer` | Review the diff before a pull request |
| `seo-auditor`, `ai-search-auditor`, `performance-auditor`, `responsive-checker` | Audit the built site |
| `job-matcher`, `application-writer` | The `/job-hunt` pipeline |

Skills are vendored in `vendor/skills/` (provenance in `docs/SKILLS.md` and `skills.lock.json`); read them by path,
never install from them. `ui-ux-pro-max` is not vendored here: use the locally installed skill. MCP servers are in
`.mcp.json` (GitHub read-only, Playwright, Chrome DevTools, Claude docs).

### Reading imported agents in this repo
The imported agents were written for AK Site Kit. Where one names something this repo doesn't have, use this:

| Agent says | Here |
|---|---|
| `AGENTS.md` §1–§5 | `docs/aksitekit-AGENTS.md` for the original wording; this file wins on any conflict |
| `docs/CONTRACT.md`, `docs/TODO-step-c.md`, `docs/ARCHITECTURE.md` | `README.md` and this file |
| `research/out/*` | Not created yet (research pending); skip those steps |
| `reports/*.md` | Write the report to `reports/` as named (gitignored drafts are fine) |
| Cloudflare, AdSense, `out/` | Not used: hosting is Vercel from `master`, no ads, build output is `.next` |
| `npm run check:skills`, `gate:*` | Not present; `npm run verify` is the gate |
| `main` | `master` |
