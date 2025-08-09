import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    default: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});
const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    slots: [slotSchema],
  },
  { timestamps: true }
);

export default mongoose.model("DoctorAvailability", availabilitySchema);
