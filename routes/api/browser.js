const express = require("express");
const router = express.Router();
const db = require("../../db/models");

router.get("/browser/:user", function(req, res) {
  db.User.findOne({ "local.email": req.params.user })
  .then(function(dbResult) {
    res.json(dbResult.browser);
  }).catch(function(error) {
    res.status(422).json(error);
  });
});

router.put("/browser/:user", function(req, res) {
  db.User.findOneAndUpdate(
    { "local.email": req.params.user },
    { $set: req.body }
  ).then(function(dbResult) {
    db.User.markModified("browser");
    res.status(200).end();
  }).catch(function(error) {
    res.status(422).json(error);
  });
});

module.exports = router;
