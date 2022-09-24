const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;

let today = new Date().toISOString().split("T")[0];
const logger = createLogger({
  level: process.env.APPLOG_LEVEL,
  format: combine(timestamp(), json()),
  transports: new transports.File({ filename: `logs/app-${today}.log` }),
});

module.exports = logger;
