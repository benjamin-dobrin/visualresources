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

## Scope: launch small

Only the homepage has been designed (C2 + red closing plate). Version 1 is that
homepage plus the four pages it links to and nothing else. Everything the strategy
brief proposed beyond that is listed under "Later" and is added only when there is
real content for it.

### Version 1 (five page types)

| URL | Page | Notes |
|---|---|---|
| `/` | Home | the C2 design |
| `/work/` | Work index | the proof sheet, extended; all projects |
| `/work/<slug>/` | Case study | one Markdown folder each; same look as the home's proof frames |
| `/rollouts/` | Rollouts & national installation | one page; the differentiator, so it earns a page of its own |
| `/about/` | About | story, how the network is vetted, facts (insurance, permits, ADA) |
| `/start/` | Start a project | the red plate and form as a full page |

Nav for v1: Work · Rollouts · About · Start a project. ("Capabilities" and "For
agencies" drop out of the nav until their pages exist; the homepage's three pillars
already cover capabilities at a glance.)

Old addresses: `/story` redirects to `/about/`. The six old `/work/<slug>` pages keep
their slugs if the projects survive as case studies, otherwise redirect to `/work/`.

### Later, when content exists

Capability pages (six groups), For agencies, Philadelphia and New York city pages,
guides. Each is a template plus content and can be added without changing anything built in v1.

## Content model (what the editor fills in)

`src/content/work/<slug>/index.md` + photos in the same folder

```
title, client (or "[Client]"), city, state, year,
application (one of: environments | exterior | events | campaign | construction | film),
specs (one line: size · material · qty · footprint · install),
hero (image), gallery (list of images), featured (true/false), order (number),
body: The brief / What we did / The result
```

`src/data/site.json` — phones, email, booking link, stats (locations installed, states),
client logos, up to three testimonials (quote, name, title, company).

That is the whole model: one folder per project, one settings file. No other collections in v1.

## Pages and components to build

Layout: `Base` (head, fonts, nav, footer, noindex flag for preview).
Components: `Nav`, `Footer`, `Hero` (photo + paper card), `TrustStrip`, `Pillars`,
`ProofSheet` (work grid with frame numbers and city stamps), `RolloutBand` (+ US map SVG),
`ProcessLedger`, `PullQuote`, `StartProject` (red plate + form), `SpecLine`, `CropMarks`, `CmykDots`.

## Order of work

1. **Scaffold** Astro project on `redesign`; tokens, fonts, Base layout, Nav, Footer. Preview live on the fork.
2. **Home** exactly to the C2 + red plate design, responsive to 390px. Photo placeholders until real photos arrive.
3. **Work**: content collection, case study template, work index. Port the six existing case studies as drafts.
4. **Rollouts, About, Start a project.** Three simple pages reusing home components.
5. **Form**: wire to the existing Apps Script, add file link, success/error states.
6. **CMS** trial and config; short editor guide in `docs/EDITING.md`.
7. **SEO/technical**: OG image, LocalBusiness schema (both cities), sitemap, robots, redirects.
8. **Launch**: see checklist.

## Launch checklist

- [ ] Real photos in place (hero + six proof frames minimum), no placeholder blocks visible
- [ ] Real phone numbers, real stats, client logos or list, at least one testimonial
- [ ] Mail records added on Cloudflare so hello@visualresources.net receives (currently none)
- [ ] visual-resources.net (the hyphenated domain printed on the business card) currently serves a 404 from another host; redirect it to visualresources.net
- [ ] Any fixes the owner made to the live site since July carried over
- [ ] Owner has granted write access; PR from fork `redesign` → upstream `main` opened
- [ ] Merge; in the upstream repo Settings → Pages, switch source to **GitHub Actions**
- [ ] Verify visualresources.net, old URLs, form submission, mobile
- [ ] Revert path: revert the merge commit and switch Pages source back to branch

## Content needed from the owner

12–20 install photos (wide, in context), six case studies in the brief/what we did/result
shape, three testimonials, a client list, real numbers, the origin story and a portrait,
insurance/union/permit/ADA facts, a phone number per city.
