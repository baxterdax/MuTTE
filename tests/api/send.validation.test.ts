import request from 'supertest';
import app from '../../src/index';

// Mock DB so auth middleware doesn't actually query a DB in this test
jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  pool: { connect: jest.fn().mockResolvedValue({ query: jest.fn(), release: jest.fn() }) },
}));

describe('POST /send validation', () => {
  it('requires API key', async () => {
    const res = await request(app).post('/send').send({});
    expect(res.status).toBe(401);
  });

  it('requires minimal fields', async () => {
    const { query } = require('../../src/db/pool');
    // Auth middleware returns a fake tenant for this test
    (query as jest.Mock).mockResolvedValueOnce({ rows: [
      { id: 1, name: 't', smtp_host: 'x', smtp_port: '587', smtp_user: 'u', smtp_pass: 'p', smtp_secure: 'false', from_email: 'noreply@example.com' }
    ]});

    const res = await request(app)
      .post('/send')
      .set('X-API-Key', 'test')
      .send({ to: 'a@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
