const db = require("../db/models");

// Defining methods for the todolist
module.exports = {
  findAll: function(req, res) {
    db.TodoItem.find(req.query)
      .then(dbTodoItem => res.json(dbTodoItem))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.TodoItem.findById(req.params.id)
      .then(dbTodoItem => res.json(dbTodoItem))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.TodoItem.create(req.body)
      .then(dbTodoItem => res.json(dbTodoItem))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.TodoItem.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbTodoItem => res.json(dbTodoItem))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.TodoItem.findById(req.params.id)
      .then(dbTodoItem => dbTodoItem.remove())
      .then(dbTodoItem => res.json(dbTodoItem))
      .catch(err => res.status(422).json(err));
  }
};
