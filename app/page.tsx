import type { Metadata } from "next";

import { Hero } from "@/components/hero";
import { TensionGrid } from "@/components/tension-grid";
import { CategoryPositioning } from "@/components/category-positioning";
import { OperationalRouting } from "@/components/operational-routing";
import { AutonomyCommitment } from "@/components/autonomy-commitment";
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
      <TensionGrid />
      <CategoryPositioning />
      <OperationalRouting />
      <AutonomyCommitment />
      <FinalCta />
    </>
  );
}
