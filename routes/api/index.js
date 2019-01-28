const path = require("path");
const router = require("express").Router();
const todoRoutes = require("./todo");
const browserRoutes = require("./browser");

// todo routes
router.use("/todo", todoRoutes);
router.use("/", browserRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;