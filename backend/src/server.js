import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';

async function start() {
  await connectDatabase();
  const app = createApp();
  const server = app.listen(env.port, () => console.log(`WebSign API disponible en http://localhost:${env.port}`));
  const shutdown = (signal) => { console.log(`\n${signal}: cerrando servidor…`); server.close(async () => { await disconnectDatabase(); process.exit(0); }); };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((error) => { console.error('No se pudo iniciar la API:', error); process.exit(1); });
