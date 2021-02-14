
exports.up = function(knex) {
    return knex.schema.createTable('authors_books', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('book_id').unsigned().references('books.id');
        table.integer('author_id').unsigned().references('authors.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('authors_books');
};
