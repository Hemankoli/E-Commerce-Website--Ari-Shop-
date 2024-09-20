const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { checkAuthenticated, isAdmin } = require('../middleware/middleware');


// user register
router.post("/register", userController.register);

// user login
router.post("/login", userController.login);

// user logout
router.post("/logout", userController.logout);

// get Home
router.get('/', checkAuthenticated, (req, res) => {
    res.send("home");
});

// get user register
router.get('/register', (req, res) => {
    console.log(req.body);
    res.send("register");
});

// get user login
router.get('/login',checkAuthenticated, (req, res) => {
    console.log(req.body);
    res.send("login");
});

// get user logout
router.get('/logout', (req, res) => {
    console.log(req.body);
    res.send("logout");
});

// user authentication
// if user try to enter dashboard without login
router.get("/user-auth",  (req, res) => {
    res.status(200).send({ ok: true });
});

// ADMIN AUTHENTICATION
// if ADMIN try to enter dashboard without login
router.get("/admin-auth",  isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// Update User Profile
router.put("/details", userController.updateProfile, (req, res) => {
    res.send("update profile");
})

// Get User Profile



module.exports = router;                                                                                                                                        