const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;

const logger = createLogger({
  level: process.env.APPLOG_LEVEL,
  format: combine(timestamp(), json()),
  transports: new transports.File({ filename: "logs/app.log" }),
});

module.exports = logger;
