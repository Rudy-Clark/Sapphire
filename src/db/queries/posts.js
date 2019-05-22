import knex from '../connection';

export function getAllPosts() {
  return knex('posts').select('*');
}

export function getSinglePost(id) {
  return knex('posts')
    .select('*')
    .where({ id: parseInt(id, 2) });
}

export function setPost(post) {
  return knex('posts')
    .insert(post)
    .returning('*');
}

export function updatePost(id, post) {
  return knex('posts')
    .update(post)
    .where({ id: parseInt(id, 2) })
    .returning('*');
}

export function removePost(id) {
  return knex('posts')
    .del()
    .where({ id: parseInt(id, 2) })
    .returning('*');
}
