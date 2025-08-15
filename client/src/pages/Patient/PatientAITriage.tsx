import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import type { Triage } from "../../types/Triage";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import { API_URL } from "../../lib/utils";
import TriageForm from "../../components/Triage/TriageForm";
import { TriageResults } from "../../components/Triage/TriageResults";

const DAILY_TRIAGE_LIMIT = 3; // Configure your desired limit

const PatientAITriage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const [dailyTriageCount, setDailyTriageCount] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchDailyTriageCount = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(
          `${API_URL}/api/patient/${user._id}/triage/count`
        );
        if (!res.ok) throw new Error("Failed to fetch triage count");
        const { count } = await res.json();
        setDailyTriageCount(count);
      } catch (error) {
        console.error("Error fetching triage count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyTriageCount();
  }, [user?._id]);

  const handleTriageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dailyTriageCount >= DAILY_TRIAGE_LIMIT) {
      toast.error(
        `You've reached the daily limit of ${DAILY_TRIAGE_LIMIT} triages`
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/patient/${user?._id}/triage`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          additionalInfo,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      console.log("Triage Response:", data);

      if (data.triageResults) {
        setTriageResult(data.triageResults.triageResult);
        setDailyTriageCount((prev) => prev + 1);
        setShowResults(true);
        toast.success("Triage assessment completed successfully!");
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      toast.error("Failed to submit triage!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="flex-1 md:p-6 w-full flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg">
      <header className="pt-6 w-full bg-light-surface dark:bg-dark-surface p-4 shadow-md">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold text-center">
          How are you feeling today?
        </h1>
        <p className="text-lg text-light-secondary dark:text-dark-secondary text-center">
          Welcome to HealthBridge AI triage
        </p>
        <p className="text-sm text-light-secondary dark:text-dark-secondary text-center">
          Triages today: {dailyTriageCount}/{DAILY_TRIAGE_LIMIT}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {!showResults ? (
          <TriageForm
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
            onSubmit={handleTriageSubmit}
            isDisabled={dailyTriageCount >= DAILY_TRIAGE_LIMIT}
          />
        ) : (
          <TriageResults
            triageResult={triageResult}
            onNewTriage={() => setShowResults(false)}
            canStartNew={dailyTriageCount < DAILY_TRIAGE_LIMIT}
          />
        )}
      </div>
    </div>
  );
};

export default PatientAITriage;
