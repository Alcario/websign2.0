import { access, unlink } from 'node:fs/promises';
import path from 'node:path';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../../app.js';
import { env } from '../../config/env.js';
import User from '../../models/User.js';

const runDatabaseTests = process.env.RUN_DB_TESTS === 'true';
const integrationSuite = runDatabaseTests ? describe : describe.skip;
const databaseName = `websign_test_${process.pid}_${Date.now()}`;
let uploadedFilePath = '';

integrationSuite('flujo administrativo con MongoDB aislado', () => {
  beforeAll(async () => {
    await mongoose.connect(env.mongoUri, { dbName: databaseName, serverSelectionTimeoutMS: 5000 });
    await User.create({
      name: 'Admin de integración',
      email: 'integration@websign.test',
      passwordHash: await User.hashPassword('integration-password'),
    });
  });

  afterAll(async () => {
    if (uploadedFilePath) await unlink(uploadedFilePath).catch(() => {});
    if (mongoose.connection.readyState) {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
    }
  });

  it('autentica y completa el ciclo CRUD, publicación y limpieza de imágenes', async () => {
    const agent = request.agent(createApp());

    const login = await agent.post('/api/auth/login').send({
      email: 'integration@websign.test',
      password: 'integration-password',
    });
    expect(login.status).toBe(200);
    expect(login.headers['set-cookie']?.[0]).toContain('websign_session=');

    const categoryResponse = await agent.post('/api/admin/categories').send({
      name: 'Sistemas', slug: 'sistemas', active: true, order: 1,
    });
    expect(categoryResponse.status).toBe(201);
    const categoryId = categoryResponse.body.data.category._id;

    const technologyResponse = await agent.post('/api/admin/technologies').send({
      name: 'React', slug: 'react', icon: '', active: true, order: 1,
    });
    expect(technologyResponse.status).toBe(201);
    const technologyId = technologyResponse.body.data.technology._id;

    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const uploadResponse = await agent
      .post('/api/admin/uploads')
      .attach('images', pngHeader, { filename: 'cover.png', contentType: 'image/png' });
    expect(uploadResponse.status).toBe(201);
    const coverUrl = uploadResponse.body.data.files[0].url;
    expect(coverUrl).toMatch(/^\/api\/uploads\//);
    uploadedFilePath = path.resolve(process.cwd(), env.uploadDir, path.basename(coverUrl));
    await expect(access(uploadedFilePath)).resolves.toBeUndefined();
    expect((await agent.get(coverUrl)).status).toBe(200);

    const payload = {
      title: 'Proyecto de integración',
      slug: 'proyecto-integracion',
      client: 'WebSign',
      shortDescription: 'Proyecto creado por una prueba de integración.',
      description: 'Este proyecto comprueba el flujo administrativo completo con persistencia real.',
      category: categoryId,
      technologies: [technologyId],
      coverImage: { url: coverUrl, alt: 'Portada de prueba', order: 0 },
      images: [],
      year: 2026,
      websiteUrl: 'https://example.com',
      repositoryUrl: '',
      featured: true,
      published: true,
      order: 1,
      metaTitle: 'Proyecto de integración',
      metaDescription: 'Validación del flujo administrativo completo.',
    };

    const createResponse = await agent.post('/api/admin/projects').send(payload);
    expect(createResponse.status).toBe(201);
    const projectId = createResponse.body.data.project._id;

    const publicResponse = await agent.get('/api/projects/proyecto-integracion');
    expect(publicResponse.status).toBe(200);
    expect(publicResponse.body.data.project.category.name).toBe('Sistemas');
    expect(publicResponse.body.data.project.technologies[0].name).toBe('React');

    const unpublishResponse = await agent.patch(`/api/admin/projects/${projectId}/publish`).send({ value: false });
    expect(unpublishResponse.status).toBe(200);
    expect((await agent.get('/api/projects/proyecto-integracion')).status).toBe(404);

    const updateResponse = await agent.put(`/api/admin/projects/${projectId}`).send({
      ...payload,
      title: 'Proyecto de integración actualizado',
      published: false,
      featured: false,
    });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.project.title).toBe('Proyecto de integración actualizado');

    const deleteResponse = await agent.delete(`/api/admin/projects/${projectId}`);
    expect(deleteResponse.status).toBe(204);
    await expect(access(uploadedFilePath)).rejects.toMatchObject({ code: 'ENOENT' });
    uploadedFilePath = '';
  });
});
