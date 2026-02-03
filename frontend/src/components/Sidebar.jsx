import React from "react";

export default function Sidebar({ onNewNote, onLogout }) {
  return (
    <aside className="w-full md:w-64 bg-white/80 dark:bg-slate-900/80 border-r border-ink-100 dark:border-white/10 p-6 flex flex-col gap-6">
      <div className="text-xl font-display font-bold">✨ Notion Lite</div>
      <button
        onClick={onNewNote}
        className="rounded-full bg-ink-900 text-white px-4 py-2 text-sm font-semibold shadow-soft hover:-translate-y-0.5 transition dark:bg-white dark:text-slate-900"
      >
        ➕ New Note
      </button>
      <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex items-center gap-2 font-semibold">
          <span>☕️</span>
          <span>Buy me a coffee</span>
        </div>
        <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">
          Tips accepted in ETH or BTC.
        </p>
        <div className="mt-3 flex gap-2 text-[11px] font-semibold">
          <span className="rounded-full border border-ink-200 px-2 py-1 text-ink-600 dark:border-white/10 dark:text-ink-200">
            ETH
          </span>
          <span className="rounded-full border border-ink-200 px-2 py-1 text-ink-600 dark:border-white/10 dark:text-ink-200">
            BTC
          </span>
        </div>
        <button
          onClick={() => {}}
          className="mt-4 w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2 text-xs font-semibold text-ink-600 hover:bg-ink-100 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
        >
          💌 Support this app
        </button>
      </div>
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="text-sm text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
