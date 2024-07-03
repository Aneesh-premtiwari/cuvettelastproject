const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  newTask: { type: String, required: true },
  priority: { type: String, required: true },
  assignee: { type: String, required: true },
  assigner: { type: String, required: true },
  checklist: [{ id: Number, value: String, checked: Boolean }],
  currDueDate: { type: Date, required: true },
  status: { type: String, default: "todo" }, // Add status field with default value
});

module.exports = mongoose.model("Task", TaskSchema);
