const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User Not Registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { user_id: user?._id, name: user.name, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      user: {
        user_id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully!',
  });
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const { user_id, name, email, phone_number, password, confirmpassword } = req.body;

  try {
    if (password && password.length <= 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    if (password && password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const emailCheck = await User.findOne({ email, _id: { $ne: user_id } });
    if (emailCheck) {
      return res.status(400).json({ error: 'Email already in use by another account.' });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.confirmpassword = hashedPassword;
    }
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.phone_number = phone_number || existingUser.phone_number;

    await existingUser.save();

    res.json({ message: 'Profile updated successfully', data: existingUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
