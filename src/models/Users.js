import { Model, ValidationError } from 'objection';
import bcrypt from 'bcryptjs';
import { isEmpty } from 'lodash';

import connection from '../db/connection';
import Posts from './Posts';

Model.knex(connection);

export default class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Posts,
        join: {
          from: 'users.id',
          to: 'posts.author_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 4, maxLength: 100 },
        password: { type: 'string', minLength: 3, maxLength: 100 },
        email: { type: 'string', format: 'email' },
      },
    };
  }

  static createUser(data) {
    const salt = bcrypt.genSaltSync();
    const updateDataPass = {
      ...data,
      password: data.password
        ? bcrypt.hashSync(data.password, salt)
        : data.password,
    };
    return Users.query().insert(updateDataPass);
  }

  static checkUniqueness(data, uniqueFields) {
    return Promise.all(
      uniqueFields.map(field => {
        if (isEmpty(data[field])) return false;
        const knex = Model.knex();
        return knex(Users.tableName)
          .select(field)
          .where(field, data[field]);
      }),
    ).then(rows => {
      const errors = Users.parseErrors(rows, data, uniqueFields);
      if (!isEmpty(errors)) {
        throw new ValidationError({
          data: errors,
          message: 'Unique Validation Failed',
          type: 'ModelValidation',
        });
      }
    });
  }

  static parseErrors(rows, data, uniqueFields) {
    return rows.reduce((errors, error, index) => {
      if (!isEmpty(error)) {
        // eslint-disable-next-line no-param-reassign
        errors[[uniqueFields[index]]] = [
          {
            keyword: 'unique',
            value: data[uniqueFields[index]],
          },
        ];
      }

      return errors;
    }, {});
  }
}
