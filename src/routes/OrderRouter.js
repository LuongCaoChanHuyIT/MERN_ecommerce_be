const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController.js");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/create", authUserMiddleware, OrderController.createOrder);
router.get(
  "/get-order-details/:id",
  authUserMiddleware,
  OrderController.getOrderDetails
);
router.get("/get-all-order", OrderController.getAllOrder);
module.exports = router;
