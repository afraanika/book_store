require("dotenv").config();

const devLogger = require("../config/devLogger");
const prodLogger = require("../config/prodLogger");

let logger = null;

if(process.env.NODE_ENV === "development") {
    logger = devLogger;
}

if(process.env.NODE_ENV === "production") {
    logger = prodLogger;
}

module.exports = logger;