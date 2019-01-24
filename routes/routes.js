const express = require("express");
const router = express.Router();
const db = require("../db/models");

router.get("/test", function(req, res) {
  res.json("Hello world!");
});

router.get("/test/:user", function(req, res) {
  db.User.find({
    local: {
      email: req.params.user
    }
  }).populate("pages")
  .populate("columns")
  .populate("panels")
  .populate("links")
  .then(function(dbResult) {
    res.json(dbResult);
  }).catch(function(err) {
    console.log(err.message);
  });
});

router.post("/addPage", function(req, res) {
  var data = {
    stackOrder: 1
  };
  db.Page.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

router.get("/addColumn", function(req, res) {
  var data = {
    stackOrder: 1
  };
  db.Column.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

router.post("/addPanel", function(req, res) {
  var data = {
    stackOrder: 1
  };
  db.Panel.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

router.post("/addLink/:url/:name", function(req, res) {
  var data = {
    stackOrder: 1,
    websiteUrl: req.params.url,
    websiteName: req.params.name 
  };
  db.Link.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});
  
module.exports = router;
