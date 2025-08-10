import { protect } from "../middleware/AuthMiddleware.js";
import {
  postAvailability,
  getAvailability,
  updateAvailability,
} from "../controllers/DoctorsController.js";
import express from "express";

const router = express.Router();
router.post("/doctor/availability", protect, postAvailability);
router.get("/doctor/availability", protect, getAvailability);
router.put("/doctor/availability", protect, updateAvailability);

export default router;
