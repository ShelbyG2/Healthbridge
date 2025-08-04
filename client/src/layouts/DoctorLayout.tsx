import DoctorNavBar from "../components/NavBar/DoctorNavBar";
import { Outlet } from "react-router-dom";
const DoctorLayout = () => {
  return (
    <main className="flex transition-colors duration-300 h-screen">
      <nav className="h-screen flex items-center w-content bg-light-bg dark:bg-dark-bg shadow-md lg:shadow-none lg:bg-transparent lg:dark:bg-transparent">
        <DoctorNavBar />
      </nav>
      <Outlet />
    </main>
  );
};

export default DoctorLayout;
