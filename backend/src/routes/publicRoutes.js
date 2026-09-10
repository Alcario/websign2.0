import { Router } from 'express';
import { getContent } from '../controllers/contentController.js';
import { submitContact } from '../controllers/contactController.js';
import { getPublicBySlug, listFeatured, listPublic } from '../controllers/projectController.js';
import { listPublic as listTaxonomy } from '../controllers/taxonomyController.js';
import { validate } from '../middlewares/validate.js';
import { contactSchema } from '../validators/schemas.js';

const router = Router();
router.get('/projects', listPublic);
router.get('/projects/featured', listFeatured);
router.get('/projects/:slug', getPublicBySlug);
router.get('/categories', listTaxonomy('categories'));
router.get('/technologies', listTaxonomy('technologies'));
router.get('/content/:key', getContent);
router.post('/contact', validate(contactSchema), submitContact);
export default router;
