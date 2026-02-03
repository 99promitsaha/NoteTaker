import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNotesStore } from "../stores/useNotesStore";
import { useTasksStore } from "../stores/useTasksStore";

export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, fetchNotes, updateNote, deleteNote } = useNotesStore();
  const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useTasksStore();

  const note = useMemo(() => notes.find((n) => n._id === id), [notes, id]);
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [saving, setSaving] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const hasEdited = useRef(false);

  useEffect(() => {
    if (!notes.length) fetchNotes();
    if (!tasks.length) fetchTasks();
  }, [fetchNotes, fetchTasks, notes.length, tasks.length]);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      hasEdited.current = false;
    }
  }, [note]);

  useEffect(() => {
    if (!note) return;
    if (!hasEdited.current) return;
    setSaving(true);
    const handler = setTimeout(async () => {
      try {
        await updateNote(note._id, { title, content });
      } catch (err) {
        toast.error("Autosave failed");
      } finally {
        setSaving(false);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [title, content, note, updateNote]);

  const shouldDeleteBlank = () => {
    if (!note) return false;
    const hasNoContent =
      (!title || title.trim() === "" || title === "Untitled") &&
      (!content || content.trim() === "");
    const hasNoTasks = tasks.every((task) => task.noteId !== note._id);
    const untouched = note.createdAt === note.updatedAt;
    return !hasEdited.current && hasNoContent && hasNoTasks && untouched;
  };

  const noteTasks = useMemo(() => tasks.filter((task) => task.noteId === id), [tasks, id]);

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900/80">
          <p className="mb-4">Note not found.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full bg-ink-900 px-4 py-2 text-white dark:bg-white dark:text-slate-900"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-ink-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={async () => {
              if (shouldDeleteBlank()) {
                await deleteNote(note._id);
              }
              navigate("/dashboard");
            }}
            className="text-sm text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
          <button
            onClick={() => updateNote(note._id, { pinned: !note.pinned })}
            className="rounded-full border border-ink-200 px-4 py-2 text-xs font-semibold dark:border-white/10"
          >
            {note.pinned ? "📌 Unpin" : "📌 Pin"}
          </button>
          <button
            onClick={async () => {
              setSaving(true);
              await updateNote(note._id, { title, content });
              setSaving(false);
              toast.success("Saved");
            }}
            className="rounded-full border border-ink-200 px-4 py-2 text-xs font-semibold dark:border-white/10"
          >
            💾 Save
          </button>
          <button
            onClick={async () => {
              await deleteNote(note._id);
              toast.success("Note deleted");
              navigate("/dashboard");
            }}
            className="rounded-full border border-peach-400 px-4 py-2 text-xs font-semibold text-peach-500"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

        <div className="rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900/80">
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              hasEdited.current = true;
            }}
            placeholder="Untitled"
            className="w-full text-3xl font-display font-bold bg-transparent focus:outline-none"
          />
          <textarea
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              hasEdited.current = true;
            }}
            placeholder="Write something..."
            className="mt-4 w-full min-h-[320px] bg-transparent focus:outline-none text-base leading-relaxed"
          />
          <div className="mt-4 text-xs text-ink-400">{saving ? "Saving..." : "All changes saved"}</div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900/80">
          <h3 className="font-semibold mb-4">Tasks for this note</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="New task"
              className="flex-1 rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900/60"
            />
            <button
              onClick={() => {
                if (!taskTitle.trim()) return;
                createTask({ title: taskTitle, noteId: id, priority: "medium" });
                setTaskTitle("");
              }}
              className="rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {noteTasks.length === 0 ? (
              <p className="text-sm text-ink-400">No tasks for this note.</p>
            ) : (
              noteTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between rounded-xl border border-ink-100 px-3 py-2 text-sm dark:border-white/10"
                >
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => updateTask(task._id, { completed: !task.completed })}
                      className="rounded border-ink-300"
                    />
                    <span className={task.completed ? "line-through text-ink-400" : ""}>
                      {task.title}
                    </span>
                  </label>
                  <button onClick={() => deleteTask(task._id)} className="text-xs text-ink-400">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
