const jwt = require('jsonwebtoken');
const pool = require('../database/connection');

const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; 
    return token;
  }
  return null; 
};

exports.checkAuthenticated = async (req, res, next) => {
  const token = verifyToken(req); 

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }

      console.log('Decoded Token:', decodedToken);

      try {
        const [rows] = await pool.promise().execute(
          'SELECT * FROM users WHERE user_id = ?',
          [decodedToken.user_id]
        );

        if (rows.length > 0) {
          res.locals.user = rows[0]; 
          next();
        } else {
          res.locals.user = null;
          return res.status(404).json({ message: 'User not found.' });
        }
      } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error while fetching user.' });
      }
    });
  } else {
    res.locals.user = null;
    return res.status(401).json({ message: 'No token provided.' });
  }
};

exports.isAdmin = async (req, res, next) => {
  const token = verifyToken(req); 

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log('JWT Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized access. Invalid token.' });
      }

      try {
        const [results] = await pool.promise().execute(
          'SELECT * FROM users WHERE user_id = ?',
          [decodedToken.user_id]
        );

        if (results.length > 0) {
          const user = results[0];
          if (user.role === 'ADMIN') {
            res.locals.user = user;
            next(); 
          } else {
            return res.status(403).json({ message: 'Forbidden: Admins only.' });
          }
        } else {
          return res.status(404).json({ message: 'User not found.' });
        }
      } catch (error) {
        console.log('Database error:', error.message);
        return res.status(500).json({ message: 'Internal server error.' });
      }
    });
  } else {
    return res.status(401).json({ message: 'No token provided, unauthorized.' });
  }
};
