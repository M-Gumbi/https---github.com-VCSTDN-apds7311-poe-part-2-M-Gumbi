
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const checkauth = require('../check-auth')

//posting
router.post("", checkauth, (req, res) => {
  const tasks = new Task({
    task: req.body.task,
    branch: req.body.branch,
    department: req.body.department
  })
  tasks.save().then(() => {
    res.status(201).json({
      message: "Task created",
      tasks: tasks,
    });
  });
});

//getting
router.get("", (req, res) => {
  Task.find().then((tasks) => {
    res.json({
      message: "Task found",
      tasks: tasks,
    });
  });
});

//deleting 
router.delete("/:id", checkauth, (req, res) => {
  Task.deleteOne({ _id: req.params.id }).then((tasks) => {
    res.status(200).json({ message: "Task deleted" });
  });
});

module.exports = router;
