"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function HeroParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isPaused = false;
    const mouse = { x: -9999, y: -9999 };

    const getColors = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        window.getComputedStyle(document.documentElement).getPropertyValue("--background").trim().startsWith("#0");

      return isDark
        ? {
            // Paleta Cyber Deep Blue (exacta a la referencia)
            line: "59, 130, 246",       // Azul eléctrico (#3B82F6)
            node: "96, 165, 250",       // Azul cian luminoso (#60A5FA)
            nodeGlow: "rgba(56, 189, 248, 0.8)", // Resplandor cian (#38BDF8)
            mouseLine: "0, 229, 255",   // Cian neón puro (#00E5FF)
          }
        : {
            line: "37, 99, 235",        // Azul royal
            node: "29, 78, 216",        // Azul cobalto
            nodeGlow: "rgba(37, 99, 235, 0.4)",
            mouseLine: "2, 132, 199",   // Azul cielo profundo
          };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(36, Math.floor((width * height) / 20000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.5 + 0.8,
      }));
    };

    const LINK_DIST = 140;
    const MOUSE_DIST = 180;

    const render = () => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const colors = getColors();

      ctx.clearRect(0, 0, width, height);

      // Movimiento de partículas
      for (const p of particles) {
        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
      }

      // Conexiones entre partículas (Malla Cyber 3D)
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.30;
            ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
            ctx.lineWidth = dist < 70 ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Conexión dinámica hacia el cursor
        const p = particles[i];
        const dmx = p.x - mouse.x;
        const dmy = p.y - mouse.y;
        const dm = Math.hypot(dmx, dmy);

        if (dm < MOUSE_DIST) {
          const alpha = (1 - dm / MOUSE_DIST) * 0.55;
          ctx.strokeStyle = `rgba(${colors.mouseLine}, ${alpha})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Dibujo de los nodos con resplandor neón (Cyber Bloom)
      for (const p of particles) {
        const dmx = p.x - mouse.x;
        const dmy = p.y - mouse.y;
        const near = Math.hypot(dmx, dmy) < MOUSE_DIST;

        ctx.shadowBlur = near ? 10 : 5;
        ctx.shadowColor = colors.nodeGlow;

        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r * 1.8 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.node}, ${near ? 0.95 : 0.65})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleThemeChange = () => {
      if (shouldReduceMotion) {
        render();
      }
    };

    const handleThemePause = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      isPaused = Boolean(customEvent.detail);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("themechange", handleThemeChange);
    window.addEventListener("themepause", handleThemePause);
    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener("mousemove", handleMouseMove);
      parentEl.addEventListener("mouseleave", handleMouseLeave);
    }

    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", handleThemeChange);
      window.removeEventListener("themepause", handleThemePause);
      if (parentEl) {
        parentEl.removeEventListener("mousemove", handleMouseMove);
        parentEl.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_42%,#000_40%,transparent_90%)]"
    />
  );
}
