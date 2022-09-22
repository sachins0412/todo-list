const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
