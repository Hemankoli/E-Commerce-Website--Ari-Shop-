const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Extract Bearer token from headers
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

// Middleware: Check if user is authenticated
exports.checkAuthenticated = async (req, res, next) => {
  const token = verifyToken(req);

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    try {
      const user = await User.findById(decodedToken.user_id); // Using MongoDB _id
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.locals.user = user;
      next();
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Server error while fetching user." });
    }
  });
};

// Middleware: Check if user is admin
exports.isAdmin = async (req, res, next) => {
  const token = verifyToken(req);

  if (!token) {
    return res.status(401).json({ message: "No token provided, unauthorized." });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      console.log("JWT Error:", err.message);
      return res.status(401).json({ message: "Unauthorized access. Invalid token." });
    }

    try {
      const user = await User.findById(decodedToken.user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      if (user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Admins only." });
      }
      res.locals.user = user;
      next();
    } catch (error) {
      console.log("Database error:", error.message);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
};
