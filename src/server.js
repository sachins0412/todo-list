require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => console.log("server is listening on port : ", PORT));
