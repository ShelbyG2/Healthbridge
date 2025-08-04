import { useContext, useState } from "react";
import {
  Home,
  CalendarClock,
  MessageCircleMore,
  LogOutIcon,
  MenuSquareIcon,
  X,
  Brain,
  Clock,
  Settings,
  DownloadIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../LoadSpinner";
import { Link, useLocation } from "react-router-dom";
const DoctorNavBar = () => {
  const { logout, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadSpinner />;
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    if (loading) {
      return <LoadSpinner />;
    }
    logout();
    navigate("/signin");
  };

  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="absolute z-50  h-full bg-light-bg-shape2 lg:relative  lg:h-fit lg:rounded-r-xl md:relative lg:text-xl left-0 ">
      {/* Desktop Nav */}
      <ul className="hidden sm:flex flex-col gap-4 lg:space-y-4 p-4 -shape2 rounded-lg  text-white dark:text-dark-text">
        <li className="flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Home />
          <Link to="/dashboard/doctor">Dashboard</Link>
        </li>
        <li
          className={
            isActive("/dashboard/doctor/appointments")
              ? "flex items-center gap-2 z-10 bg-light-success dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-40 hover:bg-light-hover dark:hover:bg-dark-hover"
              : "flex items-center gap-2  p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover"
          }
        >
          <CalendarClock />{" "}
          <Link to="/dashboard/doctor/appointments">Appointments</Link>
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <MessageCircleMore /> <Link to="/dashboard/doctor/chat">Chat</Link>
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Brain /> <Link to="/dashboard/doctor/ai-triage">AI Triage</Link>
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Clock /> <Link to="/dashboard/doctor/patients">Patients</Link>
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <DownloadIcon />
          <Link to="/dashboard/doctor/referrals">Referrals</Link>
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Settings /> <Link to="/dashboard/doctor/settings">Settings</Link>
        </li>
        <li
          className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover"
          onClick={handleLogout}
        >
          <LogOutIcon /> Logout
        </li>
      </ul>
      {/* Mobile Menu Icon */}
      <button
        className="sm:hidden p-2 absolute top-3 left-3 "
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
      >
        {!isOpen && (
          <MenuSquareIcon className="text-light-text dark:text-dark-text " />
        )}
      </button>
      {isOpen && (
        <ul className="sm:hidden flex flex-col gap-6 p-4 text-2xl  text-white  bg-light-bg-shape2  h-full mt-8">
          <button
            className="absolute top-2 right-2 p-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="text-white dark:text-dark-text" />
          </button>
          <li className="flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Link to="/dashboard/doctor">
              <Home />
              Dashboard
            </Link>
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Link to="/dashboard/doctor/appointments">
              <CalendarClock /> Appointments
            </Link>
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Link to="/dashboard/doctor/chat">
              <MessageCircleMore /> Chat
            </Link>
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Link to="/dashboard/doctor/ai-triage">
              <Brain /> AI Triage
            </Link>
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Link to="/dashboard/doctor/med-tracker">
              <Clock /> Med Tracker
            </Link>
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Link to="/dashboard/doctor/settings">
              <Settings /> Settings
            </Link>
          </li>
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

export default DoctorNavBar;
