const Book = require("../models/book");
const jsonToBookSchema = require("../utils/jsonToBookSchema");

const getAllBooks = async (req, res) => {
    let books;
    try {
        books = await Book.find({}, { _id: 0, reviews: { $slice: 1 }, __v: 0 });
    } catch(error) {
        res.status(500).send(error.message);
    }
    if(books.length < 1) res.status(200).json("No Books Found");
    res.status(200).json(books);
};

const getBooksByAuthor = async (req, res) => {
    let books;
    try {
        books = await Book.find({ author: req.params.author });
    } catch(error) {
        res.status(500).send(error.message);
    }
    if(books.length == 0) {
        res.status(200).send("No Books By " + req.params.author + " Found"); 
        return;
    }
    res.status(200).json(books);
}

const getBooksByTitle = async (req, res) => {
    let book;
    try {
        book = await Book.findOne({ title: req.params.title });
    } catch(error) {
        res.status(500).send(error.message);
    }
    if(book == null) {
        res.status(200).send("No Books Titled: " + req.params.title + " Found"); 
        return;
    }
    res.status(200).json(book);
}

const addBook =  async (req, res) => {
    const newBook = jsonToBookSchema(req);
    try {
        const createdBook = await newBook.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeBook = async (req, res) => {
    try {
        await Book.deleteOne( { title: req.params.title });
    } catch(error) {
        res.status(500).send(error.message);
        return;
    }
    res.status(200).send("Book Titled: " + req.params.title + " Removed")
} 

module.exports = { getAllBooks, getBooksByAuthor, getBooksByTitle, addBook, removeBook };