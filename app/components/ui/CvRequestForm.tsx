"use client";

import { useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { IconLoader2, IconMailForward, IconMailCheck } from "@tabler/icons-react";

// Its own chunk — including the 600KB+ confetti JSON it statically imports — so
// neither ships in the initial bundle for a form most visitors never submit.
const CvSuccessConfetti = dynamic(() => import("./CvSuccessConfetti"), { ssr: false });

type Status = "idle" | "sending" | "sent" | "error";

// Shared logic for requesting a gated CV download link, used both inside the
// Hero/Navbar modal and on the standalone /cv page (for links shared by email).
export default function CvRequestForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/cv-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="relative flex flex-col items-start gap-3 overflow-visible">
        <CvSuccessConfetti className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2" />
        <div className="relative flex items-center gap-3">
          <IconMailCheck className="h-10 w-10 shrink-0 text-brand-accent-end" aria-hidden="true" />
          <p className="font-display text-xl text-brand-text">On its way — check your inbox! 🎉</p>
        </div>
        <p className="relative text-sm text-brand-muted">
          A secure download link just landed — it expires in 30 minutes and only works for the address you gave.
          Can&apos;t find it? Check spam, or reply to that email and it reaches me directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <p className="text-sm text-brand-muted">
        To keep my phone number and address out of scrapers&apos; hands, I email the CV to verified addresses instead of hosting it at a public link.
      </p>
      <div className={compact ? "flex flex-col gap-2 sm:flex-row" : "flex flex-col gap-2"}>
        <label htmlFor="cv-email" className="sr-only">
          Your email address
        </label>
        <input
          id="cv-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-3 text-base text-brand-text focus:border-brand-accent-start focus:outline-none"
        />
        {/* Honeypot: hidden from people, bots tend to fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="cv-website">Website</label>
          <input id="cv-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-accent px-6 text-xs font-medium uppercase tracking-widest text-brand-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <IconLoader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <IconMailForward size={16} aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Email me the CV"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-brand-danger">
          {error}
        </p>
      )}
    </form>
  );
}
