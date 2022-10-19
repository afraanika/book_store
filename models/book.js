const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema( {
    title: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stock: {
        count: {
            sold: {
                type: Number,
                required: true
            },
            available: {
                type: Number,
                required: true
            }
        },
        price: {
            type: Number,
            required: true
        }
    },
    reviews: [{
        name: {
            type: String, 
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("Book", bookSchema);