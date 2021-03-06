const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const methodOverride = require('method-override');
const books = require('./routes/books');
const routes = require('./routes/index');
const app = express();


/**************** 
*  Middleware   *
****************/
app.set('views', path.join(__dirname, 'views')); // set-up view engine 
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**************** 
*    Routes     *
****************/

app.use('/', routes);
app.use('/books', books);

/***************** 
* Error Handlers *
*****************/

app.use(function(err, res, next) {
    let err = new Error("Page Not Found"); 
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    if (err.status === 404) {
        res.render('books/page-not-found');
    } else {
        res.render("errors", {error: err});
    }
});

module.exports = app;