import { Appointment } from "../models/AppointmentSchema.js";
export const doctorAvailability = async (req, res, next) => {
  try {
    const existingAppointment = await Appointment.findOne({
      doctorId: req.body.doctorId,
      date: req.body.date,
    });
    if (existingAppointment) {
      return res.status(400).json({
        message: "Slot is already booked for this doctor on this date",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
