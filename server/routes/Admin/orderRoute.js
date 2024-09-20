const express = require("express");
const orderController = require("../../controller/Admin/orderController");
const router = express.Router();
const { checkAuthenticated, isAdmin } = require('../../middleware/middleware');


// get orders to admin
router.get('/all-orders',checkAuthenticated,isAdmin, orderController.getAllOrders)

// update orders status to admin
router.put('/order-status/:orderId',checkAuthenticated,isAdmin, orderController.orderStatusController)

module.exports = router;