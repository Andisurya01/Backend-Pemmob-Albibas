const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken } = require('../helpers/authHelper');

router.post('/', authenticateToken, productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',  authenticateToken, productController.updateProduct);
router.delete('/:id',  authenticateToken, productController.deleteProduct);

module.exports = router;
