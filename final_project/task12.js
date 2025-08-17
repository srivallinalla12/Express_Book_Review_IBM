// task12.js
const axios = require("axios");

function getBooksByAuthor(author) {
    return axios.get(`http://localhost:5000/author/${author}`);
}

// Example usage
getBooksByAuthor("Chinua Achebe")   // 👈 match exactly from booksdb.js
    .then(res => {
        console.log(`Books by Chinua Achebe:`, res.data);
    })
    .catch(err => {
        if (err.response) {
            console.error("Error:", err.response.status, err.response.data);
        } else {
            console.error("Error:", err.message);
        }
    });
