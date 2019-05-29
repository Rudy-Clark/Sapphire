/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import '@babel/polyfill';

import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import passport from '../src/passport';

import { server } from '../src/app';
import knex from '../src/db/connection';

describe.only('routes : auth', () => {
  before(() => server.listen(1337));
  after(() => server.close());
  let authenticate;
  // eslint-disable-next-line arrow-body-style
  beforeEach(() => {
    authenticate = sinon.stub(passport, 'authenticate').returns(() => {});
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  // eslint-disable-next-line arrow-body-style
  afterEach(() => {
    authenticate.restore();
    return knex.migrate.rollback();
  });

  describe('GET /auth/status', () => {
    beforeEach(() => {
      // authenticate.returns(true);
      authenticate.yields(null, true);
    });
    it('should authenticate success', done => {
      request(server)
        .get('/auth/status')
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.status).to.be.eql('success');
          expect(res.body.msg).to.be.eql('Authenticated');
          done();
        });
    });
  });
});
