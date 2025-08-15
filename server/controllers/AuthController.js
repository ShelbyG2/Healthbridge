import { User } from "../models/User.js";
import generateToken from "../utils/GenerateToken.js";
export const signUp = async (req, res) => {
  const { fullname, email, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ fullname: fullname }, { email: email }],
  });
  if (existingUser) {
    res.status(400).json({ message: "Email alredy taken" });
    return;
  }

  if (!fullname || !email || !password || !role) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const user = await User.create({ fullname, email, password, role });

    res.status(201).json({
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
    console.log(user);
  } catch (error) {
    console.error(error);
    console.log("An error occured");
    res.status(500).json({ message: "Internal server error " });
    return;
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Wrong credentials " });
      return;
    }
    user.lastlogin = Date.now();
    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      domain:
        process.env.NODE_ENV === "production"
          ? ".onrender.com" // Allow cookies across subdomains
          : "localhost",
    });
    res.status(200).json({
      message: "Logged in succesfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const Me = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
