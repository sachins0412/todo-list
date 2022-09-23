const express = require("express");
const router = express.Router();

const { Task } = require("./../models/task");
const isAuth = require("./../middlewares/isAuth");

router.post("/tasks", isAuth, async (req, res) => {
  const task = new Task(req.body);
  task.owner = req.user._id;
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/tasks/:id", isAuth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send("task not found");

    const updates = Object.keys(req.body);
    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/tasks/:id", isAuth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send("task not found");

    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks/:id", isAuth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send("task not found");

    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks", isAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res.send(tasks);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
module.exports = router;
