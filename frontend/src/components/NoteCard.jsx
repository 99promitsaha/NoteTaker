import React from "react";
import { Link } from "react-router-dom";

export default function NoteCard({ note, onPin, onDelete }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-3">
        <Link to={`/notes/${note._id}`} className="flex-1">
          <h3 className="font-semibold text-ink-900 dark:text-white">
            {note.title || "Untitled"}
          </h3>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            {note.content?.replace(/<[^>]+>/g, "").slice(0, 120) || "Empty note"}
          </p>
        </Link>
        <button
          onClick={() => onPin(note)}
          className={`text-xs font-semibold px-2 py-1 rounded-full border ${
            note.pinned
              ? "bg-mint-500/20 border-mint-500 text-mint-600"
              : "border-ink-200 text-ink-500 dark:border-white/10 dark:text-ink-300"
          }`}
        >
          {note.pinned ? "📌 Pinned" : "📌 Pin"}
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
        <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
        <button onClick={() => onDelete(note._id)} className="text-peach-500 hover:text-peach-600">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
