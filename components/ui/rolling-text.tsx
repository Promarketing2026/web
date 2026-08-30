"use client";

import { useReducedMotion } from "motion/react";

interface RollingTextProps {
  text: string;
  className?: string;
  active?: boolean;
}

export function RollingText({ text, className = "", active = false }: RollingTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span
        className={`font-medium transition-colors duration-200 ${
          active ? "text-accent-connection font-semibold" : className || "text-muted-foreground"
        }`}
      >
        {text}
      </span>
    );
  }

  return (
    <span className="relative inline-block overflow-hidden align-middle select-none">
      {/* Texto 1: Reposo -> Sube en hover */}
      <span
        className={`block font-medium transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full ${
          active ? "text-accent-connection font-semibold" : className || "text-muted-foreground"
        }`}
      >
        {text}
      </span>

      {/* Texto 2: Hover/Focus -> Entra desde abajo en color de acento luminoso */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 block font-medium transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${
          active ? "text-foreground font-semibold" : "text-accent-connection"
        }`}
      >
        {text}
      </span>
    </span>
  );
}
