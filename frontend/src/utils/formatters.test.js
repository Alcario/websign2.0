import { describe, expect, it } from 'vitest';
import { getImageUrl, SLUG_PATTERN, slugify, yearLabel } from './formatters';

describe('formatters', () => {
  it('normaliza slugs en español', () => {
    expect(slugify('Gestión & Educación')).toBe('gestion-educacion');
  });

  it('usa un patrón de slug compatible con el modo Unicode del navegador', () => {
    const pattern = new RegExp(`^(?:${SLUG_PATTERN})$`, 'v');
    expect(pattern.test('tarjeta-digital')).toBe(true);
    expect(pattern.test('Tarjeta digital')).toBe(false);
  });

  it('tolera imágenes objeto o string', () => {
    expect(getImageUrl({ url: '/cover.webp' })).toBe('/cover.webp');
    expect(getImageUrl('/cover.webp')).toBe('/cover.webp');
  });

  it('dirige uploads nuevos y heredados a través de la API', () => {
    expect(getImageUrl('/uploads/cover.webp')).toBe('/api/uploads/cover.webp');
    expect(getImageUrl('/api/uploads/cover.webp')).toBe('/api/uploads/cover.webp');
  });

  it('muestra estado para años ausentes', () => {
    expect(yearLabel()).toBe('En curso');
  });
});
