const express = require("express");
const router = express.Router();

const { User } = require("./../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
