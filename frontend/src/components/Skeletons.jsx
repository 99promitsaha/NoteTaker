import React from "react";

export function NotesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-24 rounded-2xl border border-ink-100 bg-ink-100/40 animate-pulse dark:border-white/10 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

export function TasksSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-12 rounded-xl border border-ink-100 bg-ink-100/40 animate-pulse dark:border-white/10 dark:bg-white/10"
        />
      ))}
    </div>
  );
}
