import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/user.store";

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;