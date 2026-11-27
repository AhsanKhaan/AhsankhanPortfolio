@AGENTS.md

## Claude Code specifics
- Skills: `/job-hunt` (job pipeline). Marketing/SEO/design skills under `.claude/skills/` are installed locally (gitignored).
- Subagents: `job-matcher` (Haiku, scoring) and `application-writer` (Sonnet, drafting) in `.claude/agents/`, used by `/job-hunt`.
- A daily scheduled task runs `/job-hunt run`, and its alerts arrive by email and push notification. Approving and sending always happen in `/job-hunt review`.

## Standing rules from Ahsan
- Do not use Cursor (the editor, its CLI, its agents or its AI features) for any task, agent or development work in any session, until Ahsan says otherwise.
