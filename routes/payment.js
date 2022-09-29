const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();
router.post("/create-checkout-session", paymentController.paymentProcess);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.checkoutSession
);

module.exports = router;
