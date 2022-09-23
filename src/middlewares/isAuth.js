const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");
const logger = require("./../logger/logger");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    logger.debug("authentication successful for " + user._id);

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    logger.error("authentication failed for a user");
    res.status(401).send("You are not authorized");
  }
};

module.exports = isAuth;
