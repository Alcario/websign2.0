import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const requireAuth = asyncHandler(async (request, _response, next) => {
  const token = request.cookies?.websign_session;
  if (!token) { const error = new Error('Necesitás iniciar sesión.'); error.status = 401; throw error; }
  let payload;
  try { payload = jwt.verify(token, env.jwtSecret, { issuer: 'websign-api', audience: 'websign-admin' }); } catch { const error = new Error('La sesión expiró o no es válida.'); error.status = 401; throw error; }
  const user = await User.findOne({ _id: payload.sub, active: true }).select('name email role');
  if (!user) { const error = new Error('La cuenta no está disponible.'); error.status = 401; throw error; }
  request.user = user;
  next();
});
