const express = require('express');
const router = express.Router();
const orderController = require('../../controller/User/orderController');
const { checkAuthenticated } = require('../../middleware/middleware');


router.post('/create-order', orderController.createOrder);
router.post('/update-order', orderController.updateOrder);

// Get all orders
router.get('/orders', orderController.getAllOrders);

// Get order by ID
router.get('/orders/:id', orderController.getOrderById);

// get products by order
router.get('/orders/:id/products', orderController.getProductsByOrder);

// // Update order status
// router.put('/orders/:id', orderController.updateOrder);

// get Order By User Id
router.get('/customers/:userId/orders', orderController.getOrdersByUser);

module.exports = router;    
