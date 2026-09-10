import Project from '../models/Project.js';
import Category from '../models/Category.js';
import Technology from '../models/Technology.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (_request, response) => {
  const [projects, featured, categories, technologies] = await Promise.all([Project.countDocuments(), Project.countDocuments({ featured: true }), Category.countDocuments(), Technology.countDocuments()]);
  response.json({ data: { stats: { projects, featured, categories, technologies } } });
});
