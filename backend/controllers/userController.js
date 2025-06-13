const User = require("../models/User");

// ✅ Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err.message);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// ✅ Update user's profile (username or email)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email } = req.body;

    // Basic validation
    if (!username && !email) {
      return res.status(400).json({ error: "No update fields provided" });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
