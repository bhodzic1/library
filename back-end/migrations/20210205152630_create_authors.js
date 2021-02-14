
exports.up = function(knex) {
    return knex.schema.createTable('authors', (table) => {
        table.increments('id').unsigned().primary();
        table.string('firstName').notNull();
        table.string('lastName').notNull();
        table.date('dob').notNull();
        table.string('image');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('authors');
};
