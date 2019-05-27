import { Model } from 'objection';

import connection from '../db/connection';

Model.knex(connection);

export default class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 3, maxLength: 150 },
        email: { type: 'string' },
      },
    };
  }
}
