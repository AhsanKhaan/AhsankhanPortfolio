import Link from "next/link";
import { IconArrowRight, IconBrandLinkedin } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { ContactButton, GhostButton } from "../ui/BrandButtons";
import { recruiterFaq, profile } from "@/data/profile";
import type { PersonaPage } from "@/data/personas";

// Rendered by each /for/[slug] page (Server Component — no client JS needed, unlike
// the homepage's Contact form). Each persona supplies its own hook, proof points and
// FAQ subset — this file is the shared layout, not the content.
export default function PersonaTemplate({ persona }: { persona: PersonaPage }) {
  const faqs = persona.faqIds.map((id) => recruiterFaq.find((f) => f.id === id)!).filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: persona.metaTitle,
    description: persona.metaDescription,
    about: { "@id": `${profile.links.portfolio}/#person` },
    url: `${profile.links.portfolio}/for/${persona.slug}`,
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageJsonLd, faqJsonLd]) }} />

      <header className="border-b border-brand-border px-5 py-5 sm:px-8 md:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-display text-xl font-extrabold bg-brand-accent bg-clip-text text-transparent">
            {profile.name}
          </Link>
          <Link href="/for" className="text-sm text-brand-muted hover:text-brand-text">
            All hiring paths
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <FadeIn y={30}>
          <p className="mb-4 w-fit rounded-full border border-brand-border px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-accent-start">
            {persona.kicker}
          </p>
          <h1 className="hero-heading font-display mb-6 font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
            {persona.h1}
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-brand-text">{persona.hook}</p>
          <p className="mb-10 text-lg leading-relaxed text-brand-muted">{persona.vision}</p>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <ul className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {persona.proofPoints.map((p) => (
              <li key={p.label} className="rounded-brand-lg border border-brand-border bg-brand-surface p-4">
                <div className="hero-heading font-display text-2xl font-black leading-none">{p.value}</div>
                <div className="mt-2 text-xs leading-snug text-brand-muted">{p.label}</div>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <div className="mb-12 rounded-brand-lg border border-brand-border bg-brand-surface p-5">
            <p className="mb-2 text-xs uppercase tracking-widest text-brand-muted">Stack &amp; standards</p>
            <p className="text-brand-text">{persona.stackNote}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="mb-14 flex flex-wrap gap-3">
          <ContactButton href={`/#contact-${persona.ctaInquiry}`}>{persona.ctaLabel}</ContactButton>
          <GhostButton href={profile.links.linkedin} external>
            <IconBrandLinkedin size={16} aria-hidden="true" /> View LinkedIn
          </GhostButton>
        </FadeIn>

        <FadeIn delay={0.25} y={30}>
          <h2 className="font-display mb-4 text-xl font-bold text-brand-text">Quick answers</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.id} className="rounded-brand-lg border border-brand-border bg-brand-surface p-4">
                <summary className="cursor-pointer font-medium text-brand-text">{f.question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={30} className="mt-14 border-t border-brand-border pt-10">
          <p className="mb-3 text-brand-muted">See the full picture: detailed case studies, tech stack and the complete FAQ.</p>
          <Link
            href="/#case-studies"
            className="inline-flex min-h-[44px] items-center gap-2 font-medium text-brand-text hover:opacity-70"
          >
            View case studies &amp; full portfolio <IconArrowRight size={18} aria-hidden="true" />
          </Link>
        </FadeIn>
      </main>
    </div>
  );
}
