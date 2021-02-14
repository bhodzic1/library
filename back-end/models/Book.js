// Books.js
'use strict';
import Bookshelf from '../bookshelf';
import Author from './Author';
class Book extends Bookshelf.Model {
    get tableName() {
        return 'books';
    };
    authors() {
        return this.belongsToMany(Author, 'authors_books');
    };
};
export default Bookshelf.model('Book', Book);