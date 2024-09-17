const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.checkAuthenticated = async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    console.log("authHeader", authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    try { 
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error in checkAuthenticated middleware:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (!req?.user) return res.status(401).json({ message: 'Not authenticated' });
    if (req?.user?.role !== 'ADMIN') return res.status(403).json({ message: 'Unauthorized access' });
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};  

