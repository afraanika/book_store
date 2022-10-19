const express = require("express");
require("./config/db");
const bookController = require("./controllers/bookController");
const app = express();

app.use(express.urlencoded( { extended: true }));
app.use(express.json());

app.use("/books", bookController);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Book Store");
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "Page Not Found",
    });
});

app.use((req, res, next) => {
    res.status(500).json({
        message: "Internal Server Error",
    });
});

module.exports = app;

