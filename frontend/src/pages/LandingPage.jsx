import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Notes",
    body: "Capture ideas with a frictionless editor that keeps up with your pace."
  },
  {
    title: "Tasks",
    body: "Turn any note into a checklist and stay on top of priorities."
  },
  {
    title: "Fast search",
    body: "Instantly locate anything with smart, debounced search."
  },
  {
    title: "Sync",
    body: "Your workspace is always current across devices."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-ink-900 dark:bg-slate-950 dark:text-white">
      <div className="gradient-hero">
        <header className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Notion Lite</div>
          <Link
            to="/login"
            className="rounded-full bg-ink-900 text-white px-5 py-2 text-sm font-semibold shadow-soft hover:-translate-y-0.5 transition dark:bg-white dark:text-slate-900"
          >
            Start for free
          </Link>
        </header>

        <section className="max-w-6xl mx-auto px-6 pb-20 pt-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            <p className="uppercase tracking-[0.3em] text-xs text-ink-500 dark:text-ink-300">
              Your minimal workspace
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight">
              Your thoughts. Organized.
            </h1>
            <p className="text-lg text-ink-600 dark:text-ink-200">
              A calm, focused space for notes and tasks that feels like Notion without the noise.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-full bg-ink-900 text-white px-6 py-3 font-semibold shadow-soft hover:-translate-y-0.5 transition dark:bg-white dark:text-slate-900"
              >
                Start for free
              </Link>
              <button className="rounded-full border border-ink-300 px-6 py-3 font-semibold text-ink-700 hover:bg-ink-100/70 transition dark:border-white/30 dark:text-white dark:hover:bg-white/10">
                Watch demo
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl bg-white/80 p-6 shadow-soft border border-white/50 dark:bg-white/10 dark:border-white/10">
              <div className="text-sm uppercase text-ink-400">Today</div>
              <h3 className="text-xl font-semibold mt-2">Launch checklist</h3>
              <ul className="mt-4 space-y-2 text-ink-600 dark:text-ink-200">
                <li>Finalize onboarding flow</li>
                <li>Write project brief</li>
                <li>Send team update</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 shadow-soft border border-white/50 dark:bg-white/10 dark:border-white/10">
              <div className="text-sm uppercase text-ink-400">Pinned</div>
              <h3 className="text-xl font-semibold mt-2">Product north star</h3>
              <p className="mt-3 text-ink-600 dark:text-ink-200">
                Build tools that feel invisible so ideas can take the spotlight.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-white p-6 shadow-soft border border-ink-100 dark:bg-slate-900/60 dark:border-white/10"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-ink-600 dark:text-ink-200">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-500 dark:text-ink-300">
        <div>Built for calm productivity.</div>
        <div>© 2026 Notion Lite</div>
      </footer>
    </div>
  );
}
