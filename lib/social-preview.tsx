import { ImageResponse } from "next/og";

import { BRAND_COLORS } from "@/lib/brand-tokens";

const SOCIAL_PREVIEW_SIZE = {
  width: 1200,
  height: 630,
};

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      height={220}
      viewBox="0 0 480 480"
      width={220}
    >
      <polygon
        fill={BRAND_COLORS.logoOnLight}
        points="290.526 0 290.526 42.105 437.895 42.105 437.895 189.474 480 189.474 480 0 290.526 0"
      />
      <polygon
        fill={BRAND_COLORS.logoOnLight}
        points="42.105 42.105 189.474 42.105 189.474 0 0 0 0 189.474 42.105 189.474 42.105 42.105"
      />
      <polygon
        fill={BRAND_COLORS.logoOnLight}
        points="437.895 437.895 290.526 437.895 290.526 480 480 480 480 290.526 437.895 290.526 437.895 437.895"
      />
      <polygon
        fill={BRAND_COLORS.logoOnLight}
        points="42.105 290.526 0 290.526 0 480 189.474 480 189.474 437.895 42.105 437.895 42.105 290.526"
      />
      <rect
        fill={BRAND_COLORS.logoOnLight}
        height={40}
        width={40}
        x={220}
        y={220}
      />
      <path
        d="M120,360h240V120H120v240ZM161.379,161.379h157.241v157.241h-157.241v-157.241Z"
        fill={BRAND_COLORS.logoOnLight}
      />
    </svg>
  );
}

export function createSocialPreviewImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: BRAND_COLORS.canvasLight,
        color: BRAND_COLORS.ink,
        display: "flex",
        fontFamily: "Arial, Helvetica, sans-serif",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 64px 64px 72px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2.4,
          }}
        >
          <span
            style={{
              background: BRAND_COLORS.decisionLight,
              display: "flex",
              height: 12,
              marginRight: 16,
              width: 12,
            }}
          />
          PROMARKETING PERÚ
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: -2.6,
              lineHeight: 1.02,
              maxWidth: 760,
            }}
          >
            Infraestructura Comercial Conectada
          </div>
          <div
            style={{
              color: BRAND_COLORS.textSecondaryLight,
              display: "flex",
              fontSize: 28,
              lineHeight: 1.25,
              marginTop: 28,
            }}
          >
            Firma de sistemas comerciales integrados
          </div>
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          background: BRAND_COLORS.surfaceLight,
          borderLeft: `2px solid ${BRAND_COLORS.connectionLight}`,
          display: "flex",
          justifyContent: "center",
          width: 360,
        }}
      >
        <BrandMark />
      </div>
    </div>,
    SOCIAL_PREVIEW_SIZE,
  );
}
