const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  generateReport,
} = require("../controllers/appointmentsController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(restrictTo("admin", "receptionist", "staff"), getAppointments);

router.use(restrictTo("admin", "receptionist"));

router.route("/").post(createAppointment);

router.route("/report").get(generateReport);

router.route("/:id").patch(updateAppointment).delete(deleteAppointment);

module.exports = router;
