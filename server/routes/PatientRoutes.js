import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";

import { doctorAvailability } from "../middleware/CheckDoctorAvailability.js";
import {
  getAppointments,
  postAppointment,
  updateAppointment,
} from "../controllers/PatientControler.js";

const router = express.Router();

router.post("/appointment/book", protect, doctorAvailability, postAppointment);
router.get("/appointments/:patientId", protect, getAppointments);
router.put("/appointment/:id", protect, updateAppointment);

export default router;
