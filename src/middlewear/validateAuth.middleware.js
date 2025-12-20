const { body, validationResult } = require("express-validator");

const registerValidationRules = () => [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim()
    .escape(),

  body("email").isEmail().withMessage("Must be a valid email").normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character"),
];

const loginValidationRules = () => [
  body("email").isEmail().withMessage("Must be a valid email").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate,
};
