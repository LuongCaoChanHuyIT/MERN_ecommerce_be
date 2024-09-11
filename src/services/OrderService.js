const Order = require("../models/OrderModel");
const bcrypt = require("bcrypt");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
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
      } = newOrder;
      const createdOrder = await Order({
        orderItems,
        shippingAddress: {
          fullname,
          address,
          phone,
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user,
      });
      createdOrder.save();
      if (createdOrder) {
        resolve({ status: "OK", message: "SUCCESS", data: createdOrder });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
};
