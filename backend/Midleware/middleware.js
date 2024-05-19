const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent in Authorization header
    const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
       req.user  =  decoded ; // Attach the decoded token payload (which includes userId) to the request
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authMiddleware;
