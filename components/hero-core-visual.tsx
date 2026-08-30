"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function HeroCoreVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 85, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let processedCanvas: HTMLCanvasElement | null = null;
    let isImageLoaded = false;
    let angle = 0;

    const img = new window.Image();
    img.src = "/hero-core.jpg";
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = img.naturalWidth || 1200;
      offCanvas.height = img.naturalHeight || 675;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
      const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imgData.data;
      const w = offCanvas.width;
      const h = offCanvas.height;
      const cx = w / 2;
      const cy = h * 0.42;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          const dx = (x - cx) / (w * 0.45);
          const dy = (y - cy) / (h * 0.48);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const edgeFade = dist > 0.65 ? Math.max(0, 1 - (dist - 0.65) / 0.35) : 1;

          const brightness = Math.max(r, g, b);
          const isGlowOrHand = b > 30 || g > 25 || r > 20;

          if (brightness < 12 && !isGlowOrHand) {
            data[idx + 3] = 0;
          } else {
            const alphaFactor = Math.min(1, Math.pow(brightness / 70, 1.2));
            data[idx + 3] = Math.round(255 * alphaFactor * edgeFade);
          }
        }
      }

      offCtx.putImageData(imgData, 0, 0);
      processedCanvas = offCanvas;
      isImageLoaded = true;
      render();
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
    };

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const cx = width / 2;
      const cy = width < 640 ? height * 0.36 : height * 0.40;

      ctx.clearRect(0, 0, width, height);

      if (!shouldReduceMotion) {
        angle += 0.012;
      }

      // Rayos volumétricos de luz
      const radius = Math.min(width * 0.12, width < 640 ? 55 : 70);
      const rayCount = width < 640 ? 12 : 18;
      for (let i = 0; i < rayCount; i++) {
        const rayAngle = angle * 0.4 + (i * Math.PI * 2) / rayCount;
        const length = radius * (1.9 + Math.sin(angle * 2.2 + i) * 0.35);

        const x1 = cx + Math.cos(rayAngle) * radius;
        const y1 = cy + Math.sin(rayAngle) * radius;
        const x2 = cx + Math.cos(rayAngle) * length;
        const y2 = cy + Math.sin(rayAngle) * length;

        const rayGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        rayGrad.addColorStop(0, "rgba(0, 229, 255, 0.6)");
        rayGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.25)");
        rayGrad.addColorStop(1, "rgba(0, 229, 255, 0)");

        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = width < 640 ? 1.6 : 2.2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Renderizar la Mano Real y el Orbe con Canal Alfa Puro
      if (isImageLoaded && processedCanvas) {
        const drawWidth = Math.min(width * 0.95, width < 640 ? 420 : 780);
        const drawHeight = (drawWidth * processedCanvas.height) / processedCanvas.width;
        const drawX = (width - drawWidth) / 2;
        const drawY = cy - drawHeight * 0.38;

        ctx.drawImage(processedCanvas, drawX, drawY, drawWidth, drawHeight);
      }

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    mouseX.set(x * 12);
    mouseY.set(y * 12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative left-1/2 -translate-x-1/2 mt-2 flex w-screen max-w-none flex-col items-center justify-center overflow-visible select-none"
    >
      {/* Contenedor con Paralaje Interactivo */}
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center">
        <motion.div
          style={shouldReduceMotion ? {} : { x: smoothX, y: smoothY }}
          className="relative flex h-[440px] w-full max-w-4xl items-center justify-center sm:h-[520px] md:h-[580px]"
        >
          {/* Canvas Directo */}
          <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none" />

          {/* 1. Telemetría HUD Superior: INFRAESTRUCTURA */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-center z-10 sm:top-4 md:top-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center px-2"
            >
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-cyan-300 animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-sky-400 uppercase sm:text-[11px]">
                  Infraestructura
                </span>
              </div>
              <span className="mt-0.5 text-xs font-semibold text-foreground tracking-wide sm:text-sm md:text-base">
                Motor Comercial Centralizado
              </span>
            </motion.div>
          </div>

          {/* 2. Telemetría HUD Izquierda: SISTEMA DE DEMANDA */}
          <div className="absolute bottom-3 left-3 text-left z-10 sm:bottom-auto sm:top-[46%] sm:left-6 sm:-translate-y-1/2 md:left-10 lg:left-16">
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col max-w-[140px] sm:max-w-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-sky-400 uppercase sm:text-[11px]">
                  Demanda
                </span>
              </div>
              <span className="mt-0.5 text-xs font-semibold text-foreground tracking-wide sm:text-sm md:text-base">
                Prospectos B2B
              </span>
              <span className="text-[10px] font-mono text-sky-300/80 sm:text-[11px]">
                Tracking: +42%
              </span>
            </motion.div>
          </div>

          {/* 3. Telemetría HUD Derecha: SISTEMA DE CONVERSIÓN */}
          <div className="absolute bottom-3 right-3 text-right z-10 sm:bottom-auto sm:top-[46%] sm:right-6 sm:-translate-y-1/2 md:right-10 lg:right-16">
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-end max-w-[140px] sm:max-w-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-cyan-300 animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-cyan-400 uppercase sm:text-[11px]">
                  Conversión
                </span>
              </div>
              <span className="mt-0.5 text-xs font-semibold text-foreground tracking-wide sm:text-sm md:text-base">
                Embudos & CRM
              </span>
              <span className="text-[10px] font-mono text-cyan-300/80 sm:text-[11px]">
                Sync: 100%
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
