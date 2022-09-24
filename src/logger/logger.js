const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json } = format;

var transport = new transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

const logger = createLogger({
  level: process.env.APPLOG_LEVEL,
  format: combine(timestamp(), json()),
  transports: [transport],
});

module.exports = logger;
