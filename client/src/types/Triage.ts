interface Symptoms {
  description: string;
  duration: string;
  severity: "mild" | "moderate" | "severe";
  onset: string;
  associatedSymptoms: string[];
}

interface AdditionalInfo {
  age: number;
  gender: "male" | "female" | "other";
  existingConditions: string[];
  currentMedications: string[];
  allergies: string[];
}

interface PossibleCondition {
  condition: string;
  confidenceLevel: "low" | "medium" | "high";
  _id: string;
}

interface TriageResult {
  possibleConditions: PossibleCondition[];
  urgencyLevel: "low" | "medium" | "high";
  recommendedSpecialist:
    | "cardiologist"
    | "dermatologist"
    | "neurologist"
    | "pediatrician"
    | "psychiatrist"
    | "other";
  adviceIfNear: string;
  adviceIfNotNear: string;
}

interface Triage {
  _id: string;
  patientId: string;
  symptoms: Symptoms;
  additionalInfo: AdditionalInfo;
  triageResult: TriageResult;
  disclaimer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type {
  Triage,
  Symptoms,
  AdditionalInfo,
  TriageResult,
  PossibleCondition,
};
