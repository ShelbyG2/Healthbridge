import { protect } from "../middleware/AuthMiddleware.js";
import DoctorAvailability from "../models/DoctorAvailability.js";
import express from "express";

const router = express.Router();
router.post("/doctor/availability", protect, async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { slots } = req.body;

    let doctorAvailability = await DoctorAvailability.findOne({
      doctorId,
    });

    if (!doctorAvailability) {
      doctorAvailability = new DoctorAvailability({
        doctorId,
        slots,
      });
    } else {
      doctorAvailability.slots = slots;
    }

    await doctorAvailability.save();
    res
      .status(200)
      .json({ message: "Doctor availability set successfully 😊" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
  }
});

export default router;
