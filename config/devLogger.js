const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const devLoggerFormat = printf(( { level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const devLogger = () => {
    return createLogger({
        level: "debug", 
        format: combine(
            timestamp({format: "HH:mm:ss"}),
            devLoggerFormat
        ),
        transports: [
            new transports.File({ filename: '../logs/error.log', level: 'error' }),
            new transports.File({ filename: '../logs/combined.log' }),
        ]
    })
};

module.exports = devLogger;