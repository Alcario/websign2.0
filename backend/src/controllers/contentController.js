import SiteContent from '../models/SiteContent.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getContent = asyncHandler(async (request, response) => {
  const document = await SiteContent.findOne({ key: request.params.key }).lean();
  response.json({ data: { content: document?.content || {} } });
});

export const updateContent = asyncHandler(async (request, response) => {
  const document = await SiteContent.findOneAndUpdate({ key: request.params.key }, { content: request.validatedBody.content }, { new: true, upsert: true, runValidators: true });
  response.json({ data: { content: document.content } });
});
