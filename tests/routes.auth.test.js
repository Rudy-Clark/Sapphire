/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import '@babel/polyfill';

import request from 'supertest';
import { expect } from 'chai';

import { server } from '../src/app';
import knex from '../src/db/connection';

describe('routes : auth', () => {
  before(() => server.listen(8080));
  after(() => server.close());

  // eslint-disable-next-line arrow-body-style
  beforeEach(async () => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  // eslint-disable-next-line arrow-body-style
  afterEach(async () => {
    return knex.migrate.rollback();
  });

  describe('POST /auth/login', () => {
    it('should authenticate user success', done => {
      request(server)
        .post('/auth/login')
        .send({
          email: 'rudy@rudy.ru',
          password: '123',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.be.eql(200);
          expect(res.body.status).to.be.eql('success');
          expect(res.body).to.have.all.keys([
            'name',
            'role',
            'token',
            'status',
          ]);
          done();
        });
    });
  });

  describe('POST /auth/login error', () => {
    it('should throw error if not valid email or password', done => {
      request(server)
        .post('/auth/login')
        .send({
          email: 'rudy@rudy.ru',
          password: 'incorrect',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.be.eql(401);
          expect(res.body.status).to.be.eql('error');
          expect(res.body.msg).to.have.include('Неверный E-mail или Пароль');
          done();
        });
    });
  });

  describe('POST /auth/reg', () => {
    it('should create new user and return', done => {
      const newUser = {
        username: 'clark',
        email: 'clark@test.ru',
        password: '123',
      };
      request(server)
        .post('/auth/reg')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.be.eql(201);
          expect(res.headers['content-type']).include('application/json');
          expect(res.body.status).to.be.eql('success');
          expect(res.body.token).to.be.a('string');
          expect(res.body).to.have.all.keys([
            'name',
            'role',
            'token',
            'status',
          ]);
          done();
        });
    });
  });

  describe('POST /auth/reg', () => {
    it('should return invalid password message', done => {
      const newUser = {
        username: 'johny',
        email: 'johny@test.ru',
      };
      request(server)
        .post('/auth/reg')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(422);
          expect(res.headers['content-type']).include('application/json');
          expect(res.body.status).to.be.eql('error');
          expect(res.body.errorMsg).to.have.all.keys(['password']);
          expect(res.body.errorMsg.password).include(
            'password не может быть пустым',
          );
          done();
        });
    });
  });

  describe('POST /auth/reg', () => {
    it('throw error when send empty fields', done => {
      const newUser = {};
      request(server)
        .post('/auth/reg')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(422);
          expect(res.headers['content-type']).include('application/json');
          expect(res.body.status).to.be.eql('error');
          expect(res.body.errorMsg).to.have.all.keys([
            'password',
            'email',
            'username',
          ]);
          done();
        });
    });
  });

  describe('POST /auth/reg', () => {
    it('should throw error unique type', done => {
      const newUser = {
        username: 'admin',
        email: 'admin@admin.ru',
        password: '123',
      };
      request(server)
        .post('/auth/reg')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(422);
          expect(res.headers['content-type']).include('application/json');
          expect(res.body.status).to.be.eql('error');
          expect(res.body.errorMsg).to.have.all.keys(['email', 'username']);
          done();
        });
    });
  });
});
