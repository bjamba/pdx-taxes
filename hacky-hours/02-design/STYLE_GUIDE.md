# Style Guide

The visual language is **warm, calm, and dignified** — like a thoughtful neighbor walking you through something complicated, in their kitchen, with a cup of coffee. Not corporate. Not bureaucratic. Not trendy. Not childish. Just **kind**.

This document walks through every visual decision and shows mockups so we can see what it feels like before we build it.

---

## 1. Design philosophy

Tax websites feel cold. They feel like they were built by a different government department than the one that's actually trying to help you. We are explicitly trying to feel different — to feel like a public library, or a community legal aid clinic, or your favorite co-op grocery store. Spaces where you are **welcomed**, where someone took care, where the lights are warm and the staff is patient.

Five principles, in priority order:

1. **Calm.** No urgency theater. No "Only 3 days left!" red banners. Deadlines are facts, presented as facts.
2. **Warm.** Cream paper, soft greens and ambers, a little texture. Never cold blue corporate.
3. **Generous.** Big text. Big tap targets. Lots of breathing room. Time to think.
4. **Plain.** No decoration that doesn't serve information. No mystery icons. No "wow" moments.
5. **Confident-but-humble.** We know what we know; we say where we got it; we acknowledge what we can't say.

> **The vibe check:** "Would my Vietnamese-speaking grandmother on her cracked Android, sitting at the kitchen table, feel welcomed here, or would she feel small?"

If the answer is "small," we don't ship it.

---

## 2. Color palette

A **warm, earthy palette** drawn from the Pacific Northwest — moss, paper, terracotta — chosen because it reads as human and trustworthy without leaning on corporate blues that say "form to fill out."

All color pairings below have been **mathematically tested against WCAG 2.1 AA** and locked in [ADR 2026-04-26 — Color palette WCAG AA](decisions/2026-04-26-color-palette-wcag-aa.md). Most pairings clear AAA (7:1).

### Neutrals — the page itself

| Role | Hex | Visual | Where used |
|------|-----|--------|------------|
| **Paper** | `#FBF7F0` | <img src="https://placehold.co/40x20/FBF7F0/FBF7F0.png" alt="" /> | Page background. A warm off-white with a hint of cream — like recycled paper. |
| **Surface** | `#F5EFE4` | <img src="https://placehold.co/40x20/F5EFE4/F5EFE4.png" alt="" /> | Cards, callouts, anything that sits on Paper |
| **Surface-edge** | `#EAE2D2` | <img src="https://placehold.co/40x20/EAE2D2/EAE2D2.png" alt="" /> | **Decorative only** — section dividers between regions. Not for component edges. |
| **Ink** | `#2A2622` | <img src="https://placehold.co/40x20/2A2622/2A2622.png" alt="" /> | Body text. Warm near-black — never pure `#000` (too harsh on cream) |
| **Ink-soft** | `#5C5650` | <img src="https://placehold.co/40x20/5C5650/5C5650.png" alt="" /> | Secondary text, meta info |
| **Ink-faint** | `#8B847B` | <img src="https://placehold.co/40x20/8B847B/8B847B.png" alt="" /> | Tertiary text (large only); also: meaningful component borders (cards, button outlines) — clears 3:1 vs Paper |

### Accent — the friendly anchors

| Role | Hex | Visual | Where used |
|------|-----|--------|------------|
| **Moss** | `#3F6B4F` | <img src="https://placehold.co/40x20/3F6B4F/3F6B4F.png" alt="" /> | Primary accent. Links, primary buttons, focus rings. Calm, deep, trustworthy. |
| **Moss-deep** | `#2E5239` | <img src="https://placehold.co/40x20/2E5239/2E5239.png" alt="" /> | Hover/pressed state for primary |
| **Moss-soft** | `#D7E4D8` | <img src="https://placehold.co/40x20/D7E4D8/D7E4D8.png" alt="" /> | Backgrounds for active checklist items, gentle highlight |
| **Terracotta** | `#9F4A2F` | <img src="https://placehold.co/40x20/9F4A2F/9F4A2F.png" alt="" /> | Secondary accent. Used for warm highlights and "you matter" moments — not for warnings. |
| **Terracotta-soft** | `#F3DAD0` | <img src="https://placehold.co/40x20/F3DAD0/F3DAD0.png" alt="" /> | Background for callouts that should feel friendly, not alarming |

### Semantic — feedback colors

| Role | Hex | Visual | Where used |
|------|-----|--------|------------|
| **Success** | `#3F6B4F` | <img src="https://placehold.co/40x20/3F6B4F/3F6B4F.png" alt="" /> | "Done" status. (Same as Moss — completed feels calm, not loud.) |
| **Warning** | `#7E5818` | <img src="https://placehold.co/40x20/7E5818/7E5818.png" alt="" /> | Deep amber. "Heads up" — like a deadline approaching. |
| **Warning-soft** | `#F5E6C5` | <img src="https://placehold.co/40x20/F5E6C5/F5E6C5.png" alt="" /> | Background for warning callouts |
| **Critical** | `#9A3B30` | <img src="https://placehold.co/40x20/9A3B30/9A3B30.png" alt="" /> | Reserved for genuine errors and overdue deadlines. **Used sparingly.** |
| **Critical-soft** | `#F1D6D1` | <img src="https://placehold.co/40x20/F1D6D1/F1D6D1.png" alt="" /> | Background for critical callouts |

> **Color is never alone.** A "done" item is Moss + ✓ icon + the word "Done." A warning is amber + ⚠ icon + text. We never communicate state with color only — that fails colorblind users, screen-reader users, and anyone glancing quickly.

### Dark mode

Automatic via `prefers-color-scheme`. Same palette, inverted with warmth preserved:

| Light → Dark | Hex |
|---|---|
| Paper → Deep Ink | `#1F1C18` |
| Surface → Charcoal | `#2A2622` |
| Ink → Cream | `#F1ECE2` |
| Moss → Light Moss | `#7FA98A` |
| Terracotta → Light Terracotta | `#D89178` |

Backgrounds in dark mode are **never pure black**. We keep the warmth.

---

## 3. Typography

The goal: legible at a glance, comfortable for long reads, available everywhere with no font download required.

### Font stack

```css
--font-body: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
             Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

System fonts mean **zero font download**, fast first paint, and they match the user's OS conventions — which feels native, not foreign. Trade-off: less brand distinctiveness. We accept that gladly.

### Scale (mobile-first; +1 step on desktop)

| Role | Mobile | Desktop | Weight | Line-height |
|------|--------|---------|--------|-------------|
| H1 (page title) | 30px | 36px | 700 | 1.15 |
| H2 (section) | 22px | 26px | 700 | 1.25 |
| H3 (subsection) | 19px | 21px | 600 | 1.3 |
| Body | **18px** (16px floor) | 19px | 400 | **1.6** |
| Lead | 20px | 22px | 400 | 1.5 |
| Meta / small | 14px | 15px | 500 | 1.4 |

**Bold body weight = 600.** Heavier on cream paper looks heavier than on white — 600 reads as 700 against `#FBF7F0`.

**Tabular numerals everywhere** numbers matter:

```css
.amount, .deadline, .rate {
  font-variant-numeric: tabular-nums;
}
```

So `$1,250` and `$ 250` line up cleanly when stacked.

### Sample type ladder (preview)

```
═══════════════════════════════════════════════════
   The Portland local taxes you may owe              ← H1, 30px/700
═══════════════════════════════════════════════════

   For most Portland residents in 2026, there are    ← Lead, 20px/400
   between three and five local taxes to file.

   Arts Tax                                          ← H2, 22px/700
   ─────────────────────────────────

   A flat $35 tax for Portland residents             ← Body, 18px/400
   age 18 and older with at least $1,000 in
   yearly income. The deadline is April 15.

   Last verified: April 26, 2026                     ← Meta, 14px/500
```

---

## 4. Spacing

A simple **4px grid**: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`. The most-used values are **16, 24, and 32**.

Rule of thumb: **when in doubt, add more space**. This is a calm site. Generous whitespace is part of the feel.

| Spacing | Where |
|---------|-------|
| 4px | Inside small pills/badges |
| 8px | Between an icon and its label |
| 12px | Inside form fields (vertical padding) |
| 16px | Inside cards (padding) |
| 24px | Between paragraphs, between cards |
| 32px | Between sections |
| 48–64px | Between major page regions |

**Max content width:** `72ch` (~ 720–760px). Wide enough to scan a checklist; narrow enough that prose stays readable without darting.

---

## 5. Layout & motion

### Layout

- **Single column on mobile.** Every page.
- **Two columns on tablet+** only when there's a real reason (rare — the tax detail page might benefit, with a sticky-on-scroll filing-link panel on the right).
- **No fixed/sticky headers** that eat screen real estate on mobile. The header scrolls with the page.

### Border radius

Soft, not slick: `--radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px;`

Cards: `10px`. Buttons: `8px`. Pills: fully rounded.

### Elevation

Almost none. We use **borders and tinted surfaces**, not shadows. A single subtle shadow exists for the language switcher dropdown:

```css
--shadow-soft: 0 4px 16px rgba(42, 38, 34, 0.08);
```

That's it. No "card hovers up" tricks.

### Motion

- **Honor `prefers-reduced-motion`** — disable all transitions when set.
- Default transition: `150ms ease-out` on color/background.
- **No autoplay anything.** No carousels. No animated loaders past 250ms (use a calm pulse, not a spinning beachball).
- Page transitions: none. Static-site full reload feels solid and predictable.

---

## 6. Components — with mockups

Every component below has rules + a mockup. Mockups are ASCII so they render anywhere; HTML/CSS is sketched in code blocks for handoff.

### 6.1 Buttons

**Primary** (one per major view):

```
┌─────────────────────────┐
│   File this tax  →      │   Moss bg, cream text, 12/20 padding, 8px radius
└─────────────────────────┘
```

```html
<a class="btn btn--primary" href="…">
  File this tax
  <svg class="btn__arrow" aria-hidden="true">…</svg>
</a>
```

```css
.btn--primary {
  background: var(--moss);
  color: var(--paper);
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  display: inline-flex;
  gap: 8px;
  align-items: center;
}
.btn--primary:hover { background: var(--moss-deep); }
.btn--primary:focus-visible {
  outline: 3px solid var(--moss);
  outline-offset: 3px;
}
```

**Secondary**:

```
┌─────────────────────────┐
│   Add to my checklist   │   Outlined, ink text on paper
└─────────────────────────┘
```

**Tap target ≥ 48×48 CSS pixels** including padding. No exceptions.

### 6.2 Status pill

```
  ╭──────────────╮     ╭───────────────────╮     ╭─────────────╮
  │  ✓  Done     │     │  •  In progress    │     │  ○  Not yet │
  ╰──────────────╯     ╰───────────────────╯     ╰─────────────╯
   Moss-soft bg          Surface bg              Surface bg
   Moss text             Ink text                Ink-soft text
```

Always icon **+** word **+** color. Never just color.

### 6.3 Tax card (the main building block)

```
┌────────────────────────────────────────────────────────┐
│                                                         │
│   Multnomah Preschool For All (PFA)        ╭─────────╮  │
│   Personal income tax                       │ ○  Not  │  │
│                                              │   yet   │  │
│                                              ╰─────────╯  │
│                                                         │
│   You owe this if you live in Multnomah County         │
│   and earn more than $125,000 (single) or              │
│   $200,000 (joint).                                    │
│                                                         │
│   Rate           1.5%  (above threshold)               │
│   Deadline       April 15, 2026                        │
│                                                         │
│   ┌──────────────────────────┐  ┌─────────────────┐    │
│   │  File this tax  →        │  │  Estimate it    │    │
│   └──────────────────────────┘  └─────────────────┘    │
│                                                         │
│   Last verified April 26, 2026 · Source: multco.us    │
│                                                         │
└────────────────────────────────────────────────────────┘
```

- Title: H3 (19px/600), Ink
- Subtitle (tax type): 14px Ink-soft
- Status pill: top-right, vertically aligned with title
- Description: body, 18px Ink, max ~70 chars per line
- Rate/Deadline: definition list, tabular nums
- Two CTAs: primary + secondary, side-by-side on desktop / stacked on mobile
- Footer: 14px Ink-faint, with a link to the source

### 6.4 Callout — disclaimer

The disclaimer appears **everywhere a calculator runs** and on every tax detail page. It must be visible, not friction.

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   ⓘ  This is an estimate, not tax advice.               │
│      Always check the official rules before filing.     │
│      → Read the official Arts Tax page                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

- Background: `Surface` (warm tan, calm — not alarming)
- Border-left: 3px Moss (subtle anchor)
- Icon: ⓘ in Moss
- Body: 16px Ink-soft
- Link: Moss, underlined

### 6.5 Callout — friendly note (terracotta)

For helpful "you might want to know" content — not warnings, not errors. Things like "If you're new to Portland, here's what to do first."

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   ☼  New to Portland?                                   │
│      Setting up a Portland Revenue Online account      │
│      can take 7–10 days because of a paper PIN         │
│      letter. Start it early.                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Background: Terracotta-soft. Icon: small sun in Terracotta. Body: Ink. Feels like a heads-up from a friend.

### 6.6 Callout — warning (amber)

For genuine "watch out" content. Approaching deadlines, common mistakes.

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   ⚠  The deadline is in 9 days.                         │
│      Filed taxes are accepted until 11:59pm on          │
│      April 15.                                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Background: Warning-soft. Icon: ⚠ in Warning. **Never animated. Never pulsing.**

### 6.7 Calculator block

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   Estimate your Metro SHS tax                           │
│   ───────────────────────────────                       │
│                                                          │
│   Filing status                                         │
│   ◉ Single   ○ Joint                                    │
│                                                          │
│   Your Metro taxable income                            │
│   ┌───────────────────────────┐                         │
│   │  $                         │                         │
│   └───────────────────────────┘                         │
│   This is your Oregon taxable income, with             │
│   Metro adjustments. Most people can use the           │
│   number from line 19 of their Oregon return.          │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │                                              │       │
│   │   Estimated Metro SHS tax                   │       │
│   │                                              │       │
│   │   $1,250                                    │       │
│   │                                              │       │
│   │   Based on a 1% rate above the $128,000     │       │
│   │   single-filer threshold for 2026.          │       │
│   │                                              │       │
│   └─────────────────────────────────────────────┘       │
│                                                          │
│   ⓘ This is an estimate, not tax advice. Always         │
│      check the official rules before filing.            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

- Inputs: large (50px tall), generous padding, label **above** the input (always visible)
- Help text under each input in 16px Ink-soft
- Result block: distinct surface (Moss-soft background), large number (32px Ink, tabular)
- Disclaimer is part of the component, not optional
- "Forget my inputs" button at the bottom

### 6.8 Language switcher

Top-right of the header on desktop, top of the header on mobile. Languages list themselves in their own language — a small dignity that matters.

```
   ╔══════════════════════╗
   ║  English        ▾    ║      ← Closed state, in the page header
   ╚══════════════════════╝

           ↓ on click

   ╔══════════════════════╗
   ║  English          ✓  ║
   ║  Español             ║
   ║  Tiếng Việt          ║
   ║  中文                ║
   ║  Русский             ║
   ║  العربية             ║
   ║  Українська          ║
   ║  Soomaaliga          ║
   ╚══════════════════════╝
```

Each option is a real `<a href>` (not JS-only) so the page works without JavaScript.

### 6.9 Header & footer

**Header** (mobile):

```
┌────────────────────────────────────────┐
│                                         │
│   pdx taxes              English ▾     │
│                                         │
│  ─────────────────────────────────────  │
│   Individual    Business     Reference  │
│  ─────────────────────────────────────  │
│                                         │
└────────────────────────────────────────┘
```

- Wordmark in lowercase, Ink, no logo
- Three-tab view switch underneath, with active state shown by a Moss underline (3px)

**Footer**:

```
┌──────────────────────────────────────────────────────────┐
│                                                           │
│   This site is an unofficial community resource.         │
│   It is not affiliated with the City of Portland,        │
│   Multnomah County, or Metro. The information here      │
│   is provided for general guidance only and is not      │
│   legal, tax, or financial advice.                      │
│                                                           │
│   ─────────────────────────────────────────────         │
│                                                           │
│   About  ·  Privacy  ·  Methodology  ·  Source code     │
│                                                           │
│   Last updated April 2026                                │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

The disclaimer comes first. Always.

---

## 7. Page mockups

Two pages show how the components compose. ASCII renders everywhere.

### 7.1 Home page (mobile, ~360px wide)

```
┌────────────────────────────────────────┐
│   pdx taxes              English ▾    │
│  ─────────────────────────────────────  │
│   Individual   Business    Reference    │
│  ─────────────────────────────────────  │
│                                         │
│                                         │
│   The Portland local taxes              │
│   you may owe                          │
│                                         │
│   For most Portland residents in 2026, │
│   there are 3–5 local taxes to file —  │
│   in addition to your federal and      │
│   Oregon state returns.                │
│                                         │
│   ┌─────────────────────────────┐      │
│   │  Help me build my list  →   │      │
│   └─────────────────────────────┘      │
│                                         │
│   or browse all taxes ↓                │
│                                         │
│   ─────────────────────────────────    │
│                                         │
│   ┌────────────────────────────┐       │
│   │  Portland Arts Tax    ○    │       │
│   │                             │       │
│   │  A flat $35 tax for         │       │
│   │  Portland residents 18+     │       │
│   │  with $1,000+ in income.    │       │
│   │                             │       │
│   │  Deadline  Apr 15, 2026     │       │
│   │                             │       │
│   │  ┌──────────────────────┐   │       │
│   │  │  See details   →     │   │       │
│   │  └──────────────────────┘   │       │
│   │                             │       │
│   │  Last verified Apr 26       │       │
│   └────────────────────────────┘       │
│                                         │
│   ┌────────────────────────────┐       │
│   │  Multnomah PFA        ○    │       │
│   │  ...                       │       │
│   └────────────────────────────┘       │
│                                         │
│   ┌────────────────────────────┐       │
│   │  Metro SHS            ○    │       │
│   │  ...                       │       │
│   └────────────────────────────┘       │
│                                         │
│   ─────────────────────────────────    │
│                                         │
│   This site is an unofficial            │
│   community resource…                   │
│                                         │
└────────────────────────────────────────┘
```

Notice: no hero image. No carousel. No newsletter sign-up. No cookie banner. Just **the question they came for** and the answer.

### 7.2 Tax detail page (mobile)

```
┌────────────────────────────────────────┐
│   ← All taxes                           │
│                                         │
│   Multnomah Preschool                  │
│   For All (PFA)                        │
│   Personal income tax                  │
│                                         │
│   ╭────────────────────────╮            │
│   │  ○  Not yet started    │            │
│   ╰────────────────────────╯            │
│                                         │
│   You owe this if you lived in         │
│   Multnomah County in 2025 and         │
│   earned more than $125,000 (single)   │
│   or $200,000 (joint).                 │
│                                         │
│   ─────────────────────────             │
│                                         │
│   Rate                                  │
│      1.5%   on income above $125k/$200k│
│      3.0%   on income above $250k/$400k│
│                                         │
│   Deadline                              │
│      April 15, 2026                    │
│                                         │
│   Filed with                            │
│      Portland Revenue Division         │
│      (administers for Multnomah County)│
│                                         │
│   ─────────────────────────             │
│                                         │
│   ┌─────────────────────────────┐      │
│   │  File this tax  →           │      │
│   └─────────────────────────────┘      │
│                                         │
│   ┌─────────────────────────────┐      │
│   │  Estimate it                │      │
│   └─────────────────────────────┘      │
│                                         │
│   ┌─────────────────────────────┐      │
│   │  ☼  New to PFA?             │      │
│   │     If you don't have a     │      │
│   │     Portland Revenue Online │      │
│   │     account, request a PIN  │      │
│   │     early — it can take    │      │
│   │     7–10 days by mail.     │      │
│   └─────────────────────────────┘      │
│                                         │
│   Free filing                          │
│      • Portland Revenue Online        │
│      • IRS Free File (federal only)   │
│                                         │
│   ─────────────────────────             │
│                                         │
│   Last verified  April 26, 2026        │
│   Source        multco.us              │
│   Report an issue with this page       │
│                                         │
└────────────────────────────────────────┘
```

---

## 8. Voice of the writing

Type can be perfect and the words can still feel cold. The voice rules:

| Don't say… | Say instead… |
|------------|--------------|
| "You must file by April 15." | "The deadline is April 15." |
| "Failure to file will result in penalties." | "If you file late, the penalty is $15 starting April 16." |
| "Easy filing process." | (don't claim ease at all) |
| "Simply go to portland.gov…" | "Go to portland.gov…" |
| "Click here." | "See the official PFA page." |
| "Important!" | (use the warning callout — don't shout in body copy) |

**Address the reader as "you"** in English, where natural. **Never** address them as "the taxpayer" or "the user."

Translations should preserve this register — warm, second-person, clear. Translators are briefed accordingly.

---

## 9. Icons

- **Library:** [Lucide](https://lucide.dev) — open source (ISC license), consistent line weight, calm shapes.
- **Size:** 20px in body context, 24px in callouts and CTAs, 16px in pills.
- **Color:** matches the surrounding text by default. Accent color only when paired with a status (Moss for done, Amber for warning).
- **Always paired with text** — no icon-only buttons without an `aria-label`.

Approved icon set (initial):

| Icon | Meaning | Lucide name |
|------|---------|-------------|
| ✓ | Done | `check` |
| ○ | Not yet started | `circle` |
| • | In progress | `circle-dot` |
| ⓘ | Information / disclaimer | `info` |
| ⚠ | Warning | `alert-triangle` |
| ☼ | Friendly note | `sun` |
| → | Continue / file | `arrow-right` |
| ▾ | Dropdown | `chevron-down` |

---

## 10. What we won't ship

- Stock photos of people (especially "diverse smiling families" — patronizing)
- Branded illustrations of buildings or skylines
- Gradients, drop shadows beyond `--shadow-soft`
- Animation that moves on page load
- Modal overlays unless strictly necessary (and never for marketing)
- Sticky CTAs that obscure content
- "Important!" or "URGENT!" text
- Emojis in body copy or as primary icons
- Cute mascots
- Copy that says "easy" or "simple"
- Anything that says "let's get started!" with an exclamation point

---

## 11. Open decisions

1. **Dark-mode palette** — preliminary values in §2 above; needs its own contrast pass and ADR before dark mode ships.
2. **Wordmark vs. tiny logo:** Plain lowercase wordmark "pdx taxes" planned. Cosmetic; adjustable any time.
3. **Header tab vs. dropdown for Individual/Business/Reference:** Tabs work at 3 items; revisit only if we add a 4th.
4. **First language coverage at MVP:** English + a small subset; the visual language must be tested with a long Vietnamese string and an Arabic RTL string before non-English content ships, not after.

Locked decisions for this section live in `decisions/2026-04-26-color-palette-wcag-aa.md`.
