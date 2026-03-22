import { defineCollection, z } from 'astro:content';

const eventSchema = z.object({
  title: z.string(),
  date_time: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string().optional(),
  source_url: z.string().optional(),
});

const issues = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    publish_date: z.string(),
    issue_number: z.number().optional(),
    summary: z.string(),
    editor_note: z.string().optional(),
    featured_event: eventSchema,
    highlights: z.array(eventSchema),
    family_corner: z.array(eventSchema),
  }),
});

export const collections = { issues };
