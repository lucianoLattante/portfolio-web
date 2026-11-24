"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ label }: { label: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);

  function toggle() {
    const next = light ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch { /* The theme still works for this page. */ }
    setLight(next === "light");
  }

  return (
    <button className="theme-button" type="button" onClick={toggle} aria-label={label} aria-pressed={light} title={label}>
      <span aria-hidden="true">{light ? "☾" : "☀"}</span>
    </button>
  );
}
