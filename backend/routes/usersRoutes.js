const express = require("express");
const { deleteUser, getUsers } = require("../controllers/userController");
const { restrictTo, protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(restrictTo("admin", "receptionist"), getUsers);

router.use(restrictTo("admin"));
router.route("/:id").delete(deleteUser);

module.exports = router;
