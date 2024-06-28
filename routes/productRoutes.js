const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticateToken } = require("../helpers/authHelper");

router
    .get("/", productController.getProducts)
    .get("/:id", productController.getProductById)
    .put("/:id", authenticateToken, productController.updateProduct)
    .post("/", authenticateToken, productController.addProduct)
    .delete("/:id", authenticateToken, productController.deleteProduct)

module.exports = router;
