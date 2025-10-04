import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      publishDate: z.string(),
      description: z.string(),
      classification: z.string(),
      readingTime: z.string(),
      image: z.string(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      language: z.string().default('en'),
    }),
  }),
};
