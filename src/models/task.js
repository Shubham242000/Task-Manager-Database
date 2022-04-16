const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

taskSchema.pre("save", function (next) {
  console.log("here before saving");
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
