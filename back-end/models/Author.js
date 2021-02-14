// Author.js
'use strict';
import Bookshelf from '../bookshelf';
import Book from './Book';
class Author extends Bookshelf.Model {
    get tableName() {
        return 'authors';
    };
    books() {
        return this.belongsToMany(Book, 'authors_books');
    };
};
export default Bookshelf.model('Author', Author);