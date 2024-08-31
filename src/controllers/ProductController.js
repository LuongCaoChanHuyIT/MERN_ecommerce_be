const ProductService = require("../services/ProductService.js");

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    }
    const response = await ProductService.createProduct(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    console.log(productId);
    if (!productId) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The product is required" });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductService.getAllProduct(
      Number(limit) || 6,
      Number(page) || 0,
      sort,
      filter
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await ProductService.getProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The productId is required" });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
};
