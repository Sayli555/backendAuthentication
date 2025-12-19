const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

exports.hashPassword = async (plainPassword) => {
  try {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.generateAccessToken = (id, email) => {
  try {
    return jwt.sign({ id, email }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "15m",
    });
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.generateRefreshToken = (id, email) => {
  try {
    return jwt.sign({ id, email }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
