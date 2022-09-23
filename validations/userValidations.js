const { body } = require("express-validator");

module.exports.registerValiadtions = [
  body("name").trim().not().isEmpty().escape().withMessage("name is required"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
];

module.exports.loginValiadtions = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
