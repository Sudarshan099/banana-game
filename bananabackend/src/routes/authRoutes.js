const express = require("express");
const User = require("../model/User");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");

const router = express.Router();

// Register and login routes (public)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUser);

module.exports = router;
