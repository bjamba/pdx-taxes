# Accessibility

## Standard

**WCAG 2.1 Level AA** is the floor. We aim for AAA where it's reasonable (especially color contrast and reading level).

This is not optional. The audience explicitly includes people with disabilities, low literacy, non-English-first speakers, and people on low-end devices and slow connections.

## Foundational commitments

1. **Semantic HTML first.** Real headings (`<h1>`–`<h3>`), real lists, real landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`). No `<div>` soup. ARIA only where semantic HTML doesn't cover.
2. **Keyboard-navigable.** Every interactive element is reachable and operable with Tab/Shift-Tab/Enter/Space. Visible focus indicators on every focusable element, never `outline: none` without replacement.
3. **No JS required for content.** Reading taxes, deadlines, filing links — all works with JavaScript disabled. Calculators and the checklist need JS, and they degrade gracefully.
4. **Reduced motion.** Honor `prefers-reduced-motion`. No autoplay anything.
5. **Mobile-first, touch-friendly.** Tap targets ≥ 44×44 CSS pixels. No hover-only interactions.

## Reading level

Target: **8th-grade reading level or lower** for all body copy in English. (We will measure with a Flesch-Kincaid check in CI as a soft signal, not a hard fail.)

Practices:
- Short sentences. One idea per sentence.
- Define jargon the first time it appears: "PFA (Preschool For All) is a Multnomah County tax that...".
- Avoid Latinate vocabulary when an Anglo-Saxon synonym exists ("use" not "utilize", "help" not "facilitate").
- Avoid passive voice for instructions.

This is harder to enforce in translations — translators will be asked to maintain plain language in their target language to the extent possible.

## Color & contrast

- Body text: **4.5:1 minimum contrast** (AA), aim for 7:1 (AAA).
- Large text (≥18pt or ≥14pt bold): 3:1 minimum (AA), aim for 4.5:1 (AAA).
- **Never use color alone** to convey meaning. (e.g., a "done" checklist item must also have an icon or text label, not just a green background.)
- Test with a color-blindness simulator before merging UI changes.

## Type

- Body text: **18px minimum** at default zoom on desktop (smaller phones may scale down to 16px).
- Line-height: **1.5+ for body text**.
- Line-length: max ~70 characters for readability.
- Allow user font scaling (no `user-scalable=no` ever).

## Forms (calculators)

- Every input has a visible `<label>`. Placeholders are not labels.
- Errors are described in text adjacent to the input, with an icon — not just color.
- Clear instructions before the form. Plain-language help text under each input.
- Don't require unnecessary fields. Don't validate format (e.g., commas in numbers) too aggressively.

## Internationalization & accessibility intersect

- `<html lang="…">` set correctly per page.
- RTL languages (Arabic) need direction-aware layout — flagged for testing.
- Language switcher labels each option in **its own language** ("Español", not "Spanish") — a small but meaningful dignity.
- Translated content keeps semantic structure intact (don't translate inside code blocks, etc.).

## Testing

| Layer | What | How |
|-------|------|-----|
| Automated | axe-core / pa11y in CI | Hard-fails on serious/critical violations |
| Automated | HTML validity | W3C validator in CI |
| Automated | Color contrast | axe + manual review on new components |
| Manual | Keyboard-only navigation | Pre-merge for any UI change |
| Manual | Screen reader smoke test | VoiceOver (mac/iOS) and NVDA (Windows) — at least one per release |
| Manual | Mobile real-device check | Chrome DevTools throttled mobile + at least one real low-end device per release |

## Current state

This is greenfield. There is no current state — we are setting these as targets at the start, before any UI exists, so they don't get "we'll fix it later"-ed.

A baseline accessibility audit will be added to the pre-launch checklist for the first public release.

## Things we will not ship

- Inaccessible calculators (a calculator unusable by a screen reader is worse than no calculator)
- Pages that require pinch-zoom to read
- Auto-advancing content (carousels)
- Color-only state
- Modals without proper focus trap and dismiss-on-Esc
- "Skip to main content" missing on any page

## Reference

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Plain Language Guidelines (US)](https://www.plainlanguage.gov/guidelines/)
