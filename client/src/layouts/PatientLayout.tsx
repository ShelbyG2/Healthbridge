import PatientNavBar from "../components/NavBar/PatientNavBar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <main className="flex transition-colors duration-300 h-screen">
      <nav className="h-screen flex items-center w-content bg-light-bg dark:bg-dark-bg shadow-md lg:shadow-none lg:bg-transparent lg:dark:bg-transparent">
        <PatientNavBar />
      </nav>
      <Outlet />
    </main>
  );
};

export default PatientLayout;
