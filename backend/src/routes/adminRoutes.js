import { Router } from 'express';
import multer from 'multer';
import { dashboard } from '../controllers/dashboardController.js';
import { getContent, updateContent } from '../controllers/contentController.js';
import { create, getAdminById, listAdmin, remove, setFeatured, setPublished, update } from '../controllers/projectController.js';
import * as taxonomy from '../controllers/taxonomyController.js';
import { uploadImages } from '../controllers/uploadController.js';
import { env } from '../config/env.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { booleanPatchSchema, contentSchema, projectSchema, taxonomySchema } from '../validators/schemas.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: env.maxUploadMb * 1024 * 1024, files: 10 }, fileFilter: (_request, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)) });
router.use(requireAuth);
router.get('/dashboard', dashboard);
router.get('/projects', listAdmin);
router.get('/projects/:id', getAdminById);
router.post('/projects', validate(projectSchema), create);
router.put('/projects/:id', validate(projectSchema), update);
router.delete('/projects/:id', remove);
router.patch('/projects/:id/publish', validate(booleanPatchSchema), setPublished);
router.patch('/projects/:id/feature', validate(booleanPatchSchema), setFeatured);
for (const type of ['categories', 'technologies']) {
  router.get(`/${type}`, taxonomy.listAdmin(type));
  router.post(`/${type}`, validate(taxonomySchema), taxonomy.create(type));
  router.put(`/${type}/:id`, validate(taxonomySchema), taxonomy.update(type));
  router.delete(`/${type}/:id`, taxonomy.remove(type));
}
router.get('/content/:key', getContent);
router.put('/content/:key', validate(contentSchema), updateContent);
router.post('/uploads', upload.array('images', 10), uploadImages);
export default router;
