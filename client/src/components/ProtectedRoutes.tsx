import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LoadSpinner from "./LoadSpinner";
import { Navigate, Outlet } from "react-router-dom";
import Error401 from "../pages/Error401";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <LoadSpinner />;
  if (!user) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Error401 />;
  }
  return children ? children : <Outlet />;
};
export default ProtectedRoute;
