import { describe, expect, it } from 'vitest';
import { projectSchema, taxonomySchema } from '../validators/schemas.js';

describe('validadores', () => {
  it('rechaza slugs y proyectos incompletos', () => {
    const result = projectSchema.safeParse({ title: 'Demo', slug: 'Slug Inválido' });
    expect(result.success).toBe(false);
  });

  it('normaliza orden en taxonomías', () => {
    const result = taxonomySchema.parse({ name: 'Aplicaciones web', slug: 'aplicaciones-web', active: true, order: '3' });
    expect(result.order).toBe(3);
  });

  it('rechaza protocolos inseguros en enlaces e imágenes', () => {
    const base = {
      title: 'Proyecto seguro', slug: 'proyecto-seguro', shortDescription: 'Una descripción suficientemente larga.',
      description: 'Una descripción completa y suficientemente extensa.', category: '507f1f77bcf86cd799439011',
      coverImage: { url: 'javascript:alert(1)' }, websiteUrl: 'javascript:alert(1)',
    };
    const result = projectSchema.safeParse(base);
    expect(result.success).toBe(false);
  });

  it('reporta URLs mal formadas como error de validación sin lanzar excepciones', () => {
    const payload = {
      title: 'Proyecto seguro', slug: 'proyecto-seguro', shortDescription: 'Una descripción suficientemente larga.',
      description: 'Una descripción completa y suficientemente extensa.', category: '507f1f77bcf86cd799439011',
      coverImage: { url: '/uploads/portada.webp' }, websiteUrl: 'https://',
    };

    expect(() => projectSchema.safeParse(payload)).not.toThrow();
    const result = projectSchema.safeParse(payload);
    expect(result.success).toBe(false);
    expect(result.error.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: ['websiteUrl'], message: 'La URL debe ser válida y usar HTTP o HTTPS.' }),
    ]));
  });
});
