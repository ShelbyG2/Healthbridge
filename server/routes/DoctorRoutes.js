import { protect } from "../middleware/AuthMiddleware.js";
import {
  getaAllDoctors,
  getDoctorById,
  postAvailability,
  getAvailability,
  updateAvailability,
  getAppointmentsByDoctorId,
  updateAppointmentById,
} from "../controllers/DoctorsController.js";
import express from "express";

const router = express.Router();

router.get("/doctors", protect, getaAllDoctors);
router.get("/doctor/:doctorId", protect, getDoctorById);
router.post("/doctor/availability", protect, postAvailability);
router.get("/doctor/availability", protect, getAvailability);
router.put("/doctor/availability", protect, updateAvailability);
router.get(
  "/doctor/appointments/:doctorId",
  protect,
  getAppointmentsByDoctorId
);
router.put(
  "/doctor/appointments/:appointmentId",
  protect,
  updateAppointmentById
);

export default router;
