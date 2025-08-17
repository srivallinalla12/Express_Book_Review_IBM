// task11.js
const axios = require('axios');

// Function to get book by ISBN using Promises
function getBookByISBN(isbn) {
    return axios.get(`http://localhost:5000/isbn/${isbn}`);
}

// Example usage
getBookByISBN("1")
    .then(res => {
        console.log("Book with ISBN 1:", res.data);
    })
    .catch(err => {
        if (err.response) {
            console.error("Error:", err.response.status, err.response.data);
        } else {
            console.error("Error:", err.message);
        }
    });
