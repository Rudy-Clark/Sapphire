import { Model } from 'objection';

import connection from '../db/connection';
// eslint-disable-next-line import/no-cycle
import Users from './Users';

Model.knex(connection);

export default class Posts extends Model {
  static get tableName() {
    return 'posts';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'posts.author_id',
          to: 'users.id',
        },
      },
    };
  }
}
