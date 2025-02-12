import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

const PrivateRoute = () => {
  const auth = useContext(AuthContext);

  return auth?.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
