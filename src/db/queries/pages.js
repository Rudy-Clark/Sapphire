import knex from '../connection';

export function getPageFromName(name) {
  return knex('pages')
    .select('title, subtitle, wallpaper')
    .where({ name })
    .first();
}
