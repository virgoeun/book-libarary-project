// routes/book.routes.js
const express = require('express');
const router = express.Router(); //reading the router


// GET route to retrieve and display all the books
router.get('/books', (req, res) => res.render('books/books-list.hbs'));

module.exports = router;
