const jwt = require("jsonwebtoken");


const generateJwtToken = async (id, role, subscription, walletAddress) => {
  try {
    const token = jwt.sign(
      { id: id, role: role, subscription: subscription, walletAddress: walletAddress }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Token generation failed");
  }
};

module.exports = generateJwtToken;