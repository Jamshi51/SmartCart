import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../api/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;


