import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import type { Triage } from "../../types/Triage";
import { API_URL } from "../../lib/utils";
import { TriageResults } from "./TriageResults";

interface DailyTriageResultsProps {
  onNewTriage: () => void;
  canStartNew: boolean;
  triages: Triage[];
  selectedTriage: Triage | null;
  onTriageSelect: (triage: Triage) => void;
}

export const DailyTriageResults = ({
  onNewTriage,
  canStartNew,
  triages,
  selectedTriage,
  onTriageSelect,
}: DailyTriageResultsProps) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDailyTriages = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/patient/${user?._id}/triage/daily`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch daily triages");

        const { triages } = await response.json();
        // Removed setTriages as we're using props directly
        if (triages.length > 0) {
          // Removed setSelectedTriage as we're using props directly
        }
      } catch (error) {
        console.error("Error fetching daily triages:", error);
      }
    };

    fetchDailyTriages();
  }, [user?._id]);

  return (
    <div className="flex-1 p-4">
      <div className="">
        {selectedTriage && (
          <TriageResults
            triageResult={selectedTriage.triageResult}
            onNewTriage={onNewTriage}
            canStartNew={canStartNew}
          />
        )}
      </div>
    </div>
  );
};
