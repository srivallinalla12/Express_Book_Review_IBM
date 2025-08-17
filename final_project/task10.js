const axios = require('axios');

// Async function with callback
async function getAllBooks(callback) {
    try {
        const response = await axios.get('http://localhost:5000/');
        callback(null, response.data);
    } catch (error) {
        callback(error, null);
    }
}

// Call it
getAllBooks((err, books) => {
    if (err) {
        console.error("Error fetching books:", err.message);
    } else {
        console.log("Books:", books);
    }
});
