const express = require("express");
const router = express.Router();
var cors = require("cors");
const ProductController = require("../controllers/ProductController.js");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middlewares/authMiddleware");
router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/getAll", cors(), ProductController.getAllProduct);
router.get("/get/:id", ProductController.getProduct);
router.delete("/delete/:id", ProductController.deleteProduct);
router.post("/delete-many", authMiddleware, ProductController.deleteMany);
router.get("/get-all-type", cors(), ProductController.getAllType);
router.get("/get-product-option", ProductController.getProductOption);
module.exports = router;
