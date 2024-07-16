import { Outlet, Navigate } from "react-router-dom";
const ProtectedRouter = () => {
  const token = localStorage.getItem("access-token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouter;
