import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One Markdown file per project: src/content/work/<slug>.md. Photos live in src/media
// and are referenced by path, so the CMS can offer one media library.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: () =>
    z.object({
      title: z.string(),
      client: z.string().default('[Client]'),
      city: z.string().default('[City]'),
      state: z.string().optional(),
      year: z.number().optional(),
      application: z.enum(['environments', 'exterior', 'events', 'campaign', 'construction', 'film', 'vehicles']),
      specs: z.string().default('[Size] · [Material] · [Qty] · [Install]'),
      summary: z.string().optional(),
      hero: z.string().optional(),
      gallery: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
