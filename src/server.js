require("dotenv").config();

const { connectToMongoose } = require("./database/mongoose");

connectToMongoose();

const app = require("./app");

const logger = require("./logger/logger");
const PORT = process.env.PORT || 3000;

logger.info(`starting the server on port ${PORT}`);

app.listen(PORT, () => console.log("server is listening on port : ", PORT));
