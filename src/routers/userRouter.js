const express = require("express");
const router = express.Router();

const { User } = require("./../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
