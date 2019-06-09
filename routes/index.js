var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { //get / - Home page, redirect to /books route
  console.log("books") 
    res.redirect("/books")
});

module.exports = router;