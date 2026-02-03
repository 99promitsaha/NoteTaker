import React from "react";
import { useUiStore } from "../stores/useUiStore";

export default function Topbar({ user, searchRef, search, onSearchChange }) {
  const { theme, toggleTheme } = useUiStore();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative flex-1">
        <input
          ref={searchRef}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="🔎 Search notes..."
          className="w-full rounded-full border border-ink-200 bg-white px-4 py-2 text-sm shadow-soft focus:ring-2 focus:ring-ink-400 dark:border-white/10 dark:bg-slate-900/80"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-400">/</span>
      </div>
      <button
        onClick={toggleTheme}
        className="rounded-full border border-ink-200 px-4 py-2 text-xs font-semibold text-ink-600 hover:bg-ink-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
      >
        {theme === "dark" ? "Light" : "Dark"} mode
      </button>
      <div className="flex items-center gap-2">
        <img
          src={user?.avatarUrl}
          alt={user?.name}
          className="h-9 w-9 rounded-full border border-ink-200 dark:border-white/10"
        />
      </div>
    </div>
  );
}
