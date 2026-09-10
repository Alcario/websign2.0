export function getImageUrl(image) {
  if (!image) return '';
  return typeof image === 'string' ? image : image.url || '';
}

export function yearLabel(year) {
  return year ? String(year) : 'En curso';
}

export function slugify(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
