import express from "express";
import Triage from "../models/TriageSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();
const parseAIResponse = (aiResponse) => {
  try {
    // Split response into sections
    const sections = aiResponse.split("\n\n");

    // Find the conditions section using more specific matcher
    const conditionsSection = sections.find((s) =>
      s.toLowerCase().startsWith("possible conditions:")
    );

    console.log("Found Conditions Section:", conditionsSection);

    // Updated regex to match the actual format
    const conditionLines = conditionsSection?.split("\n").slice(1) || [];
    const conditions = conditionLines
      .map((line) => {
        // Match pattern: "- Condition Name (confidence: level)"
        const match = line.match(
          /^-\s*(.*?)\s*\(confidence:\s*(low|medium|high)\)/i
        );
        if (!match) return null;

        return {
          condition: match[1].trim(),
          confidenceLevel: match[2].toLowerCase(),
        };
      })
      .filter(Boolean);

    console.log("Parsed Conditions:", conditions);

    // Extract other fields...
    const urgencyLevel =
      sections
        .find((s) => s.includes("Urgency Level:"))
        ?.split(":")[1]
        ?.trim()
        .toLowerCase() || "low";

    const specialistSection = sections.find((s) =>
      s.includes("Recommended Specialist:")
    );
    const recommendedSpecialist =
      specialistSection?.split(":")[1]?.trim().toLowerCase() || "other";

    const adviceNear =
      sections
        .find((s) => s.includes("Immediate Advice if NEAR"))
        ?.split(":")[1]
        ?.trim() || "";

    const adviceNotNear =
      sections
        .find((s) => s.includes("Immediate Advice if NOT NEAR"))
        ?.split(":")[1]
        ?.trim() || "";

    return {
      possibleConditions: conditions,
      urgencyLevel,
      recommendedSpecialist,
      adviceIfNear: adviceNear,
      adviceIfNotNear: adviceNotNear,
    };
  } catch (error) {
    console.error("Parsing Error:", error);
    throw error;
  }
};

router.post("/patient/:patientId/triage", protect, async (req, res) => {
  try {
    const { patientId } = req.params;
    const { symptoms, additionalInfo } = req.body;

    if (!patientId) {
      res
        .status(400)
        .json({ message: "Invalid patientId Please login and try again" });
    }
    if (!symptoms || !additionalInfo) {
      res.status(400).json({ message: "All fields are required!" });
    }
    const triageEntry = await new Triage({
      patientId,
      symptoms,
      additionalInfo,
      triageResult: {
        possibleConditions: [
          {
            condition: "Pending AI Analysis",
            confidenceLevel: "low",
          },
        ],
        urgencyLevel: "low",
        recommendedSpecialist: "other",
        adviceIfNear: "Analysis pending...",
        adviceIfNotNear: "Analysis pending...",
      },
    });
    console.log("Ai entry saved successfully");
    await triageEntry.save();

    const prompt = `You are an AI-powered medical triage assistant. Analyze the patient's case and provide a medical assessment.

PATIENT INFORMATION:
- Primary Complaint: ${symptoms.description}
- Duration: ${symptoms.duration}
- Severity: ${symptoms.severity}
- Onset: ${symptoms.onset}
- Associated Symptoms: ${symptoms.associatedSymptoms.join(", ")}
- Age: ${additionalInfo.age}
- Gender: ${additionalInfo.gender}
- Existing Conditions: ${additionalInfo.existingConditions.join(", ")}
- Current Medications: ${additionalInfo.currentMedications.join(", ")}
- Allergies: ${additionalInfo.allergies.join(", ")}

RETURN YOUR ASSESSMENT IN THE FOLLOWING FORMAT (NO CODE BLOCKS, NO MARKDOWN):

Possible Conditions:
- Condition 1 (confidence: high)
- Condition 2 (confidence: medium)
- Condition 3 (confidence: low)

Urgency Level: [high/medium/low]

Recommended Specialist: [cardiologist/dermatologist/neurologist/pediatrician/psychiatrist/other]

Immediate Advice if NEAR healthcare:
[Your advice here]

Immediate Advice if NOT NEAR healthcare:
[Your advice here]`;

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    const parsedResponse = parseAIResponse(aiResponse);

    const updatedTriage = await Triage.findByIdAndUpdate(
      triageEntry._id,
      {
        triageResult: parsedResponse,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Triage analysis completed successfully",
      triage: updatedTriage,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    console.error(error);
  }
});
router.get("/patient/:patientId/triage", protect, async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      res
        .status(400)
        .json({ message: "Invalid patientId Please login and try again" });
    }
    const triageResults = await Triage.findOne({ patientId }).sort({
      updatedAt: 1,
    });
    if (!triageResults) {
      res.sendStatus(400).json({ message: "No results found" });
    }
    res.status(200).json({ triageResults });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    console.error(error);
  }
});

// Test code
const testResponse = `Possible Conditions:
- Hypertensive Urgency/Emergency (confidence: high)
- Migraine with Aura (confidence: high)
- Other Secondary Headache (e.g., related to increased intracranial pressure) (confidence: medium)

Urgency Level: high

Recommended Specialist: neurologist

Immediate Advice if NEAR healthcare: Proceed immediately to the nearest emergency department...

Immediate Advice if NOT NEAR healthcare: Call emergency services...`;

console.log(parseAIResponse(testResponse));

export default router;
