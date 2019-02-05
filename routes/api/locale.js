const router = require("express").Router();
const localeController = require("../../controllers/localeController");

// Matches with "/api/locale"
router.route("/alexa")
  .get(localeController.alexa);

router.route("/")
  .get(localeController.findByUser)
  .post(localeController.create);

// Matches with "/api/locale/:id"
router
  .route("/:id")
  .get(localeController.findById)
  .put(localeController.update)
  

module.exports = router;