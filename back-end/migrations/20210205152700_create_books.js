
exports.up = function(knex) {
    return knex.schema.createTable('books', (table) => {
        table.increments('id').unsigned().primary();
        table.string('isbn').notNull();
        table.string('title').notNull();
        table.integer('pages');
        table.integer('published');
        table.string('image');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
