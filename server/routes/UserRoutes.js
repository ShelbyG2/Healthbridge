import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { User } from "../models/User.js";

const router = express.Router();

router.put("/profile", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullname, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.json(404).json({ message: "User not found" });
    }
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await user.save();
    res.status(200).json({ message: "Profile updated successfully 😊" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
