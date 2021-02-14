require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs = require('fs');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

var authors = require('./routes/authors');
var books = require('./routes/books');
var routes = require('./routes/index');
app.use('/', routes);
app.use('/authors', authors);
app.use('/books', books);

const storage = multer.diskStorage({
    destination: "../front-end/library-client/public/images/uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("image");


app.post('/login', (req, res) => {
    // authentication
    if (req.body.userName == "" || req.body.password == "") { 
        res.status(401).send({ auth: false, token: null })
    }

    const username = req.body.userName;
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).send({ auth: true, token: accessToken })
})

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if (!err) {
            return res.send(200).end();
        }
    })
})

/*function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}*/


app.listen(5000, () => console.log('App listening on port 5000!'));