export const SLUG_PATTERN = '(?:[a-z0-9]|-)+';

export function getImageUrl(image) {
  if (!image) return '';
  const url = typeof image === 'string' ? image : image.url || '';
  if (!/^\/(?:api\/)?uploads\//.test(url)) return url;

  const apiUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
  const uploadPath = url.replace(/^\/api(?=\/uploads\/)/, '');
  return `${apiUrl}${uploadPath}`;
}

export function yearLabel(year) {
  return year ? String(year) : 'En curso';
}

export function slugify(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
