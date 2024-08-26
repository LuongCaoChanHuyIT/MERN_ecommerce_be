const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, image, type, price, countInStock, rating, description } =
        newProduct;
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({ status: "OK", message: "The name is already" });
      }

      var createdProduct = new Product({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      createdProduct.save();
      if (createdProduct) {
        resolve({ status: "OK", message: "SUCCESS", data: createdProduct });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({ status: "OK", message: "The name is already" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (updatedProduct) {
        resolve({ status: "OK", message: "SUCCESS", data: updatedProduct });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, image, type, price, countInStock, rating, description } =
        newProduct;
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({ status: "OK", message: "The name is already" });
      }

      var createdProduct = new Product({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      createdProduct.save();
      if (createdProduct) {
        resolve({ status: "OK", message: "SUCCESS", data: createdProduct });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, image, type, price, countInStock, rating, description } =
        newProduct;
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({ status: "OK", message: "The name is already" });
      }

      var createdProduct = new Product({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      createdProduct.save();
      if (createdProduct) {
        resolve({ status: "OK", message: "SUCCESS", data: createdProduct });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, image, type, price, countInStock, rating, description } =
        newProduct;
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({ status: "OK", message: "The name is already" });
      }

      var createdProduct = new Product({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      createdProduct.save();
      if (createdProduct) {
        resolve({ status: "OK", message: "SUCCESS", data: createdProduct });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
};
