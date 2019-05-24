exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments().primary();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table
      .string('username')
      .unique()
      .notNullable();
    table
      .boolean('admin')
      .notNullable()
      .defaultTo(false);
  });

exports.down = knex => knex.schema.dropTable('users');
