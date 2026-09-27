# Ahsan Khan: Brand Guidelines

**Version 1.0 · UI documentation for the website, email and LinkedIn**

This document explains how one visual identity is applied across every channel that recruiters and clients see:

| Channel | Built from | Where it lives |
|---|---|---|
| Portfolio website | `brand/tokens.json` → `app/brand.css` + Tailwind `brand-*` classes | `app/` |
| Email signature | `brand/templates/email-signature.html` → `brand/dist/email-signature.html` | `/brand/signature` |
| Recruiter email | `brand/templates/recruiter-email.html` → `brand/dist/recruiter-email.html` | `/brand/recruiter-email` |
| LinkedIn post images | `app/brand/social/templates.tsx` | `/brand/social?template=…` |
| Link previews (OG) | same templates | `/opengraph-image` |
| Visual reference | all of the above, rendered live | `/brand` (not indexed) |

> **Single source of truth.** Colors, fonts, radii and gradients are defined **only** in `brand/tokens.json`. Identity, links and headline metrics are defined **only** in `brand/profile.json`. After editing either file, run `npm run brand`. It also runs automatically before `npm run dev` and `npm run build`. Never hard-code a hex value in a component or template.

---

## 1. Brand essence & voice

**Positioning:** a senior engineer who ships production platforms for fintech and food-tech, and proves it with numbers.

**Voice:** confident, metric-led, concise, technical but plain.

| Do | Don't |
|---|---|
| Lead with a result: "Cut load time 35% (FCP 4.2s → 2.7s)" | Lead with adjectives: "Passionate, hard-working developer" |
| Name the stack and the domain | Stack buzzwords with no outcome |
| Use short sentences and active verbs | Write walls of text or corporate filler |
| State availability plainly: "Open to relocate · Remote · Freelance" | Say "open to opportunities" without saying which |
| Be honest about learning, e.g. AI Lab = "In progress" | Claim experience you don't have yet |

**Sample lines**
- Recruiter: *"I've architected frontends serving 100K+ users in fintech. Happy to bring that to {{company}}'s platform."*
- Freelance client: *"I build admin portals and Next.js sites that load fast and are easy for your team to run."*
- LinkedIn: *"Rendering 10K rows? Only mount what's visible. Here's how we cut FCP from 4.2s to 2.7s."*

---

## 2. Wordmark

- **Wordmark:** "Ahsan Khan" set in **Kanit Bold/Black**, filled with the **accent gradient** (`--gradient-accent`).
- **Monogram:** "AK" (`profile.initials`) in Kanit Black, for avatars and favicons.
- **Clear space:** at least the cap height of the "A" on every side.
- **Minimum size:** 16px tall on screen. Below that, use solid `accent-start` instead of the gradient.
- **On light backgrounds** (email): use solid `ink` (#0F172A) text. Gradient text isn't supported in email clients.
- **Never:** stretch it, add a drop shadow, recolor it outside the token palette, or put it on busy photos.

---

## 3. Color

### Semantic tokens (use these)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `bg` | #000000 | Page background, LinkedIn canvas | n/a |
| `surface` | #111827 | Panels, cards, contrast sections, footer bars | n/a |
| `surface-raised` | #1F2937 | Hover and raised panels | n/a |
| `text` | #E5E5E5 | Body and heading text | 16.7:1 on bg · 14.1:1 on surface |
| `muted` | #A3A3A3 | Secondary text, labels | 8.3:1 on bg · 7.0:1 on surface |
| `border` | rgba(255,255,255,.12) | Dividers, card outlines | decorative |
| `accent-start` | #60A5FA (blue-400) | CTAs, highlights, focus ring | 8.3:1 on bg |
| `accent-end` | #34D399 (emerald-400) | Gradient end, success and "Applied" states | 10.9:1 on bg |
| `secondary-start` → `secondary-end` | #0EA5E9 → #6366F1 | Secondary gradient (legacy sky style) | decorative |
| `on-accent` | #000000 | Text on accent buttons | 8.3:1 / 10.9:1 |
| `danger` | #EF4444 | Form errors | 5.6:1 on bg |

All text pairs meet **WCAG AA (4.5:1)**, and most meet AAA.

### Gradients
- `--gradient-accent`: blue-400 → emerald-400 at 90°, for buttons and the wordmark.
- `--gradient-accent-vertical`: the same at 180°, for large display headings (`.hero-heading`).
- `--gradient-secondary`: sky → indigo, for sparing secondary accents.

### Rules
1. The page is **black with one accent**. The accent marks what matters (CTAs, numbers, headings) and nothing else.
2. Use `surface` to separate sections. Don't introduce new greys.
3. **Email uses its own light-safe set** (`component.email`): white background, ink text (17.9:1), slate muted text (7.6:1), blue link (5.2:1), and the blue→emerald bar as two solid cells. Many mail clients force light mode or invert dark emails, so the email is designed light from the start.

---

## 4. Typography

| Role | Font | Weight | Case | Size |
|---|---|---|---|---|
| Display (hero, section titles) | **Kanit** | 900 | UPPERCASE | `clamp(3rem, 12vw, 160px)`, hero 15vw |
| Headings (cards, service names) | Kanit | 500 | UPPERCASE | 1.1–2.1rem fluid |
| Body | **Geist** | 400 | Sentence | 16px min, line-height 1.5+ |
| Labels / chips | Geist | 500 | UPPERCASE, `tracking-widest` | 12–14px |
| Code / tokens | Geist Mono | 400 | as-is | 12–14px |
| Email (all) | **Arial, Helvetica, sans-serif** | 400 / bold | Sentence | 12–18px |
| LinkedIn images | Kanit | 400 / 700 / 900 | Headline UPPERCASE | see §8 |

Web fonts don't load in most email clients, so emails always use the Arial stack.

---

## 5. Components

| Component | Spec |
|---|---|
| **Primary button** (`ContactButton`) | Pill, `--gradient-accent` fill, `on-accent` text, 2px white outline at −3px offset, uppercase + `tracking-widest`, min height 44px |
| **Ghost button** (`GhostButton`) | Pill, 2px `text` border, transparent fill, hover `white/10` |
| **Card** | `surface` fill, 1px `border`, radius 24–40px |
| **Chip** | Pill, 1px border, 12px uppercase label. Status colors: Learning = muted, Building = accent-start, Applied = accent-end |
| **Focus** | 2px `focus-ring` outline, 3px offset, on every interactive element |
| **Motion** | Ease `[0.25, 0.1, 0.25, 1]`, 200ms for hovers, 700ms for reveals. Everything respects `prefers-reduced-motion` |

Icons: Tabler Icons (SVG), never emoji.

---

## 6. Email signature

```
┌────────────────────────────────────────────────────────┐
│ ▬▬▬▬▬▬ (4px bar: blue-400 | emerald-400, 120px wide)    │
│ ┌──────┐  Ahsan Khan                       18px bold    │
│ │ 80px │  Senior Full Stack & Frontend Engineer  14px   │
│ │ photo│  Open to relocate · Remote · Freelance  12px    │
│ └──────┘  Portfolio | LinkedIn | GitHub | Request CV     │
│           email · Karachi, Pakistan · PKT (GMT+5)       │
└────────────────────────────────────────────────────────┘
max-width 600px · table layout · inline styles only
```

- **Headshot:** `public/brand/headshot.png` (160×160 PNG shown at 80px for retina). It must be served from the **live domain**, because email needs absolute image URLs, so it only appears after deployment.
- **No SVG** (Gmail blocks it), **no CSS variables**, **no web fonts**, **no gradient text**.
- **Install in Gmail:** deploy, open `https://ahsankhaan.vercel.app/brand/signature`, press Ctrl+A, then Ctrl+C, and paste into Gmail → Settings → General → Signature. For Outlook, paste into File → Options → Mail → Signatures.
- **Dark mode:** some clients (Outlook, Apple Mail) invert colors. The light palette inverts cleanly, and the photo and color bar stay readable.
- **"Request CV" links to `/cv`, not a PDF.** See §6a — the signature never links straight to the file.

---

## 6a. CV security

The CV is **never at a public URL**. The file lives at `private/cv/AhsanKhan_SrSoftwareEngineer.pdf`, outside `public/`, so Next.js doesn't serve it as a static asset — there is no direct link to leak, share, or have a scraper crawl for the phone number and address on the page.

**Flow**
1. **LinkedIn is the primary CTA for recruiters** — Navbar, Hero and the Work With Me "Full-time" card all lead with a prominent "View LinkedIn" button before any CV action. LinkedIn already controls what it shows and to whom; it's the safer default.
2. Anyone who still wants the CV clicks **"Get my CV by email"** (Hero, Navbar, Footer → `/cv`), enters their email, and `POST /api/cv-request` emails them a link — it never returns the file directly.
3. The address is checked before anything is sent (`lib/emailValidation.ts`):
   - **format** — a standard email regex
   - **not disposable** — `mailchecker` (55,000+ throwaway-domain blocklist: Mailinator, 10-minute-mail, etc.), so a scraper can't grab the file behind a burner inbox
   - **domain can receive mail** — an MX-record lookup rejects typo'd or made-up domains outright (a 3s timeout treats a slow/flaky lookup as inconclusive rather than rejecting a real address)
4. That link points to `GET /api/cv/download?token=…`, carrying a signed, **30-minute** token (HMAC-SHA256, `lib/cvToken.ts`) tying the link to that address. `CV_ACCESS_SECRET` (env, not committed) signs it; an invalid or expired token gets a branded "link expired" page with a LinkedIn CTA instead of the file.
5. The email itself is a branded template (`brand/templates/cv-delivery-email.html` → `brand/dist/cv-delivery-email.html`, filled at request time), not a plain-text link — same token pipeline as the signature and recruiter email, so it looks like it came from the real portfolio, not a phishing-style bare link.
6. The download response sets `Cache-Control: no-store` and `X-Robots-Tag: noindex`, and `/api/` is disallowed in `robots.ts`, so nothing caches or indexes it.
7. Requesting also **bcc's a copy to `profile.email`** — a lead notification: you see who asked, without extra tooling.
8. On success, the form shows a confetti animation (`app/components/ui/CvSuccessConfetti.tsx`, code-split via `next/dynamic` so the 600KB+ animation JSON never loads for visitors who don't submit the form) and a clear "check your inbox" message.

**Trade-off:** tokens expire but aren't tracked as single-use across requests (that needs persistent storage this project doesn't have yet — e.g. Vercel KV or Upstash Redis). The 30-minute expiry plus the email-validity checks above are the main defenses; add a store later for a true single-use link if that matters more than the current setup.

**Required env:** `RESEND_API_KEY` and `CV_ACCESS_SECRET` (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`, keep it secret — anyone with it can mint their own valid links). See `.env.example`.

---

## 6b. Email rendering — pixel-perfect checklist

All three templates (`email-signature.html`, `recruiter-email.html`, `cv-delivery-email.html`) are hardened the same way. Apply the same checklist to any new email template:

- [ ] **Preheader** — a hidden `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;opacity:0;">` right after `<body>`, with the inbox-preview text (don't repeat the subject; extend it). The signature has none — it's a pasted fragment, not a standalone email, so there's no inbox preview to write.
- [ ] `<meta name="color-scheme" content="light">` **and** `<meta name="supported-color-schemes" content="light">` — without both, some dark-mode clients invert the light palette and blow out contrast.
- [ ] `-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;` on `body, table, td` — stops iOS/Outlook.com auto-inflating font sizes on small screens.
- [ ] `border-collapse: collapse` on every table, plus `mso-table-lspace: 0pt; mso-table-rspace: 0pt;` (in an `<!--[if mso]>` block for full emails; inline on the style attribute for the signature fragment, since it has no `<head>`) — otherwise Outlook desktop adds phantom spacing between cells.
- [ ] `mso-line-height-rule: exactly` alongside every `line-height` — Outlook otherwise recalculates line-height from font metrics and rows drift.
- [ ] Every gradient (`background: linear-gradient(...)`) has a solid **`bgcolor` attribute fallback** in the same color as the gradient's start — Outlook desktop can't render CSS gradients and would otherwise show a transparent/white cell.
- [ ] Every `<img>` has explicit `width`/`height` **and** `display: block` — prevents layout jumps while images load and stray baseline gaps under the image.
- [ ] A `@media (max-width: 600px)` block in `<head>` that drops horizontal padding (`.px-32`) and forces the container to `width: 100% !important` — most mobile clients honor this; Outlook desktop ignores it and falls back to the fixed 560/600px width, which still renders correctly, just non-fluid.
- [ ] **Known, accepted limitation:** `border-radius` on the CV email's outer card and CTA button doesn't render in Outlook desktop (square corners instead of rounded) — cosmetic only, not worth the VML corner-masking complexity for a two-recipient-a-day personal email.

**Test before a real send:** paste the built file from `brand/dist/` into Gmail (web + mobile app) and, if possible, Outlook — `/brand/signature`, `/brand/recruiter-email`, `/brand/cv-delivery` render them live (§9 has the exact URLs).

---

## 7. Recruiter outreach email

**Positioning: full-stack, not frontend-only.** Research on what tech recruiters at top companies actually screen for (see sources below) is consistent on one point: full-stack candidates get evaluated on whether a **single bullet pairs a frontend fact with a backend fact** — not on two separate skill lists. The body's "who I am" line does exactly that: `React/Next.js on the frontend, [[p.backendStack]] on the backend, same systems end to end.` `[[p.backendStack]]` resolves from `brand/profile.json` (`"Java, Node.js and PHP (Laravel)"`) — update it there, once, if the backend stack changes, and every template picks it up.

**Voice (cold-email skill).** This reads like a peer sharing something relevant, not a pitch. "You" outweighs "I." No "I hope this finds you well," no "leverage/synergy/best-in-class." One proof point beats a wall of stats. One low-friction ask, not a meeting request — "worth a quick look?" beats "are you free for a 15-minute call?" Read the filled-in email aloud before sending; if it sounds like a template with fields swapped in, rewrite it.

**Structure (~110–140 words, tighter than before):**
1. **Greeting:** `Hi {{ recruiter_name }},`
2. **Lead with their world:** `{{ custom_line }}` — the real signal (something specific about the role or company, not a compliment) — bridging straight into `{{ role }}` at `{{ company }}`. This opens the email, not "I'm Ahsan…".
3. **Who, briefly:** one line pairing a frontend fact and a backend fact (see Positioning above), not a stack dump.
4. **Proof — two metrics, not three.** Defaults to `p.metrics.1` (100K+ users) and `p.metrics.3` (80% ops automated) — one reach number, one systems/automation number, so it reads as full-stack impact rather than a frontend-only performance stat. Swap per send if a different pair fits the role better (e.g. `p.metrics.5`, the security-audit count, for a fintech/payments role).
5. **The link** — case studies, not a generic "portfolio."
6. **One low-friction ask** — interest-based, not a calendar request.
7. **Signature,** then `{{ sender_unsubscribe_line }}`.

**Research behind this (2026):** generic outreach is ignored; candidates who reference a specific team challenge, a recent launch, or a role's actual responsibility get read — [Exaltitude](https://exaltitude.substack.com/p/whats-the-secret-of-faang-recruiting), [cs-recruiters.com](https://cs-recruiters.com/resources/job-search/how-to-stand-out-to-recruiters-in-2026/). Recruiter-written one-off emails get a 6.31% reply rate against 4.96% for anything that reads automated — [Pin's 2026 benchmark report](https://www.pin.com/blog/recruiting-outreach-benchmark-report/). Full-stack resumes and outreach are expected to show the same role delivering both ends of the stack, not two disconnected lists — [ResumeWorded](https://resumeworded.com/skills-and-keywords/full-stack-engineer-skills).

**Subject lines — short, low-key, not a pitch.** The cold-email skill's data is explicit: 2–4 words, no punctuation tricks, should look like it came from a colleague, not a candidate blasting recruiters. Exception worth keeping for *this* use case: including the role helps a recruiter's fast triage, so it's not pure noise the way it would be in a sales cold email.
- `{{ role }} — {{ company }}`
- `re: {{ role }}`
- `quick note — {{ role }}`

Avoid: exclamation points, "opportunity," "excited to apply," anything that reads as a form letter.

**Placeholders.** `{{ … }}` are Jinja2 variables left untouched by the build. The Python sender fills them per recipient: `recruiter_name`, `company`, `role`, `custom_line`, `sender_unsubscribe_line`.

**Sender identity: display name is real, address stays Resend's until a domain is verified.** `from` renders as `Ahsan Khan <onboarding@resend.dev>`, not a generic "Portfolio" — Resend (and every ESP) **rejects sending "from" an address on a domain you haven't verified with them**, so `from: "... <ahsankhan.ubit@gmail.com>"` isn't possible — Gmail's own domain can't be verified by a third party, and Google's SPF/DKIM would flag it as spoofed even if it were accepted. `replyTo` is set to `profile.email` (`ahsankhan.ubit@gmail.com`) on every send instead, so hitting "Reply" in the recipient's inbox goes straight to the real inbox regardless of what the `from` address shows. Same pattern in `/api/cv-request` and the CV delivery email. To send from a real `you@yourdomain.com` later: buy/point a domain, verify it in the Resend dashboard, set `CONTACT_FROM_EMAIL`.

**Sending etiquette (protects your inbox reputation)**
- Personalize every email. `custom_line` must never be generic — if it could apply to any company, it's not doing its job.
- Send in **small batches** (e.g. 20–40 per day) from your own address. Gmail limits daily sends, and bulk-looking mail lands in spam.
- Include a one-line opt-out ("Not hiring for this? Just reply 'no' and I won't follow up.") and honor it.
- **Follow-up, if any:** one touch, 5-7 days later, adding something new (a different metric, a relevant case study) — never "just checking in," which the cold-email skill flags as giving the reader no reason to reply.
- Keep the recipient list to people whose work contact details are publicly listed for hiring. Don't scrape personal addresses.

---

## 8. LinkedIn post images

**Canvas:** 1080×1350 (4:5 portrait, the largest feed size). Safe margin **80px** on every side. Background `bg`, a 12px accent-gradient bar at the top, and a footer bar in `surface` with a 4px `accent-start` top border.

| Template | `template=` | Headline | Body | Best for |
|---|---|---|---|---|
| Tip | `tip` | Gradient, uppercase, ≤ 60 chars | 1–2 sentences | How-tos, lessons |
| Metric | `metric` | A single number, e.g. `80%` (260px) | What the number means | Impact stories |
| Project | `project` | Project name | One-line outcome | Case study teasers |
| Quote | `quote` | Attribution line | The quote (64px) | Opinions, lessons |

**URL:** `https://ahsankhaan.vercel.app/brand/social?template=metric&title=80%25&body=...&tag=Impact`
Limits: `title` 90 chars, `body` 220 chars, `tag` 30 chars (longer input is truncated).

**Caption formula:** hook line → 3 short lines of context → one takeaway → question to readers → 3–5 hashtags.
**Hashtags:** `#Frontend #NextJS #React #TypeScript #Fintech #OpenToWork #RemoteWork #FullStackDeveloper` (pick 3–5 per post).

**Automation rules**
- Post through **LinkedIn's official API** (Posts API with the `w_member_social` scope, via a LinkedIn developer app). Don't automate the LinkedIn website with browser bots or scrapers: it breaks LinkedIn's User Agreement and risks account restriction.
- Daily cadence is fine, but vary the templates, and review each generated post before it goes out.

---

## 9. Asset map

| Asset | Path |
|---|---|
| Tokens (source) | `brand/tokens.json` |
| Identity and metrics (source) | `brand/profile.json` |
| Resolved tokens (read by Tailwind, image routes, Python) | `brand/dist/tokens.resolved.json` *(generated)* |
| Website CSS variables | `app/brand.css` *(generated)* |
| Email templates (source) | `brand/templates/*.html` |
| Email templates (ready to use) | `brand/dist/*.html` *(generated)* |
| Build script | `scripts/build-brand.mjs` (`npm run brand`) |
| Social and OG templates | `app/brand/social/templates.tsx` |
| Headshot for email | `public/brand/headshot.png` |
| CV (never public — see §6a) | `private/cv/AhsanKhan_SrSoftwareEngineer.pdf` |
| CV request page | `app/cv/page.tsx` (`/cv`) |
| CV request + download routes | `app/api/cv-request/route.ts`, `app/api/cv/download/route.ts` |
| CV token signing | `lib/cvToken.ts` |
| CV email validity checks | `lib/emailValidation.ts` |
| CV delivery email (source / built) | `brand/templates/cv-delivery-email.html` / `brand/dist/cv-delivery-email.html` |

**For the future Python scripts:**
```python
import json
tokens = json.load(open("brand/dist/tokens.resolved.json"))
profile = json.load(open("brand/profile.json"))
template = open("brand/dist/recruiter-email.html").read()   # render with jinja2.Template(template).render(...)
image_url = "https://ahsankhaan.vercel.app/brand/social?template=tip&title=...&body=..."
```
