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
        rating = 1,
        description,
        discount,
        salled,
      } = newProduct;
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({ status: "ERR", message: "The name is already" });
      } else {
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
          resolve({
            status: "SUCCESS",
            message: "The create product is success",
            data: createdProduct,
          });
        }
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
        resolve({ status: "ERR", message: "The name is already" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (updatedProduct) {
        resolve({
          status: "SUCCESS",
          message: "The update is success",
          data: updatedProduct,
        });
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
          status: "SUCCESS",

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
          status: "SUCCESS",
          data: allProductSort,
          total: totalProdcut,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProdcut / limit),
        });
      }
      if (limit) {
        const allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "SUCCESS",
          data: allProduct,
          total: totalProdcut,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProdcut / limit),
        });
      }

      const allProduct = await Product.find();
      resolve({
        status: "SUCCESS",
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
const getProductOption = async (limit, page, filter, rankValue) => {
  return new Promise(async (resolve, reject) => {
    const totalProdcut = await Product.countDocuments();
    if (rankValue == "<100.000") {
      const label = filter[0];
      const result = await Product.find({ [label]: { $regex: filter[1] } })
        .where("price")
        .lte(100000)
        .limit(limit)
        .skip(page * limit)
        .exec();

      resolve({
        status: "SUCCESS",
        data: result,
        total: totalProdcut,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProdcut / limit),
      });
    }
    if (rankValue == "100.000 - 300.000") {
      const label = filter[0];
      const result = await Product.find({ [label]: { $regex: filter[1] } })
        .where("price")
        .gte(100000)
        .lte(300000)
        .limit(limit)
        .skip(page * limit)
        .exec();
      resolve({
        status: "SUCCESS",
        data: result,
        total: totalProdcut,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProdcut / limit),
      });
    }
    if (rankValue == ">300.000") {
      const label = filter[0];
      const result = await Product.find({ [label]: { $regex: filter[1] } })
        .where("price")
        .gte(300000)
        .limit(limit)
        .skip(page * limit)
        .exec();
      resolve({
        status: "SUCCESS",
        data: result,
        total: totalProdcut,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProdcut / limit),
      });
    }
  });
};
const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (product === null) {
        resolve({ status: "SUCCESS" });
      }
      resolve({ status: "SUCCESS", data: product });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.findByIdAndDelete(id);
      resolve({ status: "SUCCESS" });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteMany = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({ status: "SUCCESS" });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({ status: "SUCCESS", data: allType });
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
  deleteMany,
  getAllType,
  getProductOption,
};
