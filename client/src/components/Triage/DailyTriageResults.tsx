import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import type { Triage } from "../../types/Triage";
import { API_URL } from "../../lib/utils";
import { TriageResults } from "./TriageResults";
import { format } from "date-fns";

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
          `${API_URL}/patient/${user?._id}/triage/daily`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch daily triages");

        const { triages } = await response.json();
        setTriages(triages);
        if (triages.length > 0) {
          setSelectedTriage(triages[0]);
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
