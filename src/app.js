const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
