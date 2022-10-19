const Book = require("../models/book");

const jsonToBookSchema = (req) => {
    const { title, author, pages, genres, rating, reviews, stock } = req.body;

    return new Book( {
        title: title,
        author: author,
        pages: pages,
        genres: genres,
        rating: rating,
        reviews,
        stock
    });
};

module.exports = jsonToBookSchema;