# ADR: Content schema and validation — Astro Content Collections + Zod

**Date:** 2026-04-26
**Status:** Accepted

## Context

`DATA_MODEL.md` defines the per-tax YAML schema. We need a validation strategy that:

- Fails the build on invalid tax data (a typo'd field shouldn't ship)
- Surfaces clear, line-pinned error messages to authors
- Plays naturally with whatever the build tool is
- Stays in sync with TypeScript types used by the calculator and UI code (one schema, not two)

The static site generator decision (`2026-04-26-static-site-generator.md`) selects Astro. Astro ships with Content Collections, which use **Zod** as the schema definition.

## Decision

**Astro Content Collections with Zod schemas.**

A single Zod schema per content collection in `src/content/config.ts`:

```ts
// sketch — final shape locked at first build
import { defineCollection, z } from 'astro:content';

const rateSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('flat'), amount_usd: z.number() }),
  z.object({
    type: z.literal('percent'),
    rate_pct: z.number(),
    applies_to_income_above_usd: z.number(),
    applies_to_joint_income_above_usd: z.number().optional(),
  }),
  z.object({
    type: z.literal('progressive'),
    brackets: z.array(z.object({
      rate_pct: z.number(),
      single_min_usd: z.number(),
      joint_min_usd: z.number(),
    })),
  }),
  z.object({
    type: z.literal('net-income-percent'),
    rate_pct: z.number(),
    gross_receipts_min_usd: z.number().default(0),
    notes: z.string().optional(),
  }),
]);

const taxesCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    short_name: z.string(),
    jurisdiction: z.enum(['city-of-portland', 'multnomah-county', 'metro', 'oregon-state', 'federal', 'other']),
    view: z.enum(['individual', 'business', 'reference']),
    scope: z.enum(['separate-return', 'included-elsewhere', 'informational']),
    last_verified: z.string().date(),
    verified_by: z.string(),
    status: z.enum(['active', 'retired', 'upcoming']),
    summary: z.string().max(800),
    rate: rateSchema,
    deadline: z.object({ filing: z.string().date(), payment: z.string().date() }),
    filing: z.object({
      primary_url: z.string().url(),
      administered_by: z.string(),
      account_required: z.boolean(),
      account_url: z.string().url().optional(),
      pin_letter_required: z.boolean(),
    }),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      accessed: z.string().date(),
    })).min(1),
    // ...rest per DATA_MODEL.md
  }),
});

export const collections = { taxes: taxesCollection };
```

## Why Zod (over JSON Schema, custom validation, etc.)

| Need | Zod via Content Collections | JSON Schema | Hand-rolled |
|------|----------------------------|-------------|-------------|
| Build-time fail on invalid content | ✅ Built into Astro build | ⚠️ Glue + tool | ⚠️ Glue |
| TypeScript types **derived from schema** | ✅ `z.infer` (single source) | ⚠️ Generators (drift risk) | ❌ |
| Author-friendly error messages | ✅ Path-pinned | ⚠️ Variable | ⚠️ |
| Discriminated unions (rate variants) | ✅ Native (`z.discriminatedUnion`) | ⚠️ `oneOf` works but is awkward | ⚠️ |
| Editor support in YAML files | ⚠️ Via JSON Schema export (planned) | ✅ | ❌ |
| Lock-step with the chosen SSG | ✅ Astro standard | ⚠️ External | ❌ |

**The TypeScript types being derived from the schema** is the critical win — it means the calculator code in `src/lib/` can `import type { CollectionEntry } from 'astro:content'` and get the exact shape, with refactoring tools that work. There is no second source of truth to drift.

## Editor support in YAML

Astro's Zod schemas don't natively give YAML editors autocomplete. To get this, we'll generate a JSON Schema from the Zod schema (`zod-to-json-schema`) and reference it from the top of each YAML file:

```yaml
# yaml-language-server: $schema=../../../schemas/tax.schema.json
id: arts-tax
...
```

This adds editor autocomplete for both VS Code and Helix users without making JSON Schema the source of truth.

## What this commits us to

- A single Zod schema file (`src/content/config.ts`) as the source of truth
- A build step that exports a JSON Schema for editor support (`scripts/export-schema.ts`)
- Build failure on schema violations
- TypeScript types from `astro:content`, no parallel type definitions

## Stricter checks beyond schema shape

Some checks Zod can express directly (date format, URL format, enum membership). Some need extra logic, run as part of the same build step:

- **`last_verified` freshness** — fail if older than 540 days, warn if older than 365 days
- **External URL allowlist** — fail if `filing_url` or `sources[].url` host isn't on the allowlist of trusted jurisdiction domains
- **Cross-references resolve** — `jurisdiction` must match a known entry in `content/reference/jurisdictions.yml`

These run via a small CI script (`scripts/validate-content.ts`) after Astro's own validation. Same outcome (build fails), different layer.

## Revisit if

- Authors find Zod error messages confusing in practice (likely fine, but worth checking after first 5 PRs)
- We move off Astro (would re-open the whole stack)
- A schema change cycle becomes painful (migration helpers, etc.)
