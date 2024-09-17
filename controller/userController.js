const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require("../database/connection");


//Register Router
exports.register =  async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
        res.status(400).json({ message: 'Passwords do not match' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    pool.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already registered' });
        }else{
            pool.query('INSERT INTO users (name, email, password, confirmpassword) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, confirmpassword],
                (err) => {
                    if (err) return res.status(500).json({ message: 'Error registering user' });  
                    res.status(201).json({user: { name, email, hashedPassword, confirmpassword }});
                }
            );
        }
    });
}


//Login Router
exports.login = async (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        
        if (results.length === 0) {
            return res.status(400).json({ message: 'User Not Registered' });
        }
        const user = results[0];
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (isMatch) {
            const token = jwt.sign({ user_id: user.user_id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '7d' });
            res.cookie('token', token, { httpOnly: true, secure: true });
            res.status(200).json({ user: { user_id: user.user_id, email: user.email, name: user.name, password: user.password }, token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
}

//Logout Router
exports.logout =  (req, res) => {   
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
}

// update profile
exports.updateProfile = async (req, res) => {
    const userId = req.params.userId; 
    console.log(userId)
    const { name, email, phoneNumber, password } = req?.body;
    try {
        let hashedPassword = password;
        if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
        }
        if(!password && password.length > 6){
            return res.json({error : "Password Required and 6 charecter long"})
        }
        pool.query('UPDATE users SET name = ?, email = ?, phone_number = ?, password = ? WHERE user_id = ?', [name, email, phoneNumber, hashedPassword, userId],
            (err, result) => {
                if (err) {
                    console.error('Error updating profile:', err);
                    return res.status(500).json({ message: 'Error updating profile' });
                }
            res.json(result);
        }
        );
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
