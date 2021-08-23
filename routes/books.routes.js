const router = require('express').Router();
const Book = require('../models/Book.model');
// we want a route that handles getting all the books
// we want a route that handles getting a specific book

/* GET home page */
router.get('/books', (req, res, next) => {
  Book.find()
    .then((books) => {
      console.log('Here are the books you requested, Sir:', books);
      res.render('books/list', { books });
    })
    .catch((err) => {
      console.log(err);
    });
});

// this two urls match the pattern of /books/:id so we need to
// put /books/create route before
// /books/2461928468
// /books/create
router.get('/books/create', (req, res) => {
  res.render('books/create');
});

router.post('/books/create', (req, res) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then((book) => {
      console.log('Here is the book you created, Mam:', book);
      res.redirect('/books');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      console.log('Here is the book you requested, Queen:', book);
      res.render('books/details', { book });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/books/:id/edit', (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      console.log('Here is the book you requested, Queen:', book);
      res.render('books/edit', { book });
    })
    .catch((err) => {
      console.log(err);
    });
});

// EDIT POST ROUTE
router.post('/books/:id/edit', (req, res) => {
  const { id } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    id,
    { title, description, author, rating },
    { new: true }
  )
    .then((book) => {
      console.log('Here is the book you requested, Queen:', book);
      // res.render('books/edit', { book });
      res.redirect(`/books/${book._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/books/:id/delete', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/books');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
