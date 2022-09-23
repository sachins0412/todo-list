require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

require("./database/mongoose");
const logger = require("./logger/logger");
const PORT = process.env.PORT || 3000;

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

app.use(userRouter);
app.use(taskRouter);

logger.info("starting the server on port ", PORT);

app.listen(PORT, () => console.log("server is listening on port : ", PORT));
