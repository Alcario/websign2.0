import LocalStorageService from './LocalStorageService.js';

// Punto único de intercambio: una futura implementación S3/Cloudinary debe
// conservar save(file) y remove(url), sin cambiar controllers ni React.
export const storageService = new LocalStorageService();
