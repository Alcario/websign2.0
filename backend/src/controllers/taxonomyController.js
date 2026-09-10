import Project from '../models/Project.js';
import Category from '../models/Category.js';
import Technology from '../models/Technology.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const config = {
  categories: { Model: Category, key: 'categories', itemKey: 'category', projectField: 'category' },
  technologies: { Model: Technology, key: 'technologies', itemKey: 'technology', projectField: 'technologies' },
};

export const listPublic = (type) => asyncHandler(async (_request, response) => {
  const { Model, key } = config[type];
  const items = await Model.find({ active: true }).sort({ order: 1, name: 1 }).lean();
  response.json({ data: { [key]: items } });
});

export const listAdmin = (type) => asyncHandler(async (_request, response) => {
  const { Model, key } = config[type];
  const items = await Model.find().sort({ order: 1, name: 1 }).lean();
  response.json({ data: { [key]: items } });
});

export const create = (type) => asyncHandler(async (request, response) => {
  const { Model, itemKey } = config[type];
  const item = await Model.create(request.validatedBody);
  response.status(201).json({ data: { [itemKey]: item } });
});

export const update = (type) => asyncHandler(async (request, response) => {
  const { Model, itemKey } = config[type];
  const item = await Model.findByIdAndUpdate(request.params.id, request.validatedBody, { new: true, runValidators: true });
  if (!item) { const error = new Error('Registro no encontrado.'); error.status = 404; throw error; }
  response.json({ data: { [itemKey]: item } });
});

export const remove = (type) => asyncHandler(async (request, response) => {
  const { Model, projectField } = config[type];
  const inUse = await Project.exists({ [projectField]: request.params.id });
  if (inUse) { const error = new Error('No se puede eliminar porque está asociado a uno o más proyectos. Podés desactivarlo.'); error.status = 409; throw error; }
  const item = await Model.findByIdAndDelete(request.params.id);
  if (!item) { const error = new Error('Registro no encontrado.'); error.status = 404; throw error; }
  response.status(204).end();
});
