import { Footer } from "@/components/Footer";
import { Layout } from "@/components/Layout";
import { BenefitsSection } from "@/sections/BenefitsSection";
import { CalculatorSection } from "@/sections/CalculatorSection";
import { DosageSection } from "@/sections/DosageSection";
import { FaqSection } from "@/sections/FaqSection";
import { HeroSection } from "@/sections/HeroSection";
import { PricingSection } from "@/sections/PricingSection";
import { SafetySection } from "@/sections/SafetySection";
import { TypesComparisonSection } from "@/sections/TypesComparisonSection";
import { WhatIsItSection } from "@/sections/WhatIsItSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <WhatIsItSection />
      <TypesComparisonSection />
      <BenefitsSection />
      <SafetySection />
      <DosageSection />
      <CalculatorSection />
      <PricingSection />
      <FaqSection />
    </Layout>
  );
}
