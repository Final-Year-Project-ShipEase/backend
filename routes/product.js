// routes/productRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const productController = require('../controllers/products');

router.get('/products', productController.getAllProducts); 
router.get('/product/:id', productController.getProductById); 
router.post('/product', productController.createProduct); 
router.put('/product/:id', productController.updateProduct); 
router.delete('/product/:id', productController.deleteProductById);

// Index route with backend pagination of 10 results 
router.get('/products/index', productController.getProductsWithPagination);

module.exports = router;