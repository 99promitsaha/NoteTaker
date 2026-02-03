import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import api from "../lib/api";
import { useAuthStore } from "../stores/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  async function handleGoogleSuccess(credentialResponse) {
    try {
      const { data } = await api.post("/auth/google", {
        credential: credentialResponse.credential
      });
      setUser(data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Sign-in failed. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <div className="glass rounded-3xl shadow-glow w-full max-w-md p-8 text-center">
        <div className="text-2xl font-display font-bold mb-2">Notion Lite</div>
        <p className="text-ink-500 dark:text-ink-300 mb-6">Sign in to continue your workspace.</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google sign-in cancelled")}
            theme="filled_black"
            size="large"
            shape="pill"
          />
        </div>
        <div className="mt-6 text-xs text-ink-400">
          By continuing you agree to keep things tidy.
        </div>
      </div>
    </div>
  );
}
