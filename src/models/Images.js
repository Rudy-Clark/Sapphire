import { Model } from 'objection';

import connection from '../db/connection';
// eslint-disable-next-line import/no-cycle
import Posts from './Posts';

Model.knex(connection);

export default class Images extends Model {
  static get tableName() {
    return 'images';
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.HasOneRelation,
        modelClass: Posts,
        join: {
          from: 'images.post_id',
          to: 'posts.id',
        },
      },
    };
  }
}
