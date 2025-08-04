import { useContext } from "react";

import Photo from "../../assets/doctor2.jpg";
import { ArrowRight, User2Icon } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  const name = user?.fullname;

  return (
    <div className="flex-1 p-6 w-full flex flex-col overflow-hidden">
      <header className="mb-6">
        <h1 className="text-light-text dark:text-dark-text text-2xl lg:text-4xl font-bold mb-4">
          Welcome back, Dr {name}
        </h1>
        {/* search bar */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search patients, appointments, records..."
            className="bg-white  dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg py-3 px-10 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-300"
          />
        </div>
      </header>
      <section className="flex-1 overflow-y-auto dashboard-grid pb-8">
        {/* profile card */}
        <div className="flex-grow min-h-fit p-6 bg-gradient-to-r from-light-accent to-light-success dark:from-dark-accent dark:to-dark-success rounded-lg shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white dark:text-white text-xl font-semibold mb-2">
                Profile
              </h2>
              <h3 className="text-white dark:text-white text-xl font-bold">
                {name}
              </h3>
              <p className="text-white/80 dark:text-white/80 mb-2">
                General Practitioner
              </p>
              <span className="inline-flex items-center gap-1 text-light-text bg-white/90 dark:bg-white/90 p-2 rounded-md font-medium shadow-sm">
                <User2Icon className="w-4 h-4 text-light-accent" />3 Patients
                today
              </span>
            </div>
            <div className="rounded-full p-1 bg-white/30 dark:bg-white/20 shadow-lg">
              <img
                src={Photo}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex-grow p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-light-text dark:text-dark-text text-xl font-semibold mb-4">
            Stats Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-accent dark:border-dark-accent transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Total Appointments
              </h3>
              <p className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                14
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
                Monthly Attendance
              </h3>
              <p className="text-3xl font-bold text-light-logo-blue dark:text-dark-logo-blue">
                86%
              </p>
            </div>
          </div>
        </div>
        {/* Todays appointments / schedule */}
        <div className="flex-grow p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-light-text dark:text-dark-text text-xl font-semibold mb-4">
            Today's Appointments
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-b-2 border-light-accent dark:border-dark-accent transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Appointment 1
              </h3>
              <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">
                10:00 AM
              </p>
              <div className="mt-2 bg-light-accent/10 dark:bg-dark-accent/10 p-1 rounded text-sm text-light-accent dark:text-dark-accent font-medium">
                Patient: John Smith
              </div>
            </div>
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-b-2 border-light-success dark:border-dark-success transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Appointment 2
              </h3>
              <p className="text-2xl font-bold text-light-success dark:text-dark-success">
                11:00 AM
              </p>
              <div className="mt-2 bg-light-success/10 dark:bg-dark-success/10 p-1 rounded text-sm text-light-success dark:text-dark-success font-medium">
                Patient: Sarah Johnson
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="flex items-center mx-auto gap-2 text-white font-medium bg-gradient-to-r from-light-accent to-light-success dark:from-dark-accent dark:to-dark-success p-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md">
              View All Appointments
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Triage summaries */}
        <div className="flex-grow p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-light-text dark:text-dark-text text-xl font-semibold mb-4">
            Triage Summaries
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-logo-blue dark:border-dark-logo-blue transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  Salim
                </h3>
                <span className="text-xs font-medium bg-light-logo-blue/10 dark:bg-dark-logo-blue/20 text-light-logo-blue dark:text-dark-logo-blue px-2 py-1 rounded">
                  High Priority
                </span>
              </div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Summary of triage for Salim...
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-accent dark:border-dark-accent transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  Ashley K.
                </h3>
                <span className="text-xs font-medium bg-light-accent/10 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent px-2 py-1 rounded">
                  Medium Priority
                </span>
              </div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Summary of triage for Ashley K....
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button className="flex items-center mx-auto gap-2 text-white font-medium bg-light-logo-blue dark:bg-dark-logo-blue p-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md">
              View All Triage Summaries
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Quick access */}
        <div className="flex-grow p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-light-text dark:text-dark-text text-xl font-semibold mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gradient-to-br from-light-accent/10 to-light-accent/20 dark:from-dark-accent/10 dark:to-dark-accent/20 p-4 rounded-lg shadow-md border border-light-accent/30 dark:border-dark-accent/30 transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-light-accent dark:text-dark-accent"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Patient Records
              </h3>
            </div>
            <div className="bg-gradient-to-br from-light-success/10 to-light-success/20 dark:from-dark-success/10 dark:to-dark-success/20 p-4 rounded-lg shadow-md border border-light-success/30 dark:border-dark-success/30 transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-light-success dark:text-dark-success"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Referrals
              </h3>
            </div>
          </div>
          <div className="mt-6">
            <button className="flex items-center mx-auto gap-2 text-white font-medium bg-light-success dark:bg-dark-success p-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md">
              View All Quick Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Referral requests */}
        <div className="flex-grow p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-light-text dark:text-dark-text text-xl font-semibold mb-4">
            Referral Requests
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-logo-blue dark:border-dark-logo-blue transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  Dr. Tom Request
                </h3>
                <span className="text-xs font-medium text-light-logo-blue dark:text-dark-logo-blue">
                  Today
                </span>
              </div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Details about referral request from Dr. Tom regarding patient
                with chronic pain...
              </p>
              <div className="flex justify-end mt-2">
                <button className="text-sm bg-light-logo-blue/10 dark:bg-dark-logo-blue/10 text-light-logo-blue dark:text-dark-logo-blue px-2 py-1 rounded font-medium hover:bg-light-logo-blue/20">
                  Review
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-accent dark:border-dark-accent transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  Dr. Ngugi Request
                </h3>
                <span className="text-xs font-medium text-light-accent dark:text-dark-accent">
                  Yesterday
                </span>
              </div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Details about referral request from Dr. Ngugi regarding patient
                with respiratory issues...
              </p>
              <div className="flex justify-end mt-2">
                <button className="text-sm bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent px-2 py-1 rounded font-medium hover:bg-light-accent/20">
                  Review
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="flex items-center mx-auto gap-2 text-white font-medium bg-light-accent dark:bg-dark-accent p-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md">
              View All Referral Requests
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Notifications */}
        <div className="flex-grow p-6 rounded-lg shadow-lg flex flex-col bg-gradient-to-br from-white to-light-border/30 dark:from-dark-surface dark:to-dark-bg min-h-fit border border-light-border dark:border-dark-border">
          <h2 className="text-light-text dark:text-dark-text text-xl font-semibold mb-4">
            Notifications
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-success dark:border-dark-success transition-transform duration-300 hover:scale-105">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-light-success dark:bg-dark-success"></div>
                <span className="text-xs font-medium text-light-success dark:text-dark-success">
                  New
                </span>
              </div>
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                New Message from Patient
              </h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                You have a new message from Salim regarding medication side
                effects...
              </p>
              <p className="text-xs text-light-success dark:text-dark-success mt-2">
                10 minutes ago
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md border-l-4 border-light-logo-blue dark:border-dark-logo-blue transition-transform duration-300 hover:scale-105">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-light-logo-blue dark:bg-dark-logo-blue"></div>
                <span className="text-xs font-medium text-light-logo-blue dark:text-dark-logo-blue">
                  Reminder
                </span>
              </div>
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                Appointment Reminder
              </h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Don't forget your appointment with Ashley K. tomorrow at 9:00
                AM...
              </p>
              <p className="text-xs text-light-logo-blue dark:text-dark-logo-blue mt-2">
                1 hour ago
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button className="flex items-center mx-auto gap-2 text-white font-medium bg-gradient-to-r from-light-logo-blue to-light-accent dark:from-dark-logo-blue dark:to-dark-accent p-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md">
              View All Notifications
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
