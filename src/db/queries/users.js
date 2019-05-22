const bcrypt = require('bcryptjs');

const knex = require('../connection');

function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex('users')
    .insert({
      username: user.username,
      email: user.email,
      password: hash
    })
    .returning('*')
    .catch(err => console.error(err));
}

function getSingleUser(id) {
  return knex('users')
    .select('*')
    .where({ id: parseInt(id) })
}

function getAllPostsUser(id) {
  return knex('users').join('posts', 'posts.author_id', 'users.id')
    .select(
      knex.raw(
        `posts.id, posts.title, posts.created_at, CONCAT(SUBSTRING(posts.content, 1, 150), '...') as cut_content`
      )
    )
    .where({ 'users.id': parseInt(id) })
    // .toSQL();
}

module.exports = {
  addUser,
  getSingleUser,
  getAllPostsUser
};
