import { Model } from 'objection';

import connection from '../db/connection';

Model.knex(connection);

class Posts extends Posts {
  static get tableName() {
    return 'posts';
  }
}
