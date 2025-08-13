import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
type TriageResults = {
  id: string;
  symptoms: string;
  additionalInfo: string;
  triageResult: string;
};

const PatientAITriage = () => {
  const [AIResults, setAIResults] = useState<TriageResults | null>(null);
  const { user } = useContext(AuthContext);
  const patientId = user?.id;

  return (
    <div className="flex-1  p-4 md:p-6 w-full flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold">
          AI Triage
        </h1>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-lg text-light-text dark:text-dark-text">
          AI Triage is currently under development.
        </p>
        <p className="text-lg text-light-text dark:text-dark-text mt-4">
          Please check back later for updates.
        </p>
      </div>
    </div>
  );
};

export default PatientAITriage;
