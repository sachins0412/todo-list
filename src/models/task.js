const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
