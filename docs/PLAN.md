# visualresources.net redesign — plan

One page. Decisions first, then the order of work. The live site on `main` is
not touched until launch day.

## Where things are

- Live site: `main` on github.com/visualresources/visualresources, served by
  GitHub Pages at visualresources.net (domain and DNS on Cloudflare).
- Redesign: branch `redesign` on the fork github.com/benjamin-dobrin/visualresources.
  Preview published from the fork's GitHub Pages, marked `noindex`.
- Strategy brief: https://claude.ai/code/artifact/f1381c0b-e536-49c1-ae94-5d89c7a532e4
- Design canvas (chosen: "C2 · The Proof Sheet" with the red closing plate):
  https://claude.ai/code/artifact/33665f4f-521b-4379-a9cb-9a78f73414f2

## Decisions already made

| Area | Decision |
|---|---|
| Positioning | Print production partner, not sign shop. "We", not "me". Philadelphia and New York get equal billing; nationwide by design. |
| Look | C2: warm paper, full-bleed hero photo with a paper card, six-frame proof sheet, ledger process, red closing plate around the form. Light theme only. |
| Type | Libre Caslon Display + Text (headlines, titles, quotes; italic only in quotes), IBM Plex Sans (body, UI), IBM Plex Mono (spec captions). All from Google Fonts, self-hosted at build. |
| Colour | paper `#f6f2ea`, ink `#201c1b`, red `#b3122b`, stock `#ebe4d8`, rule `#ddd3c4`, muted `#7a6f66`, CMYK dots `#00a3da #e5007d #f5c400 #201c1b`. |
| Build | Astro, static output. Content in Markdown collections. No client framework. |
| Hosting | GitHub Pages, deployed by a GitHub Actions workflow on push to `main`. |
| Form | Keep the existing Google Apps Script endpoint (`/exec` URL in the current `index.html`). Add file-link field and a booking link. |
| Editing | A git-based CMS (Pages CMS or Decap; five-minute trial decides) so a non-technical editor adds work via a form. |
| Analytics | Optional, later. Cloudflare Web Analytics or Plausible if wanted. |

## URL map

New pages, and the old addresses that must keep working.

| URL | Page | Notes |
|---|---|---|
| `/` | Home | C2 layout |
| `/work/` | Work index | filter by application and city |
| `/work/<slug>/` | Case study | one Markdown folder each |
| `/capabilities/` | Capabilities overview | six groups |
| `/capabilities/<slug>/` | Capability page | environments, exterior, events, campaign, construction, film |
| `/rollouts/` | Rollouts & national installation | the differentiator; job-ticket panels from C3 |
| `/agencies/` | For agencies | white-label production |
| `/about/` | About | story, team, network, insurance/permits/ADA facts |
| `/philadelphia/`, `/new-york/` | City pages | local work, install notes |
| `/start/` | Start a project | form, booking link, phones |
| `/story` | old Our Story | redirect → `/about/` |
| `/work/cafe-sign`, `/work/van-wraps`, `/work/lobby-letters`, `/work/window-graphics`, `/work/trade-show-booth`, `/work/grand-opening-banner` | old case studies | keep slugs if the projects survive, else redirect → `/work/` |

## Content model (what the editor fills in)

`src/content/work/<slug>/index.md` + photos in the same folder

```
title, client (or "[Client]"), industry, city, state, year,
application (one of: environments | exterior | events | campaign | construction | film),
services (list), specs (one line: size · material · qty · footprint · install),
hero (image), gallery (list of images), featured (true/false), order (number),
body: The brief / What we did / The result
```

`src/content/capabilities/<slug>.md` — title, summary, what's included, related work.
`src/content/testimonials/*.md` — quote, name, title, company.
`src/data/site.json` — phones, email, booking link, stats (locations installed, states), client logos.

## Pages and components to build

Layout: `Base` (head, fonts, nav, footer, noindex flag for preview).
Components: `Nav`, `Footer`, `Hero` (photo + paper card), `TrustStrip`, `Pillars`,
`ProofSheet` (work grid with frame numbers and city stamps), `RolloutBand` (+ US map SVG),
`ProcessLedger`, `PullQuote`, `StartProject` (red plate + form), `SpecLine`, `CropMarks`, `CmykDots`.

## Order of work

1. **Scaffold** Astro project on `redesign`; tokens, fonts, Base layout, Nav, Footer. Preview live on the fork.
2. **Home** exactly to the C2 + red plate design, responsive to 390px. Photo placeholders until real photos arrive.
3. **Work**: content collection, case study template, work index. Port the six existing case studies as drafts.
4. **Rollouts, Capabilities, For agencies, About, city pages, Start a project.**
5. **Form**: wire to the existing Apps Script, add file link, success/error states.
6. **CMS** trial and config; short editor guide in `docs/EDITING.md`.
7. **SEO/technical**: OG image, LocalBusiness schema (both cities), sitemap, robots, redirects.
8. **Launch**: see checklist.

## Launch checklist

- [ ] Real photos in place (hero + six proof frames minimum), no placeholder blocks visible
- [ ] Real phone numbers, real stats, client logos or list, at least one testimonial
- [ ] Mail records added on Cloudflare so hello@visualresources.net receives (currently none)
- [ ] Any fixes the owner made to the live site since July carried over
- [ ] Owner has granted write access; PR from fork `redesign` → upstream `main` opened
- [ ] Merge; in the upstream repo Settings → Pages, switch source to **GitHub Actions**
- [ ] Verify visualresources.net, old URLs, form submission, mobile
- [ ] Revert path: revert the merge commit and switch Pages source back to branch

## Content needed from the owner

12–20 install photos (wide, in context), six case studies in the brief/what we did/result
shape, three testimonials, a client list, real numbers, the origin story and a portrait,
insurance/union/permit/ADA facts, a phone number per city.
