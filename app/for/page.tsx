import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { personas } from "@/data/personas";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Hiring Ahsan Khan — Pick Your Path",
  description:
    "Tailored pages for tech recruiters, remote hiring managers, relocation & sponsorship employers, and talent acquisition specialists evaluating Ahsan Khan.",
  alternates: { canonical: "/for" },
};

// Hub page for the /for/[slug] persona spokes — keeps them reachable within 3 clicks
// of the homepage and out of orphan-page territory (see programmatic-seo skill).
export default function ForHubPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <header className="border-b border-brand-border px-5 py-5 sm:px-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="font-display text-xl font-extrabold bg-brand-accent bg-clip-text text-transparent">
            {profile.name}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <h1 className="hero-heading font-display mb-4 font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}>
          Hiring? Pick your path.
        </h1>
        <p className="mb-12 max-w-xl text-lg text-brand-muted">
          Same person, same facts — organized for how you&apos;re actually evaluating a candidate.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {personas.map((p) => (
            <Link
              key={p.slug}
              href={`/for/${p.slug}`}
              className="group flex flex-col justify-between rounded-brand-lg border border-brand-border bg-brand-surface p-6 transition-colors hover:border-brand-accent-start"
            >
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-brand-accent-start">{p.kicker}</p>
                <p className="font-display text-xl text-brand-text">{p.navLabel}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-muted group-hover:text-brand-text">
                View page <IconArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
