import path from 'node:path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import { robots, sitemap } from './controllers/seoController.js';

export function createApp() {
  const app = express();
  if (env.isProduction) app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: env.clientUrl, credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  if (env.nodeEnv !== 'test') app.use(morgan(env.isProduction ? 'combined' : 'dev'));
  const uploadedFiles = express.static(path.resolve(process.cwd(), env.uploadDir), { fallthrough: false, maxAge: env.isProduction ? '7d' : 0 });
  app.use('/api/uploads', uploadedFiles);
  app.use('/uploads', uploadedFiles);
  app.get('/robots.txt', robots);
  app.get(['/sitemap.xml', '/api/sitemap.xml'], sitemap);
  app.get('/api/health', (_request, response) => response.json({ data: { status: 'ok', service: 'websign-api' } }));
  app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 25, standardHeaders: 'draft-8', legacyHeaders: false }), authRoutes);
  app.use('/api/admin', rateLimit({ windowMs: 15 * 60 * 1000, limit: 500, standardHeaders: 'draft-8', legacyHeaders: false }), adminRoutes);
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-8', legacyHeaders: false }), publicRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
