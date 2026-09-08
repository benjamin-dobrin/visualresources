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
  },
});
