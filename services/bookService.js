const Book = require("../models/book");
const jsonToBookSchema = require("../utils/jsonToBookSchema");

const getAllBooks = async (req, res) => {
    let books;
    try {
        books = await Book.find({}, { _id: 0, __v: 0 }).sort( { title: 1 });
        if(books.length == 0) {
            res.status(200).send("No Books By " + req.params.author + " Found"); 
            return;
        }
        res.status(200).json(books);
    } catch(error) {
        res.status(500).send(error.message);
    }
};

const getBooksByAuthor = async (req, res) => {
    let books;
    try {
        books = await Book.find({ author: req.params.author }, { _id: 0, __v: 0}).sort( { title: 1 });
        if(!books.length) {
            res.status(200).send("No Books By " + req.params.author + " Found"); 
            return;
        }
        res.status(200).json(books);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getBooksByTitle = async (req, res) => {
    let book;
    try {
        book = await Book.findOne({ title: req.params.title }, { _id: 0, __v: 0});
        if(book == null) {
            res.status(200).send("No Books Titled: " + req.params.title + " Found"); 
            return;
        }
        res.status(200).json(book);
    } catch(error) {
        res.status(500).send(error.message);
    }
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
        res.status(200).send("Book Titled: " + req.params.title + " Removed")
    } catch(error) {
        res.status(500).send(error.message);
        return;
    }
} 

const updateBookQuanity = async (req, res) => {
    let updatedBook;
    try {
        updatedBook = await Book.findOneAndUpdate({ title: req.body.title }, { $inc: {'stock.count.sold': 1,  'stock.count.available': - 1}});
        if(updatedBook == null) {
            res.status(200).send("No Books Titled: " + req.body.title + " Found"); 
            return;
        }
        res.status(200).send("Book Titled: " + req.body.title + " Sold");
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const updateBookPricing = async (req, res) => {
    let updatedBook;
    try {
        updatedBook = await Book.findOneAndUpdate({ title: req.body.title }, { $set: {'stock.price': req.body.price}});
        if(updatedBook == null) {
            res.status(200).send("No Books Titled: " + req.body.title + " Found"); 
            return;
        }
        res.status(200).send("Price of Book Titled: " + req.body.title + " Updated");
    } catch(error) {
        res.status(500).send(error.message);
    }
}

module.exports = { getAllBooks, getBooksByAuthor, getBooksByTitle, addBook, removeBook, updateBookQuanity, updateBookPricing };