import type { backendInterface, BenefitItem, EvidenceLevel, FaqEntry, PricingEntry, ProteinCalculationResult, SafetyItem, SeverityLevel, WheyType } from "../backend";

export const mockBackend: backendInterface = {
  getWheyTypes: async (): Promise<WheyType[]> => [
    {
      id: "concentrate",
      name: "Whey Protein Concentrate (WPC)",
      proteinPercent: BigInt(70),
      lactoseContent: "Moderate (4–8%)",
      fatContent: "Moderate (4–7%)",
      costRangePerLb: "$8–$15",
      bestFor: ["Beginners", "Budget-conscious athletes", "Muscle gain", "General fitness"],
      description:
        "The least processed form of whey, retaining more of the naturally occurring bioactive compounds like immunoglobulins and lactoferrin. Contains 60–80% protein by weight with moderate amounts of fat and lactose. Ideal for those without lactose sensitivity who want a cost-effective protein source with a rich, creamy taste.",
    },
    {
      id: "isolate",
      name: "Whey Protein Isolate (WPI)",
      proteinPercent: BigInt(90),
      lactoseContent: "Low (<1%)",
      fatContent: "Very low (<1%)",
      costRangePerLb: "$15–$25",
      bestFor: ["Lactose-intolerant individuals", "Lean muscle building", "Post-workout recovery", "Calorie-conscious athletes"],
      description:
        "Further processed to remove most fat and lactose, resulting in 90%+ protein by weight. The filtration process yields a purer product that is rapidly absorbed. Highly suitable for lactose-intolerant users and those on strict macronutrient plans.",
    },
    {
      id: "hydrolysate",
      name: "Whey Protein Hydrolysate (WPH)",
      proteinPercent: BigInt(90),
      lactoseContent: "Very low (<0.5%)",
      fatContent: "Very low (<1%)",
      costRangePerLb: "$20–$40",
      bestFor: ["Elite athletes", "Rapid post-workout recovery", "Individuals with digestion issues", "Medical/clinical nutrition"],
      description:
        "Pre-digested whey where peptide bonds are partially broken down via enzymatic hydrolysis, resulting in smaller peptides and free amino acids for the fastest possible absorption.",
    },
  ],

  getFaqs: async (): Promise<FaqEntry[]> => [
    {
      id: BigInt(1),
      question: "What is whey protein and where does it come from?",
      answer:
        "Whey protein is a high-quality complete protein derived as a byproduct of cheese manufacturing. It contains all nine essential amino acids and is particularly rich in branched-chain amino acids (BCAAs), especially leucine.",
      category: "basics",
    },
    {
      id: BigInt(2),
      question: "Is whey protein safe for healthy adults?",
      answer:
        "Yes. Decades of research confirm that whey protein is safe for healthy adults at recommended doses. The FDA classifies whey protein as 'generally recognized as safe' (GRAS).",
      category: "safety",
    },
    {
      id: BigInt(3),
      question: "Can whey protein damage your kidneys?",
      answer:
        "This is a common myth unsupported by evidence in healthy individuals. Multiple systematic reviews confirm that high protein intake does not adversely affect kidney function in people with healthy kidneys.",
      category: "safety",
    },
    {
      id: BigInt(4),
      question: "How much whey protein should I take per day?",
      answer:
        "General evidence-based guidelines: Sedentary adults: 0.8 g/kg. Active individuals: 1.2–1.6 g/kg. Strength athletes: 1.6–2.2 g/kg. For most active adults, 1–2 scoops (25–50g) per day covers what typical diet may lack.",
      category: "dosage",
    },
    {
      id: BigInt(5),
      question: "When is the best time to take whey protein?",
      answer:
        "Total daily protein intake matters most. Post-workout: 20–40g within 1–2 hours optimizes muscle protein synthesis. The most important factor is total daily protein spread across 3–5 meals.",
      category: "dosage",
    },
    {
      id: BigInt(6),
      question: "What is the difference between concentrate, isolate, and hydrolysate?",
      answer:
        "Concentrate: 60–80% protein, more fat/lactose, lowest cost. Isolate: 90%+ protein, low fat/lactose, mid-range cost. Hydrolysate: 90%+ protein, pre-digested for fastest absorption, highest cost.",
      category: "types",
    },
  ],

  calculateProtein: async (bodyWeightKg: number, fitnessGoal: string): Promise<ProteinCalculationResult> => {
    const proteinPerKg = fitnessGoal === "muscle_gain" ? 2.0 : fitnessGoal === "weight_loss" ? 2.2 : 1.4;
    const dailyTarget = bodyWeightKg * proteinPerKg;
    const rawServings = dailyTarget / 30;
    const servingsPerDay = rawServings <= 1 ? 1 : rawServings <= 2 ? 2 : rawServings <= 3 ? 3 : 4;
    return {
      bodyWeightKg,
      fitnessGoal,
      dailyProteinTargetG: dailyTarget,
      servingsPerDay: BigInt(servingsPerDay),
      dosePerServingG: 30,
    };
  },

  getBenefits: async (): Promise<BenefitItem[]> => [
    {
      id: BigInt(1),
      title: "Stimulates Muscle Protein Synthesis",
      description:
        "Whey protein is the most leucine-rich dietary protein source. Leucine acts as a molecular trigger for mTORC1 signaling—the primary anabolic pathway driving muscle protein synthesis.",
      evidenceLevel: "strong" as EvidenceLevel,
      sourceCitation: "Tang JE et al. (2009). AJCN 90(5):1023-1032.",
    },
    {
      id: BigInt(2),
      title: "Accelerates Post-Exercise Recovery",
      description:
        "Whey protein consumed post-exercise significantly reduces exercise-induced muscle damage markers and restores muscle function faster than carbohydrate controls.",
      evidenceLevel: "strong" as EvidenceLevel,
      sourceCitation: "Cockburn E et al. (2010). Applied Physiology, Nutrition and Metabolism.",
    },
    {
      id: BigInt(3),
      title: "Supports Weight Management and Fat Loss",
      description:
        "Whey protein supplementation during energy restriction preserves lean muscle mass while promoting fat loss through increased satiety and higher thermic effect of food.",
      evidenceLevel: "strong" as EvidenceLevel,
      sourceCitation: "Miller PE et al. (2014). J Am Coll Nutr 33(2):163-175.",
    },
    {
      id: BigInt(4),
      title: "Improves Strength and Power Output",
      description:
        "Combined with resistance training, whey protein supplementation produces greater gains in muscle strength compared to carbohydrate or soy protein supplementation.",
      evidenceLevel: "strong" as EvidenceLevel,
      sourceCitation: "Candow DG et al. (2006). Int J Sport Nutr Exerc Metab.",
    },
    {
      id: BigInt(5),
      title: "Reduces Blood Pressure",
      description:
        "Bioactive peptides in whey protein act as ACE inhibitors, potentially reducing systolic and diastolic blood pressure in hypertensive populations.",
      evidenceLevel: "moderate" as EvidenceLevel,
      sourceCitation: "Pal S & Ellis V (2010). Br J Nutr 104(8):1241-1248.",
    },
    {
      id: BigInt(6),
      title: "Boosts Immune Function",
      description:
        "Whey contains immunoglobulins and lactoferrin that support immune defense. Supplementation enhances glutathione production supporting immune function under exercise stress.",
      evidenceLevel: "moderate" as EvidenceLevel,
      sourceCitation: "Bounous G & Gold P (1991). Clin Invest Med 14(4):296-309.",
    },
    {
      id: BigInt(7),
      title: "May Reduce Inflammation",
      description:
        "Some trials report whey protein reduces CRP and other inflammatory markers via antioxidant effects and modulation of NF-κB pathway.",
      evidenceLevel: "preliminary" as EvidenceLevel,
      sourceCitation: "Zhou LM et al. (2015). Nutrients 7(2):1131-1143.",
    },
    {
      id: BigInt(8),
      title: "Supports Healthy Aging and Muscle Preservation",
      description:
        "Whey protein is effective in older adults for stimulating muscle protein synthesis even at lower doses, helping combat age-related muscle loss (sarcopenia).",
      evidenceLevel: "moderate" as EvidenceLevel,
      sourceCitation: "Bauer J et al. (2015). J Am Med Dir Assoc.",
    },
  ],

  getSafetyInfo: async (): Promise<SafetyItem[]> => [
    {
      id: BigInt(1),
      category: "allergy",
      title: "Milk Protein Allergy",
      detail:
        "Individuals with a diagnosed IgE-mediated milk protein allergy must avoid all whey protein products. Symptoms can include hives, anaphylaxis, and respiratory distress.",
      severity: "severe" as SeverityLevel,
    },
    {
      id: BigInt(2),
      category: "kidney",
      title: "Pre-existing Kidney Disease",
      detail:
        "Individuals with chronic kidney disease should consult a nephrologist before significantly increasing protein intake. High protein adds burden to compromised kidney function.",
      severity: "severe" as SeverityLevel,
    },
    {
      id: BigInt(3),
      category: "digestive",
      title: "Lactose Intolerance and Digestive Discomfort",
      detail:
        "Whey concentrate may cause bloating or diarrhea in lactose-intolerant individuals. Switching to isolate or hydrolysate typically resolves these symptoms.",
      severity: "mild" as SeverityLevel,
    },
    {
      id: BigInt(4),
      category: "skin",
      title: "Acne Exacerbation",
      detail:
        "Whey protein stimulates IGF-1 and insulin signaling, which can increase sebum production and promote acne in susceptible individuals.",
      severity: "mild" as SeverityLevel,
    },
    {
      id: BigInt(5),
      category: "medication",
      title: "Drug and Medication Interactions",
      detail:
        "Whey protein may interact with Levodopa, Alendronate, and some antibiotics. Always inform your physician about supplement use.",
      severity: "moderate" as SeverityLevel,
    },
    {
      id: BigInt(6),
      category: "contamination",
      title: "Heavy Metal Contamination Risk",
      detail:
        "Some protein supplements have tested positive for heavy metals. Mitigate this by choosing products with NSF Certified for Sport or Informed Sport certifications.",
      severity: "moderate" as SeverityLevel,
    },
  ],

  getPricingData: async (): Promise<PricingEntry[]> => [
    {
      id: BigInt(1),
      productType: "Whey Protein Concentrate (WPC 70–80%)",
      priceRangePerLb: "$8–$15",
      pricePerServing: "$0.35–$0.65",
      monthlyEstimate: "$11–$20",
      notes: "Best value for healthy adults without lactose sensitivity. Widely available from major brands.",
    },
    {
      id: BigInt(2),
      productType: "Whey Protein Isolate (WPI 90%+)",
      priceRangePerLb: "$15–$25",
      pricePerServing: "$0.65–$1.10",
      monthlyEstimate: "$20–$33",
      notes: "Recommended for lactose-intolerant individuals or those tracking macros strictly.",
    },
    {
      id: BigInt(3),
      productType: "Whey Protein Hydrolysate (WPH)",
      priceRangePerLb: "$20–$40",
      pricePerServing: "$0.90–$1.80",
      monthlyEstimate: "$27–$54",
      notes: "Premium pricing for pre-digested protein. Used by elite athletes or those with digestive conditions.",
    },
    {
      id: BigInt(4),
      productType: "Blended Whey (Concentrate + Isolate)",
      priceRangePerLb: "$12–$20",
      pricePerServing: "$0.50–$0.90",
      monthlyEstimate: "$15–$27",
      notes: "Common in many popular products. Balances cost and purity.",
    },
    {
      id: BigInt(5),
      productType: "Grass-Fed / Organic Whey",
      priceRangePerLb: "$20–$45",
      pricePerServing: "$0.90–$2.00",
      monthlyEstimate: "$27–$60",
      notes: "Higher omega-3 content. Appeals to those prioritizing sourcing quality.",
    },
    {
      id: BigInt(6),
      productType: "Budget / Store Brand Whey",
      priceRangePerLb: "$6–$12",
      pricePerServing: "$0.28–$0.55",
      monthlyEstimate: "$8–$17",
      notes: "Best for cost-constrained athletes who verify label accuracy independently.",
    },
  ],
};
