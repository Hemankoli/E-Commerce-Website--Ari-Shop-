const express = require('express');
const router = express.Router();
const orderController = require('../../controller/User/orderController');



// Get all orders
router.get('/orders', orderController.getAllOrders);

// Get order by ID
router.get('/orders/:id', orderController.getOrderById);

// get products by order
// error
router.get('/orders/:id/products', orderController.getProductsByOrder);

// Update order status
router.put('/orders/:id', orderController.updateOrder);

// get Order By User Id
// error
router.get('/customers/:userId/orders', orderController.getOrdersByUser);

module.exports = router;
