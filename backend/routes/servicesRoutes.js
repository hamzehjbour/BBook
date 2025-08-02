const express = require("express");
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/servicesController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(restrictTo("admin", "receptionist", "staff"), getServices);

router.use(restrictTo("admin"));
router.route("/").post(createService);

router.route("/:id").patch(updateService).delete(deleteService);

module.exports = router;
