// Visual brand documentation: one place to check that the website, email
// signature and LinkedIn posts share the same tokens. Not linked from the site.
import type { Metadata } from "next";
import brand from "@/brand/dist/tokens.resolved.json";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Brand System",
  robots: { index: false, follow: false },
};

const socialExamples: { template: string; title: string; body: string; tag?: string }[] = [
  { template: "tip", title: "Virtualize long tables before you optimize anything else", body: "Rendering 10K rows? Only mount what's visible. Our admin portal's FCP dropped from 4.2s to 2.7s.", tag: "Frontend tip" },
  { template: "metric", title: "80%", body: "less manual work after automating merchant onboarding (5 days → 1 day)", tag: "Impact" },
  { template: "project", title: "Nayapay Admin Portal", body: "RBAC, real-time data and PCI DSS hardening for 100K+ wallet users.", tag: "Project spotlight" },
  { template: "quote", title: "Lesson from 3 security audits", body: "Security isn't a sprint ticket. It's a default you design into every form, route and token." },
];

const socialUrl = (e: Record<string, string | undefined>) =>
  `/brand/social?${new URLSearchParams(Object.entries(e).filter((kv): kv is [string, string] => !!kv[1])).toString()}`;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-brand-border py-12">
      <h2 className="font-display mb-6 text-3xl font-bold uppercase text-brand-text">{title}</h2>
      {children}
    </section>
  );
}

export default function BrandPage() {
  const { color, gradient } = brand.semantic;
  const primitives = brand.primitive.color;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <header className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-widest text-brand-muted">Brand system v{brand.meta.version}</p>
        <h1 className="hero-heading font-display text-6xl font-black uppercase leading-none md:text-8xl">{profile.name}</h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          Every color here comes from <code className="font-mono text-brand-text">brand/tokens.json</code>. Edit that file, run{" "}
          <code className="font-mono text-brand-text">npm run brand</code>, and the website, email templates and LinkedIn images all update.
          Written guidelines: <code className="font-mono text-brand-text">brand/brand-guidelines.md</code>.
        </p>
        <nav aria-label="Brand sections" className="mt-6 flex flex-wrap gap-3 text-sm">
          {["colors", "typography", "email", "linkedin"].map((s) => (
            <a key={s} href={`#${s}`} className="inline-flex min-h-[44px] items-center rounded-full border border-brand-border px-4 uppercase tracking-widest text-brand-text hover:bg-white/10">
              {s}
            </a>
          ))}
        </nav>
      </header>

      <Section id="colors" title="Colors">
        <h3 className="mb-4 text-sm uppercase tracking-widest text-brand-muted">Semantic (use these)</h3>
        <ul className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(color).map(([name, value]) => (
            <li key={name} className="overflow-hidden rounded-brand-lg border border-brand-border">
              <div className="h-20" style={{ background: value }} />
              <div className="bg-brand-surface p-3">
                <p className="font-mono text-sm text-brand-text">--color-{name}</p>
                <p className="font-mono text-xs text-brand-muted">{value}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mb-4 text-sm uppercase tracking-widest text-brand-muted">Gradients</h3>
        <ul className="mb-10 grid gap-4 sm:grid-cols-3">
          {Object.entries(gradient).map(([name, value]) => (
            <li key={name} className="overflow-hidden rounded-brand-lg border border-brand-border">
              <div className="h-20" style={{ background: value }} />
              <p className="bg-brand-surface p-3 font-mono text-sm text-brand-text">--gradient-{name}</p>
            </li>
          ))}
        </ul>
        <h3 className="mb-4 text-sm uppercase tracking-widest text-brand-muted">Primitives (reference only)</h3>
        <ul className="flex flex-wrap gap-3">
          {Object.entries(primitives).map(([name, value]) => (
            <li key={name} className="flex items-center gap-2 rounded-full border border-brand-border py-1 pl-1 pr-3 text-xs text-brand-muted">
              <span className="h-6 w-6 rounded-full border border-brand-border" style={{ background: value }} />
              <span className="font-mono">{name} {value}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="typography" title="Typography">
        <div className="space-y-6">
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-brand-muted">Display: {brand.typography.family.display} 900, uppercase</p>
            <p className="hero-heading font-display text-6xl font-black uppercase leading-none">Hi, I&apos;m Ahsan</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-brand-muted">Heading: {brand.typography.family.display} 500, uppercase</p>
            <p className="font-display text-3xl font-medium uppercase text-brand-text">Frontend Architecture</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-brand-muted">Body: {brand.typography.family.body} 400, 16px / 1.5</p>
            <p className="max-w-2xl text-base text-brand-text">
              Architected frontends serving 100K+ users and cut page load time by 35%. Metric first, then the method.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-brand-muted">Email: {brand.typography.family.email}</p>
            <p className="text-base text-brand-text" style={{ fontFamily: brand.typography.family.email }}>
              Web fonts don&apos;t load in most mail clients, so emails use this stack.
            </p>
          </div>
        </div>
      </Section>

      <Section id="email" title="Email">
        <p className="mb-6 max-w-2xl text-brand-muted">
          Emails use the light-safe <code className="font-mono text-brand-text">component.email</code> tokens, because many clients force a
          white background. To install the signature, open{" "}
          <a href="/brand/signature" target="_blank" rel="noopener noreferrer" className="text-brand-accent-start underline underline-offset-4">/brand/signature</a>, press Ctrl+A, Ctrl+C,
          then paste into Gmail → Settings → Signature.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <figure>
            <iframe title="Email signature preview" src="/brand/signature" className="h-56 w-full rounded-brand-lg border border-brand-border bg-white" />
            <figcaption className="mt-2 text-sm text-brand-muted">Signature: brand/dist/email-signature.html</figcaption>
          </figure>
          <figure>
            <iframe title="Recruiter email preview" src="/brand/recruiter-email" className="h-[520px] w-full rounded-brand-lg border border-brand-border bg-white" />
            <figcaption className="mt-2 text-sm text-brand-muted">
              Recruiter email: brand/dist/recruiter-email.html (Jinja placeholders shown as-is)
            </figcaption>
          </figure>
          <figure className="lg:col-span-2">
            <iframe title="CV delivery email preview" src="/brand/cv-delivery" className="h-[560px] w-full rounded-brand-lg border border-brand-border bg-white" />
            <figcaption className="mt-2 text-sm text-brand-muted">
              CV delivery: brand/dist/cv-delivery-email.html — sent by <code className="font-mono">/api/cv-request</code> after email validation
              passes (format, disposable-domain check, MX lookup). See §6a.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section id="linkedin" title="LinkedIn posts">
        <p className="mb-6 max-w-2xl text-brand-muted">
          1080×1350 PNGs rendered from query params. Templates:{" "}
          <code className="font-mono text-brand-text">tip · metric · project · quote</code>. Example:{" "}
          <code className="break-all font-mono text-xs text-brand-text">{socialUrl(socialExamples[1])}</code>
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socialExamples.map((e) => (
            <li key={e.template}>
              <a href={socialUrl(e)} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, not an optimizable asset */}
                <img src={socialUrl(e)} alt={`${e.template} template example`} width={1080} height={1350} loading="lazy" className="h-auto w-full rounded-brand-lg border border-brand-border" />
              </a>
              <p className="mt-2 font-mono text-sm text-brand-muted">template={e.template}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
