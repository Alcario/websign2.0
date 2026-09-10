import { connectDatabase, disconnectDatabase } from '../config/database.js';
import User from '../models/User.js';

async function run() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) throw new Error('Definí ADMIN_EMAIL y ADMIN_PASSWORD (mínimo 12 caracteres) en backend/.env.');
  await connectDatabase();
  const passwordHash = await User.hashPassword(ADMIN_PASSWORD);
  const user = await User.findOneAndUpdate({ email: ADMIN_EMAIL.toLowerCase() }, { name: ADMIN_NAME || 'WebSign Admin', email: ADMIN_EMAIL.toLowerCase(), passwordHash, role: 'admin', active: true }, { upsert: true, new: true, runValidators: true });
  console.log(`Administrador listo: ${user.email}`);
  await disconnectDatabase();
}

run().catch(async (error) => { console.error(error.message); await disconnectDatabase().catch(() => {}); process.exit(1); });
