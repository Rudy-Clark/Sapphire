exports.up = knex =>
  knex.schema.createTable('images', table => {
    table.increments().primary();
    table
      .integer('post_id')
      .unsigned()
      .notNullable();
    table
      .string('xs')
      .notNullable()
      .unique();
    table
      .string('md')
      .notNullable()
      .unique();
    table
      .string('md')
      .notNullable()
      .unique();

    table
      .foreign('post_id')
      .references('id')
      .inTable('posts');
  });

exports.down = knex => knex.schema.dropTable('images');
