# ADR: Static site generator — Astro

**Date:** 2026-04-26
**Status:** Accepted

## Context

The site is content-heavy (per-tax YAML files plus prose), needs strong i18n routing, must run interactive calculators in islands of JS while keeping the rest of the page static, and deploys to GitHub Pages with no backend. We need to pick a static site generator and stop hedging.

The user is unopinionated and asked for best judgment.

## Decision

**Astro 5.x.**

## Why Astro (over Eleventy and plain HTML)

| Need | Astro | Eleventy | Plain HTML |
|------|-------|----------|------------|
| Schema-validated content collections | ✅ Built-in (Zod) | ⚠️ Glue required | ❌ Hand-rolled |
| i18n routing (`/es/`, `/vi/`, …) | ✅ First-class | ⚠️ Plugins / glue | ❌ Hand-rolled |
| JS-light by default ("zero JS unless you ask") | ✅ Islands architecture | ✅ JS-free by default | ✅ Trivially |
| Interactive calculators with framework-of-choice | ✅ React/Vue/Svelte/vanilla as islands | ⚠️ DIY | ⚠️ DIY |
| GH Pages deploy path | ✅ Official adapter | ✅ Easy | ✅ Trivial |
| Markdown + YAML content authoring | ✅ Excellent | ✅ Excellent | ⚠️ DIY |
| Accessibility-friendly defaults | ✅ Renders semantic HTML | ✅ Same | ✅ Same |
| Build cache & speed on small repo | ✅ Fine | ✅ Faster | ✅ N/A |
| Maintainer activity / ecosystem health | ✅ Active, growing | ✅ Active, smaller | N/A |
| Learning curve for contributors | ⚠️ Modest | ✅ Simpler | ✅ Simplest |

The deciding factors:

1. **Content Collections + Zod.** Tax content as schema-validated YAML is core to the maintenance model (`DATA_MODEL.md`). Astro gives us this out of the box — schema errors fail the build, which is exactly what we want for tax data.
2. **i18n is first-class.** Built-in routing for locale prefixes, locale-aware fallbacks, and a clear pattern for translated content collections. Eleventy works but requires more glue.
3. **Islands are the right primitive for our shape.** The site is 95% static prose + 5% interactive calculators. Astro's "ship zero JS, opt in per island" is the exact model we want. Plain HTML can do this manually; Astro just makes it conventional.
4. **The calculators need a UI framework.** Building tax-form-style inputs with proper validation and accessibility in vanilla JS is doable but tedious. Astro lets us pick **Preact** (or vanilla) for islands without committing the whole site to a framework.

## What this commits us to

- **Astro 5.x** as the build tool
- **Content Collections** (with Zod schemas) as the source-of-truth for tax records — see `2026-04-26-schema-validation.md`
- **Preact** as the islands framework for calculators (smaller than React, same API, plays well with Astro). Pinned in this ADR; revisit only if a real reason emerges.
- **TypeScript** on by default
- **Vitest** as the unit-test runner (Astro-recommended; matches `TESTING.md`)
- **GitHub Pages** via the official Astro static adapter

## What this does not commit us to

- A specific styling approach (CSS Modules / vanilla CSS / Tailwind — separate decision when we start building)
- A specific link-checker, formatter, or linter (covered in `TESTING.md`; pick at build time)

## Tradeoffs we accept

- **Modest learning curve** for new contributors who haven't seen Astro before. Mitigated by: small surface area for content authors (just edit YAML + Markdown), and good docs.
- **Build dependency on Node.js + npm.** Acceptable; required for any modern SSG.
- **Slightly heavier than 11ty for a content-only site.** Acceptable; the islands story pays for itself the first time we ship a calculator.

## Revisit if

- Astro 5.x has a non-trivial breaking-change cycle that costs maintenance time
- The site grows to a scale where build time becomes painful (>2 min on a small change)
- Calculator features grow beyond what Preact-as-island handles cleanly (unlikely)
