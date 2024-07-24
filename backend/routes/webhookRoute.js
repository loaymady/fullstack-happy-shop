const express = require("express");
const { webhookCheckout } = require("../controllers/orderService");

const router = express.Router();

// Use raw body parser for the webhook endpoint
router.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

module.exports = router;
