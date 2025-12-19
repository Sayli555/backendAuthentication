const express = require("express");
const { signup, login, logout, refreshTokenController } = require("../controller/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh-token", refreshTokenController);
router.get("/logout", logout);

module.exports=router
