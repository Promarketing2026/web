"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

import { EducationInfrastructureDiagram } from "@/components/education-infrastructure-diagram";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const stages = gsap.utils.toArray<SVGGElement>("[data-education-stage]");
      const textItems = gsap.utils.toArray<HTMLElement>("[data-education-item]");

      gsap.set(stages, { opacity: 0 });

      if (shouldReduceMotion) {
        const finalStage = stages[stages.length - 1];
        if (finalStage) gsap.set(finalStage, { opacity: 1 });
        gsap.set(textItems, { clearProps: "color", opacity: 1 });
        return;
      }

      gsap.set(stages[0], { opacity: 1 });
      gsap.set(textItems, {
        color: "var(--muted-foreground)",
        opacity: 1,
      });
      gsap.set(textItems[0], { color: "var(--foreground)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to({}, { duration: 1 })
        .to(stages[0], { opacity: 0, duration: 0.35, ease: "none" })
        .to(stages[1], { opacity: 1, duration: 0.35, ease: "none" }, "<")
        .to(
          textItems[0],
          {
            color: "var(--muted-foreground)",
            duration: 0.35,
            ease: "none",
          },
          "<",
        )
        .to(
          textItems[1],
          { color: "var(--foreground)", duration: 0.35, ease: "none" },
          "<",
        )
        .to({}, { duration: 1 })
        .to(stages[1], { opacity: 0, duration: 0.35, ease: "none" })
        .to(stages[2], { opacity: 1, duration: 0.35, ease: "none" }, "<")
        .to(
          textItems[1],
          {
            color: "var(--muted-foreground)",
            duration: 0.35,
            ease: "none",
          },
          "<",
        )
        .to(
          textItems[2],
          { color: "var(--foreground)", duration: 0.35, ease: "none" },
          "<",
        )
        .to({}, { duration: 1 });
    },
    {
      dependencies: [shouldReduceMotion],
      revertOnUpdate: true,
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="education-title"
      className="px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:gap-8">
        <h2
          id="education-title"
          className="max-w-3xl text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
        >
          Invertir sin saber qué funciona no es una estrategia.
        </h2>
        <div className="max-w-3xl space-y-5">
          <p data-education-item className="text-lg leading-8 text-muted-foreground">
            Muchas organizaciones invierten en múltiples canales, pero operan a
            ciegas.
          </p>
          <p data-education-item className="text-lg leading-8 text-muted-foreground">
            Se necesita construir trazabilidad para poder rastrear el origen, el
            recorrido y el resultado exacto de cada oportunidad comercial.
          </p>
          <p
            data-education-item
            className="text-2xl leading-tight font-semibold text-foreground sm:text-3xl"
          >
            Sin capacidad de atribución, no puedes saber qué acciones generan
            resultados reales — y terminas tomando decisiones con información
            parcial.
          </p>
        </div>
        <EducationInfrastructureDiagram />
      </div>
    </section>
  );
}
