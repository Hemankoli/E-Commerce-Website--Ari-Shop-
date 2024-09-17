const express = require('express');
const router = express.Router();

// const getSingleProductByCategory = require('../../controller/User/getSingleProductByCategory')
const getProductsByCategory = require('../../controller/User/getProductsByCategory')
const productController = require("../../controller/User/productController")

// get product by category for user
// router.get("/category-product", getProductsByCategory)

// get products for user
router.get("/get-product", productController.getProducts)

// get product details by id for user
router.get("/product/:productName", productController.getProductDetailsById);

// get search products
router.get("/search/:keyword", productController.searchProducts)


module.exports = router;