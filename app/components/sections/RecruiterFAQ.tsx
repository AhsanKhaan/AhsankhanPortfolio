import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { recruiterFaq } from "@/data/profile";

// Native <details>/<summary>: content stays in the DOM (not JS-hidden), so both
// traditional crawlers and AI systems (ChatGPT, Perplexity, Google AI Overviews) can
// read every answer — collapsed accordions are indexable, unlike JS-only reveals.
// Paired with FAQPage JSON-LD below for direct Q&A extraction (see ai-seo skill).
const RecruiterFAQ = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: recruiterFaq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" className="bg-brand-surface px-5 py-20 sm:px-8 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-display mb-3 text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
          >
            For recruiters
          </h2>
          <p className="mb-4 text-center text-lg text-brand-muted">
            Straight answers for talent acquisition, remote-hiring and relocation teams.
          </p>
          <p className="mb-12 text-center text-sm">
            <Link href="/for" className="text-brand-accent-start underline underline-offset-4 hover:opacity-80">
              Or see a page tailored to your role →
            </Link>
          </p>
        </FadeIn>
        <div className="flex flex-col gap-3">
          {recruiterFaq.map((item, i) => (
            <FadeIn key={item.question} delay={i * 0.06}>
              <details className="group rounded-brand-lg border border-brand-border bg-brand-bg px-5 py-4 open:pb-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-brand-text marker:content-none">
                  {item.question}
                  <IconChevronDown
                    size={20}
                    className="shrink-0 text-brand-accent-start transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-brand-muted">{item.answer}</p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruiterFAQ;
