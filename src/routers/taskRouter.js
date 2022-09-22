const express = require("express");
const router = express.Router();

router.get("/tasks", (req, res) => {
  res.send("respones from taskRouter");
});

module.exports = router;
