import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const PublicRoutes = () => {
  const { credentials } = useAuth();

  return credentials.accessToken ? <Navigate to="/" /> : <Outlet />;
};
