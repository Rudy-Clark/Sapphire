import { Model } from 'objection';

import connection from '../db/connection';

Model.knex(connection);

export default class Users extends Model {
  static get tableName() {
    return 'users';
  }
}
