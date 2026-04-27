# Contributing to pdx taxes

Thank you for considering a contribution. This is a community-maintained public-good resource, and any help — content updates, translations, code, or accessibility feedback — is genuinely valuable.

## Code of conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Be kind, be helpful, assume good faith.

## How we work

- All changes happen through **pull requests** against `main`. There is no other path. This includes content updates.
- Every PR is **reviewed** by a maintainer before merging.
- Merging to `main` **automatically deploys** the live site (~35 second build via GitHub Actions).
- We use **inbound = outbound** licensing: code contributions are licensed MIT, content contributions are licensed CC BY 4.0. No CLA. By opening a PR you confirm you're OK with that.

---

## Getting started

```bash
git clone https://github.com/bjamba/pdx-taxes
cd pdx-taxes
npm install
npm run dev
```

Open <http://localhost:4321/pdx-taxes/> in a browser. Edits hot-reload.

Before your first PR, optionally run `npm run check` to catch type errors.

### Disable Astro telemetry

If you haven't disabled Astro's anonymous build telemetry on your machine, please do — it conflicts with our privacy posture even though it never reaches our servers:

```bash
npx astro telemetry disable
```

(CI does this automatically on every build. See `hacky-hours/02-design/SECURITY_PRIVACY.md`.)

---

## Workflows by contribution type

### 1) Update a tax fact (rate, threshold, deadline, link)

Most-common contribution. Steps:

1. Find the file in `src/content/taxes/<lang>/<tax-id>.yaml`.
2. Update the field. **Crucially, also update `last_verified` to today's date.**
3. Add a source URL under `sources` if you used one we don't already cite.
4. Open a PR titled `content: update <tax-id> <field>` (e.g. `content: update metro-shs threshold for 2026`).
5. In the PR body, paste a link to the official source backing the update.

Schema is enforced — if you typo a field name or use the wrong type, the build fails with a clear message.

### 2) Improve or correct a translation

Spanish translations were machine-drafted and human-edited. Native-speaker improvements are welcome.

- Tax content: `src/content/taxes/es/*.yaml`
- UI strings: `src/i18n/ui.ts` (the `es:` block)

Open a PR titled `i18n: improve <language> wording on <where>`. In the PR body, briefly explain why your phrasing is more natural — that helps future contributors.

### 3) Add a new language

Plan to be patient — adding a language well takes effort.

1. Add the locale to `astro.config.mjs` under `i18n.locales` (e.g. `'vi'`).
2. Add the locale to `languages` in `src/i18n/ui.ts`, with the language name **in its own language** (e.g. `vi: 'Tiếng Việt'`).
3. Translate every key in the `en:` block of `src/i18n/ui.ts` into a new `vi:` block. Don't leave keys untranslated; leave them as English fallback only if you genuinely don't have a translation yet (the runtime falls back gracefully).
4. Translate every tax YAML under `src/content/taxes/en/*.yaml` into `src/content/taxes/vi/*.yaml`.
5. Add a content collection for the new language in `src/content.config.ts` (mirror the existing `taxes-en` and `taxes-es` definitions).
6. Add `src/pages/vi/index.astro` and `src/pages/vi/[slug].astro` and `src/pages/vi/deadlines.astro` (mirror the `es/` versions).
7. **Tax content must be reviewed by a person fluent in the target language.** Machine translation alone is not acceptable for tax content. UI strings can use machine translation as a starting point.

### 4) Add a new tax

Real demand for this — the V1 roadmap calls for business taxes (Portland BLT, MCBIT, Metro SHS Business) and reference catalog entries (federal income, Oregon state).

1. Choose a stable `id` (kebab-case, e.g. `portland-blt`).
2. Create `src/content/taxes/<lang>/<id>.yaml` for **each** language we currently support (English mandatory; Spanish strongly preferred).
3. Fill out the schema (see existing files for examples). Required fields: `id`, `slug`, `name`, `short_name`, `jurisdiction`, `view`, `scope`, `last_verified`, `summary`, `who_owes`, `rate`, `rate_summary`, `deadline`, `filing_url`, `filing_summary`, `sources`.
4. Set `order` so it slots correctly into the deck.
5. If applicable, update the **applicability logic** in `src/components/ChecklistScript.astro` (the `appliesTo()` function) — otherwise the survey filter won't know whether to show or hide your new tax.
6. If you're adding a calculator, see "Adding a calculator" below.
7. Update `src/pages/deadlines.astro` (and `es/deadlines.astro`) to include the new filing deadline.
8. Add a CHANGELOG entry under `[Unreleased]` in `hacky-hours/04-build/CHANGELOG.md`.

### 5) Add or improve a calculator

Calculators live as pure functions in `src/lib/calculators.ts` AND inlined in `src/components/ChecklistScript.astro` (the inline copies power the live UI; the .ts file documents and exports them for testing).

When adding a new calculator:

1. Add the function to `src/lib/calculators.ts`. It must take a typed input and return `Estimate { applies, amount, reason? }`.
2. Inline a JS port of the same logic into `ChecklistScript.astro` (the `compute<Tax>()` functions).
3. Wire the new calculator type into `src/components/Estimator.astro`.
4. Verify it against documented official examples.
5. **Never** ship a calculator without a visible disclaimer — `Estimator.astro` includes the canonical one.
6. PFA in particular: confirm bracket interpretation against the official rules before changing anything. See `hacky-hours/02-design/BUSINESS_LOGIC.md`.

### 6) Improve accessibility

Highly valued. Specific things you can help with:

- Run a screen reader against any page and report what's awkward
- Test on a real low-end Android phone and report what breaks
- Find any place we used color to convey state without an icon or text label
- Find any focusable element with a missing or low-contrast focus ring
- Suggest plainer language for any sentence that reads as "tax-bureaucratic"

Standards we hold:
- WCAG 2.1 AA on every shipped page (axe in CI plus manual)
- 8th-grade reading level target for English body copy

---

## Style and conventions

### Commit messages

We loosely follow Conventional Commits. Pick the right prefix:

- `feat:` — new feature visible to users
- `fix:` — bug fix
- `content:` — tax content update
- `i18n:` — translation update
- `chore:` — tooling / build / non-user-visible
- `docs:` — documentation only

Wrap commit bodies at ~72 chars. Explain *why*, not just *what*.

### Code style

- **TypeScript** for any logic. No `any` without a comment explaining why.
- **Vanilla CSS** with custom properties — no preprocessor. The design system is in `src/styles/global.css`.
- **System fonts for body**, self-hosted Fraunces for display. No external font services.
- **No third-party scripts**. None. If you think we need one, open an issue first.
- Components use **kebab-case BEM-ish** class names (`.tax-card__title`, `.deck__nav-btn--prev`). Existing components are the best reference.
- `is:inline` JS in `ChecklistScript.astro` is intentional — it runs first, before any framework hydration, to avoid a flash of unstyled state.

### Pre-merge checklist

Before requesting review, verify:

- [ ] Build passes locally (`npm run build`)
- [ ] Type-check passes (`npm run check`)
- [ ] Manual smoke: open the affected page, click around. The deck navigates. The status segments update. The calendar download works.
- [ ] No secrets, API keys, or credentials in code or commit history
- [ ] No accidentally-committed `.env`, `*.pem`, or `*.key` files
- [ ] Any new external link points to a trusted jurisdiction or known-safe domain
- [ ] Any new tax content has a `last_verified` date set to today and a `sources` entry
- [ ] CHANGELOG entry under `[Unreleased]` if user-visible

---

## Project state

This project is small and direction-changes are easy. Big changes (new architecture, new infrastructure, payment processing, accounts, anything that touches the trust contract with users) should be discussed in an issue *before* code is written.

The framework documentation under `hacky-hours/` describes how we got here and what's next:

- [`hacky-hours/01-ideate/PRODUCT_OVERVIEW.md`](./hacky-hours/01-ideate/PRODUCT_OVERVIEW.md) — what we're building and for whom
- [`hacky-hours/02-design/`](./hacky-hours/02-design/) — how the system is shaped (ARCHITECTURE, DATA_MODEL, etc.)
- [`hacky-hours/02-design/decisions/`](./hacky-hours/02-design/decisions/) — locked decisions with reasoning (ADRs)
- [`hacky-hours/03-roadmap/ROADMAP.md`](./hacky-hours/03-roadmap/ROADMAP.md) — what's next, by milestone
- [`hacky-hours/04-build/BACKLOG.md`](./hacky-hours/04-build/BACKLOG.md) — current queue
- [`docs/CODE_OVERVIEW.md`](./docs/CODE_OVERVIEW.md) — how the code fits together

If you read those, you'll know more about this project than most people who've contributed to similar ones. That's deliberate.

---

## Questions?

Open an issue. Tag it `question`. We'll get to it.
