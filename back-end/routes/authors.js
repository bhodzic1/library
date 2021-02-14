import express from 'express';
import Author from '../models/Author';
import Book from '../models/Book';
import { upload } from '../server';
 
const router = express.Router();

router.get('/', (req, res, next) => {
    Author
        .fetchAll({ withRelated: ['books'] })
        .then((author) => {
            res.json(author);
        })
});

router.get('/:id', (req, res, next) => {
    Author
        .forge({ id: req.params.id })
        .fetch({ withRelated: ['books'] })
        .then((author) => {
            res.json(author);
        })
});

router.get('/:id/books', (req, res, next) => {
    Author
        .forge({ id: req.params.id })
        .fetch({ withRelated: ['books'] })
        .then((author) => {
            res.json(author.toJSON().books);
        })
});

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (req.body.firstName) {
            Author.forge({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
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
})

router.post('/:id/books', (req, res, next) => {
    Author.forge({ id: req.params.id })
        .fetch({ require: true })
        .then((author) => {
            Book.forge({ id: req.body.id })
                .fetch({ require: true })
                .then((book) => {
                    author.books().attach(book)
                    .then(() => {
                        
                    })
                })
        })
})

router.patch('/:id', (req, res, next) => {
    upload(req, res, function (err) {
        Author
            .where({ id: req.params.id })
            .fetch({ withRelated: ["books"] })
            .then((author) => {
                author.save({
                    firstName: req.body.firstName || author.firstName,
                    lastName: req.body.lastName || author.lastName,
                    dob: req.body.dob || author.dob,
                    image: req.file ? req.file.originalname : author.image
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
    Author
        .forge({ id: req.params.id })
        .fetch({ withRelated: ['books'] })
        .then((author) => {
            author.books().detach().then(() => {
                author.destroy().then(() => {

                })
            });
            
        })
})

router.delete('/:id/books/:idbook', (req, res, next) => {
    Author.forge({ id: req.params.id })
        .fetch({ require: true })
        .then((author) => {
            Book.forge({ id: req.params.idbook })
                .fetch({ require: true })
                .then((book) => {
                    author.books().detach(book)
                        .then(() => {

                        })
                })
        })
})



module.exports = router;
