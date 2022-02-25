const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
