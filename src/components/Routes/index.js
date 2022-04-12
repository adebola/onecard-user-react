import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import UserServices from "../../services/UserServices";

export const PublicRoute = () => {
  // const auth = true;
  const { auth } = useContext(AuthContext);
  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);
  // const auth = true;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export const RenderOnRole = ({ roles, children }) => {
  if (!UserServices.hasRole(roles)) {
    return null;
  }
  return children;
};

// const auth = false;
// const PublicRoute = () => {
// 	return auth ? <Navigate to='/dashboard' /> : <Outlet />;
// };
// const PrivateRoute = () => {
// 	return auth ? <Outlet /> : <Navigate to='/' />;
// };
