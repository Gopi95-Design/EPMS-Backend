// server.js
require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Route imports
const RegisterRoute = require("./routes/register.routes");
const UpdateRoute = require("./routes/update.routes");
const DeleteRoute = require("./routes/delete.routes");
const AdminModel = require("./Model/Admin");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((x) => {
    console.log(`✅ MongoDB connected: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Admin login route
app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.password === password) {
      return res.json("success");
    } else {
      return res.status(401).json("Incorrect password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// API Routes
app.use("/Register", RegisterRoute);
app.use("/Register", UpdateRoute);
app.use("/Register", DeleteRoute);

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
