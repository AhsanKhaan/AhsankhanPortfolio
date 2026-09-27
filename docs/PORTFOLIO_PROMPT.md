# Portfolio Build Prompt (refactored for UI/UX Pro Max)

This is a reusable prompt for rebuilding or extending this portfolio with Claude Code. It replaces the original "Jack, 3D Creator" Vite template prompt. It keeps that prompt's **section structure and motion**, but uses Ahsan's own content, the brand token system, and the stack this repo already runs.

---

> **Use the `ui-ux-pro-max` skill.** Before writing UI, run its design-system query (`"developer portfolio fintech dark" --design-system`). Follow its priority-1 to priority-7 rules (accessibility, touch targets, performance, style, responsive layout, typography/color, animation) and finish with its pre-delivery checklist (`references/pro-rules.md`).
>
> **Brand rules.** All colors, fonts, radii and gradients come from **`brand/tokens.json`**. They reach the code through `app/brand.css` (CSS variables) and Tailwind `brand-*` classes (`bg-brand-surface`, `text-brand-muted`, `bg-brand-accent`, `rounded-brand-xl`…). **Never hard-code hex values in components.** Identity, links and headline metrics come from `brand/profile.json` via `data/profile.ts`. See `brand/brand-guidelines.md`.
>
> **Stack.** The existing **Next.js 15 App Router** project: React 19, TypeScript, Tailwind 3, framer-motion 11, `@tabler/icons-react`. Don't use Vite or lucide. Use `next/image` for every raster image and `next/font` for fonts.
>
> **Subject.** Ahsan Khan, Senior Full Stack & Frontend Engineer (5+ years, fintech & food-tech).
> **Audience.** Recruiters hiring **on-site with relocation** (fintech and delivery/marketplace companies such as HungerStation, Keeta, Delivery Hero), **remote** hiring managers (Wellfound), and **freelance** clients. Every section must answer one recruiter question: *who, what impact, what domain fit, where/how to hire, how to contact.*
>
> ### Global
> - Background `bg` (black). Display font **Kanit** (300–900) via `next/font` as `--font-kanit`, used as `font-display`. Body font **Geist**.
> - `.hero-heading` is gradient text using `--gradient-accent-vertical` with `background-clip: text`.
> - Main wrapper uses `overflow-x: clip` (keeps `position: sticky` working).
> - Body text is at least 16px with line-height 1.5 or more. Visible `:focus-visible` ring. Touch targets are at least 44px. No emoji icons.
> - Every animation respects `prefers-reduced-motion`.
>
> ### Section order
> Navbar → Hero → Impact Stats → Marquee → About → Domain Fit → Services → Experience → Tech Stack → Case Studies → More Projects → AI Lab → Work With Me → Contact → Footer
>
> **1. Navbar** (`Navbar.tsx`)
> - Links: About · Services · Experience · Projects · Contact. Uppercase, `tracking-wider`, hover opacity 70% over 200ms.
> - Icon-only social links carry `aria-label`s.
> - A prominent "LinkedIn" pill (primary recruiter CTA), not a direct CV download — see the CV note below.
> - The mobile menu has `aria-expanded`.
> - The scrolled state is a blurred `surface` bar.
>
> **2. Hero** (`h-screen`, the template's structure)
> - Huge `.hero-heading` **"HI, I'M AHSAN"** at `text-[15vw]`: font-black, uppercase, `leading-none`, `whitespace-nowrap`, inside an overflow-hidden wrapper.
> - Bottom-left `<h2>` tagline, uppercase and light: *"Senior Full Stack & Frontend Developer building React, Next.js & fintech platforms."* Below it, availability chips: *Karachi, Pakistan → open to relocate · Remote · Worldwide · Freelance*.
> - Bottom-right: **ContactButton "Hire Me"** (→ `#contact`), a ghost **"View LinkedIn"** button (external), and a small **"Get my CV by email"** text link that opens the gated CV request modal.
> - Centered portrait `/assets/Profile-v3.png` inside **Magnet** (padding 150, strength 3). Keep positioning on a wrapper div so the motion transforms don't override it.
> - FadeIn delays: heading 0.15 (y 40), text 0.35, buttons 0.5, portrait 0.6.
>
> **3. Impact Stats:** 6 cards from `profile.metrics` on `surface`, gradient numbers:
> - 5+ yrs
> - 100K+ users
> - 35% faster (FCP 4.2s → 2.7s)
> - 80% ops automated
> - 2M+ reach
> - 3 audits, 0 critical findings
>
> **4. Marquee:** the template's scroll-linked rows.
> - offset = (scrollY − sectionTop + innerHeight) × 0.3. Row 1 moves `translateX(offset − 200)`, row 2 moves the opposite way. Images are tripled for seamless looping. Passive listener, `willChange: transform`.
> - Tiles are **Ahsan's own screenshots** from `/public/assets/projects/`: 420×270 (280×180 on mobile), `rounded-2xl`, alt text on the first copy only.
> - Under reduced motion the rows stay static.
>
> **5. About**
> - "About me" `.hero-heading` at `clamp(3rem, 12vw, 160px)`.
> - **AnimatedText** character reveal (offset `['start 0.8','end 0.2']`, opacity 0.2 → 1, plain text for screen readers) of `aboutText`.
> - 4 corner tiles with React, Next.js, TypeScript and Node icons, fading in from the sides.
> - ContactButton "Let's talk".
>
> **6. Domain Fit:** two text-only cards (no company logos):
> - **Food-tech & marketplaces:** multi-vendor e-commerce, Schef dashboard, merchant onboarding automation.
> - **Fintech & payments:** Nayapay portals, KYC/KYB, PCI DSS and OWASP, US fintech CRM.
>
> **7. Services:** the template's contrast section, using `surface` instead of white.
> - Rounded top corners of 40/50/60px. Huge "Services" heading.
> - 5 numbered rows: number at `clamp(3rem,10vw,140px)`, name uppercase, description in `muted`. `border` dividers, staggered FadeIn of i × 0.1.
> - The rows: Frontend Architecture · Full-Stack Web Apps · Fintech Security & Compliance · Performance & SEO · Admin Portals & Dashboards.
>
> **8. Experience: keep as-is** (`Experience.tsx` + `Timeline.tsx`).
>
> **9. Tech Stack: keep** (`Techstack.jsx`).
>
> **10. Case Studies:** the template's sticky stacking cards.
> - Each card is sticky at `top-24 md:top-32` in a `min-h-[85vh]` wrapper. Scale goes from 1 to `1 − (n−1−i) × 0.03` with scroll. Card offset is `i × 28px`.
> - Card header: number, category chip, title, and "Live project" only when a real link exists.
> - Card body is a 40/60 grid: **Problem / My role / Impact** plus stack badges on the left, the screenshot on the right.
> - The cards: Nayapay Admin Portal · MerchantArc / Business Portal · Nayapay Website.
>
> **11. More Projects:** the existing filterable `ProjectsSection` with `heading="More Projects"`.
>
> **12. AI Lab:** "In progress". An honest learning track with status chips (Learning / Building / Applied):
> - LLM API integration
> - prompt engineering & structured output
> - RAG fundamentals
> - Python for AI workflows
> - AI-assisted development
>
> **No invented projects.**
>
> **13. Work With Me:** three cards:
> - **Full-time · Open to Relocate**
> - **Remote · Worldwide** (PKT = GMT+5, flexible overlap)
> - **Freelance · Projects**
>
> Each CTA links to `#contact-<type>`, which preselects the inquiry type in the form.
>
> **14. Contact:** a form that posts to `/api/contact` (Resend).
> - Fields: Name, Email, Inquiry type, Company (optional), Budget (Freelance only), Message.
> - Visible labels, inline errors with `aria-describedby`, focus moves to the first error.
> - Loading, success and error states. Hidden honeypot field.
> - Fallback links: email, LinkedIn, GitHub.
>
> **15. Footer:** name, title, social links, back to top, ©.
>
> ### Reusable components (`app/components/ui/`)
> - `FadeIn`: `whileInView`, `viewport={{ once: true, margin: "50px", amount: 0 }}`, props delay/duration(0.7)/x(0)/y(30), ease `[0.25,0.1,0.25,1]`. Renders static under reduced motion.
> - `Magnet`: translate3d toward the cursor ÷ strength while within `padding` of the element, with the transitions 0.3s ease-out and 0.6s ease-in-out. Disabled under reduced motion.
> - `AnimatedText`: per-character opacity from scroll progress, using an invisible placeholder plus an absolute animated span.
> - `ContactButton` / `GhostButton` (`BrandButtons.tsx`): pill CTAs per brand guidelines §5.
>
> ### SEO & recruiter plumbing
> - `metadata` with a title/description targeting "React Developer / Frontend Developer / Full Stack Developer" search intent, `metadataBase` https://ahsankhaan.vercel.app, OpenGraph and Twitter tags, and `Person` + `WebSite` JSON-LD.
> - `app/opengraph-image.tsx` rendered from the brand templates.
> - `app/sitemap.ts` and `app/robots.ts` (disallow `/brand`, `/api/`).
> - JSON-LD `Person` + `WebSite` + **`FAQPage`** (from `RecruiterFAQ.tsx`, mirroring `recruiterFaq` in `data/profile.ts`).
> - **`public/llms.txt`**: a structured overview (availability, stack, results, key pages) for AI systems (ChatGPT, Claude, Perplexity) that don't rely purely on ranking signals — see the ai-seo skill. `robots.ts` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and Bingbot (already covered by the wildcard rule, listed for auditability).
> - **Recruiter FAQ section** (`#faq`, before Contact — the "objection handling before final CTA" slot): native `<details>/<summary>` so every answer stays in the DOM (crawlable) even collapsed, unlike a JS-only accordion. Answers are 40-60 words, self-contained, and cite real metrics — the AI-citation pattern from the ai-seo skill. Content targets exactly what tech recruiters, talent acquisition specialists, remote-hiring managers and relocation-sponsoring employers search or ask an AI assistant (relocation, remote work, stack, fintech experience, freelance availability, how to contact) — never invent a skill or result that isn't already true elsewhere on the site.
> - **CV is never at a public URL.** File lives at `private/cv/` (outside `public/`). `POST /api/cv-request` validates the address (`lib/emailValidation.ts`: format, disposable-domain blocklist, MX lookup) before emailing a signed, 30-minute link (branded template, `brand/templates/cv-delivery-email.html`); `GET /api/cv/download?token=…` verifies it before streaming the PDF. On success the form shows a code-split confetti animation. See `brand/brand-guidelines.md` §6a.
> - **Hero stacking:** any text meant to render in front of the portrait needs its own `position: relative` (or similar) — a plain in-flow box always paints behind a `position: absolute` sibling regardless of z-index. See `app/components/sections/Hero.tsx`.
>
> ### Verify before done
> - `npm run lint` and `npm run build` pass.
> - No horizontal scroll at 375/768/1024/1440px.
> - Reduced motion makes the page static.
> - The contact form validates and handles a missing API key.
> - `GET /api/cv/download?token=` with a bogus/expired/valid token returns 401/410/200 correctly; the old `/cv/*.pdf` public path is gone.
> - `POST /api/cv-request` rejects a disposable address (e.g. `@mailinator.com`) and a nonexistent domain, and accepts a real one.
> - At a short viewport height, confirm the hero heading still renders in front of (not hidden by) the portrait.
> - Meta description stays inside ~150-160 chars (Google truncates beyond that). `FAQPage` JSON-LD validates (Rich Results Test) and `mainEntity` count matches `recruiterFaq`. `/llms.txt` returns 200 as `text/plain`.
> - Run the ui-ux-pro-max pre-delivery checklist.
