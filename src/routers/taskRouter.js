const express = require("express");
const router = express.Router();

const { Task } = require("./../models/task");
const isAuth = require("./../middlewares/isAuth");

const logger = require("./../logger/logger");

router.post("/tasks", isAuth, async (req, res) => {
  logger.debug("received request to create task for user " + req.user.email);

  const task = new Task(req.body);
  task.owner = req.user._id;
  try {
    await task.save();
    logger.info("new task created for " + req.user.email);
    res.status(201).send(task);
  } catch (e) {
    logger.error(
      "error while creating new task for " + req.user.email + " " + e
    );
    res.status(400).send(e.message);
  }
});

router.patch("/tasks/:id", isAuth, async (req, res) => {
  logger.debug("received request to update task for user " + req.user.email);
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      logger.error(
        "couldnot find task with id " +
          req.params.id +
          " for userId " +
          req.user._id
      );
      return res.status(404).send("task not found");
    }

    const updates = Object.keys(req.body);
    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    logger.info("task updated. task id : " + task._id);

    res.send(task);
  } catch (e) {
    logger.error("error while updating task for " + req.user.email + " " + e);
    res.status(400).send(e.message);
  }
});

router.delete("/tasks/:id", isAuth, async (req, res) => {
  logger.debug("received request to delete task for user " + req.user.email);

  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      logger.error(
        "task with id " + req.params.id + " not found for user " + req.user._id
      );
      return res.status(404).send("task not found");
    }

    logger.info("task deleted. task id : " + task._id);

    res.send(task);
  } catch (e) {
    logger.error("error while deleting task for " + req.user.email + " " + e);
    res.status(400).send(e.message);
  }
});

router.get("/tasks/:id", isAuth, async (req, res) => {
  logger.debug(
    "received request to get a task by id for user " + req.user.email
  );

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      logger.error(
        "task with id " + req.params.id + " not found for user " + req.user._id
      );
      return res.status(404).send("task not found");
    }

    logger.debug("get task by id request successful task id : " + task._id);

    res.send(task);
  } catch (e) {
    logger.error(
      "error while retrieving tasks for " + req.user.email + " " + e
    );
    res.status(400).send(e.message);
  }
});

router.get("/tasks", isAuth, async (req, res) => {
  logger.debug("received request to get all tasks for user " + req.user.email);

  try {
    const tasks = await Task.find({ owner: req.user._id });

    logger.debug("get all tasks request successful user id : " + req.user._id);

    res.send(tasks);
  } catch (e) {
    logger.error(
      "error while retrieving tasks for " + req.user.email + " " + e
    );
    res.status(400).send(e.message);
  }
});
module.exports = router;
