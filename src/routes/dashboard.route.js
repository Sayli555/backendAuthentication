
const express = require("express");
const { auth } = require("../middlewear/auth.middleware");
const router = express.Router();

router.get("/dashboard", auth, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports=router