import type { Metadata } from "next";

import { Education } from "@/components/education";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { SocialProof } from "@/components/social-proof";
import { Solution } from "@/components/solution";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Education />
      <Solution />
      <SocialProof />
      <Faq />
      <FinalCta />
    </>
  );
}
