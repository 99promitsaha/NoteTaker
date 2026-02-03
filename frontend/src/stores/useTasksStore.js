import { create } from "zustand";
import api from "../lib/api";

export const useTasksStore = create((set, get) => ({
  tasks: [],
  loading: false,
  filter: "upcoming",
  setFilter(value) {
    set({ filter: value });
  },
  async fetchTasks() {
    set({ loading: true });
    const { data } = await api.get("/tasks");
    set({ tasks: data.tasks, loading: false });
  },
  async createTask(payload) {
    const { data } = await api.post("/tasks", payload);
    set({ tasks: [data.task, ...get().tasks] });
  },
  async updateTask(id, payload) {
    const { data } = await api.put(`/tasks/${id}`, payload);
    set({ tasks: get().tasks.map((task) => (task._id === id ? data.task : task)) });
  },
  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    set({ tasks: get().tasks.filter((task) => task._id !== id) });
  }
}));
