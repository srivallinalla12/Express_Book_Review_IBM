const express = require('express');
let router = express.Router();
let books = require("./booksdb.js");  // Import your books database

// =====================
// Task 1: Get the book list available in the shop
// =====================
router.get('/', (req, res) => {
    res.send(books);
});

// =====================
// Task 2: Get the books based on ISBN
// =====================
// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(books[isbn]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// =====================
// Task 3: Get all books by Author
// =====================
router.get('/author/:author', (req, res) => {
    const author = req.params.author;
    let results = {};
    for (let key in books) {
        if (books[key].author === author) {
            results[key] = books[key];
        }
    }

    if (Object.keys(results).length > 0) {
        res.send(results);
    } else {
        res.status(404).json({ message: "No books found for this author" });
    }
});

// =====================
// Task 4: Get all books based on Title
// =====================
router.get('/title/:title', (req, res) => {
    const title = req.params.title;
    let results = {};
    for (let key in books) {
        if (books[key].title === title) {
            results[key] = books[key];
        }
    }

    if (Object.keys(results).length > 0) {
        res.send(results);
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// =====================
// Task 5: Get book Review
// =====================
router.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn] && books[isbn].reviews) {
        res.send(books[isbn].reviews);
    } else {
        res.status(404).json({ message: "No reviews found for this book" });
    }
});


module.exports = router;
