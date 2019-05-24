require('dotenv').config();
const path = require('path');

const { env } = process;

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: `postgres://${env.DB_USER_TEST}:${
      env.DB_PASSWORD_TEST
    }@localhost:5432/${env.DB_NAME_TEST}`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: 'pg',
    connection: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@localhost:5432/${
      env.DB_NAME
    }`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
