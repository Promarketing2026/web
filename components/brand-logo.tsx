import { type SVGProps } from "react";

type BrandLogoProps = SVGProps<SVGSVGElement> & {
  size?: number;
  variant?: "dark" | "light" | "auto";
};

export function BrandIsotipo({
  size = 24,
  variant = "auto",
  className = "",
  ...props
}: BrandLogoProps) {
  // #f3f2ee para oscuro, #111111 para claro, currentColor si es auto
  const fillColor =
    variant === "dark"
      ? "#f3f2ee"
      : variant === "light"
        ? "#111111"
        : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 480"
      width={size}
      height={size}
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-hidden="true"
      {...props}
    >
      <polygon
        points="290.526 0 290.526 42.105 437.895 42.105 437.895 189.474 480 189.474 480 0 290.526 0"
        fill={fillColor}
      />
      <polygon
        points="42.105 42.105 189.474 42.105 189.474 0 0 0 0 189.474 42.105 189.474 42.105 42.105"
        fill={fillColor}
      />
      <polygon
        points="437.895 437.895 290.526 437.895 290.526 480 480 480 480 290.526 437.895 290.526 437.895 437.895"
        fill={fillColor}
      />
      <polygon
        points="42.105 290.526 0 290.526 0 480 189.474 480 189.474 437.895 42.105 437.895 42.105 290.526"
        fill={fillColor}
      />
      <rect x="220" y="220" width="40" height="40" fill={fillColor} />
      <path
        d="M120,360h240V120H120v240ZM161.379,161.379h157.241v157.241h-157.241v-157.241Z"
        fill={fillColor}
      />
    </svg>
  );
}
