import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";

import {
  updatePassword,
  updateProfile,
} from "../controllers/UserController.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);

router.put("/password", protect, updatePassword);
export default router;
