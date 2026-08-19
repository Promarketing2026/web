"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

const CIRCLE_RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~125.66

export function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }

      // Mostrar el botón a partir de 250px de scroll
      setIsVisible(scrollTop > 250);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const strokeDashoffset = CIRCUMFERENCE - (scrollProgress / 100) * CIRCUMFERENCE;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-card/85 text-foreground shadow-lg shadow-black/25 backdrop-blur-md transition-all hover:border-[var(--accent-connection)] hover:shadow-[0_0_16px_rgba(60,245,181,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {/* Anillo de progreso SVG */}
            <svg
              className="absolute inset-0 -rotate-90 p-0.5"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              {/* Pista de fondo */}
              <circle
                cx="24"
                cy="24"
                r={CIRCLE_RADIUS}
                className="stroke-border/40"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Progreso activo */}
              <circle
                cx="24"
                cy="24"
                r={CIRCLE_RADIUS}
                className="stroke-[var(--accent-connection)] transition-[stroke-dashoffset] duration-100 ease-out"
                strokeWidth="2.5"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Icono de flecha */}
            <ArrowUp
              className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-connection)]"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
