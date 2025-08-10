import DoctorAvailability from "../models/DoctorAvailability.js";
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
