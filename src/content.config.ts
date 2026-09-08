import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One folder per project under src/content/work/<slug>/, holding index.md and its photos.
const work = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().default('[Client]'),
      city: z.string().default('[City]'),
      state: z.string().optional(),
      year: z.number().optional(),
      application: z.enum(['environments', 'exterior', 'events', 'campaign', 'construction', 'film', 'vehicles']),
      specs: z.string().default('[Size] · [Material] · [Qty] · [Install]'),
      summary: z.string().optional(),
      hero: image().optional(),
      gallery: z.array(image()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
