const express = require("express");
const router = express.Router();
const db = require("../../db/models");

router.get("/browser", function(req, res) {
  db.User.findOne(
    { _id: req.user._id }
  ).then(function(dbResult) {
    // console.log(dbResult.browser);
    res.json(dbResult.browser);
  }).catch(function(error) {
    res.status(422).json(error);
  });
});

router.put("/browser", function(req, res) {
  db.User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { browser: req.body.browser } }
  ).then(function() {
    res.status(200).end();
  }).catch(function(error) {
    res.status(422).json(error);
  });
});

module.exports = router;
