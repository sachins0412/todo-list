const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.APPLOG_LEVEL,
  format: winston.format.json(),
  transports: new winston.transports.File({ filename: "logs/app.log" }),
});

module.exports = logger;
