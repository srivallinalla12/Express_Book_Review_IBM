const express = require('express');
let router = express.Router();
let books = require("./booksdb.js");

let users = [];  // store registered users

// Task 6: Register new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        users.push({ username, password });
        return res.status(200).json({ message: "User registered successfully" });
    }
    return res.status(400).json({ message: "Username and password required" });
});

// Task 7: Login as registered user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

// Task 8: Add/Modify a book review
router.put('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    if (books[isbn]) {
        books[isbn].reviews = books[isbn].reviews || {};
        books[isbn].reviews["user1"] = review; // hardcoded username for now
        return res.status(200).json({ message: "Review added/modified successfully" });
    }
    return res.status(404).json({ message: "Book not found" });
});

// Task 9: Delete book review
router.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn] && books[isbn].reviews && books[isbn].reviews["user1"]) {
        delete books[isbn].reviews["user1"];
        return res.status(200).json({ message: "Review deleted successfully" });
    }
    return res.status(404).json({ message: "No review found to delete" });
});

module.exports = router;
