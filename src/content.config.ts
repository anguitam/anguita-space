import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
});

// Strips a trailing "/index" so a folder-per-entry file
// (e.g. "robot-calculator/index.md") still gets the clean
// id "robot-calculator" instead of "robot-calculator/index".
function generateId({ entry }: { entry: string }) {
  return entry.replace(/\.md$/, '').replace(/\/index$/, '');
}

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId }),
  schema,
});

const adventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/adventures', generateId }),
  schema,
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays', generateId }),
  schema,
});

export const collections = { projects, adventures, essays };
