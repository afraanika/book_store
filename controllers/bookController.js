const express = require("express");
const { getAllBooks, getBooksByAuthor, getBooksByTitle, addBook, removeBook, updateBookQuanity, updateBookPricing } = require("../services/bookService");


const router = express.Router();

router.get("/", getAllBooks);
router.get("/search/:author", getBooksByAuthor);
router.get("/:title", getBooksByTitle)
router.post("/", addBook);
router.delete("/:title", removeBook);
router.patch("/purchaseBook", updateBookQuanity);
router.patch("/updateBookPricing", updateBookPricing)

module.exports = router;