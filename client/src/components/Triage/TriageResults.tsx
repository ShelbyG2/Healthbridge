import type { Triage } from "../../types/Triage";
import { motion } from "framer-motion";
import { AlertTriangle, Heart, Clock, Activity } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl mx-auto p-4"
    >
      <div className="glass-card bg-opacity-30 backdrop-blur-lg">
        {/* Modern Header with Glassmorphism */}

        <div className="p-6 space-y-4">
          {/* Urgency Level Card with Animation */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="card-gradient p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-light-text dark:text-white">
                  Urgency Level
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`pill-${triageResult.urgencyLevel} animate-pulse`}
                >
                  {triageResult.urgencyLevel.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Specialist Recommendation */}
            <div className="card-gradient p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-light-text dark:text-white">
                  Specialist
                </h3>
              </div>
              <span className="pill-primary">
                {triageResult.recommendedSpecialist}
              </span>
            </div>
          </motion.div>

          {/* Possible Conditions with Modern Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold text-light-text dark:text-white">
                Possible Conditions
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {triageResult.possibleConditions.map((condition, index) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  key={condition.condition}
                  className="card-gradient p-4 rounded-xl flex justify-between items-center"
                >
                  <span className="text-light-text dark:text-white font-medium">
                    {condition.condition}
                  </span>
                  <span className={`pill-${condition.confidenceLevel}`}>
                    {condition.confidenceLevel}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Medical Advice Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-light-text dark:text-white">
                  Immediate Actions
                </h3>
              </div>
              <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
                {triageResult.adviceIfNear}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-light-text dark:text-white">
                  Alternative Actions
                </h3>
              </div>
              <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
                {triageResult.adviceIfNotNear}
              </p>
            </motion.div>
          </div>

          {/* Action Button with Modern Design */}
          {canStartNew && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center pt-4"
            >
              <button
                onClick={onNewTriage}
                className="button-primary flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Start New Assessment
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
