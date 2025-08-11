import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { Appointment } from "../models/AppointmentSchema.js";
import { doctorAvailability } from "../middleware/CheckDoctorAvailability.js";
const router = express.Router();

router.post(
  "/appointment/book",
  protect,
  doctorAvailability,
  async (req, res) => {
    try {
      const patientId = req.user.id;
      const { doctorId, date, status, reason } = req.body;
      const appointment = await Appointment.create({
        patientId,
        doctorId,
        date,
        status,
        reason,
      });
      res.status(201).json({
        message: "Appointment booked successfully",
        appointment,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.get("/appointments/:patientId", protect, async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await Appointment.find({ patientId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
