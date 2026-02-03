import { create } from "zustand";
import api from "../lib/api";

export const useNotesStore = create((set, get) => ({
  notes: [],
  loading: false,
  search: "",
  sort: "updated",
  setSearch(value) {
    set({ search: value });
  },
  setSort(value) {
    set({ sort: value });
  },
  async fetchNotes() {
    set({ loading: true });
    const { data } = await api.get("/notes");
    set({ notes: data.notes, loading: false });
  },
  async createNote() {
    const { data } = await api.post("/notes", { title: "Untitled", content: "" });
    set({ notes: [data.note, ...get().notes] });
    return data.note;
  },
  async updateNote(id, payload) {
    const { data } = await api.put(`/notes/${id}`, payload);
    set({ notes: get().notes.map((note) => (note._id === id ? data.note : note)) });
    return data.note;
  },
  async deleteNote(id) {
    await api.delete(`/notes/${id}`);
    set({ notes: get().notes.filter((note) => note._id !== id) });
  }
}));
