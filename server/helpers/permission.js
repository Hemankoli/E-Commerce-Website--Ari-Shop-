const User = require("../models/User");

const uploadProductPermission = async (userId) => {
  try {
    const user = await User.findById(userId).select("role"); // Only fetch role
    if (user && user.role === "Admin") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking user role:", error);
    throw new Error("Could not check user role");
  }
};

module.exports = uploadProductPermission;
