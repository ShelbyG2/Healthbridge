import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import type { Triage } from "../../types/Triage";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";

const PatientAITriage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const [symptoms, setSymptoms] = useState<Triage["symptoms"]>({
    description: "",
    duration: "",
    severity: "mild",
    onset: "",
    associatedSymptoms: [],
  });
  const [additionalInfo, setAdditionalInfo] = useState<
    Triage["additionalInfo"]
  >({
    age: 0,
    gender: "other",
    existingConditions: [],
    currentMedications: [],
    allergies: [],
  });
  const [triageResult, setTriageResult] = useState<Triage["triageResult"]>({
    possibleConditions: [],
    urgencyLevel: "low",
    recommendedSpecialist: "other",
    adviceIfNear: "",
    adviceIfNotNear: "",
  });
  if (isLoading) {
    return <LoadSpinner />;
  }
  if (!user) {
    setIsLoading(true);
  }
  const patientId = user?.id;
  //fetch triage results for current user

  useEffect(() => {
    const fetchTriageResults = async () => {
      if (!patientId) {
        setIsLoading(false);
        toast.error("Patient ID not found");
        return;
      }

      try {
        const response = await fetch(`/api/triage/${patientId}`);
        const data = await response.json();
        setSymptoms(data.symptoms);
        setAdditionalInfo(data.additionalInfo);
        setTriageResult(data.triageResult);
      } catch (error) {
        console.error("Error fetching triage results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTriageResults();
  }, [patientId]);

  return (
    <div className="flex-1  p-4 md:p-6 w-full flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold">
          Patient AI Triage
        </h1>
      </header>
      <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Triage Results</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Symptoms</h3>
          <p>Description: {symptoms.description}</p>
          <p>Duration: {symptoms.duration}</p>
          <p>Severity: {symptoms.severity}</p>
          <p>Onset: {symptoms.onset}</p>
          <p>
            Associated Symptoms:{" "}
            {symptoms.associatedSymptoms.join(", ") || "None"}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Additional Info</h3>
          <p>Age: {additionalInfo.age}</p>
          <p>Gender: {additionalInfo.gender}</p>
          <p>
            Existing Conditions:{" "}
            {additionalInfo.existingConditions.join(", ") || "None"}
          </p>
          <p>
            Current Medications:{" "}
            {additionalInfo.currentMedications.join(", ") || "None"}
          </p>
          <p>Allergies: {additionalInfo.allergies.join(", ") || "None"}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Triage Result</h3>
          <p>Possible Conditions:</p>
          <ul className="list-disc pl-5">
            {triageResult.possibleConditions.map((condition, index) => (
              <li key={index}>
                {condition.condition} (Confidence: {condition.confidenceLevel})
              </li>
            ))}
          </ul>
          <p>Urgency Level: {triageResult.urgencyLevel}</p>
          <p>Recommended Specialist: {triageResult.recommendedSpecialist}</p>
          <p>Advice if near a facility: {triageResult.adviceIfNear}</p>
          <p>Advice if not near a facility: {triageResult.adviceIfNotNear}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientAITriage;
