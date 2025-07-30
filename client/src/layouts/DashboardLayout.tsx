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

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const role = user?.role;

  if (loading) return <LoadSpinner />;
  if (!user || !user.role) return <Error401 />;

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

export default DashboardLayout;
