# Ideation

Free-writing space. No rules — capture everything.

## Who is the first user?

A taxpayer in Portland, OR who needs to pay taxes in Portland, Metro, and Multnomah County. They would use this as a resource to:

- Identify and list all of the taxes they need to pay each tax year
- Get relevant info about each tax and what's needed in order to file
- Use simple calculator tools to estimate taxes
- Link to the appropriate websites to file or to contact the right people
- Find resources on where and how to file taxes (free and online sources, **not TurboTax**)

## What problem does this solve?

There are multiple different websites to navigate and file with, since taxes in Portland, Metro, and Multnomah County are itemized rather than having a generalized tax scheme. This makes it:

- Confusing to navigate
- Hard to get information
- Easy to lose track of what's been filed

Additionally, creating an account to file these taxes online requires getting some sort of id/number associated with a paper letter — incredibly frustrating.

What I want: **a simple, one-stop shop** that
- tells me all the taxes I'll need to pay
- gives me a checklist to track what I've completed
- points me to the right resources
- consistently links me to where I can file

## Success in one year

I can finish filing all my local taxes as a Portland resident without having to worry about missing one of these for **TY 2026**.

## Audience and form factor (round 2)

**Audience:** Anyone who is required to pay these taxes. Free, public resource. Explicitly **not legal, tax, or financial advice**.

**Hosting:** As simple as possible — ideally GitHub Pages.

**Form factor:** Static website, responsive (phone + computer). Has to be **really straightforward and simple** — most users will not be sophisticated engineers or tech-savvy.

**Multilingual:** Must be published in multiple languages — matching the level of language availability used by official Portland/Metro/Multnomah documentation, so vulnerable and low-income people can use it.

**Critical (dealbreaker):** Must feel **frictionless**. If it frustrates people, it has failed.

## Calculators

Estimator tools only. Rough estimates. **No legal, tax, or financial advice.**

## Individuals vs. businesses

Cover **both**. Likely a simple toggle or tab between "Individual" and "Business" views.

Need to do **extensive research** on the current tax landscape for each.

## Open questions / things to figure out

- Definitive list of taxes in scope (Arts Tax, Metro SHS, Multnomah PFA, business license taxes, etc.)
- How personalized should the checklist be? Per-user accounts conflict with "free, GitHub Pages, no friction." Likely: client-side state (localStorage), no accounts.
- Update mechanism: how do we keep tax info current and **consistent** as taxes change?
  - Option A: LLM-assisted manual review on a schedule (annual / when changes announced)
  - Option B: Structured data files (YAML/JSON) per tax, version-controlled, with a clear update playbook
  - Option B feels more consistent and auditable — likely the right answer
- Translation workflow — who translates? Match official languages used by the jurisdictions.
- Disclaimer placement — needs to be visible without becoming friction.
