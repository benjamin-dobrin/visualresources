import site from '../data/site.json';

export { site };

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix an absolute site path with the deploy base so links work on the fork preview and in production. */
export const url = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;

export const applications: Record<string, string> = {
  environments: 'Environments & interiors',
  exterior: 'Exterior & storefront',
  events: 'Events & exhibits',
  campaign: 'Campaign & retail graphics',
  construction: 'Construction & site',
  film: 'Film & set',
  vehicles: 'Vehicle graphics',
};

/** Placeholder tones for photos that have not been supplied yet. */
export const tones = ['stone', 'night', 'light', 'slate', 'brown', 'sand'] as const;
