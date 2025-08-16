import { useContext, useState } from "react";
import { PatientDashboardData } from "../../hooks/PatientDashboardData";
import Doctor from "../../assets/doctor2.jpg";
import { AuthContext } from "../../context/AuthProvider";
import {
  Brain,
  Clock,
  FileClock,
  MessageCircle,
  PhoneCallIcon,
  User,
  HeartPulse,
} from "lucide-react";
import LoadSpinner from "../../components/LoadSpinner";

interface TriageResult {
  symptoms: {
    description: string;
    duration: string;
    severity: string;
    onset: string;
    associatedSymptoms: string[];
  };
  triageResult: {
    possibleConditions: Array<{
      condition: string;
      confidenceLevel: string;
      _id: string;
    }>;
    urgencyLevel: string;
    recommendedSpecialist: string;
    adviceIfNear: string;
    adviceIfNotNear: string;
  };
  createdAt: string;
  _id: string;
}

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const name = user?.fullname;
  const { triages, appointments, isLoading, isError } = PatientDashboardData(
    user?._id || ""
  );
  const now = new Date();

  const triageResults =
    triages.length > 0
      ? [
          {
            id: triages[0]._id,
            urgency: triages[0].triageResult.urgencyLevel,
            summary: `${triages[0].symptoms.description} - ${triages[0].symptoms.severity}`,
            specialist: triages[0].triageResult.recommendedSpecialist,
            date: new Date(triages[0].createdAt).toLocaleDateString(),
            conditions: triages[0].triageResult.possibleConditions,
          },
        ]
      : [];
  const triageCount = triages.length;
  const upcomingAppointment = appointments
    .filter(
      (a) =>
        new Date(a.date) > now &&
        ["Confirmed", "Pending", "Updated"].includes(a.status)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  console.log(appointments);
  const messages = [
    { id: 1, text: "Your test results are ready for review", time: "3:12 PM" },
    { id: 2, text: "Your prescription has been refilled", time: "2:45 PM" },
    { id: 3, text: "Your appointment is confirmed", time: "1:30 PM" },
    {
      id: 4,
      text: "You have a new message from your doctor",
      time: "12:15 PM",
    },
    { id: 5, text: "Your lab results are available", time: "11:00 AM" },
    { id: 6, text: "Reminder: Take your medication", time: "10:30 AM" },
    { id: 7, text: "Your follow-up appointment is scheduled", time: "9:00 AM" },
    { id: 8, text: "New health tips available for you", time: "8:45 AM" },
    {
      id: 9,
      text: "Your health insurance claim has been processed",
      time: "8:00 AM",
    },
    { id: 10, text: "Your health profile has been updated", time: "7:30 AM" },
  ];

  // Update loading check
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center text-light-error dark:text-dark-error">
        Error loading dashboard data
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 w-full flex flex-col overflow-hidden">
      {/* hero section */}
      <header className="flex overflow-hidden flex-col mb-8">
        <h1 className="text-light-text dark:text-dark-text text-2xl lg:text-4xl font-bold">
          Welcome back, {name}
        </h1>
      </header>
      {/* main widgets */}
      <section className="flex-1 overflow-y-auto dashboard-grid pb-8 ">
        {/* Quick Stats */}
        <div className="flex-grow p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-accent dark:border-dark-accent transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Total Appointments
              </h3>
              <p className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                5
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-success dark:border-dark-success transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Pending Messages
              </h3>
              <p className="text-3xl font-bold text-light-success dark:text-dark-success">
                3
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-logo-blue dark:border-dark-logo-blue transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Medical Adherence
              </h3>
              <p className="text-3xl font-bold text-light-logo-blue dark:text-dark-logo-blue">
                86%
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-logo-blue dark:border-dark-logo-blue transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Taken Triages
              </h3>
              <p className="text-3xl font-bold text-light-logo-blue dark:text-dark-logo-blue">
                {triageCount}/3
              </p>
            </div>
          </div>
        </div>
        {/* appointment card */}
        <div className="bg-gradient-to-br from-light-accent/10 to-light-accent/20 dark:from-dark-accent/10 dark:to-dark-accent/20 p-6 rounded-xl shadow-lg hover:shadow-xl flex-grow transition-transform duration-300 hover:scale-105 border border-light-accent/30 dark:border-dark-accent/30">
          <div className="flex items-center gap-3 mb-4">
            <FileClock className="w-8 h-8 text-light-accent dark:text-dark-accent" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Upcoming Appointment
            </h2>
          </div>
          <div className="space-y-3">
            {upcomingAppointment ? (
              <>
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text"></h3>
                <p className="text-light-secondary dark:text-dark-secondary">
                  {new Date(upcomingAppointment.date).toLocaleDateString()} at{" "}
                  {new Date(upcomingAppointment.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-light-secondary dark:text-dark-secondary">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      upcomingAppointment.status === "Confirmed"
                        ? "text-light-success dark:text-dark-success"
                        : "text-light-warning dark:text-dark-warning"
                    }`}
                  >
                    {upcomingAppointment.status}
                  </span>
                </p>

                <button className="w-full mt-4 bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-white dark:text-white font-medium rounded-lg p-3 duration-300 transition-all hover:shadow-md">
                  View Details
                </button>
              </>
            ) : (
              <>
                <p className="text-light-secondary dark:text-dark-secondary">
                  No upcoming appointments
                </p>

                <button className="w-full mt-4 bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-white dark:text-white font-medium rounded-lg p-3 duration-300 transition-all hover:shadow-md">
                  Book Appointment
                </button>
              </>
            )}
          </div>
        </div>
        {/* Triage result card */}
        <div className="bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg p-6 rounded-xl flex-grow shadow-lg hover:shadow-xl duration-300 transition-transform hover:scale-105 border border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-light-logo-blue dark:text-dark-logo-blue" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Latest Triage Results
            </h2>
          </div>
          <div className="space-y-3">
            {triageResults.map((result) => (
              <div
                key={result.id}
                className="bg-white dark:bg-dark-surface/80 border border-light-border/50 dark:border-dark-border/50 p-4 rounded-lg shadow-sm"
              >
                <p className="text-light-text dark:text-dark-text font-medium mb-2">
                  {result.summary}
                </p>
                <div className="text-light-secondary dark:text-dark-secondary space-y-1 text-sm">
                  <p>
                    Urgency:{" "}
                    <span
                      className={`font-semibold ${
                        result.urgency === "high"
                          ? "text-light-error dark:text-dark-error"
                          : result.urgency === "medium"
                          ? "text-light-warning dark:text-dark-warning"
                          : "text-light-success dark:text-dark-success"
                      }`}
                    >
                      {result.urgency.toUpperCase()}
                    </span>
                  </p>
                  <p>Specialist: {result.specialist}</p>
                  <p>Date: {result.date}</p>
                  <div className="mt-2">
                    <p className="font-medium mb-1">Possible Conditions:</p>
                    <ul className="list-disc list-inside">
                      {result.conditions.map((condition) => (
                        <li key={condition._id} className="text-xs">
                          {condition.condition}{" "}
                          <span
                            className={`${
                              condition.confidenceLevel === "high"
                                ? "text-light-error dark:text-dark-error"
                                : "text-light-warning dark:text-dark-warning"
                            }`}
                          >
                            ({condition.confidenceLevel})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTriage(result)}
                  className="mt-2 bg-light-logo-blue dark:bg-dark-logo-blue hover:bg-opacity-90 dark:hover:bg-opacity-90 text-white font-medium rounded-lg p-2 transition-all duration-300 hover:shadow-md w-full"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* assigned doctor */}
        <div className="bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform flex-grow duration-300 hover:scale-105 border border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-8 h-8 text-light-success dark:text-dark-success" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Assigned Doctor
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="rounded-full w-24 h-24 p-1 bg-gradient-to-r from-light-accent to-light-success dark:from-dark-accent dark:to-dark-success">
              <img
                src={Doctor}
                alt="Doctor"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
              Dr. Jane
            </h3>
            <p className="text-light-secondary dark:text-dark-secondary">
              General Medicine
            </p>
            <p className="flex items-center gap-2 text-light-secondary dark:text-dark-secondary">
              <PhoneCallIcon className="w-4 h-4 text-light-success dark:text-dark-success" />{" "}
              (123) 456-7890
            </p>
            <button className="w-full mt-2 bg-gradient-to-r from-light-accent to-light-success dark:from-dark-accent dark:to-dark-success hover:opacity-90 text-white font-medium rounded-lg p-3 transition-all duration-300 hover:shadow-md">
              Contact Doctor
            </button>
          </div>
        </div>
        {/* health tracker */}
        <div className="bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform flex-grow duration-300 hover:scale-105 border border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3 mb-4">
            <HeartPulse className="w-8 h-8 text-light-accent dark:text-dark-accent" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Health Tracker
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-light-accent dark:bg-dark-accent"></div>
              <p className="text-light-secondary dark:text-dark-secondary">
                Next Dosage:{" "}
                <span className="text-light-text dark:text-dark-text font-medium">
                  10:00 AM
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-light-success dark:bg-dark-success"></div>
              <p className="text-light-secondary dark:text-dark-secondary">
                Last Checkup:{" "}
                <span className="text-light-text dark:text-dark-text font-medium">
                  2023-09-15
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-light-logo-blue dark:bg-dark-logo-blue"></div>
              <p className="text-light-secondary dark:text-dark-secondary">
                Next Checkup:{" "}
                <span className="text-light-text dark:text-dark-text font-medium">
                  2023-10-15
                </span>
              </p>
            </div>
            <button className="w-full mt-4 bg-light-accent dark:bg-dark-accent hover:opacity-90 text-white font-medium rounded-lg p-2 transition-all duration-300 hover:shadow-md">
              View Health Records
            </button>
          </div>
        </div>
        {/* messages */}
        <div className="bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform flex-grow duration-300 hover:scale-105 border border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-light-logo-blue dark:text-dark-logo-blue" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Recent Messages
            </h2>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white dark:bg-dark-surface/80 border border-light-border/50 dark:border-dark-border/50 p-3 rounded-lg shadow-sm"
              >
                <p className="text-light-text dark:text-dark-text text-sm">
                  {message.text}
                </p>
                <div className="flex justify-end">
                  <span className="text-light-accent dark:text-dark-accent text-xs font-medium">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* health tips */}
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl  flex-grow duration-300 h-fit  transition-transform hover:scale-105">
          <div className="flex items-center gap-3 mb-4">
            <HeartPulse className="w-8 h-8 text-light-accent dark:text-dark-accent" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Health Tips
            </h2>
          </div>
          <ul className="space-y-2">
            <li className="text-light-secondary dark:text-dark-secondary">
              ✅ Stay hydrated by drinking plenty of water.
            </li>
            <li className="text-light-secondary dark:text-dark-secondary">
              ✅ Maintain a balanced diet rich in fruits and vegetables.
            </li>
            <li className="text-light-secondary dark:text-dark-secondary">
              ✅ Exercise regularly to keep your body active.
            </li>
            <li className="text-light-secondary dark:text-dark-secondary">
              ✅ Get enough sleep to help your body recover.
            </li>
          </ul>
        </div>
        {/* doctors next available */}
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform flex-grow duration-300 h-fit hover:scale-105">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-light-accent dark:text-dark-accent" />
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Doctors Next Available
            </h2>
          </div>
          <ul className="space-y-2">
            <li className="text-light-secondary dark:text-dark-secondary">
              Dr. Smith - 10:00 AM
            </li>
            <li className="text-light-secondary dark:text-dark-secondary">
              {" "}
              Dr. Johnson - 11:30 AM
            </li>
            <li className="text-light-secondary dark:text-dark-secondary">
              Dr. Lee - 1:00 PM
            </li>
            <li className="text-light-secondary dark:text-dark-secondary">
              {""}
              Dr. Patel - 2:30 PM
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
