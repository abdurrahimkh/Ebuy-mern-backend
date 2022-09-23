const express = require("express");
const router = require("express").Router();
const {
  registerValiadtions,
  loginValiadtions,
} = require("../validations/userValidations");
const { register, login } = require("../controllers/usersController");

router.post("/register", registerValiadtions, register);
router.post("/login", loginValiadtions, login);

module.exports = router;
