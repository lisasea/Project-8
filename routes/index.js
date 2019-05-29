var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { //get / - Home route, redirect to /books route
    res.redirect("books")
});

module.exports = router;