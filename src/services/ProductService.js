const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
        discount,
        salled,
      } = newProduct;
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
        discount,
        salled,
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
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProdcut = await Product.countDocuments();

      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allObjectFilter,
          total: totalProdcut,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProdcut / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];

        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductSort,
          total: totalProdcut,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProdcut / limit),
        });
      }
      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
        total: totalProdcut,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProdcut / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (product === null) {
        resolve({ status: "OK", message: "The product is not define" });
      }
      resolve({ status: "OK", message: "SUCCESS", data: product });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.findByIdAndDelete(id);
      resolve({ status: "OK", message: "SUCCESS" });
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
