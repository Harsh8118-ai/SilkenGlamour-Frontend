import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Store/auth";

const AdminRoute = () => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center text-xl">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/contact/login" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
