const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB connect");
  } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message, 
    });
  }
};

module.exports = connectDb;
