// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const jsonResponse = (payload, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(payload),
});

function renderRoute(path) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AuthProvider><App /></AuthProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('rutas principales', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    globalThis.fetch = vi.fn(async (input) => {
      const path = String(input);
      if (path.endsWith('/auth/me')) return jsonResponse({ message: 'Sin sesión' }, 401);
      if (path.endsWith('/content/home')) return jsonResponse({ data: { content: {} } });
      if (path.endsWith('/projects/featured')) return jsonResponse({ data: { projects: [] } });
      if (path.endsWith('/projects')) return jsonResponse({ data: { projects: [] } });
      return jsonResponse({ data: {} });
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renderiza la Home desde la ruta pública', async () => {
    renderRoute('/');
    expect(await screen.findByRole('heading', { level: 1, name: /Software que simplifica tu negocio/i })).toBeTruthy();
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/featured', expect.any(Object)));
  });

  it('renderiza portfolio con su estado vacío desde la API', async () => {
    renderRoute('/portfolio');
    expect(await screen.findByRole('heading', { level: 1, name: /Software diseñado para resolver problemas reales/i })).toBeTruthy();
    expect(await screen.findByText('No hay proyectos publicados en esta categoría')).toBeTruthy();
  });

  it('redirige administración al login cuando no existe sesión', async () => {
    renderRoute('/admin');
    expect(await screen.findByRole('heading', { level: 1, name: 'Bienvenido de nuevo' })).toBeTruthy();
  });
});
