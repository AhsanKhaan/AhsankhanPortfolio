# UI study: ponytail.dev → developer look for this portfolio

A study of what makes ponytail.dev read as "made by developers", what this site took from it, and
what it deliberately left. Brand tokens (`brand/tokens.json`) stay the source of truth; nothing
here adds a colour or copies the reference's code, copy or signature art.

## What ponytail.dev does (studied 2026-11-27)

| Element | How it is built |
|---|---|
| Ground | Near-black warm `#070606`, warm off-white ink `#efe9dd`, three greys (soft, muted, faint), hairlines at 10% ink |
| Hero | Full-screen `<canvas>` of faint, dense code text; an ASCII figure drawn out of code in a cyan→violet→pink "holo" gradient; a radial vignette darkens the corner where the headline sits |
| Type | System sans for body (17px / 1.6); JetBrains Mono 800 for headlines (−0.045em), the second line italic and muted, decoding through scramble glyphs (`[#[`, `\|+`) |
| Kicker | Mono, 12px, uppercase, 0.22em tracking: `PONYTAIL 5.3 · NOW WITH THE BAND →` |
| Section rail | Two-column grid (160px + content), hairline on top; a sticky left label: number (mono 800) over name (mono uppercase, 0.18em) |
| Nav | Floating pill, blur 14px, 12% ink border; the logo is the word plus a blinking holo cursor block (`steps(1) 5`, then rests) |
| Accent use | The holo gradient appears only on the cursor, one nav link and the primary pill's 1px border (`background-clip: padding-box, border-box`) |
| Product UI | Real-looking code panels: file name, `CHANGED` tag, line numbers, a `› /command` prompt pane; numbered decision rows (`01`…`07`) with mono answers on the right |
| Motion | A "Pause motion" pill on the hero; `prefers-reduced-motion` stops transitions and the cursor |

## What this site took (implemented)

1. **Geist Mono as the code voice.** `tokens.json` already named it; it is now loaded with
   `next/font` and is Tailwind's `font-mono`.
2. **Hero code field** (`app/components/ui/CodeField.tsx`, logic in `lib/codeField.ts`). Our own
   take, not ponytail's figure: the text is real TypeScript built from `brand/profile.json`, it
   decodes once on load (~1.4 s), and a spotlight in the brand blue→emerald follows the pointer.
   Idle costs no CPU; reduced motion draws it still; touch screens get the decode only. Lighthouse
   mobile stayed within run-to-run noise of the old hero (88–90 before, 89 after).
3. **Status kicker** above the hero name: mono, uppercase, tracked, with an "open to work" dot that
   pings three times and then rests.
4. **Logo cursor:** the logo set in Geist Mono with a gradient cursor block that blinks five times.
5. **Section kickers** (`app/components/ui/SectionKicker.tsx`): `01 —— About` above each homepage
   heading, numbered from `lib/sectionIndex.ts` (a test keeps it in page order); `// Agentic AI`
   where a section is reused unnumbered.
6. **Selection colour** in the brand accent.

## Left out on purpose

- The violet/pink holo gradient: the brand gradient is blue→emerald, and the vendored taste rules
  forbid violet in our own design.
- The ASCII figure drawn from code: it is ponytail's signature art.
- A pause button: nothing on this hero moves for more than the 1.4 s decode, so there is nothing
  to pause (WCAG 2.2.2 applies to motion over 5 s).

## Next ideas (not built; each is a brand decision for Ahsan)

- **Mono two-line section headings:** replace the giant Kanit gradient words with Geist Mono 700,
  where the second line is italic and muted, says something about the section ("Services. / What
  I ship, end to end."), and decodes once when it scrolls into view.
- **Sticky left rail** on long sections (Experience, Case studies): the kicker moves into a 160px
  sticky column, as on ponytail.
- **Case studies as code panels:** each study gets a file-name header, line numbers and a
  `before → after` metric row (`FCP 4.2s → 2.7s`) in mono.
- **Gradient-border ghost button:** the ghost pill's 2px white border becomes a 1px brand-gradient
  border with a soft glow on hover.
- **Warmer ink:** the text token `neutral-200` could warm slightly toward ponytail's off-white;
  change it in `tokens.json` only, so the emails and social images follow.
