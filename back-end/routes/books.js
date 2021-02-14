import express from 'express';
import Book from '../models/Book';
import Author from '../models/Author'
import { upload } from '../server';

const router = express.Router();

router.get('/', (req, res, next) => {
    Book
        .fetchAll({ withRelated: ['authors'] }) 
        .then((books) => {
            res.json(books);
        })
});

router.get('/:id', (req, res, next) => {
    Book
        .forge({ id: req.params.id })
        .fetch({ withRelated: ['authors'] })
        .then((book) => {
            res.json(book);
        })
});

router.get('/:id/authors', (req, res, next) => {
    Book
        .forge({ id: req.params.id })
        .fetch({ withRelated: ['authors'] })
        .then((book) => {
            res.json(book.toJSON().authors);
        })
});

router.post('/', (req, res, next) => {
    upload(req, res, function (err) {
        if (req.body.isbn) {
            Book.forge({
                isbn: req.body.isbn,
                title: req.body.title,
                pages: req.body.pages,
                published: req.body.published,
                image: req.file ? req.file.originalname : null
            })
                .save()
                .then((saved) => {
                    
                })
        }
        else {
            res.status(400).send('Missing Parameters')
        }
        if (!err) {
            return res.send(200).end();
        }
    })
});

router.post('/:id/authors', (req, res, next) => {
    Book.forge({ id: req.params.id })
        .fetch({ require: true })
        .then((book) => {
            Author.forge({ id: req.body.id })
                .fetch({ require: true })
                .then((author) => {
                    book.authors().attach(author)
                        .then(() => {

                        })
                })
        })
})

router.patch('/:id', (req, res, next) => {
    upload(req, res, function (err) {
        Book
            .where({ id: req.params.id })
            .fetch({ withRelated: ["authors"] })
            .then((book) => {
                book.save({
                    isbn: req.body.isbn || book.isbn,
                    title: req.body.title || book.title,
                    pages: req.body.pages || book.pages,
                    published: req.body.published || book.published,
                    image: req.file ? req.file.originalname : book.image
                }, {
                    method: 'update',
                    patch: true
                })
                    .then((update) => {
                        res.json(update);
                    })
            })
    })
})

router.delete('/:id', (req, res, next) => {
    Book
        .forge({ id: req.params.id })
        .fetch({ withRelated: ['authors'] })
        .then((book) => {
            book.authors().detach().then(() => {
                book.destroy().then(() => {

                })
            });
        })
})

router.delete('/:id/authors/:idauthor', (req, res, next) => {
    Book.forge({ id: req.params.id })
        .fetch({ require: true })
        .then((book) => {
            Author.forge({ id: req.params.idauthor })
                .fetch({ require: true })
                .then((author) => {
                    book.authors().detach(author)
                        .then(() => {

                        })
                })
        })
})

module.exports = router;