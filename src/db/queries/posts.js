const knex = require('../connection');

function getAllPosts() {
  return knex('posts').select('*');
}

function getSinglePost(id) {
  return knex('posts')
    .select('*')
    .where({ id: parseInt(id)});
}

function setPost(post) {
  return knex('posts')
    .insert(post)
    .returning('*');
}

function updatePost(id, post) {
  return knex('posts')
    .update(post)
    .where({ id: parseInt(id) })
    .returning('*');
}

function removePost(id) {
  return knex('posts')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  getAllPosts,
  getSinglePost,
  setPost,
  updatePost,
  removePost
};
