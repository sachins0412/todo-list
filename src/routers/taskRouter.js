const express = require("express");
const router = express.Router();

const { Task } = require("./../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
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

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).send("task not found");

    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).send("task not found");

    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.send(tasks);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
module.exports = router;
