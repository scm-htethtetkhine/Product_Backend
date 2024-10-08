const User = require('../models').User; // Adjust the path to your user model

const calculateDivision = async (req, res) => {
  try {
    // Extract amount and user email from request body
    const { amount, email } = req.body;

    // Set a fixed base point value of 50
    const basePoint = 50;

    // Check if basePoint is not zero to avoid division by zero
    if (basePoint === 0) {
      return res.status(400).json({ message: "Base point cannot be zero." });
    }

    // Perform the division to calculate point
    const result = amount / basePoint;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.point += result; 
    await user.save();

    res.status(200).json({ message: "Point updated successfully", point: user.point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  calculateDivision
};
