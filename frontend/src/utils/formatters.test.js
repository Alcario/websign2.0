import { describe, expect, it } from 'vitest';
import { getImageUrl, slugify, yearLabel } from './formatters';

describe('formatters', () => {
  it('normaliza slugs en español', () => {
    expect(slugify('Gestión & Educación')).toBe('gestion-educacion');
  });

  it('tolera imágenes objeto o string', () => {
    expect(getImageUrl({ url: '/cover.webp' })).toBe('/cover.webp');
    expect(getImageUrl('/cover.webp')).toBe('/cover.webp');
  });

  it('muestra estado para años ausentes', () => {
    expect(yearLabel()).toBe('En curso');
  });
});
