const router = require("express").Router();
const localeController = require("../../controllers/localeController");

// Matches with "/api/locale"
router.route("/alexa")
  .get(localeController.alexa);

router.route("/list")
  .get(localeController.findAll);

router.route("/")
  .get(localeController.find)
  .post(localeController.create)
  .put(localeController.update);

// Matches with "/api/locale/:id"
router
  .route("/:id")
  .get(localeController.findById)
  .put(localeController.update)
  

module.exports = router;