import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

describe('WebSign API', () => {
  it('expone un healthcheck estable', async () => {
    const response = await request(createApp()).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ status: 'ok', service: 'websign-api' });
  });

  it('protege endpoints administrativos', async () => {
    const response = await request(createApp()).get('/api/admin/projects');
    expect(response.status).toBe(401);
  });
});
