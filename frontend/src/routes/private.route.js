import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const PrivateRoutes = () => {
  const { credentials } = useAuth();
  if (credentials.accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }  
};

export default PrivateRoutes;
