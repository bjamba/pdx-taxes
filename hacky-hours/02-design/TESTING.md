# Testing

The site is "static + a few calculators + a checklist." Test strategy reflects that — content correctness matters more than a sprawling unit-test suite.

## What we test, in order of importance

### 1. Content schema and link integrity (highest priority)

- **Schema validation** for every tax YAML file (build-fails on invalid).
- **Link checking** of every `filing_url`, `account_url`, and `sources[].url` — runs in CI on every PR and on a weekly cron.
- **Allowlist of trusted external domains** (portland.gov, multco.us, oregonmetro.gov, irs.gov, oregon.gov, etc.). New external links require explicit allowlist update — this is a security control, not a bureaucratic one.
- **`last_verified` freshness check** — warn at >365 days, fail build at >540 days.

A broken `filing_url` is a higher-severity bug than a typo in this codebase.

### 2. Calculator logic (unit tests)

- Each calculator function in `src/lib/calculators/` has a unit-test file.
- Test cases include: documented examples from official sources, edge cases (income exactly at threshold), zero/negative/NaN inputs, large inputs, joint vs. single filing.
- Snapshot rate tables: when an inflation-adjusted threshold updates, the calc test must be updated alongside the YAML — failure to update one without the other is a CI fail.

Test framework: Vitest (small, fast, Node-friendly). Or whatever Astro recommends at build time.

### 3. Accessibility

See `ACCESSIBILITY.md` for the full list. Summary of CI:

- **axe-core** runs in CI against built pages. Serious/critical violations fail the build.
- **Manual keyboard-only and screen-reader smoke** before any release.
- **Color contrast** verified for new components by a reviewer.

### 4. i18n correctness

- **Translation completeness check** — for each non-English locale, list any missing keys vs. English source. Missing keys don't fail the build (we want partial translations to ship), but the build emits a per-locale completion percentage and the UI shows a "translation pending" banner where applicable.
- **No HTML/markup leaks** in translated strings (translators sometimes copy-paste tags awkwardly).
- **Date formatting and pluralization** sanity-checked per locale.
- **RTL layout smoke** for Arabic.

### 5. End-to-end (lightweight)

- **Playwright** for a tiny smoke suite — about 10 tests covering: home page loads, language switcher works, a tax detail page renders, the checklist persists state across reloads, a calculator returns a number.
- Run on CI for every PR.

### 6. Performance

- **Lighthouse** budget: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95 on a built page (mobile profile).
- **Page weight budget:** ≤ 100KB transferred on the first load of the home page (excluding the user's chosen language pack).

## Definition of Done (per pull request)

A PR is "done" when:

- [ ] All CI checks pass (schema, links, lint, type, unit tests, axe, e2e smoke)
- [ ] Reviewer has verified the change against the relevant design doc
- [ ] Any new external link is on the allowlist
- [ ] Any new tax content has a `last_verified` date and `sources` entries
- [ ] Any new calculator path has unit tests covering the documented official examples
- [ ] Any new copy has been spot-checked for plain-language fit
- [ ] Any new UI has been keyboard-tested by the author
- [ ] CHANGELOG entry added under `[Unreleased]`
- [ ] No secrets, no PII, no accidentally-checked-in files

## Definition of Done (per release)

Beyond the per-PR list:

- [ ] All open `last_verified` warnings resolved or explicitly accepted
- [ ] Translation completion percentages reviewed; new "translation pending" banners verified
- [ ] Manual screen-reader pass on at least one updated journey
- [ ] Manual mobile real-device pass
- [ ] Lighthouse budget met on home + one tax detail + one calculator page

## What we deliberately don't do

- **No 100% coverage chase.** Coverage is not the goal — the test that catches the wrong tax rate is worth a hundred coverage-padding tests.
- **No test for every UI permutation.** The UI is small and reviewed visually.
- **No load testing.** Static site on a CDN; not a meaningful concern.
- **No security pen-testing for the MVP.** Threat surface is tiny (see `SECURITY_PRIVACY.md`); revisit if the site grows features that handle user input server-side (which the design says it never will).

## Tooling summary

| Need | Tool |
|------|------|
| Unit tests | Vitest |
| E2E smoke | Playwright |
| Accessibility | axe-core (in Playwright + standalone CLI) |
| Linting | ESLint (or Biome — TBD) |
| Formatting | Prettier (or Biome) |
| Type checking | TypeScript |
| Link checking | lychee or similar (CI cron) |
| Schema validation | Astro Content Collections + Zod |
| Lighthouse CI | `treosh/lighthouse-ci-action` or equivalent |

Final tool choices are confirmed via short ADRs once we start building.
