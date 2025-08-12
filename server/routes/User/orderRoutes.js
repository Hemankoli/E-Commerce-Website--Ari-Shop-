const express = require('express');
const router = express.Router();
const orderController = require("../../controller/User/orderController")


// Route to get orders by user
router.get('/orders/:userId', orderController.getOrdersByUser)

// Route to create a new order
router.post('/checkout', orderController.createOrder);


module.exports = router;