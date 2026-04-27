# Security & Privacy

## Stance

**Collect nothing. Transmit nothing. Store nothing on the server.**

The audience includes vulnerable populations — low-income, immigrant, non-English-first taxpayers. Trust is non-negotiable. Data we never collect cannot be subpoenaed, leaked, or misused.

## What lives where

| Data | Where it lives | Why |
|------|---------------|-----|
| Tax content (rates, deadlines, links) | Static files in repo | Public, version-controlled |
| Checklist progress | User's browser (`localStorage`) | Personal but never leaves device |
| Calculator inputs | Browser memory only by default; `localStorage` if user opts in | User estimates are not our business |
| Language preference | `localStorage` + URL | UX convenience |
| User identity | **Never collected** | We don't have users — we have visitors |
| Analytics | **None** by default | Privacy-first; revisit only with explicit ADR |

## Tooling telemetry — audit on every dependency add

**Every build tool, framework, library, and CLI we adopt is audited for telemetry before merge.** If a tool ships with telemetry enabled by default, we either disable it at the project level or reject the tool.

This applies to:
- Build tools and frameworks (Astro, Vite, etc.)
- CLIs (`npm`, `astro`, deploy tooling)
- Editor integrations referenced in repo config
- Any analytics/observability SDKs (we don't use any — but the rule stands if that ever changes)

Process:

1. **Before adding a dependency**, check its docs for "telemetry," "analytics," "usage data," or "opt-out."
2. **If telemetry exists**, document how to disable it and apply the disable in the project (config file, env var, or repo-checked-in flag — not a per-machine user setting).
3. **Add it to the running list below** so it's auditable in `/hacky-hours review 1`.
4. **If telemetry cannot be disabled**, reject the tool and find an alternative.

### Current telemetry status (audit list)

| Tool | Telemetry default | Status | How disabled |
|------|-------------------|--------|--------------|
| Astro CLI | Anonymous usage data ON by default | **Disabled** | `npx astro telemetry disable` (writes to `~/.astro/telemetry.json`) — also documented in CONTRIBUTING for new contributors |
| Vite (via Astro) | None | OK | n/a |
| `npm` | None for our use | OK | n/a |
| TypeScript | None | OK | n/a |

Audit cadence: re-checked on every dependency addition AND as part of every `/hacky-hours review 1` before release.

> **Why this is non-negotiable:** A site that promises users "we collect nothing" cannot have its build pipeline phoning home about how often it's being built, what plugins are loaded, or what version of the tool is in use. Even if that data is anonymized — the audience deserves a build process that matches the trust contract on the site itself.

## Threat model

A static site has a smaller threat surface than an app, but it's not zero.

### Threats we worry about

1. **Content tampering** — an attacker modifies a tax page to point to a phishing site that mimics a filing portal.
   - **Mitigation:** Branch protection on `main`; required PR review; no force-pushing; CI runs link checks against an allowlist of known official jurisdiction domains and flags any new external link.
   - **Mitigation:** Subresource Integrity (SRI) on any third-party assets; minimize third-party assets to zero where possible.

2. **GitHub repo compromise** — credentials of a maintainer are stolen.
   - **Mitigation:** Require 2FA for all maintainers (org-level setting). Require signed commits for `main`. No long-lived deploy tokens — use GH Actions OIDC.

3. **Dependency supply-chain attack** — a compromised npm package injects malicious code at build time.
   - **Mitigation:** Pin dependencies in lockfile. Dependabot for security updates. Audit on add. Prefer fewer dependencies. Reject any dependency without a clear maintainer or recent activity.

4. **Phishing impersonation** — someone clones the site at a near-domain.
   - **Mitigation:** When we adopt a domain, register lookalikes if practical. Document the canonical URL prominently in the README and the site footer.

5. **Stale tax content harming users** — info goes out of date and someone misses a filing.
   - **Mitigation:** `last_verified` surfaced in UI. Annual review process. CI cron link-checking. "Report an issue" link on every page.

### Threats we explicitly do NOT mitigate (out of scope)

- DDoS — GitHub Pages handles this; if a sustained attack happens, we'll deal with it then.
- Account takeover — no accounts.
- Data breach of user data — no user data.

## Privacy commitments (user-facing)

These will appear on a `/privacy` page, in plain language:

1. We do not collect your name, email, address, income, or any personal information.
2. We do not use cookies. We do not run analytics. We do not embed third-party trackers.
3. Your checklist progress and any calculator inputs you save are stored only in your browser. You can clear them at any time. We never see them.
4. The site is served from GitHub Pages. GitHub may keep request logs (IP, user agent) per its standard terms. We do not access or use those logs.
5. We have no way to identify you, contact you, or restore data you've cleared.

## Content-Security-Policy

Set a strict CSP via `<meta>` tag (GitHub Pages doesn't allow custom HTTP headers by default):

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';   # avoid 'unsafe-inline' if at all possible
img-src 'self' data:;
font-src 'self';
connect-src 'self';
frame-ancestors 'none';
form-action 'none';
base-uri 'self';
```

No third-party scripts. No external fonts unless we self-host them. No iframes.

## Disclaimer (content liability)

Every page footer carries:

> This site is an unofficial community resource. It is not affiliated with the City of Portland, Multnomah County, or Metro. The information here is provided for general guidance only and is not legal, tax, or financial advice. Tax laws change. Always verify with official sources before filing.

The disclaimer is also linked from the homepage hero, the calculator UI, and `LICENSING.md`.

## Reporting a security issue

A `SECURITY.md` at repo root will document:
- Where to send a private report (a maintainer's email or GitHub Security Advisories)
- Expected response time
- Coordinated-disclosure policy

## Things we will reconsider only with an ADR

- Adding any analytics (even privacy-respecting)
- Adding any third-party widgets (chat, donations, embeds)
- Adding any user account or login
- Receiving any user input that is stored or transmitted server-side

These would each be a meaningful change to the trust contract with users; they don't slip in by default.
