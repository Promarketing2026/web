"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface MagneticLiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  asChild?: boolean;
}

export function MagneticLiquidButton({
  children,
  onClick,
  className = "",
  strength = 0.35,
}: MagneticLiquidButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [liquidPos, setLiquidPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 140, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    if (!shouldReduceMotion) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setLiquidPos({
      x: relX,
      y: relY,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setLiquidPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={shouldReduceMotion ? {} : { x: springX, y: springY }}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-lg cursor-pointer select-none transition-shadow duration-300 ${className}`}
    >
      {/* Capa de relleno líquido expansivo (Liquid/Gooey Fill) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          liquidPos.active ? "scale-[3] opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          left: `${liquidPos.x}px`,
          top: `${liquidPos.y}px`,
        }}
      />

      {/* Contenido en primer plano */}
      <span className="relative z-10 flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-[1.03]">
        {children}
      </span>
    </motion.div>
  );
}
