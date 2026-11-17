import Link from "next/link";
import { IconArrowRight, IconRobot } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import AgentCore from "../ui/AgentCore";
import { agenticCapabilities, agentLog, pipelineStages, type CapabilityStatus } from "@/data/contributions";

const statusStyle: Record<CapabilityStatus, string> = {
  Shipped: "border-brand-accent-end text-brand-accent-end",
  Building: "border-brand-accent-start text-brand-accent-start",
};

// Agentic AI section. Rendered on the homepage (with a link to /contributions) and on
// the contributions page itself (showLink={false}).
const AgenticAI = ({ showLink = true }: { showLink?: boolean }) => {
  return (
    <section id="ai-lab" className="relative overflow-hidden px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="aurora pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn y={40}>
          <div className="mb-3 flex items-center gap-3">
            <IconRobot className="h-6 w-6 text-brand-accent-end" aria-hidden="true" />
            <span className="rounded-full border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
              Claude Code · OpenAI Codex
            </span>
          </div>
          <h2
            className="hero-heading font-display font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
          >
            Agentic AI
          </h2>
          <p className="mb-12 mt-4 max-w-2xl text-lg text-brand-muted">
            I build with AI agents the way I build production software: one job per agent, a script that decides whether the work
            passed, and a person who approves what ships.
          </p>
        </FadeIn>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {/* Robot + pipeline */}
          <FadeIn className="h-full">
            <div className="glow-card flex h-full flex-col items-center p-6 sm:p-8">
              <AgentCore className="w-full max-w-[340px]" />
              <p className="mt-2 text-center text-xs uppercase tracking-widest text-brand-muted">
                Agents propose · Scripts decide · You approve
              </p>
              <ol className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Pipeline stages">
                {pipelineStages.map((stage, i) => (
                  <li
                    key={stage}
                    className="stage-chip rounded-full border border-brand-border px-3 py-1 font-mono text-xs text-brand-muted"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {stage}
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          {/* Agent log */}
          <FadeIn delay={0.1} className="h-full">
            <div className="glow-card flex h-full flex-col overflow-hidden">
              <div className="flex items-center gap-2 border-b border-brand-border px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-danger" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-accent-start" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-accent-end" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-brand-muted">pipeline · ledger</span>
              </div>
              <ul className="flex flex-1 flex-col justify-center gap-4 p-5 font-mono text-sm sm:p-8">
                {agentLog.map((entry, i) => (
                  <li key={entry.agent} className="log-line flex flex-wrap gap-x-3" style={{ "--i": i } as React.CSSProperties}>
                    <span className="text-brand-accent-start">{entry.agent}</span>
                    <span className="text-brand-muted" aria-hidden="true">▸</span>
                    <span className="text-brand-text">{entry.line}</span>
                  </li>
                ))}
                <li className="text-brand-accent-end" aria-hidden="true">
                  <span className="caret">▍</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agenticCapabilities.map((item, i) => (
            <li key={item.name}>
              <FadeIn delay={i * 0.06} className="h-full">
                <div className="glow-card flex h-full flex-col gap-3 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-brand-muted">{item.tool}</span>
                    <span className={`shrink-0 rounded-full border px-3 py-0.5 text-xs font-medium uppercase tracking-widest ${statusStyle[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-brand-text">{item.name}</h3>
                  <p className="text-brand-muted">{item.detail}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>

        {showLink && (
          <FadeIn>
            <Link
              href="/contributions"
              className="mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-accent px-7 text-sm font-medium uppercase tracking-widest text-brand-on-accent"
            >
              See the repositories <IconArrowRight size={16} aria-hidden="true" />
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default AgenticAI;
