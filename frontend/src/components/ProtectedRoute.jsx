import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import LoadingScreen from "./LoadingScreen";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
