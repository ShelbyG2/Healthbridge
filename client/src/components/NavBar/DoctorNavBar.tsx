import { useContext, useState } from "react";
import {
  Home,
  CalendarClock,
  MessageCircleMore,
  User,
  LogOutIcon,
  MenuSquareIcon,
  X,
  Brain,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo2.png";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../LoadSpinner";
const DoctorNavBar = () => {
  const { logout, loading } = useContext(AuthContext);

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
    toast.success("Logged out successfully");
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="absolute   h-full bg-light-bg-shape2 lg:relative lg:mt-4 lg:h-1/2 lg:rounded-r-xl md:relative lg:txt-xl left-0">
      {/* Desktop Nav */}
      <ul className="hidden sm:flex flex-col gap-4 p-4 -shape2 rounded-lg  text-white dark:text-dark-text">
        <li className="flex items-center gap-2 bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Home />
          Dashboard
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <CalendarClock /> Appointments
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <MessageCircleMore /> Chat
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Brain /> AI Triage
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <Clock /> Patients
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          Referrals
        </li>
        <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
          <User /> Profile
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
            <Home />
            Dashboard
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <CalendarClock /> Appointments
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <MessageCircleMore /> Chat
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Brain /> AI Triage
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <Clock /> Med Tracker
          </li>
          <li className="flex items-center gap-2  bg-light-bg-highlight dark:bg-dark-bg-highlight p-2 rounded-md bg-opacity-20 hover:bg-light-hover dark:hover:bg-dark-hover">
            <User /> Profile
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
