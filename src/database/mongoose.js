const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const logger = require("./../logger/logger");

logger.debug("connecting to mongodb");

const connectToMongoose = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("mongodb connected");
      logger.info("connection to mongodb successful");
    })
    .catch((e) => {
      console.log(e);
      logger.error("connection to mongodb failed " + e);
      process.exit(1);
    });
};

module.exports = { connectToMongoose };
