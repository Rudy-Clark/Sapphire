/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import '@babel/polyfill';

import request from 'supertest';
import { expect } from 'chai';

import { server } from '../src/app';
import knex from '../src/db/connection';

describe('routes : users', () => {
  before(() => server.listen(1337));
  after(() => server.close());

  beforeEach(async () =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run()),
  );

  afterEach(async () => knex.migrate.rollback());

  describe('POST /auth/login', () => {
    it('should authenticate user', done => {
      request(server)
        .post('/auth/login')
        .send({
          email: 'rudy@rudy.ru',
          password: '123',
        })
        .end((err, res) => {
          console.log(res);
          expect(err).to.be.null;
          expect(res.status).to.be.eql(200);
          expect(res.body.status).to.be.eql('success');
          expect(res.body).to.have.all.keys(['name', 'token', 'status']);
          done();
        });
    });
  });
});
