import { useContext } from "react";
import { AuthProvider, useAuth } from "../contexts/authContext";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;