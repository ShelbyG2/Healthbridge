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
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo2.png";
import { AuthContext } from "../../context/AuthProvider";
import { LoadSpinner } from "../LoadSpinner";

const PatientNavBar = () => {
  const { logout, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadSpinner />;
  }
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
  return (
    <nav className="absolute   h-full bg-light-bg-shape2 lg:relative lg:mt-4 lg:h-fit lg:rounded-r-xl md:relative lg:txt-xl left-0">
      {/* Desktop Nav */}
      <ul className="hidden lg:flex flex-col gap-4 p-4 rounded-lg text-white dark:text-dark-text h-fit">
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
      {/* Mobile Menu Icon */}
      <button
        className="lg:hidden p-2 fixed top-3 left-3 z-50 rounded-md "
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
      >
        {!isOpen && (
          <MenuSquareIcon className="text-light-text dark:text-dark-text " />
        )}
      </button>
      {isOpen && (
        <ul className="lg:hidden flex flex-col gap-6 p-4 text-2xl text-white bg-light-bg-shape2 h-full mt-8 fixed top-0 left-0 w-64 z-50">
          <button
            className="relative w-full top-2 left-2 p-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="text-white dark:text-dark-text self-end" />
          </button>
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
          <Link to="/dashboard/atient/profile">
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
      )}
    </nav>
  );
};

export default PatientNavBar;
