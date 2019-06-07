exports.up = knex =>
  knex.schema.createTable('videos', table => {
    table.increments().primary();
    table
      .integer('post_id')
      .unsigned()
      .notNullable();
    table.string('uid').notNullable();
    table
      .foreign('post_id')
      .references('id')
      .inTable('posts');
  });

exports.down = knex => knex.schema.dropTable('videos');
