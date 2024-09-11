const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController.js");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/create", authUserMiddleware, OrderController.createOrder);

module.exports = router;
