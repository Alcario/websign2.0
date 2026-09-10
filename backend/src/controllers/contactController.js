import ContactMessage from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const submitContact = asyncHandler(async (request, response) => {
  await ContactMessage.create(request.validatedBody);
  response.status(201).json({ data: { success: true } });
});
