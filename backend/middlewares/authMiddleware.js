// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Use a secure secret from env variables
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookies or headers
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
