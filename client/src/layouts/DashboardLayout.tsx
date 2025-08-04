import { useContext } from "react";
import AdminDashboard from "../dashboards/AdminDashboard";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import { PatientDashboard } from "../pages/Patient";

import { AuthContext } from "../context/AuthProvider";
import Error401 from "../pages/Error401";
import LoadSpinner from "../components/LoadSpinner";

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const role = user?.role;

  if (loading) return <LoadSpinner />;
  if (!user || !user.role) return <Error401 />;

  switch (role) {
    case "patient":
      return <PatientDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Error401 />;
  }
};

export default DashboardLayout;
