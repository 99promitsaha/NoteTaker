import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";
import { useNotesStore } from "../stores/useNotesStore";
import { useTasksStore } from "../stores/useTasksStore";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import NoteCard from "../components/NoteCard";
import TaskList from "../components/TaskList";
import { NotesSkeleton, TasksSkeleton } from "../components/Skeletons";

export default function DashboardPage() {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { user, logout } = useAuthStore();
  const {
    notes,
    loading: notesLoading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setSearch,
    search,
    sort,
    setSort
  } = useNotesStore();
  const {
    tasks,
    loading: tasksLoading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    filter,
    setFilter
  } = useTasksStore();

  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("notes");

  useEffect(() => {
    fetchNotes();
    fetchTasks();
  }, [fetchNotes, fetchTasks]);

  useEffect(() => {
    const handler = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(handler);
  }, [searchInput, setSearch]);

  useEffect(() => {
    function handleShortcuts(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        handleNewNote();
      }
      if (event.key === "/") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, []);

  async function handleNewNote() {
    try {
      const note = await createNote();
      toast.success("New note created");
      navigate(`/notes/${note._id}`);
    } catch (err) {
      toast.error("Failed to create note");
    }
  }

  async function handlePin(note) {
    await updateNote(note._id, { pinned: !note.pinned });
  }

  const filteredNotes = useMemo(() => {
    const needle = search.toLowerCase();
    const list = notes.filter((note) =>
      `${note.title} ${note.content}`.toLowerCase().includes(needle)
    );
    if (sort === "alpha") {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "created") {
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [notes, search, sort]);

  const upcomingTask = useMemo(() => {
    const now = new Date();
    return tasks
      .filter((task) => !task.completed && task.dueDate && new Date(task.dueDate) >= now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
  }, [tasks]);

  const priorityStyles = (priority) => {
    if (!priority) {
      return "bg-ink-100/70 text-ink-600 border-ink-200 dark:bg-white/10 dark:text-ink-200 dark:border-white/10";
    }
    if (priority === "high") {
      return "bg-peach-500/15 text-peach-600 border-peach-400/40";
    }
    if (priority === "low") {
      return "bg-sky-400/20 text-sky-700 border-sky-300/40 dark:text-sky-200";
    }
    return "bg-yellow-300/20 text-yellow-700 border-yellow-300/40 dark:text-yellow-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-ink-900 dark:text-white">
      <div className="flex flex-col md:flex-row">
        <Sidebar
          onNewNote={handleNewNote}
          onLogout={async () => {
            await logout();
            navigate("/login");
          }}
        />
        <main className="flex-1 p-6 md:p-10 space-y-8">
          <Topbar
            user={user}
            searchRef={searchRef}
            search={searchInput}
            onSearchChange={setSearchInput}
          />

          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {["notes", "tasks"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-ink-900 text-white shadow-soft dark:bg-white dark:text-slate-900"
                      : "border border-ink-200 text-ink-600 hover:bg-ink-100 dark:border-white/10 dark:text-ink-300 dark:hover:bg-white/10"
                  }`}
                >
                  {tab === "notes" ? "📝 Notes" : "✅ Tasks"}
                </button>
              ))}
            </div>

            {activeTab === "notes" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">📝 Notes</h2>
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs shadow-soft ${priorityStyles(
                        upcomingTask?.priority
                      )}`}
                    >
                      <span className="font-semibold">🌟 Next up</span>
                      <span>
                        {upcomingTask
                          ? `${upcomingTask.title} · ${new Date(
                              upcomingTask.dueDate
                            ).toLocaleDateString()}`
                          : "No upcoming tasks"}
                      </span>
                    </div>
                  </div>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="rounded-full border border-ink-200 bg-white px-4 py-2.5 pr-10 text-sm min-w-[190px] dark:border-white/10 dark:bg-slate-900/60"
                  >
                    <option value="updated">Recently edited</option>
                    <option value="alpha">Alphabetical</option>
                    <option value="created">Created date</option>
                  </select>
                </div>

                {notesLoading ? (
                  <NotesSkeleton />
                ) : filteredNotes.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-ink-200 p-8 text-center text-ink-500 dark:border-white/10">
                    No notes yet. Hit Cmd/Ctrl + N to create one. ✨
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note._id}
                        note={note}
                        onPin={handlePin}
                        onDelete={deleteNote}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {tasksLoading ? (
                  <TasksSkeleton />
                ) : (
                  <TaskList
                    tasks={tasks}
                    filter={filter}
                    onFilterChange={setFilter}
                    onCreate={createTask}
                    onToggle={(task) => updateTask(task._id, { completed: !task.completed })}
                    onDelete={deleteTask}
                  />
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
