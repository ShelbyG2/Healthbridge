import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LoadSpinner from "./LoadSpinner";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <LoadSpinner />;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};
export default ProtectedRoute;
