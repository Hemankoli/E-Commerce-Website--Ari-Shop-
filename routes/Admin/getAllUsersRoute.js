const getUsersController = require('../../controller/Admin/getUsersController');
const express = require('express');
const { isAdmin, checkAuthenticated } = require('../../middleware/middleware');
const router = express.Router();

//ADMIN
//all users get 
router.get('/all-users',  getUsersController.getAllUsers);

module.exports = router;