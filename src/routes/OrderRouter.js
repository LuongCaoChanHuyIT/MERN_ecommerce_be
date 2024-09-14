const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController.js");
const { authUserMiddleware } = require("../middlewares/authMiddleware");

router.post("/create", authUserMiddleware, OrderController.createOrder);
router.get(
  "/get-order-details/:id",

  OrderController.getOrderDetails
);
module.exports = router;
