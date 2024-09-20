const express = require('express');
const router = express.Router();
const addressController = require('../../controller/User/addressController'); 
const { checkAuthenticated } = require('../../middleware/middleware');

// Create Address
router.post('/addresses', addressController.createAddress);

// Update Address
router.put('/addresses/:addressId', addressController.updateAddress);

// Delete Address
router.delete('/addresses/:addressId', addressController.deleteAddress);

// Get Addresses by User ID
router.get('/addresses/:userId', addressController.getAddresses);

module.exports = router;
