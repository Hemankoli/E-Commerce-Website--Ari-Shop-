const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../../middleware/middleware');


const cartController = require("../../controller/User/cartController")


// Route to get item to cart
router.get('/cart/:userId', cartController.getCartItems)

// Route to add item to cart
router.post('/cart',  cartController.addItemToCart);

// Route to delete item to cart
router.delete('/cart', cartController.removeItemFromCart)

// Route to update item to cart
router.put('/cart', cartController.updateItemInCart)

module.exports = router;