const app = require("./app.js");
const connectDb = require("./configue/db.configue.js");
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
