import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: env.isProduction, maxAge: 8 * 60 * 60 * 1000, path: '/' };
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

export const login = asyncHandler(async (request, response) => {
  const { email, password } = request.validatedBody;
  const user = await User.findOne({ email: email.toLowerCase(), active: true }).select('+passwordHash');
  if (!user || !(await user.comparePassword(password))) { const error = new Error('Email o contraseña incorrectos.'); error.status = 401; throw error; }
  user.lastLoginAt = new Date();
  await user.save();
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn, issuer: 'websign-api', audience: 'websign-admin' });
  response.cookie('websign_session', token, cookieOptions).json({ data: { user: publicUser(user) } });
});

export const logout = (_request, response) => response.clearCookie('websign_session', cookieOptions).json({ data: { success: true } });
export const me = (request, response) => response.json({ data: { user: publicUser(request.user) } });
