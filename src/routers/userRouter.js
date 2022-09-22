const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("respones from userRouter");
});

module.exports = router;
