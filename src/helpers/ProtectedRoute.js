import React from "react";
import { isAuth } from "./authHelper";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirect_url, children }) => {
  if (!isAuth()) {
    return <Navigate to={redirect_url} />;
  }
  return children;
};

export default ProtectedRoute;
