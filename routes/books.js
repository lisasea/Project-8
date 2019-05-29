    var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

router.get('/', function(req, res, next) { //shows the full list of books
    Book.findAll({order: [["Year", "DESC"]]}).then(function(books){
        res.render("books/index", {books: books, title: "Books"});
    }).catch(function(error){
        res.send(500,error);
    });
});

router.get('/new-book', function(req, res, next) { //shows the create new book form
    res.render("books/new-book", {book: {}, title: "New Book"});
});


/*
XX get / - Home route should redirect to the /books route.
XX get /books - Shows the full list of books.
get /books/new - Shows the create new book form.
post /books/new - Posts a new book to the database.
get /books/:id - Shows book detail form.
post /books/:id - Updates book info in the database.
post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
*/