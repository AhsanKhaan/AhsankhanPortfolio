---
version: alpha
name: "Ahsan Khan — Personal Brand"
description: "Black page, one blue-to-emerald accent, Kanit display type over Geist body text; documents the design system the portfolio already uses."
colors:
  bg: "#000000"
  surface: "#111827"
  surface-raised: "#1F2937"
  text: "#E5E5E5"
  muted: "#A3A3A3"
  border: "rgba(255, 255, 255, 0.12)"
  accent-start: "#60A5FA"
  accent-end: "#34D399"
  secondary-start: "#0EA5E9"
  secondary-end: "#6366F1"
  on-accent: "#000000"
  focus-ring: "#60A5FA"
  danger: "#EF4444"
typography:
  display:
    fontFamily: Kanit
    fontSize: "clamp(3rem, 12vw, 160px)"
    fontWeight: 900
  hero:
    fontFamily: Kanit
    fontSize: "clamp(3.5rem, 16vw, 17.5vw)"
    fontWeight: 900
  heading:
    fontFamily: Kanit
    fontSize: 1.25rem
    fontWeight: 500
  body:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
  label:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: 500
  mono:
    fontFamily: Geist Mono
    fontSize: 0.75rem
    fontWeight: 400
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  page:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
  section-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
  caption:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  card-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  button-primary:
    backgroundColor: "{colors.accent-start}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: 44px
  button-primary-end:
    backgroundColor: "{colors.accent-end}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: 44px
  button-ghost:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: 44px
  chip-accent:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.accent-start}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
  chip-success:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.accent-end}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
  alert-error:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.danger}"
---

<!--
Documents the EXISTING design system. Source of truth is brand/tokens.json (front matter above is copied from it,
semantic.color / typography / radius / spacing); app/brand.css and the Tailwind `brand-*` classes are generated from it.
Where a component uses a gradient fill (button-primary) the token pair above names the gradient's start colour
(and button-primary-end its end colour), because the spec has no gradient value; the real fill is --gradient-accent.
"Not defined" means the site has no value for it. Do not edit by hand to introduce new values: change tokens.json, then run `npm run brand`.
-->

## Overview

A senior engineer's portfolio, read by recruiters and prospective clients: confident, metric-led, concise, technical but plain (`brand/brand-guidelines.md` §1). The page is **black with one accent**. The blue-to-emerald gradient marks what matters (CTAs, numbers, display headings) and nothing else. Sections are separated with the `surface` colour; no extra greys are introduced. The look comes from large uppercase Kanit headings with gradient fill over quiet Geist body text, with a faint grid and aurora glow behind hero-style sections. Icons are Tabler Icons (SVG), never emoji. No third-party brand identity is reused.

## Colors

All values come from `brand/tokens.json` (`semantic.color`). Tailwind exposes them as `brand-*` (`bg-brand-surface`, `text-brand-muted`, `border-brand-border`); components never use raw hex.

| Token | Value | Use |
|---|---|---|
| `bg` | #000000 | Page background |
| `surface` | #111827 | Cards, contrast sections, mobile menu, footer bars |
| `surface-raised` | #1F2937 | Hover and raised panels |
| `text` | #E5E5E5 | Body and heading text |
| `muted` | #A3A3A3 | Secondary text, labels |
| `border` | rgba(255, 255, 255, 0.12) | Dividers, card outlines, grid backdrop lines (decorative) |
| `accent-start` | #60A5FA | CTAs, highlights, focus ring (`focus-ring` is the same value) |
| `accent-end` | #34D399 | Gradient end, success and current-page states |
| `secondary-start` / `secondary-end` | #0EA5E9 / #6366F1 | Secondary gradient, legacy, used sparingly |
| `on-accent` | #000000 | Text on accent fills |
| `danger` | #EF4444 | Form errors, the red dot in the agent log header |

Gradients (`tokens.json` `semantic.gradient`): `accent` is blue-400 to emerald-400 at 90 degrees (buttons, wordmark, `bg-brand-accent`); `accent-vertical` is the same at 180 degrees (large display headings, `.hero-heading`); `secondary` is sky to indigo at 90 degrees.

Contrast, computed with WCAG relative luminance in a Node one-liner (ratio, text on background). Threshold: 4.5:1 for text.

| Text colour | on `bg` #000000 | on `surface` #111827 |
|---|---|---|
| `text` #E5E5E5 | 16.67 | 14.08 |
| `muted` #A3A3A3 | 8.33 | 7.03 |
| `accent-start` #60A5FA | 8.26 | 6.98 |
| `accent-end` #34D399 | 10.92 | 9.23 |

Extra pairs: `danger` #EF4444 is 5.58 on `bg` and 4.71 on `surface`, but 3.90 on `surface-raised` (below 4.5:1; `surface-raised` currently has no danger text on it). `on-accent` #000000 is 8.26 on `accent-start` and 10.92 on `accent-end`, covering both ends of the gradient fill. On `surface-raised` the pairs are text 11.65, muted 5.82, accent-start 5.77, accent-end 7.64. No pair among the four requested text colours falls below 4.5:1. `border` is a translucent decorative colour and is not contrast-checked as text.

Dark mode: the site is dark only. Tailwind `darkMode: "class"` is set, but `brand/tokens.json` defines no light token set, so there is no second token set. Light mode: Not defined for the site (the email templates use their own light-safe set, `component.email`, outside this document's scope).

## Typography

Three families, all loaded in `app/layout.tsx` through `next/font/google` (Kanit weights 400, 500, 700, 900; Geist; Geist Mono weights 400 and 700; latin subset), exposed as CSS variables `--font-kanit`, `--font-geist-sans` and `--font-geist-mono`. Tailwind maps `font-display` to Kanit, `font-sans` to Geist and `font-mono` to Geist Mono (`tokens.json` `typography.family.mono`). Mono is only for code: the agent log, the code field and the code portrait. Labels stay Geist.

| Role | Font | Weight | Case | Size |
|---|---|---|---|---|
| Display (hero, section titles) | Kanit | 900 | UPPERCASE, `leading-none tracking-tight` | `clamp(3rem, 12vw, 160px)` token; pages set fluid sizes inline, for example `clamp(2.2rem, 6vw, 4.5rem)` for section titles |
| Hero | Kanit | 900 | UPPERCASE | `clamp(3.5rem, 16vw, 17.5vw)` |
| Headings (cards, service names) | Kanit | 500 | sentence or UPPERCASE | `text-xl` 1.25rem to `text-2xl` 1.5rem |
| Body | Geist | 400 | Sentence | 16px minimum; `text-lg` for section intros |
| Labels and chips | Geist | 500 | UPPERCASE, `tracking-widest` | `text-xs` 0.75rem to `text-sm` 0.875rem |
| Code and pipeline text | mono | 400 | as-is | `text-xs` / `text-sm` |

Scale tokens: xs 0.75rem, sm 0.875rem, base 1rem, lg 1.125rem, xl 1.25rem, 2xl 1.5rem, plus Tailwind overrides `4xl` 2.25rem and `7xl` 4.5rem. Weights: light 300, regular 400, medium 500, bold 700, black 900. Font licences: Not defined in the repo. Self-hosted font files and `font-display` behaviour are those of `next/font` defaults; no explicit `font-display` value is set.

## Layout

- **One header everywhere.** The header is a single fixed navbar rendered by `SiteNav` on every page (`onHome` only changes section links from `/#about` to `#about`). It wraps `Navbar` (`fixed top-0 left-0 w-full`, `z-1000`, `px-6 py-4`). Pages never ship their own header.
- **Content width:** `max-w-6xl` centred (`mx-auto`) on every section and the footer.
- **Side gutters:** `px-5 sm:px-8 md:px-10` on every section and the footer.
- **Section rhythm:** `py-20` (`md:py-28`) for full sections; hero sections add `pt-28 sm:pt-36` to clear the fixed header. Anchored sections use `scroll-margin-top: 72px`.
- **Breakpoints:** Tailwind defaults. The nav switches from mobile menu to full links at `lg`; the CTA pill in the navbar shows from `xl`. Grids step 1 to 2 (`sm`/`md`) to 3 or 4 (`lg`). Layout targets phones from 320 px (`min-width: 320px` helper in `globals.css`).
- **Surface sections** use `bg-brand-surface` with a large top radius (`rounded-t-[40px]`, `md:rounded-t-[60px]`) to separate the "work" band from the black page.
- **Spacing scale (tokens):** 4, 8, 16, 24, 40, 64 px.
- Page-type job statements and ad-slot reservation: Not defined.

## Elevation & Depth

Depth comes from the `surface` fill, 1px `border`, and a soft accent glow, not from heavy shadows.

- `.glow-card`: 1px `border`, radius `--radius-lg` (24px), vertical gradient from `surface` at 88% to `bg`. On hover the border becomes `accent-start` at 55%, the card lifts `translateY(-3px)` and gains a wide soft `accent-start` shadow. `data-featured` swaps the border and glow to `accent-end`.
- `.grid-backdrop`: 48px grid of `border` lines, masked with a radial gradient fading out from the top centre.
- `.aurora`: two blurred radial washes, `accent-start` at 22% and `accent-end` at 18%, with `blur(40px)`.
- Navbar once scrolled (`html.scrolled`): `surface` at 85% with `backdrop-filter: blur(12px)` and a 1px `border` underline.

## Shapes

Radius tokens: `sm` 8px, `md` 16px, `lg` 24px, `xl` 40px, `pill` 9999px. Tailwind classes: `rounded-brand-lg` (24px), `rounded-brand-xl` (40px), `rounded-full` for pills. Buttons, chips and nav CTAs are pills; cards are 24px (guidelines allow 24 to 40px); big surface bands use 40px and 60px top radii. Touch targets: interactive items carry `min-h-[44px]` (footer links 40px, hero CTAs on the agency page 48px) and icon buttons are `h-11 w-11`.

## Components

- **Wordmark:** "Ahsan Khan" in Kanit, filled with the accent gradient (`bg-brand-accent bg-clip-text text-transparent`), followed by a slim caret (`.term-cursor`, 0.09em by 0.78em, `accent-vertical` gradient) that blinks once a second and rests solid under reduced motion. The caret sits beside the wordmark; the wordmark itself is unchanged.
- **Section kicker (`SectionKicker`):** above a section heading, `01 —— About`: Geist 500, `text-xs`, uppercase, `tracking-widest`, `muted`; the number in solid `accent-start` (gradient text needs 16px or more); a 32px `border` hairline between. Hidden from screen readers (the heading says the same). Numbered from `lib/sectionIndex.ts`; reused sections show `//` instead of a number.
- **Code field (`CodeField`):** decorative canvas of faint Geist Mono code (`text` at 8.5% opacity) behind the hero (`variant="hero"`) and About (`variant="center"`). It decodes once (1.4 s), and on desktop a spotlight in the accent gradient follows the pointer, peaking at 70% opacity. Contrast: the spotlight never draws behind elements marked `data-code-clear`, and a `bg` veil darkens the corners (hero) or the middle (About) where text sits. `aria-hidden`.
- **Code portrait (`CodePortrait`):** the profile photo redrawn as code, from `data/codePortrait.json` (rebuild with `npm run portrait` after changing the photo; the photo file is never modified). Dark areas are faint code, bright areas are blocks of the `accent-vertical` gradient with the code cut into them in `bg`. Three depth layers in a CSS 3D stage turn up to 20 degrees toward the pointer and play one 4.2 s look-around after the decode. It is erased behind any overlapping `data-code-clear` text. `role="img"` with the alt text; a `<noscript>` photo fallback. Switch back to the photo with `heroPortrait = "photo"` in `data/profile.ts`.
- **SiteNav / Navbar:** transparent at the top, blurred surface after 30px of scroll. Links are uppercase `text-sm font-medium tracking-wider` in `text`; the current page is `accent-end` with `aria-current="page"`. Mobile overlay (`.mobile-menu`) stays mounted and uses `visibility` so it is out of the tab order when closed; it holds the LinkedIn primary CTA and a "Get my CV by email" text button.
- **Primary button:** pill, `bg-brand-accent` gradient fill, `on-accent` text, uppercase `tracking-widest`, `text-sm font-medium`, minimum height 44px (48px on the agency page). The brand guideline also specifies a 2px white outline at -3px offset for `ContactButton`.
- **Ghost button:** pill, 2px `text` border with `hover:bg-white/10` in the navbar; the agency variant uses a 1px `border` that turns `accent-start` on hover.
- **Card (`glow-card`):** see Elevation and Depth; padding `p-6` to `p-8`.
- **Chip / stage chip:** pill, 1px `border`, `text-xs`. Status chips: Shipped uses `accent-end` border and text, Building uses `accent-start`. `.stage-chip` pulses its border to `accent-end` in sequence.
- **Agent log:** card with a header row of three dots (`danger`, `accent-start`, `accent-end`), mono lines, agent name in `accent-start`, text in `text`, a blinking caret in `accent-end`.
- **AgentCore:** decorative SVG robot inside rotating orbits, coloured only with `brand-*` fills and strokes, `aria-hidden`.
- **Footer:** `border-t` in `border`, `bg-brand-bg`, three-column grid (`md:grid-cols-[1.6fr_1fr_1fr]`), link text `muted` turning `text` on hover, column headings uppercase `text-xs tracking-widest`.
- **Focus:** global `:focus-visible` 2px `focus-ring` outline with 3px offset.
- **Form inputs and alert-error:** error text uses `danger`; no shared input component spec is defined in these files (Not defined).

## Motion and performance

Motion tokens: ease `[0.25, 0.1, 0.25, 1]` (`cubic-bezier(0.25, 0.1, 0.25, 1)`), `duration-fast` 200ms for hovers, `duration-base` 700ms for reveals.

- **Reveal on scroll (`.fade-in`):** a CSS transition; a shared IntersectionObserver only sets `data-inview`. The hidden state applies only under `.js` (set by an inline script in `layout.tsx`), so content is never hidden without JavaScript.
- **Hero entrance (`.rise`):** CSS keyframes that run once the CSS loads, no hydration needed. The LCP heading uses `.rise-lcp` (`rise-in-place`): it only moves and never starts at opacity 0, so it counts as painted from the first frame.
- **Reduced motion (`prefers-reduced-motion: reduce`):** smooth scroll off; `.fade-in` content shown at full opacity and no transform; `.rise` animation off; `.reveal-word` full opacity; `.flip-word` static; all animations and transitions clamped to 0.01ms; the agent visuals (`.orbit`, `.orbit-rev`, `.bot-eye`, `.bot-eq`, `.bot-pulse`, `.bot-float`, `.bot-scan`, `.stage-chip`, `.log-line`, `.caret`) stop, log lines stay visible, and `.glow-card:hover` no longer lifts.
- **No layout shift from animation:** reveals and entrances animate only `opacity` and `transform`. `AnimatedText` words never dim below 0.55 opacity, which keeps unrevealed words legible at WCAG AA.
- **CSS-only decoration:** the robot, orbits, aurora, grid, stage chips, log lines and caret are SVG plus CSS keyframes. They cost no JavaScript and are `aria-hidden`.
- **Canvas decoration (approved exception):** the code field and the code portrait draw on canvas from a small client script. Nothing runs on a timer: they redraw only during the one-time decode and while the pointer moves, so an idle page spends no CPU. The portrait's turn is a CSS transform. Under reduced motion both are drawn at rest, with no decode, spotlight or turn. Nothing moves for more than the 4.2 s look-around, so no pause control is needed.
- **Hero height (`.hero-height`):** the full screen on laptops, capped relative to the width on tall phones (`190vw` under 640px, `132vw` to 767px, `112vw` from 768px, with a 600 or 640px floor), so no empty band opens between the name and the portrait.
- **`.defer-render`:** below-the-fold homepage sections use `content-visibility: auto` with `contain-intrinsic-size: auto var(--h-sm)` (mobile) and `var(--h-lg)` from 768px, per-section height estimates set in `app/page.tsx`. They skip style, layout and paint until near the viewport.
- **`InPageNav` anchor behaviour:** before any in-page hash jump (capture-phase click handler), and on arrival with a hash such as `/#contact`, it adds `html.render-all`, which sets `.defer-render` to `content-visibility: visible` so every section has its real height and the anchor lands on the true position instead of an estimate. The cost is paid once, on the first jump.
- **Fixed header offset:** `section[id]` has `scroll-margin-top: 72px`.

## Do's and Don'ts

- Do use `brand-*` Tailwind classes or CSS variables from `brand/tokens.json`; never put a hex colour in a component.
- Do keep one accent (the blue-to-emerald gradient) and use `surface` to separate sections instead of new greys.
- Do keep every interactive element at a 44px target (40px minimum for footer links) with the visible `focus-ring` outline.
- Do build decorative animation in CSS or SVG and give it a `prefers-reduced-motion` rule.
- Do keep one shared header (`SiteNav`) on every page.
- Don't hide content with JavaScript-only reveals; gate hidden states on `.js`.
- Don't animate properties that change layout.
- Don't use colour alone to show state; status chips carry text and `aria-current` marks the active nav link.
- Don't use gradient text below 16px tall; use solid `accent-start` there (`brand-guidelines.md` §2).
- Don't stretch, shadow or recolour the wordmark, and don't use emoji as icons.
- Don't copy another brand's palette, logo, illustrations or icons.
