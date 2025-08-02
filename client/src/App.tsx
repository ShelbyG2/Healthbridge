import DarkModeToggle from "./components/DarkModeToggle";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminLayout from "./layouts/AdminLayout";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes";

import AdminDashboard from "./dashboards/AdminDashboard";
import DoctorDashboard from "./dashboards/DoctorDashboard";
import {
  PatientDashboard,
  PatientAITriage,
  PatientChat,
  MedTracker,
  PatientAppointments,
  PatientSettings,
} from "./pages/Patient";

function App() {
  return (
    <div className="App w-screen bg-light-bg dark:bg-dark-bg ">
      <DarkModeToggle />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          {/* Admin  */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>
          {/* Doctor */}
          <Route
            path="doctor"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorLayout />
              </ProtectedRoute>
            }
          >
            {/* Doctor Routes */}
            <Route index element={<DoctorDashboard />} />
          </Route>
          {/* Patient */}
          <Route
            path="patient"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientLayout />
              </ProtectedRoute>
            }
          >
            {/* Patient Routes */}
            <Route index element={<PatientDashboard />} />
            <Route path="settings" element={<PatientSettings />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="chat" element={<PatientChat />} />
            <Route path="ai-triage" element={<PatientAITriage />} />
            <Route path="med-tracker" element={<MedTracker />} />
            <Route path="profile" element={<PatientSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
