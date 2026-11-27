import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconArrowUpRight, IconBrandGithub, IconLock, IconTrophy } from "@tabler/icons-react";
import SiteNav from "../components/sections/SiteNav";
import FadeIn from "../components/ui/FadeIn";
import AgenticAI from "../components/sections/AgenticAI";
import Footer from "../components/sections/Footer";
import { profile } from "@/data/profile";
import {
  commitActivity,
  earlierWork,
  featuredRepos,
  githubAchievements,
  githubStats,
  type RepoStatus,
} from "@/data/contributions";

const title = "GitHub Contributions & Agentic AI Projects";
const description =
  "Ahsan Khan's top repositories: a 21-agent Claude Code SEO pipeline, a BullMQ and Redis commodity platform on a Hetzner VPS, and a programmatic SEO product.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contributions" },
  keywords: [
    "Ahsan Khan GitHub",
    "Claude Code Developer",
    "Agentic AI Engineer",
    "AI Agent Developer",
    "OpenAI Codex Agents",
    "Next.js Open Source Projects",
    "BullMQ Redis Architecture",
    "Full Stack Developer GitHub Portfolio",
  ],
  openGraph: { type: "website", url: "/contributions", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${profile.links.portfolio}/contributions#page`,
      url: `${profile.links.portfolio}/contributions`,
      name: title,
      description,
      author: { "@id": `${profile.links.portfolio}/#person` },
      hasPart: featuredRepos.map((r) => ({
        "@type": r.link?.href.includes("github.com") ? "SoftwareSourceCode" : "CreativeWork",
        name: r.name,
        description: r.summary,
        ...(r.link ? { url: r.link.href } : {}),
        ...(r.link?.href.includes("github.com") ? { codeRepository: r.link.href } : {}),
        keywords: r.stack.join(", "),
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: profile.links.portfolio },
        { "@type": "ListItem", position: 2, name: "GitHub contributions", item: `${profile.links.portfolio}/contributions` },
      ],
    },
  ],
};

const statusStyle: Record<RepoStatus, string> = {
  "Pre-launch": "border-brand-accent-end text-brand-accent-end",
  "Public repo": "border-brand-accent-start text-brand-accent-start",
  "Private repo": "border-brand-border text-brand-muted",
  "In progress": "border-brand-border text-brand-muted",
};

const sectionHeading = "hero-heading font-display font-black uppercase leading-none tracking-tight";
const peak = Math.max(...commitActivity.map((q) => q.commits));
const years = Array.from(new Set(commitActivity.map((q) => q.quarter.slice(0, 4))));

export default function ContributionsPage() {
  return (
    <div className="min-h-screen bg-brand-bg" style={{ overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36 md:px-10">
          <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="aurora pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border px-4 py-1.5 text-xs uppercase tracking-widest text-brand-muted">
              <IconBrandGithub size={14} aria-hidden="true" /> 6+ years of shipping
            </p>
            <h1 className={sectionHeading} style={{ fontSize: "clamp(2.6rem, 7.5vw, 6rem)" }}>
              GitHub contributions
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
              The repositories that best show how I work today: agent pipelines with real guardrails, backend architecture built
              for scale on a small budget, and products shipped with tests and CI. Coursework and practice projects are left out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-accent px-7 text-sm font-medium uppercase tracking-widest text-brand-on-accent"
              >
                <IconBrandGithub size={18} aria-hidden="true" /> GitHub profile
              </a>
              <a
                href="#repositories"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-border px-7 text-sm font-medium uppercase tracking-widest text-brand-text transition-colors hover:border-brand-accent-start"
              >
                Top repositories <IconArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {githubStats.map((s) => (
                <div key={s.label} className="glow-card flex flex-col-reverse gap-1 p-6">
                  <dt className="text-sm text-brand-muted">{s.label}</dt>
                  <dd className="hero-heading font-display text-5xl font-black">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Activity + achievements */}
        <section className="px-5 pb-20 sm:px-8 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.7fr_1fr]">
            <FadeIn className="h-full">
              <div className="glow-card flex h-full flex-col p-6 sm:p-8">
                <h2 className="font-display text-2xl text-brand-text">Commit activity, 2020 to 2026</h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Commits per quarter in personal repositories. Employer work at Nayapay and client work in company repositories
                  is not counted here.
                </p>
                <div
                  className="mt-8 flex h-44 items-end gap-[3px] sm:gap-1.5"
                  role="img"
                  aria-label={`Bar chart of commits per quarter from 2020 to 2026. Busiest quarter: ${peak} commits.`}
                >
                  {commitActivity.map((q) => (
                    <div
                      key={q.quarter}
                      title={`${q.quarter.replace("-", " ")}: ${q.commits} commits`}
                      className="flex-1 rounded-t-sm bg-brand-accent-vertical"
                      style={{ height: `${Math.max((q.commits / peak) * 100, 2)}%`, opacity: q.commits ? 1 : 0.25 }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex border-t border-brand-border pt-2 font-mono text-xs text-brand-muted" aria-hidden="true">
                  {years.map((y) => (
                    <span key={y} className="flex-1 text-center">
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="h-full">
              <div className="glow-card h-full p-6 sm:p-8">
                <h2 className="flex items-center gap-2 font-display text-2xl text-brand-text">
                  <IconTrophy size={22} className="text-brand-accent-end" aria-hidden="true" /> GitHub achievements
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {githubAchievements.map((a) => (
                    <li key={a.name} className="flex gap-3">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-brand-text">{a.name}</p>
                        <p className="text-sm text-brand-muted">{a.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Repositories */}
        <section id="repositories" className="defer-section rounded-t-[40px] bg-brand-surface px-5 py-20 sm:px-8 md:rounded-t-[60px] md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
                Top repositories
              </h2>
              <p className="mb-12 mt-4 max-w-2xl text-lg text-brand-muted">
                Private repositories are described here without a link. Ask me for a walkthrough.
              </p>
            </FadeIn>
            <ul className="flex flex-col gap-6">
              {featuredRepos.map((r) => (
                <li key={r.name}>
                  <FadeIn>
                    <article className="rounded-brand-lg border border-brand-border bg-brand-bg p-6 sm:p-8 lg:p-10">
                      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-xs uppercase tracking-widest text-brand-accent-start">{r.kicker}</p>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-medium uppercase tracking-widest ${statusStyle[r.status]}`}>
                              {r.status === "Private repo" && <IconLock size={12} aria-hidden="true" />}
                              {r.status}
                            </span>
                          </div>
                          <h3 className="mt-3 font-display text-3xl font-bold text-brand-text sm:text-4xl">{r.name}</h3>
                          <p className="mt-4 leading-relaxed text-brand-muted">{r.summary}</p>
                          <ul className="mt-6 flex flex-col gap-3">
                            {r.highlights.map((h) => (
                              <li key={h} className="flex gap-3 text-brand-text">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent-end" aria-hidden="true" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-6">
                          <dl className="grid grid-cols-3 gap-3">
                            {r.metrics.map((m) => (
                              <div key={m.label} className="flex flex-col-reverse gap-1 rounded-brand-lg border border-brand-border bg-brand-surface p-4 text-center">
                                <dt className="text-xs text-brand-muted">{m.label}</dt>
                                <dd className="hero-heading font-display text-2xl font-black sm:text-3xl">{m.value}</dd>
                              </div>
                            ))}
                          </dl>
                          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                            {r.stack.map((t) => (
                              <li key={t} className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-muted">
                                {t}
                              </li>
                            ))}
                          </ul>
                          {r.link && (
                            <a
                              href={r.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex min-h-[44px] w-fit items-center gap-2 text-sm font-medium text-brand-accent-end underline-offset-4 hover:underline"
                            >
                              {r.link.label} <IconArrowUpRight size={16} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AgenticAI showLink={false} numbered={false} />

        {/* Earlier work */}
        <section className="defer-section px-5 pb-20 sm:px-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
                Earlier client work
              </h2>
              <p className="mb-8 mt-3 max-w-2xl text-brand-muted">Where the first thousand commits went.</p>
            </FadeIn>
            <ul className="grid gap-4 md:grid-cols-3">
              {earlierWork.map((w) => (
                <li key={w.name} className="glow-card flex flex-col gap-2 p-6">
                  <p className="font-mono text-xs text-brand-accent-start">
                    {w.year} · {w.commits}
                  </p>
                  <h3 className="font-display text-xl text-brand-text">{w.name}</h3>
                  <p className="text-brand-muted">{w.detail}</p>
                  <p className="mt-auto pt-2 text-xs text-brand-muted">{w.stack}</p>
                </li>
              ))}
            </ul>
            <FadeIn>
              <div className="glow-card mt-10 flex flex-col items-start justify-between gap-5 p-6 sm:p-8 md:flex-row md:items-center">
                <div>
                  <h2 className="font-display text-2xl text-brand-text">Want this kind of pipeline on your product?</h2>
                  <p className="mt-1 text-brand-muted">See services and pricing, or talk to me about a full-time role.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/agency"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-accent px-7 text-sm font-medium uppercase tracking-widest text-brand-on-accent"
                  >
                    Agency <IconArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-border px-7 text-sm font-medium uppercase tracking-widest text-brand-text transition-colors hover:border-brand-accent-start"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
