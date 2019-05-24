/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import '@babel/polyfill';

import request from 'supertest';
import { expect } from 'chai';

import { server } from '../src/app';
import knex from '../src/db/connection';

describe('routes : posts', () => {
  before(() => server.listen(1337));
  after(() => server.close());

  beforeEach(async () =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run()),
  );

  afterEach(async () => knex.migrate.rollback());

  describe('GET /api/pages/:name', () => {
    it('should return home page', done => {
      request(server)
        .get('/api/pages/home')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.eql(200);
          expect(res.body.page).have.all.keys('title', 'subtitle', 'wallpaper');
          done();
        });
    });
  });
});
