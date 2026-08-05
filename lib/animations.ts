import { type Variants } from "motion/react";

type FadeUpVariantOptions = {
  y?: number;
  duration?: number;
  reducedMotion?: boolean;
};

export function fadeUpVariant({
  y = 20,
  duration = 0.55,
  reducedMotion = false,
}: FadeUpVariantOptions = {}): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }

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
