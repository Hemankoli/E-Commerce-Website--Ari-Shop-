const express = require('express');
const router = express.Router();
const addressController = require('../../controller/User/addressController'); 

// Create Address
router.post('/addresses', addressController.createAddress);

// Update Address
router.put('/addresses/:id', addressController.updateAddress);

// Delete Address
router.delete('/addresses/:id', addressController.deleteAddress);

// Get Addresses by User ID
router.get('/addresses/:userId', addressController.getAddresses);

module.exports = router;
