import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import type { Triage } from "../../types/Triage";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import { API_URL } from "../../lib/utils";
import TriageForm from "../../components/Triage/TriageForm";
import { DailyTriageResults } from "../../components/Triage/DailyTriageResults";
import { cardStyles, buttonStyles, textStyles } from "../../styles/shared";
import { format } from "date-fns";

const DAILY_TRIAGE_LIMIT = 3;

const initialSymptoms: Triage["symptoms"] = {
  description: "",
  duration: "",
  severity: "mild",
  onset: "",
  associatedSymptoms: [],
};

const initialAdditionalInfo: Triage["additionalInfo"] = {
  age: 0,
  gender: "other",
  existingConditions: [],
  currentMedications: [],
  allergies: [],
};

const PatientAITriage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const [dailyTriageCount, setDailyTriageCount] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const [symptoms, setSymptoms] = useState<Triage["symptoms"]>(initialSymptoms);
  const [additionalInfo, setAdditionalInfo] = useState<
    Triage["additionalInfo"]
  >(initialAdditionalInfo);
  const [triageResult, setTriageResult] = useState<Triage["triageResult"]>({
    possibleConditions: [],
    urgencyLevel: "low",
    recommendedSpecialist: "other",
    adviceIfNear: "",
    adviceIfNotNear: "",
  });
  const [triages, setTriages] = useState<Triage[]>([]);
  const [selectedTriage, setSelectedTriage] = useState<Triage | null>(null);

  const resetForm = () => {
    setSymptoms(initialSymptoms);
    setAdditionalInfo(initialAdditionalInfo);
  };

  const toggleView = (showResults: boolean) => {
    if (!showResults) {
      resetForm(); // Reset form when switching to new triage
    }
    setShowResults(showResults);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!user?._id) return;

      try {
        const [countRes, triagesRes] = await Promise.all([
          fetch(`${API_URL}/api/patient/${user._id}/triage/count`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`${API_URL}/api/patient/${user._id}/triage/daily`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (!countRes.ok) throw new Error("Failed to fetch triage count");
        const { count } = await countRes.json();
        setDailyTriageCount(count);

        if (triagesRes.ok) {
          const { triages } = await triagesRes.json();
          setTriages(triages);
          if (triages && triages.length > 0) {
            setSelectedTriage(triages[0]);
            setShowResults(true);
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load triage information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
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

      const { message, triage } = await res.json(); // Destructure the correct properties
      console.log("Triage Response:", { message, triage });

      if (triage && triage.triageResult) {
        setTriageResult(triage.triageResult);
        setDailyTriageCount((prev) => prev + 1);
        setShowResults(true);
        toast.success(message || "Triage assessment completed successfully!");
      } else {
        throw new Error("Missing triage result data");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit triage!"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="flex-1 min-h-screen">
      {/* Futuristic Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div
          className="relative z-10 pt-8 pb-6 px-4 md:px-6 bg-light-surface/80 dark:bg-dark-surface/80 
        backdrop-blur-lg border-b border-light-border/10 dark:border-dark-border/10"
        >
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
              {showResults
                ? "Todays Triage Results"
                : "  How are you feeling today?"}
            </h1>
            <p className="text-light-secondary dark:text-dark-secondary text-lg">
              AI-Powered Health Assessment
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div
                className="px-4 py-2 rounded-full bg-light-surface dark:bg-dark-surface 
              border border-light-border/20 dark:border-dark-border/20"
              >
                <span className="text-light-secondary dark:text-dark-secondary">
                  Triages today: {dailyTriageCount}/{DAILY_TRIAGE_LIMIT}
                </span>
              </div>
              {dailyTriageCount > 0 && (
                <button
                  onClick={() => toggleView(!showResults)}
                  className="px-6 py-2 rounded-full bg-light-surface dark:bg-dark-surface 
                  text-light-accent dark:text-dark-accent hover:bg-light-accent/10 
                  dark:hover:bg-dark-accent/10 transition-all duration-300
                  border border-light-border/20 dark:border-dark-border/20"
                >
                  {showResults ? "Start New Triage" : "View Today's Results"}
                </button>
              )}
            </div>

            {/* Triage Selection Buttons */}
            {showResults && triages.length > 0 && (
              <div className="flex justify-between  mt-4 overflow-x-auto px-4 py-2">
                {triages.map((triage, index) => (
                  <button
                    key={triage._id}
                    onClick={() => setSelectedTriage(triage)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap
                      ${
                        selectedTriage?._id === triage._id
                          ? `${buttonStyles.primary}`
                          : "bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
                      } hover:scale-105`}
                  >
                    Triage {index + 1} (
                    {format(new Date(triage.createdAt), "HH:mm")})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="bg-light-bg dark:bg-dark-bg h-full overflow-auto">
        {isLoading ? (
          <LoadSpinner />
        ) : !showResults ? (
          <TriageForm
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
            onSubmit={handleTriageSubmit}
            isDisabled={dailyTriageCount >= DAILY_TRIAGE_LIMIT}
          />
        ) : (
          <DailyTriageResults
            onNewTriage={() => toggleView(false)}
            canStartNew={dailyTriageCount < DAILY_TRIAGE_LIMIT}
            triages={triages}
            selectedTriage={selectedTriage}
            onTriageSelect={setSelectedTriage}
          />
        )}
      </div>
    </div>
  );
};

export default PatientAITriage;
