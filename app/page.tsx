import type { Metadata } from "next";

import { Hero } from "@/components/hero";
import { NeedsGrid } from "@/components/needs-grid";
import { Tension } from "@/components/tension";
import { Education } from "@/components/education";
import { InteractiveDemo } from "@/components/interactive-demo";
import { HowWeThink } from "@/components/how-we-think";
import { SocialProof } from "@/components/social-proof";
import { KnowledgeSection } from "@/components/knowledge-section";
import { FinalCta } from "@/components/final-cta";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <NeedsGrid />
      <Tension />
      <Education />
      <InteractiveDemo />
      <HowWeThink />
      <SocialProof />
      <KnowledgeSection />
      <FinalCta />
    </>
  );
}
