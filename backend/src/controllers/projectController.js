import Project from '../models/Project.js';
import { storageService } from '../services/storage/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const populate = [
  { path: 'category', select: 'name slug active order' },
  { path: 'technologies', select: 'name slug icon active order', options: { sort: { order: 1, name: 1 } } },
];

const projectImageUrls = (project) => [project?.coverImage?.url, ...(project?.images || []).map((image) => image.url)]
  .filter((url) => typeof url === 'string' && /^\/(?:api\/)?uploads\//.test(url));

const cleanupImages = async (urls) => {
  const results = await Promise.allSettled([...new Set(urls)].map((url) => storageService.remove(url)));
  results.filter(({ status }) => status === 'rejected').forEach(({ reason }) => console.error('No se pudo eliminar una imagen huérfana:', reason));
};

export const listPublic = asyncHandler(async (request, response) => {
  const filter = { published: true };
  if (request.query.category) filter.category = request.query.category;
  const projects = await Project.find(filter).populate(populate).sort({ order: 1, createdAt: -1 }).lean();
  response.json({ data: { projects } });
});

export const listFeatured = asyncHandler(async (_request, response) => {
  const projects = await Project.find({ published: true, featured: true }).populate(populate).sort({ order: 1, createdAt: -1 }).limit(3).lean();
  response.json({ data: { projects } });
});

export const getPublicBySlug = asyncHandler(async (request, response) => {
  const project = await Project.findOne({ slug: request.params.slug, published: true }).populate(populate).lean();
  if (!project) { const error = new Error('Proyecto no encontrado.'); error.status = 404; throw error; }
  response.json({ data: { project } });
});

export const listAdmin = asyncHandler(async (_request, response) => {
  const projects = await Project.find().populate(populate).sort({ order: 1, createdAt: -1 }).lean();
  response.json({ data: { projects } });
});

export const getAdminById = asyncHandler(async (request, response) => {
  const project = await Project.findById(request.params.id).populate(populate).lean();
  if (!project) { const error = new Error('Proyecto no encontrado.'); error.status = 404; throw error; }
  response.json({ data: { project } });
});

export const create = asyncHandler(async (request, response) => {
  const project = await Project.create(request.validatedBody);
  await project.populate(populate);
  response.status(201).json({ data: { project } });
});

export const update = asyncHandler(async (request, response) => {
  const previous = await Project.findById(request.params.id).lean();
  if (!previous) { const error = new Error('Proyecto no encontrado.'); error.status = 404; throw error; }
  const project = await Project.findByIdAndUpdate(request.params.id, request.validatedBody, { new: true, runValidators: true }).populate(populate);
  if (!project) { const error = new Error('Proyecto no encontrado.'); error.status = 404; throw error; }
  const retainedUrls = new Set(projectImageUrls(project));
  await cleanupImages(projectImageUrls(previous).filter((url) => !retainedUrls.has(url)));
  response.json({ data: { project } });
});

export const remove = asyncHandler(async (request, response) => {
  const project = await Project.findByIdAndDelete(request.params.id);
  if (!project) { const error = new Error('Proyecto no encontrado.'); error.status = 404; throw error; }
  await cleanupImages(projectImageUrls(project));
  response.status(204).end();
});

const toggleField = (field) => asyncHandler(async (request, response) => {
  const project = await Project.findByIdAndUpdate(request.params.id, { [field]: request.validatedBody.value }, { new: true, runValidators: true }).populate(populate);
  if (!project) { const error = new Error('Proyecto no encontrado.'); error.status = 404; throw error; }
  response.json({ data: { project } });
});

export const setPublished = toggleField('published');
export const setFeatured = toggleField('featured');
