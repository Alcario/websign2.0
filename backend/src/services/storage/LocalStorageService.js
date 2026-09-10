import crypto from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../../config/env.js';

const extensionByMime = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/avif': '.avif' };

const startsWith = (buffer, signature) => signature.every((byte, index) => buffer[index] === byte);
const hasValidSignature = (file) => {
  const { buffer, mimetype } = file;
  if (!Buffer.isBuffer(buffer)) return false;
  if (mimetype === 'image/jpeg') return startsWith(buffer, [0xff, 0xd8, 0xff]);
  if (mimetype === 'image/png') return startsWith(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (mimetype === 'image/webp') return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  if (mimetype === 'image/avif') return buffer.subarray(4, 8).toString('ascii') === 'ftyp' && ['avif', 'avis'].some((brand) => buffer.subarray(8, 32).includes(Buffer.from(brand)));
  return false;
};

export default class LocalStorageService {
  constructor(directory = path.resolve(process.cwd(), env.uploadDir)) {
    this.directory = directory;
  }

  async save(file) {
    const extension = extensionByMime[file.mimetype];
    if (!extension) { const error = new Error('Formato de imagen no permitido.'); error.status = 415; throw error; }
    if (!hasValidSignature(file)) { const error = new Error('El contenido del archivo no coincide con un formato de imagen permitido.'); error.status = 415; throw error; }
    await mkdir(this.directory, { recursive: true });
    const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;
    await writeFile(path.join(this.directory, filename), file.buffer, { flag: 'wx' });
    return { filename, url: `/uploads/${filename}`, mimeType: file.mimetype, size: file.size };
  }

  async remove(url) {
    if (!url?.startsWith('/uploads/')) return false;
    const filename = path.basename(url);
    await unlink(path.join(this.directory, filename)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
    return true;
  }
}
