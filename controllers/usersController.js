const { validationResult } = require("express-validator");
const userModel = require("../models/User");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../services/authServices");

// @route POST /api/register
// @access Public
// @desc Create a user and return a token
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExist = await userModel.findOne({ email });
      if (!emailExist) {
        const hashed = await hashedPassword(password);
        const user = await userModel.create({
          name,
          email,
          password: hashed,
        });
        const token = createToken({ id: user._id, name: user.name });
        return res
          .status(201)
          .json({ message: "Your account has been created", token });
      } else {
        return res.status(400).json({
          errors: [{ msg: `${email} is already exists`, param: "email" }],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal Error");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

// @route POST /api/login
// @access Public
// @desc Login user and return a token
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        if (await comparePassword(password, user.password)) {
          const token = createToken({ id: user._id, name: user.name });
          if (user.admin) {
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(201).json({ token, admin: false });
          }
        } else {
          res
            .status(401)
            .json({ errors: [{ msg: "Invalid password", param: "password" }] });
        }
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${email} is not found`, param: "email" }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server internal error");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
