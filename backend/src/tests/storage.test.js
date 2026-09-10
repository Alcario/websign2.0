import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import LocalStorageService from '../services/storage/LocalStorageService.js';

describe('almacenamiento local', () => {
  it('rechaza un archivo cuyo contenido no coincide con el MIME declarado', async () => {
    const storage = new LocalStorageService(path.join(os.tmpdir(), 'websign-invalid-upload-test'));
    const file = { mimetype: 'image/png', buffer: Buffer.from('<script>alert(1)</script>'), size: 25 };
    await expect(storage.save(file)).rejects.toMatchObject({ status: 415 });
  });
});
