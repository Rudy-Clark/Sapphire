import '@babel/polyfill';

import request from 'supertest';
import { expect } from 'chai';

import { server } from '../src/app';
import knex from '../src/db/connection';

describe('routes : posts', () => {
  beforeEach(async () =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run()),
  );

  afterEach(async () => knex.migrate.rollback());

  it('should return posts', async () => {
    const res = await request(server).get('/api/posts');
    expect(res.status).to.eql(200);
    expect(res.body.status).to.eql('success');
    expect(res.body.posts[0]).includes.keys([
      'id',
      'title',
      'author_id',
      'content',
      'created_at',
      'updated_at',
    ]);
  });
  server.close();
});
