import type { Triage } from "../../types/Triage";

interface TriageResultsProps {
  triageResult: Triage["triageResult"];
  onNewTriage: () => void;
  canStartNew: boolean;
}

export const TriageResults = ({
  triageResult,
  onNewTriage,
  canStartNew,
}: TriageResultsProps) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            AI Triage Assessment
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Based on your symptoms and information provided
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">
              Urgency Level
            </h3>
            <div
              className={`text-lg font-bold rounded-full px-4 py-2 inline-block
              ${
                triageResult.urgencyLevel === "high"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : triageResult.urgencyLevel === "medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}
            >
              {triageResult.urgencyLevel.toUpperCase()}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">
              Recommended Specialist
            </h3>
            <p className="text-lg capitalize">
              {triageResult.recommendedSpecialist}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">
            Possible Conditions
          </h3>
          <div className="space-y-3">
            {triageResult.possibleConditions.map((condition) => (
              <div
                key={condition.condition}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-800 dark:text-white">
                  {condition.condition}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    condition.confidenceLevel === "high"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : condition.confidenceLevel === "medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {condition.confidenceLevel.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-200">
              If Near Healthcare Facility
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              {triageResult.adviceIfNear}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-purple-800 dark:text-purple-200">
              If NOT Near Healthcare Facility
            </h3>
            <p className="text-purple-700 dark:text-purple-300">
              {triageResult.adviceIfNotNear}
            </p>
          </div>
        </div>

        {canStartNew && (
          <div className="mt-6 text-center">
            <button
              onClick={onNewTriage}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Start New Triage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
