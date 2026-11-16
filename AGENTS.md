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
- Site: `npm run dev` · `npm run lint` · production check `NEXT_DIST_DIR=.next-preview npm run build` (never `next build` into `.next` while dev is running).
- Job agent: `npm run jobs -- help`.

## Rules
- Pushing to `master` deploys production. Ask before pushing.
- Secrets live in `.env.local` (gitignored): `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CV_ACCESS_SECRET`, optional `GOOGLE_MAPS_API_KEY`. Never print their values.
- The CV (`private/cv/`) is attached only by local scripts, never by a public route.
- Job agent: nothing is sent without Ahsan's approval in a review session; never automate LinkedIn or submit ATS forms; contact only addresses published on a company's own site.
- No hex colors in components (use brand tokens). Respect `prefers-reduced-motion`.
