import mongoose from "mongoose";
const TriageSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    symptoms: {
      description: { type: String, required: true },
      duration: { type: String, required: true },
      severity: {
        type: String,
        enum: ["mild", "moderate", "severe", "critical"],
        required: true,
      },
      onset: { type: String, required: true },
      associatedSymptoms: { type: [String], default: [] },
    },
    additionalInfo: {
      age: { type: Number, required: true },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
      existingConditions: { type: [String], default: [] },
      currentMedications: { type: [String], default: [] },
      allergies: { type: [String], default: [] },
    },

    triageResult: {
      possibleConditions: [
        {
          condition: { type: String, required: true },
          confidenceLevel: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
          },
        },
      ],
      urgencyLevel: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
      },
      recommendedSpecialist: {
        type: String,
        enum: [
          "cardiologist",
          "dermatologist",
          "neurologist",
          "pediatrician",
          "psychiatrist",
          "other",
        ],
        required: true,
      },
      adviceIfNear: { type: String, required: true },
      adviceIfNotNear: { type: String, required: true },
    },
    disclaimer: {
      type: String,
      default:
        "This is a simulated medical triage system and is not a substitute for professional medical advice, diagnosis, or treatment.",
      required: true,
    },
  },
  { timestamps: true }
);

const Triage = mongoose.model("Triage", TriageSchema);
export default Triage;
