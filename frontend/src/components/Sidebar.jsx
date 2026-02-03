import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const ETH_ADDRESS = "0xAc769699154FFDb5A4FF026F9B7960d5F2306845";
const BTC_ADDRESS = "bc1qaqqerweryrugcmsnlhj62jgrsy5wmxq42xdd65";

export default function Sidebar({ onNewNote, onLogout }) {
  const [showSupport, setShowSupport] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState("ETH");
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    if (!showSupport) return;
    const text = activeCurrency === "ETH" ? ETH_ADDRESS : BTC_ADDRESS;
    QRCode.toDataURL(text, { margin: 1, width: 220 })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(""));
  }, [showSupport, activeCurrency]);

  return (
    <aside className="w-full md:w-64 bg-white/80 dark:bg-slate-900/80 border-r border-ink-100 dark:border-white/10 p-6 flex flex-col gap-6">
      <div className="text-xl font-display font-bold">✨ Notion Lite</div>
      <button
        onClick={onNewNote}
        className="rounded-full bg-[#0f1721] text-white px-4 py-2 text-sm font-semibold shadow-soft hover:-translate-y-0.5 transition"
      >
        ➕ New Note
      </button>
      <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex items-center gap-2 font-semibold">
          <span>☕️</span>
          <span>Buy me a coffee</span>
        </div>
        <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">
          Tips accepted in ETH or BTC.
        </p>
        <div className="mt-3 flex gap-2 text-[11px] font-semibold">
          <span className="rounded-full border border-ink-200 px-2 py-1 text-ink-600 dark:border-white/10 dark:text-ink-200">
            ETH
          </span>
          <span className="rounded-full border border-ink-200 px-2 py-1 text-ink-600 dark:border-white/10 dark:text-ink-200">
            BTC
          </span>
        </div>
        <button
          onClick={() => {
            setActiveCurrency("ETH");
            setShowSupport(true);
          }}
          className="mt-4 w-full rounded-xl bg-[#0f1721] px-3 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          💌 Support this app
        </button>
      </div>
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="text-sm text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
        >
          🚪 Logout
        </button>
      </div>
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-6">
          <div className="glass w-full max-w-sm rounded-3xl p-6 shadow-glow modal-pop">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">
                {activeCurrency === "ETH" ? "✨ Support with ETH" : "✨ Support with BTC"}
              </div>
              <button
                onClick={() => setShowSupport(false)}
                className="text-ink-500 hover:text-ink-900 dark:text-ink-200 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`${activeCurrency} QR`}
                  className={`h-56 w-56 rounded-2xl border border-white/40 bg-white/70 p-3 backdrop-blur ${
                    activeCurrency === "ETH"
                      ? "shadow-[0_0_30px_rgba(99,102,241,0.35)]"
                      : "shadow-[0_0_30px_rgba(251,146,60,0.35)]"
                  }`}
                />
              ) : (
                <div className="h-56 w-56 rounded-2xl border border-white/40 bg-white/60" />
              )}
              <div className="w-full rounded-2xl border border-white/40 bg-white/70 px-3 py-2 text-center text-xs font-semibold text-ink-700">
                {activeCurrency === "ETH" ? ETH_ADDRESS : BTC_ADDRESS}
              </div>
              <button
                onClick={() => setActiveCurrency(activeCurrency === "ETH" ? "BTC" : "ETH")}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-xs font-semibold text-ink-600 hover:bg-ink-100 dark:border-white/10 dark:text-ink-200 dark:hover:bg-white/10"
              >
                {activeCurrency === "ETH" ? "Next → BTC" : "Back → ETH"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
