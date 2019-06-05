var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

router.get('/', function(req, res, next) { //shows the full list of books
    Book.findAll({order: [["Year", "DESC"]]}).then(function(books){
        res.render("books/index", {books: books, title: "Books"});
    }).catch(function(error){
        res.send(500,error)
    });
});

router.get('/new-book', function(req, res, next) { //create new book form 
    res.render("books/new-book", {book: {}, title: "New Book"})
});

router.post('/', function(req, res, next) { // should it be '/' Not '/new'? //posts a new book to the database
    Book.create(req.body).then(function(book){
        res.redirect("/books/" + book.id); //does this need a ; // is "/books enough?
    }).catch(function(error){
        if(error.name === "SequelizeValidationError") {
            res.render("books/new-book", {
                book: Book.build(req.body),
                errors: error.errors,
                title: "New Book"})
        } else {
            throw error
        }
    }).catch(function(error){
        res.send(500, error)
    });
});

router.get("/:id", function(req, res, next) { //books/:id - shows book detail form
    Book.findByPk(req.params.id).then(function(book){
        if(book) {
            res.render("books/update-book", { book: book, title: book.title });
        } else {
            res.render("Book Not Found", { book: {}, title: "Book Not Found"});
        }
    }).catch(function(error){
        res.send(500, error)
    });
});

router.put("/:id", function(req, res, next) { // post /books/:id - update book info in the database
    Book.findByPk(req.params.id).then(function(book) {
        if(book) {
            return book.update(req.body)
        } else {
            res.send(404, error)
        }
    }).then(function(book) {
        res.redirect("/books" + book.id); // ?? ("/books/")
    }).catch(function(error) {
        if(error.name === "SequelizeValidationError") {
          var book = Book.build(req.body);
          book.id = req.params.id;
          res.render("books/update-book", { book: book, title: "Update Book", errors: error.errors }); 
        } else {
            throw error
        }
    }).catch(function(error) {
        res.send(500, error)
    });
});

router.delete("/:id", function(req, res, next) { //post /books/:id/delete - Deletes a book
    Book.findByPk(req.params.id).then(function(book) {
        if(book) {
            return book.destroy()
        } else {
            res.send(404, error)
        }
    }).then(function() {
        res.redirect("/books")})
        .catch(function(error) {
            res.send(500, error)
        });
    });

    module.exports = router;

    /*
XX get / - Home route should redirect to the /books route.
XX get /books - Shows the full list of books.
XX get /books/new - Shows the create new book form.
XX post /books/new - Posts a new book to the database.
XX get /books/:id - Shows book detail form.
XX post /books/:id - Updates book info in the database.
XX post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
*/