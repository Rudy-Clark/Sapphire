import { Model } from 'objection';

import connection from '../db/connection';

Model.knex(connection);

export default class Videos extends Model {
  static get tableName() {
    return 'videos';
  }
}
