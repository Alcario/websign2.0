import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../models/Project.js', () => ({
  default: {
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

vi.mock('../services/storage/index.js', () => ({
  storageService: { remove: vi.fn() },
}));

import Project from '../models/Project.js';
import { remove, update } from '../controllers/projectController.js';
import { storageService } from '../services/storage/index.js';

const response = () => ({
  json: vi.fn(),
  status: vi.fn().mockReturnThis(),
  end: vi.fn(),
});

describe('ciclo de vida de imágenes de proyectos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storageService.remove.mockResolvedValue(true);
  });

  it('elimina solamente uploads reemplazados al editar', async () => {
    const previous = {
      coverImage: { url: '/uploads/cover-anterior.webp' },
      images: [{ url: '/uploads/conservada.webp' }, { url: '/uploads/eliminada.webp' }, { url: 'https://cdn.example.com/externa.webp' }],
    };
    const updated = {
      coverImage: { url: '/uploads/cover-nueva.webp' },
      images: [{ url: '/uploads/conservada.webp' }],
    };
    Project.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(previous) });
    Project.findByIdAndUpdate.mockReturnValue({ populate: vi.fn().mockResolvedValue(updated) });
    const currentResponse = response();
    const next = vi.fn();

    await update({ params: { id: 'project-id' }, validatedBody: updated }, currentResponse, next);

    expect(storageService.remove).toHaveBeenCalledTimes(2);
    expect(storageService.remove).toHaveBeenCalledWith('/uploads/cover-anterior.webp');
    expect(storageService.remove).toHaveBeenCalledWith('/uploads/eliminada.webp');
    expect(storageService.remove).not.toHaveBeenCalledWith('/uploads/conservada.webp');
    expect(next).not.toHaveBeenCalled();
    expect(currentResponse.json).toHaveBeenCalledWith({ data: { project: updated } });
  });

  it('elimina portada y galería locales al borrar el proyecto', async () => {
    Project.findByIdAndDelete.mockResolvedValue({
      coverImage: { url: '/uploads/cover.webp' },
      images: [{ url: '/uploads/gallery.webp' }, { url: 'https://cdn.example.com/externa.webp' }],
    });
    const currentResponse = response();
    const next = vi.fn();

    await remove({ params: { id: 'project-id' } }, currentResponse, next);

    expect(storageService.remove).toHaveBeenCalledTimes(2);
    expect(storageService.remove).toHaveBeenCalledWith('/uploads/cover.webp');
    expect(storageService.remove).toHaveBeenCalledWith('/uploads/gallery.webp');
    expect(next).not.toHaveBeenCalled();
    expect(currentResponse.status).toHaveBeenCalledWith(204);
    expect(currentResponse.end).toHaveBeenCalled();
  });
});
