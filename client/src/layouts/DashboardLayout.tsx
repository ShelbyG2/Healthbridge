import { useContext } from "react";
import {
  PatientDashBoard,
  AdminDashboard,
  DoctorDashboard,
} from "../dashboards";
import BackgroundImg from "../assets/lightbg.png";

import { AuthContext } from "../context/AuthProvider";
import Error401 from "../pages/Error401";
import LoadSpinner from "../components/LoadSpinner";

const DashboardLa = () => {
  const { user, loading } = useContext(AuthContext);
  const role = user?.role;

  if (loading) return <LoadSpinner />;
  if (!user || !user.role) return <Error401 />;

  const renderDashboardContent = () => {
    switch (role) {
      case "patient":
        return <PatientDashBoard />;
      case "doctor":
        return <DoctorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Error401 />;
    }
  };

  return (
    <div className="bg-light-bg  dark:bg-dark-bg main-container overflow-hidden">
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;
