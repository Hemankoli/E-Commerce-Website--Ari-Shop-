const express = require("express");
const router = express.Router();
const productController = require('../../controller/Admin/productController')

//ADMIN 
// upload products
router.post("/upload-product", productController.uploadProduct)

// get products
router.get("/get-product", productController.getAllProducts)

// update product
router.put("/update-product/:productId", productController.updateProduct)

//  delete product
router.delete("/delete-product/:productId", productController.deleteProduct);


module.exports = router;