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
    pool.execute('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already registered' });
        }else{
            pool.execute('INSERT INTO users (name, email, password, confirmpassword) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, confirmpassword],
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
    pool.execute('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(400).json({ message: 'User Not Registered' });
        }

        const user = results[0];

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ user_id: user.user_id, name: user.name, role: user.role }, process.env.SECRET_KEY, { expiresIn: '7d' });
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                res.status(200).json({
                    user: {
                        user_id: user.user_id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    },
                    token
                });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (bcryptError) {
            console.error('Password comparison error:', bcryptError);
            res.status(500).json({ message: 'Error comparing passwords' });
        }
    });
};

//Logout Router
exports.logout =  (req, res) => {   
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
}

// update profile
exports.updateProfile = async (req, res) => {
    const { user_id, name, email, phone_number, password , confirmpassword } = req?.body;
    try {

        if (password && password.length <= 6) {
            return res.status(400).json({ error: "Password required and must be at least 6 characters long." });
        }
        if (password !== confirmpassword) {
            res.status(400).json({ message: 'Passwords do not match' });
        }
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        
        if( password && confirmpassword)
        pool.query('SELECT * FROM users WHERE user_id = ?;', [user_id], (error, checkresult) => {
            if (error) {
                console.error('Error fetching user:', error);
                return res.status(500).json({ message: 'Error fetching user' });
            }
            if(checkresult.affectedRows === 0){
                return res.status(404).json({ message: 'User not found' });
            }

            pool.query('SELECT * FROM users WHERE email = ? AND user_id != ?;', [email, user_id], (emailCheckError, emailCheckResult) => {
                if (emailCheckError) {
                    console.error('Error checking email:', emailCheckError);
                    return res.status(500).json({ message: 'Error checking email' });
                }
                if (emailCheckResult.length > 0) {
                    return res.status(400).json({ error: 'Email already in use by another account.' });
                }

                pool.query('UPDATE users SET name = ?, email = ?, phone_number = ?, password = ?, confirmpassword = ? WHERE user_id = ?', [name, email, phone_number, hashedPassword, confirmpassword, user_id],
                    (err, result) => {
                        if (err) {
                            console.error('Error updating profile:', err);
                            return res.status(500).json({ message: 'Error updating profile' });
                        }
                        if (result.affectedRows === 0) {
                            return res.status(404).json({ message: 'User not found or no changes made' });
                        }
                        res.json({ message: 'Profile updated successfully', data : result});
                    }
                );
            });    
        })
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};


