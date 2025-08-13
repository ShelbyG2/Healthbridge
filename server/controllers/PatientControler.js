import { Appointment } from "../models/AppointmentSchema.js";
export const postAppointment = async (req, res) => {
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
};
export const getAppointments = async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await Appointment.find({ patientId })
      .populate({ path: "doctorId", select: "fullname", model: "User" })
      .exec();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
