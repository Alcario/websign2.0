const SAFE_UPLOAD_BYTES = 950 * 1024;
const MAX_IMAGE_DIMENSION = 2200;

const canvasToBlob = (canvas, quality) => new Promise((resolve) => {
  canvas.toBlob(resolve, 'image/webp', quality);
});

const webpName = (name) => `${name.replace(/\.[^.]+$/, '') || 'imagen'}.webp`;

export async function prepareImageForUpload(file) {
  if (file.size <= SAFE_UPLOAD_BYTES) return file;

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
    let scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.86, 0.72, 0.58]) {
        const blob = await canvasToBlob(canvas, quality);
        if (blob?.size <= SAFE_UPLOAD_BYTES) {
          return new File([blob], webpName(file.name), { type: 'image/webp', lastModified: file.lastModified });
        }
      }
      scale *= 0.75;
    }
  } catch {
    throw new Error('No se pudo optimizar esta imagen. Probá exportarla en WebP con un tamaño menor a 1 MB.');
  } finally {
    bitmap?.close?.();
  }

  throw new Error('No se pudo reducir la imagen por debajo de 1 MB. Probá exportarla en WebP.');
}
