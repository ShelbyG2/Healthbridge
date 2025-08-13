import express from "express";
import Triage from "../models/TriageSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();
const parseAIResponse = (aiResponse) => {
  try {
    // Split response into sections
    const sections = aiResponse.split("\n\n");

    // Extract possible conditions
    const conditionsSection = sections.find(
      (s) =>
        s.includes("possible conditions") || s.includes("Possible conditions")
    );
    const conditions =
      conditionsSection
        ?.match(/[-•]\s*(.*?)\s*\((low|medium|high)\)/gi)
        ?.map((condition) => {
          const [name, level] = condition.split(/\((.*?)\)/).filter(Boolean);
          return {
            condition: name.replace(/[-•]\s*/, "").trim(),
            confidenceLevel: level.toLowerCase(),
          };
        }) || [];

    // Extract urgency level
    const urgencySection = sections.find(
      (s) => s.includes("Urgency level") || s.includes("urgency:")
    );
    const urgencyLevel = (
      urgencySection?.match(/(low|medium|high)/i)?.[0] || "low"
    ).toLowerCase();

    // Extract specialist
    const specialistSection = sections.find(
      (s) => s.includes("specialist") || s.includes("Recommended")
    );
    const specialist = (
      specialistSection?.match(
        /(cardiologist|dermatologist|neurologist|pediatrician|psychiatrist|other)/i
      )?.[0] || "other"
    ).toLowerCase();

    // Extract advices
    const adviceNearSection = sections.find((s) =>
      s.toLowerCase().includes("advice if near healthcare")
    );
    const adviceNotNearSection = sections.find((s) =>
      s.toLowerCase().includes("advice if not near healthcare")
    );

    const adviceIfNear =
      adviceNearSection
        ?.replace(/Immediate Advice if NEAR healthcare:/i, "")
        .trim() || "Please consult a healthcare provider.";

    const adviceIfNotNear =
      adviceNotNearSection
        ?.replace(/Immediate Advice if NOT NEAR healthcare:/i, "")
        .trim() || "Please consult a healthcare provider.";

    return {
      possibleConditions: conditions,
      urgencyLevel,
      recommendedSpecialist: specialist,
      adviceIfNear,
      adviceIfNotNear,
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      possibleConditions: [
        {
          condition: "Error in analysis",
          confidenceLevel: "low",
        },
      ],
      urgencyLevel: "low",
      recommendedSpecialist: "other",
      adviceIfNear:
        "Please consult a healthcare provider for proper evaluation.",
      adviceIfNotNear:
        "Please consult a healthcare provider for proper evaluation.",
    };
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
- [Condition Name] (confidence: high/medium/low)

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
    const triageResults = await Triage.find({ patientId });
    if (!triageResults) {
      res.sendStatus(400).json({ message: "No results found" });
    }
    res.status(200).json(triageResults);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    console.error(error);
  }
});

export default router;
