import { Model } from 'objection';

import connection from '../db/connection';
// eslint-disable-next-line import/no-cycle
import Posts from './Posts';

Model.knex(connection);

export default class Videos extends Model {
  static get tableName() {
    return 'videos';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasOneRelation,
        modelClass: Posts,
        join: {
          from: 'videos.post_id',
          to: 'posts.id',
        },
      },
    };
  }
}
