import React from "react";
import type { Triage } from "../../types/Triage";
import { InfoIcon } from "lucide-react";

interface TriageFormProps {
  symptoms: Triage["symptoms"];
  setSymptoms: (symptoms: Triage["symptoms"]) => void;
  additionalInfo: Triage["additionalInfo"];
  setAdditionalInfo: (info: Triage["additionalInfo"]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isDisabled: boolean;
}

export const TriageForm = ({
  symptoms,
  setSymptoms,
  additionalInfo,
  setAdditionalInfo,
  onSubmit,
  isDisabled,
}: TriageFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md h-full"
    >
      {isDisabled && (
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            You've reached your daily triage limit. Please try again tomorrow.
          </p>
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="symptoms"
          className="form-label text-gray-700 dark:text-gray-200 font-medium"
        >
          Primary description
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          rows={4}
          placeholder="Describe how you feel eg headache, fever,nausea....etc"
          required
          className="form-input"
          value={symptoms.description}
          onChange={(e) =>
            setSymptoms({ ...symptoms, description: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="duration" className="form-label">
          Duration
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          placeholder="How long have you had these symptoms?"
          required
          className="form-input"
          value={symptoms.duration}
          onChange={(e) =>
            setSymptoms({ ...symptoms, duration: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="severity" className="form-label">
          Severity &nbsp; <InfoIcon className="inline-block h-4 w-4" />{" "}
          <i>(how would you rate your symptoms?)</i>
        </label>
        <select
          id="severity"
          name="severity"
          required
          className="form-input"
          value={symptoms.severity}
          onChange={(e) =>
            setSymptoms({
              ...symptoms,
              severity: e.target.value as "mild" | "moderate" | "severe",
            })
          }
        >
          <option value="" disabled>
            Select severity
          </option>
          <option value="mild">Mild (Can perform daily activities)</option>
          <option value="moderate">Moderate (Affects daily activities)</option>
          <option value="severe">
            Severe (Cannot perform daily activities)
          </option>
          <option value="critical">Critical (Life-threatening)</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="onset" className="form-label">
          Onset
        </label>
        <input
          type="text"
          id="onset"
          name="onset"
          placeholder="When did your symptoms start?"
          required
          className="form-input"
          value={symptoms.onset}
          onChange={(e) => setSymptoms({ ...symptoms, onset: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="associatedSymptoms" className="form-label">
          Associated Symptoms
        </label>
        <input
          type="text"
          id="associatedSymptoms"
          name="associatedSymptoms"
          placeholder="Any other symptoms? (comma separated)"
          className="form-input"
          value={symptoms.associatedSymptoms.join(", ")}
          onChange={(e) =>
            setSymptoms({
              ...symptoms,
              associatedSymptoms: e.target.value.split(", "),
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Current Medications</label>
        <textarea
          className="form-input"
          placeholder="List any medications you're currently taking"
          value={additionalInfo.currentMedications.join(", ")}
          onChange={(e) =>
            setAdditionalInfo({
              ...additionalInfo,
              currentMedications: e.target.value.split(", "),
            })
          }
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Allergies</label>
        <textarea
          className="form-input"
          placeholder="List any known allergies"
          value={additionalInfo.allergies.join(", ")}
          onChange={(e) =>
            setAdditionalInfo({
              ...additionalInfo,
              allergies: e.target.value.split(", "),
            })
          }
        />
      </div>
      <button type="submit" className="button-primary">
        Submit
      </button>
    </form>
  );
};

export default TriageForm;
