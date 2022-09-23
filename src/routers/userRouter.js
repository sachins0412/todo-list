const express = require("express");
const router = express.Router();

const { User } = require("./../models/user");
const isAuth = require("./../middlewares/isAuth");

const logger = require("./../logger/logger");

router.post("/users", async (req, res) => {
  logger.debug("received request to create user with email " + req.body.email);

  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    logger.info("signup successful for user " + user.email);

    res.status(201).send({ user, token });
  } catch (e) {
    logger.error("signup error occurred for user " + req.body.email + " " + e);
    res.status(400).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  logger.debug("received request to login user with email " + req.body.email);

  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();

    logger.info("signup successful for user " + user.email);

    res.send({ user, token });
  } catch (e) {
    logger.error("login error occurred for user " + req.body.email + " " + e);
    res.status(400).send(e.message);
  }
});

router.post("/users/logout", isAuth, async (req, res) => {
  logger.debug("received request to logout user with email " + req.user.email);

  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });

    await req.user.save();

    logger.info("logoff successful for user " + req.user.email);

    res.send("Logged off successfully");
  } catch (e) {
    logger.error("login error occurred for user " + req.body.email + " " + e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
