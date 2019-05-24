exports.up = knex =>
  knex.schema.createTable('posts', table => {
    table.increments().primary();
    table
      .integer('author_id')
      .unsigned()
      .notNullable();
    table.string('title', 30).notNullable();
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table
      .foreign('author_id')
      .references('id')
      .inTable('users');
  });

exports.down = knex => knex.schema.dropTable('posts');
