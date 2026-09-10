import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../models/Project.js', () => ({
  default: { find: vi.fn() },
}));

import Project from '../models/Project.js';
import { robots, sitemap } from '../controllers/seoController.js';

const response = () => ({
  type: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  send: vi.fn().mockReturnThis(),
});

describe('recursos SEO', () => {
  beforeEach(() => vi.clearAllMocks());

  it('incluye rutas públicas y proyectos publicados en el sitemap', async () => {
    const projects = [{ slug: 'gestion-ventas', updatedAt: new Date('2026-09-01T12:00:00.000Z') }];
    Project.find.mockReturnValue({ select: vi.fn().mockReturnValue({ sort: vi.fn().mockReturnValue({ lean: vi.fn().mockResolvedValue(projects) }) }) });
    const currentResponse = response();
    const next = vi.fn();

    await sitemap({}, currentResponse, next);

    expect(next).not.toHaveBeenCalled();
    expect(currentResponse.type).toHaveBeenCalledWith('application/xml');
    expect(currentResponse.send).toHaveBeenCalledWith(expect.stringContaining('https://websign.com.ar/portfolio/gestion-ventas'));
    expect(currentResponse.send).toHaveBeenCalledWith(expect.stringContaining('2026-09-01T12:00:00.000Z'));
  });

  it('impide indexar la administración desde robots.txt', () => {
    const currentResponse = response();
    robots({}, currentResponse);
    expect(currentResponse.send).toHaveBeenCalledWith(expect.stringContaining('Disallow: /admin'));
    expect(currentResponse.send).toHaveBeenCalledWith(expect.stringContaining('Sitemap: https://websign.com.ar/sitemap.xml'));
  });
});
