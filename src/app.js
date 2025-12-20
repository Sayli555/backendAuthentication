const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.UI_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.route");
const dashbaordRoutes = require("./routes/dashboard.route");

app.use("/api/auth", authRoutes);
app.use("/api", dashbaordRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = app;
