var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'library',
        charset: 'utf8',
        timezone: 'UTC'
    }
});
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
export default bookshelf;