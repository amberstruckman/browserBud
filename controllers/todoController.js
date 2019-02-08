const db = require("../db/models");

const convertForAlexa = (todo) => {
  console.log(JSON.stringify(todo));
  return {
    "uid": todo["_id"],
    "updateDate": "2019-02-07T00:00:00.0Z",
    "titleText": todo.item,
    "mainText": todo.item,
    "redirectionUrl": "https://thawing-plains-98515.herokuapp.com/"
  };
};
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
  },
  alexa: function(req, res) {
    db.TodoItem.find(req.query)
      .then(todos => todos.map(convertForAlexa))
      .then(alexaItem => res.json(alexaItem))
      .catch(err => res.status(500).json(err));
  }
};
