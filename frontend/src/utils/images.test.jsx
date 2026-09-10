// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { prepareImageForUpload } from './images';

describe('preparación de imágenes', () => {
  afterEach(() => vi.restoreAllMocks());

  it('conserva sin cambios los archivos que ya caben en el proxy', async () => {
    const file = new File(['small'], 'small.png', { type: 'image/png' });
    await expect(prepareImageForUpload(file)).resolves.toBe(file);
  });

  it('convierte una imagen grande a WebP por debajo de 1 MB', async () => {
    const close = vi.fn();
    vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue({ width: 2553, height: 1332, close }));
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName, options) => {
      if (tagName !== 'canvas') return createElement(tagName, options);
      return {
        width: 0,
        height: 0,
        getContext: () => ({ drawImage: vi.fn() }),
        toBlob: (callback) => callback(new Blob([new Uint8Array(700 * 1024)], { type: 'image/webp' })),
      };
    });
    const file = new File([new Uint8Array(2_835_928)], 'captura.png', { type: 'image/png' });

    const result = await prepareImageForUpload(file);

    expect(result.name).toBe('captura.webp');
    expect(result.type).toBe('image/webp');
    expect(result.size).toBeLessThan(1024 * 1024);
    expect(close).toHaveBeenCalled();
  });
});
