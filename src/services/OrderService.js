const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const EmailService = require("../services/MailService");
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
        taxPrice,
        isPaid,
        paidAt,
        email,
      } = newOrder;
      const promies = orderItems.map(async (order) => {
        const productUpdate = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          { $inc: { countInStock: -order.amount, selled: +order.amount } },
          { new: true }
        );
        if (productUpdate) {
          // const createdOrder = await Order({
          //   orderItems,
          //   shippingAddress: {
          //     fullName: fullname,
          //     address,
          //     phone,
          //   },
          //   taxPrice,
          //   paymentMethod,
          //   itemsPrice,
          //   shippingPrice,
          //   totalPrice,
          //   user: user,
          //   isPaid,
          //   paiAt,
          // });
          // createdOrder.save();
          // if (createdOrder) {
          //   return {
          //     status: "SUCCESS",
          //     message: "The create order is success!",
          //   };
          // }

          return {
            status: "SUCCESS",
            message: "The create order is success!",
          };
        } else {
          return {
            status: "ERR",
            message: "Insufficient stock",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promies);
      console.log(results);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        resolve({
          status: "ERR",
          message: `Sản phẩm với id${newData.join(",")}đã không đủ hàng`,
        });
      } else {
        const createdOrder = await Order({
          orderItems,
          shippingAddress: {
            fullName: fullname,
            address,
            phone,
          },
          taxPrice,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
          isPaid,
          paidAt,
        });
        createdOrder.save();
        if (createdOrder) {
          await EmailService.sendEmailCreateOrder(
            email,
            orderItems,
            totalPrice
          );
          resolve({
            status: "SUCCESS",
            message: "The create order is success!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({ user: id });
      if (order === null) {
        resolve({ status: "ERR", message: "The order is not define" });
      }

      resolve({ status: "SUCCESS", data: order });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createOrder,
  getOrderDetails,
};
