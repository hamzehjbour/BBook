const express = require("express");
const {
  signup,
  login,
  protect,
  restrictTo,
} = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(protect, restrictTo("admin"), signup);

router.route("/login").post(login);

module.exports = router;
