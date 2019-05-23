import knex from '../connection';

export function getPageFromName(name) {
  return knex('pages')
    .select('*')
    .where({ name })
    .first();
}
