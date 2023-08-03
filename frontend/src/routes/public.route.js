import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import TodoList from "../components/TodoList";

export const PublicRoutes = () => {
  const { token } = useAuth();

  return token ? <Navigate to="/" /> : <Outlet />;
};
