var express = require('express');
var router = express.Roputer();
var Book = require("../models").Book;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/*
get / - Home route should redirect to the /books route.
get /books - Shows the full list of books.
get /books/new - Shows the create new book form.
post /books/new - Posts a new book to the database.
get /books/:id - Shows book detail form.
post /books/:id - Updates book info in the database.
post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
*/