import DarkModeToggle from "./components/DarkModeToggle";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminLayout from "./layouts/AdminLayout";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes";
import PatientDashboard from "./dashboards/PatientDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import DoctorDashboard from "./dashboards/DoctorDashboard";

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
          </Route>
        </Route>

        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
