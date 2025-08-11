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
import {
  DoctorAITriage,
  DoctorAppointments,
  DoctorChat,
  DoctorDashboard,
  DoctorPatients,
  DoctorReferrals,
  DoctorSettings,
} from "./pages/Doctor";
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
    <div className="max-h-screen overflow-hidden">
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
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="patients" element={<DoctorPatients />} />
            <Route path="settings" element={<DoctorSettings />} />
            <Route path="referrals" element={<DoctorReferrals />} />
            <Route path="chat" element={<DoctorChat />} />
            <Route path="ai-triage" element={<DoctorAITriage />} />
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
