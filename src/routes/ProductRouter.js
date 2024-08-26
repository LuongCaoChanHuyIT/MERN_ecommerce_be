const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/getAll", ProductController.getAllProduct);
router.get("/get/:id", ProductController.getProduct);
router.delete("/delete/:id", ProductController.deleteProduct);
module.exports = router;
