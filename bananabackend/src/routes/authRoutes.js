const express = require("express");
const User = require("../model/User");
const { registerUser, loginUser } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware"); // Import the authentication middleware

const router = express.Router();

// Register and login routes (public)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Example of a protected route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Retrieve user data excluding the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send user data as a response
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
