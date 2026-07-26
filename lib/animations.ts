import { type Variants } from "motion/react";

type FadeUpVariantOptions = {
  y?: number;
  duration?: number;
};

export function fadeUpVariant({
  y = 20,
  duration = 0.55,
}: FadeUpVariantOptions = {}): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    }),
  };
}
