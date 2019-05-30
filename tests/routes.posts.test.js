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

  describe('GET /posts', () => {
    it('should return all posts', done => {
      request(server)
        .get('/posts')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.eql(200);
          expect(res.body.posts.length).to.not.eql(0);
          expect(res.body.posts[0]).include.keys(
            'id',
            'title',
            'content',
            'author_id',
            'created_at',
            'updated_at',
          );
          done();
        });
    });
  });

  describe('GET /posts/:id', () => {
    it('should return one post', done => {
      request(server)
        .get('/posts/2')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.eql(200);
          expect(res.body.status).to.eql('success');
          expect(res.body.post).include.keys(
            'id',
            'title',
            'content',
            'author_id',
            'created_at',
            'updated_at',
          );
          done();
        });
    });
  });
});
