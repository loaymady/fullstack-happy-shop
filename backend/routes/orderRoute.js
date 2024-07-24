const express = require("express");
const {
  createCashOrder,
  getSpecificOrder,
  filterOrdersForLoggedUser,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToNotPaid,
  updateOrderToNotDelivered,
  checkoutSession,
} = require("../controllers/orderService");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.auth);

// Checkout session route
router.get("/checkout-session/:cartId", checkoutSession);

// Create cash order route
router
  .route("/:cartId")
  .post(authController.allowedTo("user"), createCashOrder);

// Get all orders route
router
  .route("/")
  .get(
    authController.allowedTo("user", "admin", "manager"),
    filterOrdersForLoggedUser,
    getAllOrders
  );

// Get specific order route
router
  .route("/:id")
  .get(authController.allowedTo("user", "admin", "manager"), getSpecificOrder);

// Update order to paid route
router.put(
  "/:id/pay",
  authController.allowedTo("user", "admin"),
  updateOrderToPaid
);

// Update order to delivered route
router.put(
  "/:id/deliver",
  authController.allowedTo("admin"),
  updateOrderToDelivered
);

// Update order to not paid route
router.put(
  "/:id/notpaid",
  authController.allowedTo("user", "admin"),
  updateOrderToNotPaid
);

// Update order to not delivered route
router.put(
  "/:id/notdelivered",
  authController.allowedTo("admin"),
  updateOrderToNotDelivered
);

module.exports = router;
