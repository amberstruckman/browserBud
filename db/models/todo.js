const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  item: { type: String, required: true },
});

const TodoList = mongoose.model("todoList", todoSchema);

module.exports = TodoList;