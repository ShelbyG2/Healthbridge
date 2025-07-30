import DarkModeToggle from "./components/DarkModeToggle";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./layouts/DashboardLayout";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App w-screen bg-light-bg dark:bg-dark-bg ">
      <DarkModeToggle />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
