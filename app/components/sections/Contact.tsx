"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconBrandLinkedin, IconBrandGithub, IconMail, IconLoader2, IconCircleCheck } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { inquiryTypes, profile, type InquiryType } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-3 text-base text-brand-text focus:border-brand-accent-start focus:outline-none";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please enter your name.";
  const email = String(data.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (String(data.get("message") ?? "").trim().length < 10) errors.message = "Please write at least a short message (10+ characters).";
  return errors;
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inquiry, setInquiry] = useState<InquiryType>("fulltime");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");

  // "#contact-freelance" style links (Work With Me cards) preselect the inquiry type.
  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#contact-(fulltime|remote|freelance)$/);
      if (!match) return;
      setInquiry(match[1] as InquiryType);
      history.replaceState(null, "", "#contact");
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="scroll-mt-20 bg-brand-surface px-5 pb-24 pt-4 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[2fr_3fr]">
        <FadeIn y={40}>
          <h2 className="hero-heading font-display font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}>
            Contact
          </h2>
          <p className="mt-5 text-lg text-brand-muted">
            Hiring for a full-time role, building a remote team, or need a freelancer? Tell me what you&apos;re working on.
          </p>
          <ul className="mt-8 space-y-3">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-[44px] items-center gap-3 text-brand-text hover:opacity-70">
                <IconMail aria-hidden="true" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-3 text-brand-text hover:opacity-70">
                <IconBrandLinkedin aria-hidden="true" /> linkedin.com/in/ahsankhaan
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-3 text-brand-text hover:opacity-70">
                <IconBrandGithub aria-hidden="true" /> github.com/AhsanKhaan
              </a>
            </li>
          </ul>
        </FadeIn>

        {status === "sent" ? (
          <div role="status" className="flex flex-col items-start justify-center gap-4 rounded-brand-xl border border-brand-border bg-brand-bg p-8">
            <IconCircleCheck className="h-12 w-12 text-brand-accent-end" aria-hidden="true" />
            <p className="font-display text-2xl text-brand-text">Thanks, your message is on its way.</p>
            <p className="text-brand-muted">I&apos;ll get back to you as soon as I can.</p>
            <button type="button" onClick={() => setStatus("idle")} className="min-h-[44px] text-brand-accent-start underline underline-offset-4">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-brand-xl border border-brand-border bg-brand-bg p-6 sm:grid-cols-2 md:p-8">
            <Field label="Name" name="name" error={errors.name}>
              <input id="name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
            </Field>
            <Field label="Email" name="email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
            </Field>
            <Field label="I'm reaching out about" name="inquiry">
              <select id="inquiry" name="inquiry" value={inquiry} onChange={(e) => setInquiry(e.target.value as InquiryType)} className={inputClass}>
                {inquiryTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Company (optional)" name="company">
              <input id="company" name="company" autoComplete="organization" className={inputClass} />
            </Field>
            {inquiry === "freelance" && (
              <Field label="Budget (optional)" name="budget" wide>
                <select id="budget" name="budget" className={inputClass} defaultValue="">
                  <option value="">Select a range</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $3,000</option>
                  <option>$3,000 – $7,000</option>
                  <option>$7,000+</option>
                </select>
              </Field>
            )}
            <Field label="Message" name="message" error={errors.message} wide>
              <textarea id="message" name="message" rows={5} className={inputClass} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
            </Field>
            {/* Honeypot: hidden from people, bots tend to fill it in */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2">
              {status === "error" && (
                <p role="alert" className="text-brand-danger">
                  {serverError} You can also email me directly at {profile.email}.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-brand-accent px-8 font-medium uppercase tracking-widest text-brand-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              >
                {status === "sending" && <IconLoader2 size={18} className="animate-spin" aria-hidden="true" />}
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

function Field({ label, name, error, wide, children }: { label: string; name: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={name} className="text-sm font-medium text-brand-text">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm text-brand-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default Contact;
