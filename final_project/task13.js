// task13.js
const axios = require("axios");

// Function to get books by Title using Promises
function getBooksByTitle(title) {
    return axios.get(`http://localhost:5000/title/${title}`);
}

// Example usage
getBooksByTitle("Things Fall Apart")   // 👈 must match exactly from booksdb.js
    .then(res => {
        console.log(`Books with title 'Things Fall Apart':`, res.data);
    })
    .catch(err => {
        if (err.response) {
            console.error("Error:", err.response.status, err.response.data);
        } else {
            console.error("Error:", err.message);
        }
    });
