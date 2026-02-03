import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { useUiStore } from "./stores/useUiStore";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotePage from "./pages/NotePage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const initTheme = useUiStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
    fetchMe();
  }, [initTheme, fetchMe]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <ProtectedRoute>
            <NotePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
