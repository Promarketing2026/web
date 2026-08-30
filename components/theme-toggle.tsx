"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): "dark" | "light" {
  return "dark";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const html = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyTheme = () => {
      localStorage.setItem("theme", next);
      if (next === "dark") {
        html.classList.add("dark");
        html.setAttribute("data-theme", "dark");
      } else {
        html.classList.remove("dark");
        html.setAttribute("data-theme", "light");
      }
      window.dispatchEvent(new Event("themechange"));
    };

    if (prefersReducedMotion) {
      applyTheme();
      return;
    }

    // Si el navegador soporta View Transitions API de forma nativa (Chrome, Edge, Safari 18+)
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const rect = e.currentTarget.getBoundingClientRect();
      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;

      const radius = Math.hypot(
        Math.max(ox, window.innerWidth - ox),
        Math.max(oy, window.innerHeight - oy)
      );

      const transition = (document as unknown as {
        startViewTransition: (callback: () => void) => {
          ready: Promise<void>;
        };
      }).startViewTransition(() => {
        applyTheme();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${ox}px ${oy}px)`,
              `circle(${radius}px at ${ox}px ${oy}px)`,
            ],
          },
          {
            duration: 500,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
      return;
    }

    // Fallback estándar suave
    applyTheme();
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`relative inline-flex size-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/60 text-muted-foreground transition-all duration-300 hover:border-border hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${className}`}
    >
      <Sun
        className={`size-4.5 transition-all duration-500 ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100 text-amber-500"
            : "absolute -rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`size-4.5 transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-sky-400"
            : "absolute rotate-90 scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
