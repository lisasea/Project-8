const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const methodOverride = require('method-override');
const books = require('./routes/book');
const routes = require('./routes/index');
const app = express();


/**************** 
*  Middleware   *
****************/
app.set('views', path.join(_dirname, 'views')); // set-up view engine 
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, 'public')));


/**************** 
*    Routes     *
****************/

app.use('/', routes);
app.use('/books', books);

/**************** 
* Error Handler *
****************/

app.use((req, res, next) => {
    res.render('page-not-found');
    res.status(404);
});

app.use((err, res, next) => {
    res.render('error');
    console.error(err);
})

/**************** 
* Start Server  *
****************/

sequelize.sync().then (() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

module.exports = app;