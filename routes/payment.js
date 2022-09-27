const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const Authorization = require("../services/Authorization");

router.post("/create-checkout-session", paymentController.paymentProcess);

router.post(
  "/webhook",
  Authorization.authorized,
  express.raw({ type: "application/json" }),
  paymentController.checkOutSession
);

module.exports = router;
