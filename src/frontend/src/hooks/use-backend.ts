import type {
  Benefit,
  FaqEntry,
  PricingData,
  SafetyItem,
  WheyType,
} from "@/types/whey";
import { useQuery } from "@tanstack/react-query";

// ── Static data (backend methods not yet bound; will wire to actor once bindgen exposes them) ──

const WHEY_TYPES: WheyType[] = [
  {
    id: "concentrate",
    name: "Whey Concentrate (WPC)",
    description:
      "The most common form — cost-effective with 70–80 % protein per serving. Retains some lactose and fat, which contributes to flavour.",
    proteinPercent: 75,
    lactose: "low",
    absorptionRate: "fast",
    bestFor: [
      "Budget-conscious athletes",
      "Beginner lifters",
      "Post-workout recovery",
    ],
    priceRange: "budget",
    citation: "Hulmi JJ et al. (2010). Nutr Metab. PMID 20565767",
  },
  {
    id: "isolate",
    name: "Whey Isolate (WPI)",
    description:
      "Further processed to ≥90 % protein. Most lactose removed, lower fat content, faster absorption than concentrate.",
    proteinPercent: 90,
    lactose: "trace",
    absorptionRate: "fast",
    bestFor: [
      "Lactose-sensitive individuals",
      "Cutting phases",
      "Lean muscle gain",
    ],
    priceRange: "mid",
    citation:
      "Cribb PJ et al. (2006). Int J Sport Nutr Exerc Metab. PMID 16676705",
  },
  {
    id: "hydrolysate",
    name: "Hydrolysed Whey (WPH)",
    description:
      "Pre-digested via enzymatic hydrolysis for the fastest absorption. Bitter taste, premium price point.",
    proteinPercent: 90,
    lactose: "none",
    absorptionRate: "fast",
    bestFor: ["Elite athletes", "Post-surgery recovery", "Clinical settings"],
    priceRange: "premium",
    citation: "Morifuji M et al. (2010). J Nutr Sci Vitaminol. PMID 21248405",
  },
  {
    id: "casein",
    name: "Micellar Casein",
    description:
      "Slow-digesting milk protein (7–8 h). Ideal before sleep to support overnight muscle protein synthesis.",
    proteinPercent: 80,
    lactose: "low",
    absorptionRate: "slow",
    bestFor: [
      "Overnight recovery",
      "Appetite control",
      "Anti-catabolic support",
    ],
    priceRange: "mid",
    citation: "Res PT et al. (2012). Med Sci Sports Exerc. PMID 22330017",
  },
  {
    id: "plant",
    name: "Plant-Based Blends",
    description:
      "Pea + rice combinations achieve a complete amino acid profile. Suitable for vegans; slightly lower leucine content.",
    proteinPercent: 70,
    lactose: "none",
    absorptionRate: "medium",
    bestFor: ["Vegan athletes", "Dairy-free diets", "Eco-conscious consumers"],
    priceRange: "mid",
    citation: "Banaszek A et al. (2019). Sports (Basel). PMID 30621129",
  },
];

const BENEFITS: Benefit[] = [
  {
    id: "muscle-growth",
    title: "Muscle Protein Synthesis",
    description:
      "Whey's rich leucine content (≈11 %) activates mTOR signalling — the primary anabolic pathway. Studies show a 24 % greater MPS response vs. soy protein.",
    evidence: "strong",
    citation: "Tang JE et al. (2009). J Appl Physiol. PMID 19589961",
    icon: "💪",
  },
  {
    id: "recovery",
    title: "Accelerated Recovery",
    description:
      "Rapid delivery of amino acids within 60–90 minutes post-exercise reduces DOMS markers and restores muscle glycogen signalling.",
    evidence: "strong",
    citation: "Cockburn E et al. (2010). Eur J Appl Physiol. PMID 19820967",
    icon: "⚡",
  },
  {
    id: "weight-management",
    title: "Satiety & Body Composition",
    description:
      "High protein density promotes satiety hormones (GLP-1, PYY) and reduces ghrelin. Meta-analyses support ~3.3 kg greater fat loss vs. control.",
    evidence: "strong",
    citation: "Wirunsawanya K et al. (2018). J Am Coll Nutr. PMID 29087242",
    icon: "⚖️",
  },
  {
    id: "immune",
    title: "Immune Support",
    description:
      "Whey's lactoferrin and immunoglobulins provide antimicrobial activity. Glutathione precursors (cysteine) may reduce exercise-induced oxidative stress.",
    evidence: "moderate",
    citation: "Bounous G & Gold P. (1991). Clin Invest Med. PMID 1651841",
    icon: "🛡️",
  },
  {
    id: "strength",
    title: "Strength Gains",
    description:
      "A meta-analysis of 22 RCTs found whey supplementation increased 1-RM strength by ~5 % more than carbohydrate placebos when combined with resistance training.",
    evidence: "strong",
    citation: "Morton RW et al. (2018). Br J Sports Med. PMID 28698222",
    icon: "🏋️",
  },
  {
    id: "bone",
    title: "Bone Health",
    description:
      "Whey-derived peptides and calcium content positively influence bone mineral density markers in older adults and postmenopausal women.",
    evidence: "emerging",
    citation: "Rizzoli R et al. (2018). Osteoporos Int. PMID 29725749",
    icon: "🦴",
  },
];

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "kidney",
    concern: "Kidney Damage",
    verdict: "myth",
    explanation:
      "Large-scale reviews confirm no adverse effects on kidney function in healthy individuals, even at intakes up to 2.8 g/kg/day. The concern applies to those with pre-existing renal disease.",
    population: "Healthy adults",
    citation: "Antonio J et al. (2016). J Int Soc Sports Nutr. PMID 27330151",
  },
  {
    id: "liver",
    concern: "Liver Stress",
    verdict: "myth",
    explanation:
      "No evidence supports liver toxicity from whey protein in healthy populations. Liver enzymes remain within normal ranges at high protein intakes.",
    population: "Healthy adults",
    citation: "Phillips SM & Van Loon LJ. (2011). J Sports Sci. PMID 22150425",
  },
  {
    id: "lactose",
    concern: "Lactose Intolerance",
    verdict: "caution",
    explanation:
      "WPC contains residual lactose (~3 g/serving). Switching to WPI or WPH virtually eliminates lactose. Most people with lactose intolerance tolerate WPI without symptoms.",
    population: "Lactose-intolerant individuals",
    citation: "Vandenplas Y et al. (2015). Nutrients. PMID 26270686",
  },
  {
    id: "acne",
    concern: "Acne & Skin Issues",
    verdict: "caution",
    explanation:
      "Some case reports link whey to acne flares via IGF-1 stimulation. Evidence is limited to case series; no large RCTs confirm causation. Those prone to acne may experiment with plant-based alternatives.",
    population: "Acne-prone individuals",
    citation: "Pontes TC et al. (2013). An Bras Dermatol. PMID 23518531",
  },
  {
    id: "heavy-metals",
    concern: "Heavy Metal Contamination",
    verdict: "caution",
    explanation:
      "Third-party testing (Labdoor, NSF Certified) reveals some products exceed safe cadmium levels. Always choose NSF Certified for Sport or Informed Sport certified products.",
    population: "All users",
    citation:
      "Consumer Reports Investigation (2010); NSF International Standards",
  },
  {
    id: "overdose",
    concern: "Too Much Protein Harm",
    verdict: "myth",
    explanation:
      "Total protein intakes of 3.4 g/kg/day for 8 weeks produced no adverse health effects in resistance-trained men. Excess is simply oxidised for energy.",
    population: "Resistance-trained adults",
    citation: "Antonio J et al. (2015). J Int Soc Sports Nutr. PMID 26283135",
  },
];

const PRICING_DATA: PricingData = {
  lastUpdated: "May 2026",
  tiers: [
    {
      id: "1",
      brand: "Optimum Nutrition Gold Standard",
      type: "concentrate",
      sizeKg: 2.27,
      priceUSD: 54,
      proteinPerScoop: 24,
      servings: 74,
      pricePerServing: 0.73,
      rating: 4.7,
    },
    {
      id: "2",
      brand: "MyProtein Impact Whey",
      type: "concentrate",
      sizeKg: 2.5,
      priceUSD: 42,
      proteinPerScoop: 21,
      servings: 100,
      pricePerServing: 0.42,
      rating: 4.5,
      badge: "Best Value",
    },
    {
      id: "3",
      brand: "Dymatize ISO100",
      type: "isolate",
      sizeKg: 2.27,
      priceUSD: 72,
      proteinPerScoop: 25,
      servings: 76,
      pricePerServing: 0.95,
      rating: 4.8,
    },
    {
      id: "4",
      brand: "Isopure Zero Carb",
      type: "isolate",
      sizeKg: 2.04,
      priceUSD: 68,
      proteinPerScoop: 25,
      servings: 57,
      pricePerServing: 1.19,
      rating: 4.6,
    },
    {
      id: "5",
      brand: "Ascent Native Fuel",
      type: "isolate",
      sizeKg: 2.04,
      priceUSD: 78,
      proteinPerScoop: 25,
      servings: 57,
      pricePerServing: 1.37,
      rating: 4.7,
      badge: "Editor's Pick",
    },
    {
      id: "6",
      brand: "Momentous Essential",
      type: "hydrolysate",
      sizeKg: 0.64,
      priceUSD: 55,
      proteinPerScoop: 20,
      servings: 24,
      pricePerServing: 2.29,
      rating: 4.6,
    },
    {
      id: "7",
      brand: "Casein Gold Standard",
      type: "casein",
      sizeKg: 1.81,
      priceUSD: 48,
      proteinPerScoop: 24,
      servings: 56,
      pricePerServing: 0.86,
      rating: 4.5,
    },
    {
      id: "8",
      brand: "Garden of Life Sport",
      type: "plant",
      sizeKg: 0.84,
      priceUSD: 52,
      proteinPerScoop: 30,
      servings: 28,
      pricePerServing: 1.86,
      rating: 4.4,
    },
  ],
};

const FAQS: FaqEntry[] = [
  {
    id: "what-is",
    question: "What exactly is whey protein?",
    answer:
      "Whey is the liquid by-product of cheese-making. When filtered and dried, it yields a complete protein powder containing all 9 essential amino acids, with an exceptionally high biological value (BV 104).",
    category: "basics",
  },
  {
    id: "natural",
    question: "Is whey protein natural or a steroid?",
    answer:
      "Whey protein is a food-derived supplement, not a steroid or hormone. It is as natural as drinking milk — it is simply concentrated milk protein. It contains no anabolic steroids, growth hormone, or banned substances (when third-party certified).",
    category: "basics",
  },
  {
    id: "when-to-take",
    question: "When is the best time to take whey?",
    answer:
      "The 'anabolic window' concept has been revised. Current evidence (Schoenfeld & Aragon, 2013) shows total daily protein intake matters more than exact timing. That said, consuming 20–40 g within 2 hours post-workout is a practical strategy with no downside.",
    category: "dosage",
  },
  {
    id: "kidney-safe",
    question: "Is it safe for my kidneys?",
    answer:
      "Yes, for healthy individuals. Multiple systematic reviews confirm no kidney damage at intakes up to 2.8 g/kg/day. Only people with diagnosed chronic kidney disease (CKD) need to restrict protein under medical supervision.",
    category: "safety",
  },
  {
    id: "women",
    question: "Should women use whey protein?",
    answer:
      "Absolutely. Whey protein has identical benefits for women — muscle synthesis, recovery, and body composition improvement. Women typically need 1.2–1.6 g/kg/day of total protein. Whey will not cause unwanted bulk; that requires years of dedicated training and large caloric surpluses.",
    category: "safety",
  },
  {
    id: "food-vs-supplement",
    question: "Can I just eat food instead?",
    answer:
      "Yes. Whole foods (chicken, eggs, Greek yoghurt) are excellent protein sources. Whey supplements are a convenient, cost-effective way to hit daily targets — not a replacement. If you consistently meet protein goals through food alone, supplementation adds little benefit.",
    category: "basics",
  },
  {
    id: "how-much",
    question: "How much whey should I take per day?",
    answer:
      "Most research supports 0.4–0.55 g/kg per meal, distributed across 3–4 meals. Total daily protein targets: 1.6–2.2 g/kg for muscle gain (Stokes T et al., 2018). One standard scoop (25–30 g) counts as one serving.",
    category: "dosage",
  },
  {
    id: "best-brand",
    question: "Which brand should I choose?",
    answer:
      "Prioritise third-party certification (NSF Certified for Sport, Informed Sport) over marketing claims. Dymatize ISO100, Optimum Nutrition Gold Standard, and Ascent Native Fuel consistently rank highly in independent lab tests (Labdoor rankings, 2024).",
    category: "pricing",
  },
];

// ── React Query hooks ──

export function useWheyTypes() {
  return useQuery<WheyType[]>({
    queryKey: ["wheyTypes"],
    queryFn: async () => WHEY_TYPES,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useBenefits() {
  return useQuery<Benefit[]>({
    queryKey: ["benefits"],
    queryFn: async () => BENEFITS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useSafetyInfo() {
  return useQuery<SafetyItem[]>({
    queryKey: ["safetyInfo"],
    queryFn: async () => SAFETY_ITEMS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function usePricingData() {
  return useQuery<PricingData>({
    queryKey: ["pricingData"],
    queryFn: async () => PRICING_DATA,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useFaqs() {
  return useQuery<FaqEntry[]>({
    queryKey: ["faqs"],
    queryFn: async () => FAQS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
