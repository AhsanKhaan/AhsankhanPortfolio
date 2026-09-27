import type { Metadata } from "next";
import { IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import CvRequestForm from "../components/ui/CvRequestForm";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Get my CV",
  description: `Request ${profile.name}'s CV by email — a secure, time-limited download link, kept off public search results.`,
};

// Linked from the email signature and recruiter emails. Not a PDF itself — the PDF is
// never at a public URL. See brand/brand-guidelines.md §CV security.
export default function CvPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-24 sm:px-8">
      <h1 className="hero-heading font-display mb-3 text-4xl font-black uppercase leading-none sm:text-5xl">Get my CV</h1>
      <p className="mb-8 text-brand-muted">
        I email my CV directly to verified addresses instead of hosting it at a public link, so my phone number and
        address don&apos;t end up in a scraper&apos;s database.
      </p>

      <div className="rounded-brand-xl border border-brand-border bg-brand-surface p-6 sm:p-8">
        <CvRequestForm compact />
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-brand-lg border border-brand-border p-5">
        <IconBrandLinkedin className="h-8 w-8 shrink-0 text-brand-accent-start" aria-hidden="true" />
        <div>
          <p className="text-sm text-brand-muted">Recruiter and just want the highlights?</p>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-text underline underline-offset-4 hover:opacity-70"
          >
            View my LinkedIn profile
          </a>
        </div>
      </div>

      <Link href="/" className="mt-10 inline-flex min-h-[44px] w-fit items-center text-sm text-brand-muted hover:text-brand-text">
        ← Back to portfolio
      </Link>
    </div>
  );
}
