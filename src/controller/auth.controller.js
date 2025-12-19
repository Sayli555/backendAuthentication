const User = require("../models/user.model");
const {
  verifyPassword,
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  hashPassword,
} = require("../helper/hashpassword.helper");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Password hashing failed" });
    }

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await verifyPassword(password, exist.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const access_Token = await generateAccessToken(exist._id, email);
    const refresh_token = await generateRefreshToken(exist._id, email);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false, // ✅ localhost
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("access_token", access_Token, {
      httpOnly: true,
      secure: false, // ✅ localhost
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = await verifyRefreshToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = await generateAccessToken(decoded.id, decoded.email);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/" });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  refreshTokenController,
  logout,
};
