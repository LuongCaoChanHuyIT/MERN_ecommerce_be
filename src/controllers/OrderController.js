const OrderService = require("../services/OrderService.js");

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      fullname,
      address,
      phone,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user,
    } = req.body;
    if (
      !orderItems ||
      !fullname ||
      !address ||
      !phone ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !user
    ) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The userId is required" });
    }
    const response = await OrderService.getOrderDetails(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const response = await OrderService.getAllOrder();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createOrder,
  getOrderDetails,
  getAllOrder,
};
