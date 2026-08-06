"use client";

import { useEffect, useState } from "react";
import { Bell, CalendarDays, ChevronRight, X } from "lucide-react";

const TARGET_DATE = new Date("2026-08-30T23:59:59").getTime();

function getTimeLeft() {
  const diff = Math.max(TARGET_DATE - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ApplyNowBell() {
  const [showAutoPopup, setShowAutoPopup] = useState(false);
  const [showSimplePopup, setShowSimplePopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const boxes = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setShowAutoPopup(true);
      setShowSimplePopup(false);
    }, 2500);

    const closeTimer = setTimeout(() => setShowAutoPopup(false), 11000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleBellClick = () => {
    setShowAutoPopup(false);
    setShowSimplePopup((isOpen) => !isOpen);
  };

  return (
    <div className="fixed bottom-4 left-3 z-[9999] font-sans sm:bottom-6 sm:left-6">
      <button
        type="button"
        onClick={handleBellClick}
        aria-label="Open TYSU admission notification"
        aria-expanded={showAutoPopup || showSimplePopup}
        className="relative flex h-13 w-13 items-center justify-center rounded-full border-2 border-white bg-[color:var(--primary)] text-white shadow-[0_14px_35px_rgba(90,31,34,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#461719] active:scale-95 sm:h-15 sm:w-15"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[color:var(--primary)]/25" />
        <Bell size={23} fill="currentColor" strokeWidth={2.2} />
        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[color:var(--accent)]" />
      </button>

      {showAutoPopup && (
        <div className="absolute bottom-17 left-0 w-[calc(100vw-24px)] max-w-82 overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_20px_55px_rgba(14,13,15,0.2)] sm:bottom-20 sm:w-90 sm:max-w-none">
          <div className="bg-linear-to-r from-[color:var(--primary)] to-[#340606] px-4 py-3 pr-12 text-white sm:px-5 sm:py-4">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[color:var(--accent)] sm:text-[10px]">
              <CalendarDays size={13} />
              Admissions 2026-27
            </div>
            <h3 className="mt-1.5 font-display text-base font-black leading-tight sm:text-lg">
              Applications are open at TYSU
            </h3>
            <p className="mt-1 text-[11px] leading-4 text-white/70 sm:text-xs">
              Begin your journey at Thakur Yugraj Singh University.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAutoPopup(false)}
            className="absolute right-2.5 top-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close admission notification"
          >
            <X size={15} strokeWidth={2.5} />
          </button>

          <div className="px-3.5 pb-3.5 pt-3.5 sm:px-5 sm:pb-4 sm:pt-4">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--secondary)] sm:text-xs">
              Application deadline: 30 August 2026
            </p>

            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
              {boxes.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-[#F4F1EC] px-1 py-2 text-center sm:py-2.5"
                >
                  <div className="font-display text-base font-black leading-none text-[color:var(--primary)] sm:text-xl">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[7px] font-bold uppercase tracking-wide text-[color:var(--foreground)]/55 sm:text-[9px]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#apply"
              onClick={() => setShowAutoPopup(false)}
              className="mt-3 flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-[color:var(--primary)] px-4 py-2.5 text-center text-xs font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-[color:var(--primary)]/20 transition hover:bg-[#461719] sm:mt-4"
            >
              Start your application
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      )}

      {showSimplePopup && (
        <div className="absolute bottom-17 left-0 w-[calc(100vw-24px)] max-w-85 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:bottom-20 sm:w-85 sm:p-5">
          <div className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--soft-background)] text-[color:var(--secondary)]">
              <Bell size={19} fill="currentColor" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--secondary)]">
                TYSU Admissions
              </p>
              <h3 className="mt-1 font-display text-base font-black leading-snug text-[color:var(--foreground)] sm:text-lg">
                Build your future with us
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-[color:var(--foreground)]/60">
                Explore programs and complete our simple admission process.
              </p>
              <a
                href="#apply"
                onClick={() => setShowSimplePopup(false)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.1em] text-[color:var(--primary)] transition hover:text-[color:var(--secondary)]"
              >
                Apply now <ChevronRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
