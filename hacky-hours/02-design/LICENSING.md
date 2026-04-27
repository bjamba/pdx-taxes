# Licensing

## Code

- **License:** MIT
- **Why MIT:** Permissive, GitHub-default, simplest-possible license for a public-good resource. Maximizes reuse — anyone (including the jurisdictions themselves) can fork or contribute without legal friction.
- **Where:** A `LICENSE` file at the repo root.
- **Copyright line:** `Copyright (c) <year> Contributors to pdx-taxes`

## Content

Tax content (descriptions, summaries, checklists, translations) sits in a different category from code — it's authored prose and structured data designed for reuse by other community projects, journalists, or the jurisdictions.

- **License:** **CC BY 4.0** (Creative Commons Attribution)
- **Why CC BY (not CC0):** Attribution is cheap, signals provenance, and helps people trust the source. CC0 (public domain) is also acceptable if a contributor objects to attribution requirements.
- **Where declared:** A `LICENSES.md` (plural) at repo root that calls out: "Code under `LICENSE` (MIT). Content under `content/` and translation files: CC BY 4.0."

## Authoritative source content

Tax content authored by City of Portland, Multnomah County, and Metro is generally **public-domain government work** in Oregon, but **copying their prose verbatim is still discouraged** — instead summarize and link out. This both:
- Avoids any ambiguity about derivative content
- Forces us to write in **plain language** rather than legalese, which is the whole point

## Dependency policy

Before adding any dependency, check:

1. **License compatibility:** Acceptable licenses for code dependencies — MIT, Apache 2.0, BSD (2/3 clause), ISC, MPL 2.0, Unlicense. **Avoid** GPL/AGPL (copyleft conflicts with MIT downstream usage in some contexts), unclear/missing licenses, "source-available" non-OSI licenses.
2. **Maintenance status:** Last commit within ~12 months, or known maintainer.
3. **Footprint:** Is the dependency strictly necessary? Can the same job be done with a few lines of code?
4. **Free of cost:** No paid SaaS dependencies. No "free tier" services that require accounts.

For dependencies pulled in via the static-site build, the runtime dependency footprint shipped to users should be **near-zero** (vanilla JS preferred; heavy frameworks justified only when they pull their weight).

## Translations and contributions

Contributors retain copyright in their contributions but agree to license them under the project licenses (MIT for code, CC BY 4.0 for content). State this in `CONTRIBUTING.md` when it's written.

No CLA (Contributor License Agreement) — too much friction for a public-good project. Inbound = outbound, the standard model.

## Trademark and attribution

This project is **not affiliated with the City of Portland, Multnomah County, or Metro**. State this clearly in:
- The footer of every page
- The README
- `SECURITY_PRIVACY.md` disclaimer section

Do not use jurisdiction logos, seals, or marks.
