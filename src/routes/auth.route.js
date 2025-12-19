const express = require("express");
const {
  signup,
  login,
  logout,
  refreshTokenController,
} = require("../controller/auth.controller");

const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../middlewear/validateAuth.middleware");

const router = express.Router();

router.post("/signup", registerValidationRules(), validate, signup);
router.post("/login", loginValidationRules(), validate, login);
router.get("/refresh-token", refreshTokenController);
router.get("/logout", logout);

module.exports = router;
