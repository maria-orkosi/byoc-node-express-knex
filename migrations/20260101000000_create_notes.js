'use strict';
exports.up = (knex) =>
  knex.schema.createTable('notes', (t) => {
    t.increments('id');
    t.text('body').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
exports.down = (knex) => knex.schema.dropTable('notes');
