exports.up = knex =>
  knex.schema.createTable('pages', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.string('subtitle');
    table.string('wallpaper').notNullable();
  });

exports.down = knex => knex.schema.dropTable('pages');
