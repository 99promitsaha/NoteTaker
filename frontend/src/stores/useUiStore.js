import { create } from "zustand";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useUiStore = create((set) => ({
  theme: "light",
  initTheme() {
    const theme = getInitialTheme();
    document.documentElement.classList.toggle("dark", theme === "dark");
    set({ theme });
  },
  toggleTheme() {
    set((state) => {
      const next = state.theme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      return { theme: next };
    });
  }
}));
