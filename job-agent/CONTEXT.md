# Job agent: context

One-page reference so agents never need to explore the code. Operating steps live in
`.claude/skills/job-hunt/SKILL.md`; candidate facts in `job-agent/candidate.md`.

## Split of work
- **Scripts do the deterministic I/O** (`job-agent/cli.mjs` and `lib/`): fetching, crawling, filtering, storage, sending. No LLM calls, no API keys beyond Gmail and optionally Google Places.
- **Claude Code does the judgement:** `job-matcher` (Haiku) scores job descriptions against the CV, and `application-writer` (Sonnet) writes the per-job opening line. They exchange data with the CLI only through `job-agent/data/inbox/*.json` plus `ingest`, which validates everything.

## Pipeline
1. **discover:** jobs from the remote boards (Remotive, Arbeitnow, Jobicy, Himalayas, RemoteOK) and the ATS watchlist. Companies come from `targetCompanies`, Google Maps (the `gmaps` scraper binary), Google Places (if `GOOGLE_MAPS_API_KEY` is set) and OpenStreetMap.
2. **prefilter** (on insert): title include/exclude, at least 2 stack keywords, location policy (on-site in KSA/UAE/Qatar/Karachi, or remote open to Pakistan's region), posting at most 45 days old.
3. **crawl:** at most 5 pages per company site, respecting robots.txt. It looks for the careers page, an ATS feed (Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Recruitee) whose jobs are then ingested, and hiring emails on the company's own domain. Emails are MX-validated, and support@/sales@/noreply@ and similar are excluded.
4. **score:** the matcher writes `match-<jobId>.json`. Jobs scoring ≥70 with no blockers and a verdict other than "skip" become `scored`.
5. **draft:** the writer writes `draft-<jobId>.json`. `ingest` rejects any `to` address not found on the company site, subjects over 90 chars, and opening lines outside 10–60 words.
6. **digest:** an alert email to Ahsan, plus a push notification from the skill.
7. **review:** Ahsan approves in Claude Code (AskUserQuestion).
8. **send:** Gmail SMTP from his account using `brand/templates/recruiter-email.html` (signature included) with the CV attached. Capped at 10 per day, with a 30-day cooldown per company.
9. **track:** `status`, `log` (manual applications), `update` (outcomes), `export` (CSV).

## Files
| Path | What |
|---|---|
| `job-agent/config.json` | targets, sources, company lists, Maps queries, limits. The only file to edit for tuning |
| `job-agent/candidate.md` | CV facts; the agents' only source of truth |
| `job-agent/cli.mjs` | every command (`npm run jobs -- help`) |
| `job-agent/lib/sources/{boards,ats,companies,gmaps}.mjs` | data sources |
| `job-agent/lib/{crawl,prefilter,emails,mailer,http,store,text,env}.mjs` | internals |
| `job-agent/data/` (gitignored) | `jobs.json`, `companies.json`, `applications.json`, `inbox/`, `outbox/` (dry-run previews), `gmaps/` |
| `job-agent/bin/google-maps-scraper.exe` (gitignored) | gosom/google-maps-scraper v1.18.1, SHA-256 verified |

## Statuses
- Job: `new` (passed prefilter) → `scored` | `rejected` → `drafted`, or `filtered`.
- Application: `draft` → `approved` → `sent` (email) / `applied` (link or manual) → `replied` → `interview` → `offer` | `rejected` | `ghosted` | `withdrawn`, or `skipped`.

## Known limits
- Big employers rarely publish HR emails, so their applications use the link channel (cover note plus manual apply). Smaller local companies from Maps more often publish careers@ or hr@ addresses.
- Many careers pages are JS-rendered and expose no ATS link to plain HTTP. Their jobs then come only from the boards.
- Google Maps scraping is against Google's terms. Keep runs small (`discovery.maps.maxQueriesPerRun`, rotated daily through `discovery.maps.queries`) and expect occasional blocks. The Places API is the compliant alternative.
- The attached CV still names HungerStation in its summary and doesn't list Java. Fix the CV before sending to other companies.
