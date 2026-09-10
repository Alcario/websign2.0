// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { api } from '../../services/api';
import ProjectFormPage from './ProjectFormPage';

vi.mock('../../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe('formulario de proyectos', () => {
  beforeEach(() => {
    api.get.mockImplementation((path) => Promise.resolve(path.endsWith('/categories')
      ? { categories: [] }
      : { technologies: [] }));
    api.post.mockResolvedValue({ files: [{ url: '/api/uploads/portada.webp' }] });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('guarda la URL devuelta al subir una portada y muestra su confirmación', async () => {
    render(<MemoryRouter><ProjectFormPage /></MemoryRouter>);
    const file = new File(['image'], 'portada.webp', { type: 'image/webp' });

    fireEvent.change(screen.getByLabelText('Subir portada'), { target: { files: [file] } });

    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/admin/uploads', expect.any(FormData)));
    expect(await screen.findByDisplayValue('/api/uploads/portada.webp')).toBeTruthy();
    expect(screen.getByText('Portada cargada correctamente')).toBeTruthy();
  });
});
