import { useState, useContext } from "react";
import {
  Home,
  CalendarClock,
  MessageCircleMore,
  Settings,
  LogOutIcon,
  MenuSquareIcon,
  X,
  Brain,
  Clock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo2.png";
import { AuthContext } from "../../context/AuthProvider";
import { LoadSpinner } from "../LoadSpinner";

const PatientNavBar = () => {
  const { logout, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  if (loading) {
    return <LoadSpinner />;
  }
  const handleLogout = () => {
    logout();
  };

  const mobileIsActive = (path: string) => {
    return location.pathname.startsWith(path) ? "text-blue-500" : "";
  };
  return (
    <nav className="lg:relative lg:mt-4 lg:h-fit lg:rounded-r-xl">
      {/* Desktop Nav */}
      <div className="hidden lg:block absolute   h-full bg-light-bg-shape2 lg:relative lg:mt-4 lg:h-fit lg:rounded-r-xl md:relative lg:txt-xl left-0">
        <ul className="flex flex-col gap-4 p-4 rounded-lg text-white dark:text-dark-text h-fit">
          <div className="flex items-center justify-center p-4">
            <img
              src={Logo}
              alt="Healthbridge Logo"
              className="w-18 h-16 rounded-full"
            />
          </div>
          <Link to="/dashboard/patient">
            <li className="flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
              <Home />
              Dashboard
            </li>
          </Link>
          <Link to="/dashboard/patient/appointments">
            <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
              <CalendarClock /> Appointments
            </li>
          </Link>
          <Link to="/dashboard/patient/chat">
            <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
              <MessageCircleMore /> Chat
            </li>
          </Link>
          <Link to="/dashboard/patient/ai-triage">
            <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
              <Brain /> AI Triage
            </li>
          </Link>
          <Link to="/dashboard/patient/med-tracker">
            <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
              <Clock /> Med Tracker
            </li>
          </Link>
          <Link to="/dashboard/patient/settings">
            <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
              <Settings /> Settings
            </li>
          </Link>
          <li
            className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover"
            onClick={handleLogout}
          >
            <LogOutIcon /> Logout
          </li>
        </ul>
      </div>

      {/* Mobile Nav - Bottom Fixed */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-light-bg-shape2 dark:bg-dark-bg-shape2 z-50">
        <ul className="flex justify-around items-center p-4 text-white dark:text-dark-text">
          <Link to="/dashboard/patient">
            <li
              className={`flex flex-col items-center gap-1 ${
                location.pathname === "/dashboard/patient"
                  ? "text-blue-500"
                  : "text-white dark:text-dark-text"
              }`}
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </li>
          </Link>
          <Link to="/dashboard/patient/appointments">
            <li
              className={`flex flex-col items-center gap-1 ${mobileIsActive(
                "/dashboard/patient/appointments"
              )}`}
            >
              <CalendarClock size={24} />
              <span className="text-xs">Appointments</span>
            </li>
          </Link>
          <Link to="/dashboard/patient/chat">
            <li
              className={`flex flex-col items-center gap-1 ${mobileIsActive(
                "/dashboard/patient/chat"
              )}`}
            >
              <MessageCircleMore size={24} />
              <span className="text-xs">Chat</span>
            </li>
          </Link>
          <Link to="/dashboard/patient/ai-triage">
            <li
              className={`flex flex-col items-center gap-1 ${mobileIsActive(
                "/dashboard/patient/ai-triage"
              )}`}
            >
              <Brain size={24} />
              <span className="text-xs">AI Triage</span>
            </li>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center gap-1"
          >
            <MenuSquareIcon size={24} />
            <span className="text-xs">More</span>
          </button>
        </ul>
      </div>

      {/* Mobile Menu Modal - For additional items */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-20 left-4 right-4 bg-light-bg-shape2 dark:bg-dark-bg-shape2 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">More Options</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-white" size={24} />
              </button>
            </div>
            <ul className="space-y-4">
              <Link to="/dashboard/patient/med-tracker">
                <li className="flex items-center gap-2 text-white">
                  <Clock size={20} />
                  Med Tracker
                </li>
              </Link>
              <Link to="/dashboard/patient/settings">
                <li className="flex items-center gap-2 text-white">
                  <Settings size={20} />
                  Settings
                </li>
              </Link>
              <li
                className="flex items-center gap-2 text-white"
                onClick={handleLogout}
              >
                <LogOutIcon size={20} />
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PatientNavBar;
