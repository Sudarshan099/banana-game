const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/game", require("./src/routes/gameRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB();
