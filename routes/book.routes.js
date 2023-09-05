// routes/book.routes.js
const express = require("express");
const router = express.Router(); //reading the router
const Book = require("../models/Book.model.js"); //require model FIRST

//this should come first before getting book/:bookId!!!
//GET FORM (for CREATE) FIRST!
router.get("/books/create", (req, res) => res.render("books/book-create.hbs"));

//NOW POST!
// POST route to save a new book to the database in the books collection
router.post("/books/create", (req, res) => {
  // console.log(req.body);
  // [Object: null prototype] {
  //     title: 'Alice',
  //     author: 'Alice',
  //     description: 'Alice ',
  //     rating: '1'
  //   }

  const { title, author, description, rating } = req.body; //ES6 way! Data Deconstruction
  // by using "destructuring" here,
  // we are creating separate variables with the information coming from the form
  // the same as:
  // const title = req.body.title;
  // const author = req.body.author;

  Book.create({ title, author, description, rating })
    //utilizing the .create() Mongoose method -> receive the book object
    .then((bookFromDB) => console.log(`New book created: ${bookFromDB.title}.`))
    .catch((error) => next(error));
  console.log(bookFromDB);
});

//GET for EDIT
router.get("/books/:bookId/edit", (req, res, next) => {
  const { bookId } = req.params; // we can also use req.query "?bookId={{_id}}"

  Book.findById(bookId)
    .then((bookToEdit) => {
      // console.log(bookToEdit);
      res.render("books/book-edit.hbs", { book: bookToEdit });
      //render this view and pass to it the book object
      // we queried from the database based on its id.
    })
    .catch((error) => next(error));
});

//POST for EDIT
router.post("/books/:bookId/edit", (req, res, next) => {
  // "/books/:bookId/edit" match form action attribute (/books/{{_id}}/edit):

  const { bookId } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    bookId,
    { title, description, author, rating },
    { new: true }
  )
    // findByIdAndUpdate method : {find old one, replace value, update to the new one}
    .then((updatedBook) => res.redirect(`/books/${updatedBook.id}`))
    // go to the details page to see the updates
    .catch((error) => next(error));
});

// POST for DELETE (no GET for DELETE,
// since we don’t need a new view for handling the delete functionality)
router.post("/books/:bookId/delete", (req, res, next) => {
  const { bookId } = req.params;

  Book.findByIdAndDelete(bookId)
    .then(() => res.redirect("/books"))
    .catch((error) => next(error));
});

// GET route to retrieve and display all the books
router.get("/books", (req, res, next) => {
  Book.find()
    .then((allTheBooksFromDB) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved books from DB:", allTheBooksFromDB);

      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render("books/books-list.hbs", { books: allTheBooksFromDB }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
    }) // or ('books/books-list.hbs', { books: [] })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

// GET route to retrieve and display details of a specific book
router.get("/books/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((theBook) => res.render("books/book-details.hbs", { book: theBook }))
    .catch((error) => {
      console.log("Error while retrieving book details: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
