import { Model } from 'objection';

import connection from '../db/connection';
// eslint-disable-next-line import/no-cycle
import Users from './Users';
import Images from './Images';
import Videos from './Videos';

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
      image: {
        relation: Model.HasOneRelation,
        modelClass: Images,
        join: {
          from: 'posts.id',
          to: 'images.post_id',
        },
      },
      video: {
        relation: Model.HasOneRelation,
        modelClass: Videos,
        join: {
          from: 'posts.id',
          to: 'video.post_id',
        },
      },
    };
  }
}
