// Import required libraries and modules
const jwt = require("jsonwebtoken"); // JSON Web Token for verifying tokens
const userData = require("../models").User; // User model for interacting with the database
const { generateAccessToken, generateRefreshToken } = require("../utility/tokenutility"); // Utility functions to generate new tokens

// Secret key for verifying tokens (should be stored securely, not hardcoded)
const secretKey = "I am SuperMan"; 

// Middleware function to validate access token
const validateToken = async(req, res, next) => {
  // Get the access token from the Authorization header
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  
  // If no access token is provided, return a 401 (Unauthorized) error
  if (!accessToken) {
    return res.status(401).json({ message: "Access Token Required" });
  }
  
  try {
    // Verify the access token
    jwt.verify(accessToken, secretKey);
    // If valid, continue to the next middleware
    next();
  } catch (err) {
    // Handle expired or invalid token errors
    if (err.name === "TokenExpiredError") {
      // Decode the expired token to get the user information
      const expireAccessToken = jwt.decode(accessToken);
      
      // Find the user by ID in the database
      await userData.findByPk(expireAccessToken.id)
        .then((user) => {
          // If the user exists
          if (user != null) {
            try {
              // Verify the refresh token
              jwt.verify(user.refreshtoken, secretKey);
              // Decode the refresh token to get the user information
              const userInfo = jwt.decode(user.refreshtoken);
              
              // Generate new access and refresh tokens
              const newAccessToken = generateAccessToken(userInfo);
              const newRefreshToken = generateRefreshToken(userInfo);
              
              // Update the tokens in the database
              return userData.update(
                {
                  accesstoken: newAccessToken,
                  refreshtoken: newRefreshToken
                },
                { where: { id: expireAccessToken.id }}
              ).then(() => {
                // Continue to the next middleware after updating tokens
                next();
              });
            } catch (err) {
              // Handle expired or invalid refresh token errors
              if (err.name === "TokenExpiredError") {
                return res.status(403).json("Refresh Token Expired");
              } else {
                return res.status(500).json("Invalid Refresh Token");
              }
            }
          } else {
            // Return a 404 (Not Found) error if the user doesn't exist
            res.status(404).json("No User found");
          }
        })
        .catch((error) => {
          // Return a 500 (Internal Server Error) if token update fails
          res.status(500).json({ message: "Failed to update Token" });
        });
    } else {
      // Return a 400 (Bad Request) error for any other invalid tokens
      res.status(400).json("Invalid Token");
    }
  }
};

// Export the validateToken middleware
module.exports = validateToken;
