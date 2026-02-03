import React, { useMemo, useState } from "react";

export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  onCreate,
  onToggle,
  onDelete
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDateTime, setDueDateTime] = useState("");

  const toLocalDateTimeInput = (date) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const filteredTasks = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (filter === "completed") return tasks.filter((task) => task.completed);
    if (filter === "today") {
      return tasks.filter((task) => {
        if (!task.dueDate) return false;
        const due = new Date(task.dueDate);
        return due >= start && due < new Date(start.getTime() + 24 * 60 * 60 * 1000);
      });
    }
    if (filter === "upcoming") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">✅ Tasks</h3>
        <div className="flex gap-2 text-xs">
          {[
            { label: "Today", value: "today" },
            { label: "Upcoming", value: "upcoming" },
            { label: "Completed", value: "completed" }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onFilterChange(item.value);
                if (item.value === "today") {
                  setDueDateTime(toLocalDateTimeInput(new Date()));
                }
              }}
              className={`rounded-full border px-3 py-1 ${
                filter === item.value
                  ? "bg-ink-900 text-white border-ink-900 dark:bg-white dark:text-slate-900"
                  : "border-ink-200 text-ink-500 dark:border-white/10 dark:text-ink-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a task"
          className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900/60"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="rounded-xl border border-ink-200 bg-white px-3 py-2 pr-9 text-sm min-w-[120px] dark:border-white/10 dark:bg-slate-900/60"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="datetime-local"
            value={dueDateTime}
            onChange={(event) => setDueDateTime(event.target.value)}
            className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm min-w-[190px] dark:border-white/10 dark:bg-slate-900/60"
          />
          <button
            onClick={() => {
              if (!title.trim()) return;
              onCreate({ title, priority, dueDate: dueDateTime || null });
              setTitle("");
              setPriority("medium");
              setDueDateTime("");
            }}
            className="rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
          >
            Add
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-ink-400">No tasks yet. Add a tiny win ✨</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between rounded-xl border border-ink-100 px-3 py-2 text-sm dark:border-white/10"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task)}
                  className="rounded border-ink-300"
                />
                <span className={task.completed ? "line-through text-ink-400" : ""}>
                  {task.title}
                </span>
              </label>
              <button onClick={() => onDelete(task._id)} className="text-xs text-ink-400">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
