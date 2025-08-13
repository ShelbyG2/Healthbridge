import DoctorAvailability from "../models/DoctorAvailability.js";
import { User } from "../models/User.js";
import { Appointment } from "../models/AppointmentSchema.js";
export const getaAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "-password -__v"
    );
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
  }
};
export const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await User.findById(doctorId).select("-password -__v");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
  }
};
export const postAvailability = async (req, res) => {
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
};

export const getAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const doctorAvailability = await DoctorAvailability.findOne({ doctorId });
    if (doctorAvailability) {
      res.status(200).json({ slots: doctorAvailability.slots });
    } else {
      res.status(200).json({ slots: [] });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
    console.log(error);
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { slots } = req.body;

    // Validate that slots is an array
    if (!Array.isArray(slots)) {
      return res.status(400).json({ message: "Slots must be an array" });
    }

    // Validate each slot
    for (const slot of slots) {
      if (!slot.dayOfWeek || !slot.startTime || !slot.endTime) {
        return res.status(400).json({
          message: "Each slot must have dayOfWeek, startTime, and endTime",
        });
      }
    }

    const doctorAvailability = await DoctorAvailability.findOneAndUpdate(
      { doctorId },
      { slots },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Doctor availability updated successfully 😊",
      slots: doctorAvailability.slots,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
  }
};

export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId })
      .populate({ path: "patientId", select: "fullname", model: "User" })
      .exec();
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
    console.error("Error fetching appointments:", error);
  }
};

export const updateAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updates = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updates,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error 🚫" });
  }
};
