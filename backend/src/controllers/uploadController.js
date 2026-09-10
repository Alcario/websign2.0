import { storageService } from '../services/storage/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const uploadImages = asyncHandler(async (request, response) => {
  if (!request.files?.length) { const error = new Error('Seleccioná al menos una imagen.'); error.status = 400; throw error; }
  const files = await Promise.all(request.files.map((file) => storageService.save(file)));
  response.status(201).json({ data: { files } });
});
