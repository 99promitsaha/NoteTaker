import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="glass rounded-3xl px-10 py-8 shadow-glow">
        <div className="animate-pulse text-lg font-semibold">Loading your workspace...</div>
      </div>
    </div>
  );
}
