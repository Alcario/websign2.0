import 'dotenv/config';

const isTest = process.env.NODE_ENV === 'test';
const requiredSecret = process.env.JWT_SECRET || (isTest ? 'test-secret-with-at-least-thirty-two-characters' : '');

if (!requiredSecret && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET es obligatorio en producción.');
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/websign',
  jwtSecret: requiredSecret || 'development-only-secret-change-before-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  siteUrl: (process.env.SITE_URL || 'https://websign.com.ar').replace(/\/$/, ''),
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB || 5),
  isProduction: process.env.NODE_ENV === 'production',
};
