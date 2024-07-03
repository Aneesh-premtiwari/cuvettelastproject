const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const User = require("../models/User");

// Middleware to protect routes with JWT
router.use(auth);

// Endpoint to add a new task
router.post("/", async (req, res) => {
  const {
    newTask,
    priority,
    assignee,
    assigner,
    checklist,
    currDueDate,
    status,
  } = req.body;

  try {
    const task = new Task({
      newTask,
      priority,
      assignee,
      assigner,
      checklist,
      currDueDate,
      status,
    });

    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to get tasks for the logged-in user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user.email });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to get all tasks
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to delete all tasks
router.delete("/all", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to update a task by ID
router.put("/:id", async (req, res) => {
  const {
    newTask,
    priority,
    assignee,
    assigner,
    checklist,
    currDueDate,
    status,
  } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.newTask = newTask;
    task.priority = priority;
    task.assignee = assignee;
    task.assigner = assigner;
    task.checklist = checklist;
    task.currDueDate = currDueDate;
    task.status = status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to get all users' data
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
