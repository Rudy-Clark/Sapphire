import { Model } from 'objection';

import connection from '../db/connection';

Model.knex(connection);

export default class Images extends Model {
  static get tableName() {
    return 'images';
  }
}
