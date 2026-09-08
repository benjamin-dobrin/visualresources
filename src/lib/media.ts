import type { ImageMetadata } from 'astro';

/**
 * Photos live in src/media and are referenced from content as public-style paths
 * ("/media/work/<slug>/hero.jpg"), which is what the CMS writes. Resolving them here
 * keeps Astro's build-time image optimisation (responsive sizes and webp) while letting
 * an editor pick files from one media library.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/media/**/*.{jpg,jpeg,png,webp,avif}');

export async function resolveMedia(path?: string | null): Promise<ImageMetadata | undefined> {
  if (!path) return undefined;
  const key = `/src/media/${path.replace(/^\/?(media\/)?/, '')}`;
  const load = files[key];
  if (!load) {
    console.warn(`[media] no file at src/media for "${path}" — the photo will not render.`);
    return undefined;
  }
  return (await load()).default;
}
