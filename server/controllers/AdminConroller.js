import { User } from "../models/User.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "An error ocurred" });
    console.log(error);
  }
};
