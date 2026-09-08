// @ts-check
import { defineConfig } from 'astro/config';

// Production (owner's repo) builds with ASTRO_SITE=https://visualresources.net and ASTRO_BASE=/.
// A fork's preview build sets ASTRO_BASE=/<repo> so links work under https://<owner>.github.io/<repo>/.
const site = process.env.ASTRO_SITE ?? 'https://visualresources.net';
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  redirects: {
    '/story': '/about/',
    // Old placeholder case studies from the July 2026 site; the real work replaced them.
    '/work/cafe-sign': '/work/',
    '/work/van-wraps': '/work/food-truck-wrap/',
    '/work/lobby-letters': '/work/',
    '/work/window-graphics': '/work/cafeteria-wall-wrap/',
    '/work/trade-show-booth': '/work/donorperfect-exhibit/',
    '/work/grand-opening-banner': '/work/ballpark-exterior-banner/',
  },
});
