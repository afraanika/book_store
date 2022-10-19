const winston = require("winston");

const prodLogger = () => {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: '../logs/production.log' }),
        ],
    });
}

module.exports = prodLogger;