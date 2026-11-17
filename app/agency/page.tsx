import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconArrowUpRight, IconBrandLinkedin, IconCheck } from "@tabler/icons-react";
import SiteNav from "../components/sections/SiteNav";
import AgentCore from "../components/ui/AgentCore";
import FadeIn from "../components/ui/FadeIn";
import Footer from "../components/sections/Footer";
import AgentTeam from "../components/sections/AgentTeam";
import { profile } from "@/data/profile";
import {
  agencyIntro,
  agencyPackages,
  agencyProcess,
  agencyServices,
  agencyWork,
  freelanceProfiles,
  quoteLink,
  quoteNote,
} from "@/data/agency";

const title = "Agentic SEO & Next.js Freelance Services";
const description =
  "Hire Ahsan Khan for agentic SEO, marketing content strategy, Next.js and Astro websites, programmatic SEO tool sites, web apps and backend architecture.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agency" },
  keywords: [
    "Freelance Next.js Developer",
    "Agentic SEO Services",
    "AI SEO Agency",
    "Marketing Content Strategist",
    "Programmatic SEO Developer",
    "Astro Website Developer",
    "Freelance React Developer",
    "Claude Code Developer",
    "Hire Full Stack Developer",
  ],
  openGraph: { type: "website", url: "/agency", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${profile.links.portfolio}/agency#service`,
      name: `${profile.name} — Web Development & Agentic SEO`,
      url: `${profile.links.portfolio}/agency`,
      description,
      provider: { "@id": `${profile.links.portfolio}/#person` },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: agencyServices.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: profile.links.portfolio },
        { "@type": "ListItem", position: 2, name: "Agency", item: `${profile.links.portfolio}/agency` },
      ],
    },
  ],
};

const sectionHeading = "hero-heading font-display font-black uppercase leading-none tracking-tight";
const primaryCta =
  "inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-accent px-7 text-sm font-medium uppercase tracking-widest text-brand-on-accent";
const ghostCta =
  "inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-border px-7 text-sm font-medium uppercase tracking-widest text-brand-text transition-colors hover:border-brand-accent-start";

export default function AgencyPage() {
  const profiles = freelanceProfiles.filter((p) => p.href);

  return (
    <div className="min-h-screen bg-brand-bg" style={{ overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-36 md:px-10">
          <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="aurora pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-brand-border px-4 py-1.5 text-xs uppercase tracking-widest text-brand-muted">
                Freelance · Agency · Worldwide
              </p>
              <h1 className={sectionHeading} style={{ fontSize: "clamp(2.6rem, 7.5vw, 6rem)" }}>
                Websites built to be found
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">{agencyIntro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={quoteLink} target="_blank" rel="noopener noreferrer" className={primaryCta}>
                  <IconBrandLinkedin size={18} aria-hidden="true" /> Get a quote
                </a>
                <a href="#work" className={ghostCta}>
                  See the work <IconArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <AgentCore className="mx-auto w-full max-w-[420px]" />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-5 py-20 sm:px-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
                Services
              </h2>
              <p className="mb-12 mt-4 max-w-2xl text-lg text-brand-muted">
                One person accountable from keyword research to launch, with agents handling the repetitive work.
              </p>
            </FadeIn>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {agencyServices.map((s, i) => (
                <li key={s.name} className={i === 0 ? "lg:col-span-2" : undefined}>
                  <FadeIn delay={i * 0.05} className="h-full">
                    <div className="glow-card flex h-full flex-col gap-4 p-6 sm:p-7">
                      <span className="font-mono text-xs text-brand-accent-end">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-display text-2xl font-medium text-brand-text">{s.name}</h3>
                      <p className="leading-relaxed text-brand-muted">{s.description}</p>
                      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                        {s.tags.map((t) => (
                          <li key={t} className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AgentTeam />

        {/* Work */}
        <section id="work" className="defer-section rounded-t-[40px] bg-brand-surface px-5 py-20 sm:px-8 md:rounded-t-[60px] md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
                Selected work
              </h2>
              <p className="mb-12 mt-4 max-w-2xl text-lg text-brand-muted">
                Products I own, platforms I architected and sites delivered for clients.
              </p>
            </FadeIn>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {agencyWork.map((w, i) => {
                const body = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-brand-lg border-b border-brand-border bg-brand-bg">
                      {w.image ? (
                        <Image
                          src={w.image}
                          alt={`${w.title} screenshot`}
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
                          <span className="hero-heading relative px-4 text-center font-display text-3xl font-black uppercase">{w.title}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <p className="text-xs uppercase tracking-widest text-brand-accent-start">{w.category}</p>
                      <h3 className="flex items-center gap-2 font-display text-xl text-brand-text">
                        {w.title}
                        {w.link && <IconArrowUpRight size={18} className="text-brand-muted" aria-hidden="true" />}
                      </h3>
                      <p className="text-brand-muted">{w.description}</p>
                    </div>
                  </>
                );
                return (
                  <li key={w.title}>
                    <FadeIn delay={(i % 3) * 0.08} className="h-full">
                      {w.link ? (
                        <a href={w.link} target="_blank" rel="noopener noreferrer" className="glow-card group flex h-full flex-col">
                          {body}
                        </a>
                      ) : (
                        <div className="glow-card group flex h-full flex-col">{body}</div>
                      )}
                    </FadeIn>
                  </li>
                );
              })}
            </ul>
            <FadeIn>
              <Link href="/contributions" className={`${ghostCta} mt-10`}>
                GitHub contributions <IconArrowRight size={16} aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="defer-section bg-brand-surface px-5 pb-20 sm:px-8 md:px-10 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
                How it works
              </h2>
            </FadeIn>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agencyProcess.map((p, i) => (
                <li key={p.step}>
                  <FadeIn delay={i * 0.08} className="h-full">
                    <div className="h-full rounded-brand-lg border border-brand-border bg-brand-bg p-6">
                      <span className="hero-heading font-display text-5xl font-black" aria-hidden="true">
                        {i + 1}
                      </span>
                      <h3 className="mt-3 font-display text-xl text-brand-text">{p.step}</h3>
                      <p className="mt-2 text-brand-muted">{p.detail}</p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="defer-section relative overflow-hidden px-5 py-20 sm:px-8 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
                Pricing
              </h2>
              <p className="mb-12 mt-4 max-w-2xl text-lg text-brand-muted">{quoteNote}</p>
            </FadeIn>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agencyPackages.map((p, i) => (
                <li key={p.name}>
                  <FadeIn delay={i * 0.06} className="h-full">
                    <div className="glow-card flex h-full flex-col p-6" data-featured={p.featured || undefined}>
                      {p.featured && (
                        <span className="mb-3 w-fit rounded-full bg-brand-accent px-3 py-0.5 text-xs font-medium uppercase tracking-widest text-brand-on-accent">
                          Most requested
                        </span>
                      )}
                      <h3 className="font-display text-xl text-brand-text">{p.name}</h3>
                      <p className="mt-4 font-display text-3xl font-bold text-brand-text">{p.price}</p>
                      <p className="text-xs uppercase tracking-widest text-brand-muted">{p.unit}</p>
                      <ul className="mt-6 flex flex-col gap-3">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-2 text-sm text-brand-muted">
                            <IconCheck size={16} className="mt-0.5 shrink-0 text-brand-accent-end" aria-hidden="true" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
            <FadeIn>
              <div className="glow-card mt-6 flex flex-col items-start justify-between gap-5 p-6 sm:p-8 md:flex-row md:items-center">
                <div>
                  <h3 className="font-display text-2xl text-brand-text">Need something customised?</h3>
                  <p className="mt-1 text-brand-muted">Send me your scope on LinkedIn and I will reply with a quote.</p>
                </div>
                <a href={quoteLink} target="_blank" rel="noopener noreferrer" className={`${primaryCta} shrink-0`}>
                  <IconBrandLinkedin size={18} aria-hidden="true" /> Request a quote
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Freelance profiles */}
        <section id="profiles" className="defer-section px-5 pb-24 sm:px-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={sectionHeading} style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
                Hire me where you already work
              </h2>
            </FadeIn>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {profiles.map((p) => (
                <li key={p.platform}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="glow-card flex h-full flex-col gap-1 p-6">
                    <span className="flex items-center justify-between font-display text-xl text-brand-text">
                      {p.platform} <IconArrowUpRight size={18} className="text-brand-muted" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-brand-muted">{p.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
