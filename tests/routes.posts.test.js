import request from 'supertest';

import { server } from '../src/app';
import knex from '../src/db/connection';

// beforeAll(done => server.listen(done));
afterAll(done => server.close(done));

describe('routes : posts', () => {
  beforeEach(async () => {
    await knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  test('should return posts', async () => {
    const res = await request(server).get('/api/posts');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });
});
