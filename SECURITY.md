# Security policy

## Reporting a security issue

If you find a security issue in this project, please report it privately rather than opening a public issue. Two ways to do that:

1. **GitHub Security Advisories** (preferred): <https://github.com/bjamba/pdx-taxes/security/advisories/new>
2. **Email**: open a public issue first asking for a private channel; we'll respond with one.

Please **do not** post details in a public issue, public discussion, social media, or PR until we've had a chance to confirm and address the issue.

## What we consider in-scope

- **Content tampering** — anything that lets an attacker modify the tax content shown to users (e.g. via a supply-chain compromise of a dependency we ship, or a CI misconfiguration)
- **Phishing redirection** — a bug that causes filing links to point at attacker-controlled domains
- **Subresource integrity** — anything that lets an external resource load uncontrolled
- **`.ics` exfiltration** — calendar-file generation that somehow leaves the device

## What we consider out-of-scope

- Reports about the lack of a feature (e.g. "you don't use multi-factor auth" — we have no auth)
- Reports about hosting (GitHub Pages outages, etc.)
- Best-practice recommendations without a concrete vulnerability
- Issues only reachable by an attacker who already controls a maintainer's machine

## What you can expect from us

- Acknowledgement within **72 hours**
- A first assessment within **7 days**
- A coordinated public disclosure (with credit, if you want it) once a fix is shipped

## Our security posture

The site is intentionally narrow:

- Static-only. No backend, no API, no database.
- Zero user data is collected, transmitted, or stored.
- All build dependencies are pinned via `package-lock.json` and watched by Dependabot.
- All third-party tooling is audited for telemetry on every dependency add (see `hacky-hours/02-design/SECURITY_PRIVACY.md`).
- All external links in tax content are limited to a small allowlist of known jurisdiction domains. New external links require a PR + maintainer review.

## Threat model

Documented in [`hacky-hours/02-design/SECURITY_PRIVACY.md`](./hacky-hours/02-design/SECURITY_PRIVACY.md). The short version: the highest-impact risk is users being misled by stale or tampered tax content. Mitigations include `last_verified` dates surfaced in the UI, a public "report an issue" link on every page, and required PR review on `main`.

---

Thank you for helping keep the site safe for the people who depend on it.
