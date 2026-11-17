import { IconRobot } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { agentPipeline, agentTeam, type AgentGroup } from "@/data/agency";

const groups: { group: AgentGroup; blurb: string }[] = [
  { group: "Strategy", blurb: "Who the page is for and what it must answer" },
  { group: "Content", blurb: "Copy from real facts, edited to read human" },
  { group: "Build", blurb: "Design system, code and the tests that guard it" },
  { group: "Quality", blurb: "Nothing ships until every audit passes" },
];

const foundations = [
  { label: "AGENTS.md", detail: "The agent map and rules every agent reads first" },
  { label: "DESIGN.md", detail: "Tokens, type, motion and contrast, owned by the designer" },
  { label: "Vendored skills", detail: "Reviewed, pinned skills read by path, never installed" },
  { label: "MCP servers", detail: "GitHub, Playwright and Chrome DevTools for real checks" },
  { label: "CI gates", detail: "Lint, types, unit tests, SEO checks and Lighthouse budgets" },
];

// The agent team on /agency. Data lives in data/agency.ts and is checked against
// .claude/agents/ by a unit test, so every agent shown here exists.
const AgentTeam = () => {
  return (
    <section id="agents" className="defer-section relative overflow-hidden px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border px-4 py-1.5 text-xs uppercase tracking-widest text-brand-muted">
            <IconRobot size={14} className="text-brand-accent-end" aria-hidden="true" /> {agentTeam.length} agents on every project
          </p>
          <h2 className="hero-heading font-display font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
            The agent team
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-brand-muted">
            Claude Code agents with one job each. They propose, scripts decide whether the work passed, and I approve what
            ships to you.
          </p>
        </FadeIn>

        <ol className="mt-10 flex flex-wrap gap-2" aria-label="Agent pipeline">
          {agentPipeline.map((stage, i) => (
            <li
              key={stage}
              className="stage-chip rounded-full border border-brand-border px-3 py-1 font-mono text-xs text-brand-muted"
              style={{ "--i": i, "--cycle": `${agentPipeline.length}s` } as React.CSSProperties}
            >
              {String(i + 1).padStart(2, "0")} {stage}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ group, blurb }, gi) => (
            <FadeIn key={group} delay={gi * 0.08} className="h-full">
              <div className="glow-card flex h-full flex-col p-5">
                <h3 className="font-display text-xl text-brand-text">{group}</h3>
                <p className="mb-4 mt-1 text-sm text-brand-muted">{blurb}</p>
                <ul className="flex flex-col gap-3">
                  {agentTeam
                    .filter((a) => a.group === group)
                    .map((a) => (
                      <li key={a.id} className="rounded-brand-lg border border-brand-border bg-brand-bg/60 p-3">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                            <span className="bot-pulse absolute inset-0 rounded-full bg-brand-accent-end" />
                            <span className="relative h-2.5 w-2.5 rounded-full bg-brand-accent-end" />
                          </span>
                          <span className="font-medium text-brand-text">{a.name}</span>
                        </div>
                        <p className="mt-1 text-sm text-brand-muted">{a.job}</p>
                        <p className="mt-2 font-mono text-[11px] text-brand-accent-start">{a.skills.join(" · ")}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {foundations.map((f) => (
              <div key={f.label} className="flex flex-col-reverse gap-1 rounded-brand-lg border border-brand-border bg-brand-surface p-4">
                <dt className="text-sm text-brand-muted">{f.detail}</dt>
                <dd className="font-mono text-sm font-medium text-brand-text">{f.label}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
};

export default AgentTeam;
