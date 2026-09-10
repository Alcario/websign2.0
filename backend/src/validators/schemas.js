import { z } from 'zod';

const slug = z.string().min(2).max(160).regex(/^[a-z0-9-]+$/, 'El slug solo admite minúsculas, números y guiones.');
const isHttpUrl = (value) => {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};
const httpUrl = z.string().max(2000).refine(isHttpUrl, 'La URL debe ser válida y usar HTTP o HTTPS.');
const optionalUrl = z.union([z.literal(''), httpUrl]).default('');
const resourceUrl = z.string().min(1).max(2000).refine((value) => (value.startsWith('/') && !value.startsWith('//')) || isHttpUrl(value), 'Usá una ruta local o una URL HTTP(S).');
const image = z.object({ url: resourceUrl, alt: z.string().max(240).default(''), order: z.coerce.number().int().default(0) });

export const loginSchema = z.object({ email: z.email().max(180), password: z.string().min(10).max(200) });
export const projectSchema = z.object({
  title: z.string().min(2).max(160), slug, client: z.string().max(160).default(''),
  shortDescription: z.string().min(10).max(300), description: z.string().min(20).max(12000),
  category: z.string().regex(/^[a-f\d]{24}$/i), technologies: z.array(z.string().regex(/^[a-f\d]{24}$/i)).default([]),
  coverImage: image, images: z.array(image).max(30).default([]), year: z.coerce.number().int().min(1990).max(2100).optional(),
  websiteUrl: optionalUrl, repositoryUrl: optionalUrl, featured: z.boolean().default(false), published: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0), metaTitle: z.string().max(70).default(''), metaDescription: z.string().max(170).default(''),
});
export const taxonomySchema = z.object({ name: z.string().min(2).max(100), slug, icon: z.string().max(500).optional().default(''), active: z.boolean().default(true), order: z.coerce.number().int().min(0).default(0) });
export const booleanPatchSchema = z.object({ value: z.boolean() });
export const contentSchema = z.object({ content: z.record(z.string(), z.string().max(2000)) });
export const contactSchema = z.object({ type: z.enum(['saas', 'custom']), solution: z.string().max(100).default(''), name: z.string().min(2).max(120), email: z.email().max(180), phone: z.string().min(6).max(60), message: z.string().max(2000).default('') });
