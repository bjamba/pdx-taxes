import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const rateSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('flat'),
    amount_usd: z.number(),
  }),
  z.object({
    type: z.literal('percent'),
    rate_pct: z.number(),
    threshold_single_usd: z.number(),
    threshold_joint_usd: z.number(),
  }),
  z.object({
    type: z.literal('progressive'),
    brackets: z.array(z.object({
      rate_pct: z.number(),
      threshold_single_usd: z.number(),
      threshold_joint_usd: z.number(),
    })),
  }),
]);

const taxSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  short_name: z.string(),
  jurisdiction: z.enum(['city-of-portland', 'multnomah-county', 'metro']),
  view: z.enum(['individual', 'business', 'reference']),
  scope: z.enum(['separate-return', 'included-elsewhere', 'informational']),
  last_verified: z.string(),
  status: z.enum(['active', 'retired', 'upcoming']).default('active'),
  summary: z.string(),
  who_owes: z.string(),
  rate: rateSchema,
  rate_summary: z.string(),
  deadline: z.string(),
  filing_url: z.string().url(),
  filing_summary: z.string(),
  account_required: z.boolean().default(false),
  pin_letter_required: z.boolean().default(false),
  friendly_note: z.string().optional(),
  free_filing: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })).default([]),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
  })).min(1),
  order: z.number().default(0),
});

const taxesEn = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/taxes/en' }),
  schema: taxSchema,
});

const taxesEs = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/taxes/es' }),
  schema: taxSchema,
});

export const collections = {
  'taxes-en': taxesEn,
  'taxes-es': taxesEs,
};
