import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const PrivateRoutes = () => {
  const { credentials } = useAuth();
  return credentials.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
