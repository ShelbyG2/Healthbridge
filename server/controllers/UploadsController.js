import { User } from "../models/User.js";
export const ProfileImageUpload = async (req, res) => {
  try {
    const imageUrl = req.file.path;
    // Save the image URL to the user's profile in the database
    await User.findByIdAndUpdate(req.user.id, { profileImage: imageUrl });
    res
      .status(200)
      .json({ message: "Profile image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({
      message: "Failed to upload profile image",
      error: error.message,
    });
  }
};
