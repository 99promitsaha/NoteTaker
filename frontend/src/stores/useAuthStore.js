import { create } from "zustand";
import api from "../lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  async fetchMe() {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },
  async logout() {
    await api.post("/auth/logout");
    set({ user: null });
  },
  setUser(user) {
    set({ user });
  }
}));
