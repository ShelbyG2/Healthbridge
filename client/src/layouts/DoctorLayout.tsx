import DoctorDashboard from "../dashboards/DoctorDashboard";
import DoctorNavBar from "../components/NavBar/DoctorNavBar";
const DoctorLayout = () => {
  return (
    <main className="flex transition-colors duration-300 h-screen">
      <nav className="h-screen flex items-center w-content bg-light-bg dark:bg-dark-bg shadow-md lg:shadow-none lg:bg-transparent lg:dark:bg-transparent">
        <DoctorNavBar />
      </nav>
      <DoctorDashboard />
    </main>
  );
};

export default DoctorLayout;
