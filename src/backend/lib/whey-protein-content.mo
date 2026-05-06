import Types "../types/whey-protein-content";

module {
  public func getWheyTypes() : [Types.WheyType] {
    [
      {
        id = "concentrate";
        name = "Whey Protein Concentrate (WPC)";
        proteinPercent = 70;
        lactoseContent = "Moderate (4–8%)";
        fatContent = "Moderate (4–7%)";
        costRangePerLb = "$8–$15";
        bestFor = ["Beginners", "Budget-conscious athletes", "Muscle gain", "General fitness"];
        description = "The least processed form of whey, retaining more of the naturally occurring bioactive compounds like immunoglobulins and lactoferrin. Contains 60–80% protein by weight with moderate amounts of fat and lactose. Ideal for those without lactose sensitivity who want a cost-effective protein source with a rich, creamy taste.";
      },
      {
        id = "isolate";
        name = "Whey Protein Isolate (WPI)";
        proteinPercent = 90;
        lactoseContent = "Low (<1%)";
        fatContent = "Very low (<1%)";
        costRangePerLb = "$15–$25";
        bestFor = ["Lactose-intolerant individuals", "Lean muscle building", "Post-workout recovery", "Calorie-conscious athletes"];
        description = "Further processed to remove most fat and lactose, resulting in 90%+ protein by weight. The filtration process (typically cross-flow microfiltration or ion exchange) yields a purer product that is rapidly absorbed. Highly suitable for lactose-intolerant users and those on strict macronutrient plans. Research supports its use for rapid post-exercise muscle protein synthesis (Tang et al., 2009, AJCN).";
      },
      {
        id = "hydrolysate";
        name = "Whey Protein Hydrolysate (WPH)";
        proteinPercent = 90;
        lactoseContent = "Very low (<0.5%)";
        fatContent = "Very low (<1%)";
        costRangePerLb = "$20–$40";
        bestFor = ["Elite athletes", "Rapid post-workout recovery", "Individuals with digestion issues", "Medical/clinical nutrition"];
        description = "Pre-digested whey where peptide bonds are partially broken down via enzymatic hydrolysis, resulting in smaller peptides and free amino acids for the fastest possible absorption. Clinical trials show it can stimulate insulin and muscle protein synthesis faster than intact proteins. Typically the most expensive form due to additional processing. (Manninen, 2009, Nutr Metab).";
      }
    ];
  };

  public func getFaqs() : [Types.FaqEntry] {
    [
      {
        id = 1;
        question = "What is whey protein and where does it come from?";
        answer = "Whey protein is a high-quality complete protein derived as a byproduct of cheese manufacturing. When milk coagulates during cheese production, it separates into solid curds (used for cheese) and liquid whey. This liquid is then filtered, dried, and processed into whey protein powder. It contains all nine essential amino acids, making it a complete protein, and is particularly rich in branched-chain amino acids (BCAAs), especially leucine—the primary trigger for muscle protein synthesis.";
        category = "basics";
      },
      {
        id = 2;
        question = "Is whey protein safe for healthy adults?";
        answer = "Yes. Decades of research and clinical trials confirm that whey protein is safe for healthy adults when consumed at recommended doses. A comprehensive review by the International Society of Sports Nutrition (ISSN) concludes that protein intakes up to 2.2 g/kg/day are safe for healthy exercising individuals (Stokes et al., 2018, JISSN). The FDA classifies whey protein as 'generally recognized as safe' (GRAS). However, individuals with kidney disease, lactose intolerance, or milk allergy should consult a physician before use.";
        category = "safety";
      },
      {
        id = 3;
        question = "Can whey protein damage your kidneys?";
        answer = "This is a common myth unsupported by evidence in healthy individuals. Multiple systematic reviews confirm that high protein intake does not adversely affect kidney function in people with healthy kidneys (Antonio et al., 2016, JISSN). The concern originates from studies on patients who already had kidney disease—in that population, protein restriction may be necessary. If you have pre-existing kidney conditions, always consult a nephrologist before increasing protein intake.";
        category = "safety";
      },
      {
        id = 4;
        question = "How much whey protein should I take per day?";
        answer = "The optimal amount depends on your body weight, activity level, and goals. General evidence-based guidelines: Sedentary adults: 0.8 g/kg body weight. Active individuals: 1.2–1.6 g/kg. Strength athletes/muscle gain: 1.6–2.2 g/kg. Weight loss (preserving muscle): 1.8–2.7 g/kg. For most active adults, 1–2 scoops (25–50g) per day from whey supplement covers what typical diet may lack. Research suggests individual servings of 20–40g optimally stimulate muscle protein synthesis (Moore et al., 2009, AJCN).";
        category = "dosage";
      },
      {
        id = 5;
        question = "When is the best time to take whey protein?";
        answer = "The 'anabolic window' concept has been somewhat overstated. While consuming protein within 30–60 minutes post-workout does support recovery, total daily protein intake matters most. Key timing considerations: Post-workout: 20–40g whey protein within 1–2 hours optimizes muscle protein synthesis. Before bed: Casein protein is generally preferred, but whey is acceptable. Morning: Useful for breaking overnight fast and hitting daily protein targets. Between meals: Practical way to meet daily protein needs. Studies show the most important factor is total daily protein spread across 3–5 meals (Areta et al., 2013, J Physiol).";
        category = "dosage";
      },
      {
        id = 6;
        question = "What is the difference between concentrate, isolate, and hydrolysate?";
        answer = "These differ primarily in processing and purity: Concentrate (WPC): 60–80% protein, contains more fat and lactose, lowest cost, creamy taste. Isolate (WPI): 90%+ protein, very low fat and lactose (<1%), mid-range cost, suitable for lactose sensitivity. Hydrolysate (WPH): 90%+ protein, pre-digested for fastest absorption, highest cost, sometimes bitter taste due to hydrolysis. For most athletes, WPC or WPI are excellent choices. WPH is preferred when rapid absorption is critical or when digestive issues are present.";
        category = "types";
      },
      {
        id = 7;
        question = "Can vegetarians use whey protein?";
        answer = "Yes. Whey protein is suitable for lacto-vegetarians (vegetarians who consume dairy products). It is derived from milk, not meat. However, whey protein is not suitable for vegans. Vegan athletes can consider pea protein, soy protein isolate, or rice+pea blends, which have similar muscle-building efficacy when matched for leucine content (van Vliet et al., 2015, J Nutr).";
        category = "types";
      },
      {
        id = 8;
        question = "Does whey protein cause acne?";
        answer = "There is emerging evidence of a potential link between whey protein supplementation and acne in susceptible individuals. Whey protein stimulates IGF-1 (insulin-like growth factor 1) and insulin, which can increase sebum production and promote androgen activity—both linked to acne development. Several case reports and a systematic review (Pontes et al., 2013, Int J Dermatol) support this association. The risk appears individual and dose-dependent. If you experience acne flare-ups, consider reducing dose or switching to plant-based alternatives.";
        category = "side-effects";
      },
      {
        id = 9;
        question = "Is whey protein good for weight loss?";
        answer = "Yes, research strongly supports whey protein's role in weight management. Mechanisms include: High satiety—protein has the highest thermic effect of food (TEF) at 20–30% (Westerterp, 2004, Nutr Metab). Muscle preservation during caloric deficit, protecting metabolic rate. A meta-analysis found whey protein supplementation significantly reduced body fat while preserving lean mass compared to carbohydrate controls (Miller et al., 2014, J Am Coll Nutr). During weight loss, aim for 1.8–2.7 g/kg body weight to preserve muscle.";
        category = "benefits";
      },
      {
        id = 10;
        question = "Can I take whey protein if I am lactose intolerant?";
        answer = "It depends on the type. Whey protein isolate and hydrolysate have very little lactose (<1g per serving) and are generally well-tolerated by people with lactose intolerance. Whey concentrate contains more lactose and may cause digestive issues in sensitive individuals. Many lactose-intolerant athletes successfully use WPI without symptoms. If you are uncertain, start with a small dose of WPI and gradually increase, or consult your physician. True milk protein allergy (IgE-mediated) is different from lactose intolerance and requires avoiding all milk-derived proteins.";
        category = "safety";
      },
      {
        id = 11;
        question = "How do I choose a high-quality whey protein product?";
        answer = "Key quality indicators to look for: Third-party testing: Look for NSF Certified for Sport, Informed Sport, or Labdoor certifications—these verify label accuracy and screen for banned substances. Protein content per serving: A 25g scoop should contain ~20-23g protein minimum. Ingredient list: Fewer additives generally indicates higher quality. Amino acid spiking: Avoid products that add cheap amino acids like taurine, glycine, or creatine purely to inflate protein readings. Independent lab testing reports: Companies like Labdoor publish independent results. Manufacturing standards: cGMP (Current Good Manufacturing Practice) certified facilities.";
        category = "buying-guide";
      },
      {
        id = 12;
        question = "Does whey protein expire? Is it safe after the expiration date?";
        answer = "Whey protein powder has a long shelf life—typically 1–2 years when properly stored. The expiration date primarily concerns product quality and safety. After the date: Protein content gradually degrades (Maillard reaction can reduce lysine availability). Risk of clumping, off-flavors, or rancidity increases. Bacterial contamination risk increases once opened and exposed to moisture. For best results: Store in a cool, dry place away from heat and humidity. Use within 3–6 months of opening. If it smells rancid, has visible mold, or clumps excessively, discard it regardless of date.";
        category = "storage";
      },
      {
        id = 13;
        question = "Can women use whey protein?";
        answer = "Absolutely. Whey protein benefits are not gender-specific. Women can use whey protein to: Support muscle building and strength training adaptations. Manage body composition by increasing satiety and preserving lean mass. Meet elevated protein needs during pregnancy or breastfeeding (consult physician). Recover from exercise. Common concerns like 'getting bulky' are unfounded—muscle mass development requires specific training stimulus, hormonal profile (testosterone), and sustained caloric surplus. Women have significantly lower testosterone than men, making extreme muscle hypertrophy from protein supplementation alone essentially impossible without specific effort.";
        category = "basics";
      },
      {
        id = 14;
        question = "What are the side effects of too much whey protein?";
        answer = "Excessive whey protein intake can cause: Digestive issues: Bloating, gas, cramping, and diarrhea—especially from concentrate at high doses or in lactose-sensitive individuals. Acne: Linked to IGF-1 and insulin stimulation (dose-dependent). Caloric excess: Protein has 4 kcal/g; overconsumption can contribute to fat gain if total calories exceed expenditure. Kidney concerns: Safe in healthy individuals; consult physician if you have kidney disease. Nutrient displacement: Over-reliance on supplements may crowd out nutrient-dense whole foods. Optimal intake stays within evidence-based ranges (1.6–2.2 g/kg/day for athletes), with whole food sources prioritized.";
        category = "side-effects";
      }
    ];
  };

  public func calculateProteinNeeds(bodyWeightKg : Float, fitnessGoal : Text) : Types.ProteinCalculationResult {
    let proteinPerKg : Float = switch (fitnessGoal) {
      case "muscle_gain" 2.0;
      case "weight_loss" 2.2;
      case _ 1.4; // maintenance default
    };
    let dailyTarget = bodyWeightKg * proteinPerKg;
    let dosePerServing : Float = 30.0;
    let rawServings = dailyTarget / dosePerServing;
    let servings : Nat = if (rawServings <= 1.0) 1 else if (rawServings <= 2.0) 2 else if (rawServings <= 3.0) 3 else 4;
    {
      bodyWeightKg;
      fitnessGoal;
      dailyProteinTargetG = dailyTarget;
      servingsPerDay = servings;
      dosePerServingG = dosePerServing;
    };
  };

  public func getBenefits() : [Types.BenefitItem] {
    [
      {
        id = 1;
        title = "Stimulates Muscle Protein Synthesis";
        description = "Whey protein is the most leucine-rich dietary protein source. Leucine acts as a molecular trigger for mTORC1 signaling—the primary anabolic pathway driving muscle protein synthesis. Studies consistently show whey outperforms other proteins in acute MPS stimulation.";
        evidenceLevel = #strong;
        sourceCitation = "Tang JE et al. (2009). Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men. AJCN 90(5):1023-1032.";
      },
      {
        id = 2;
        title = "Accelerates Post-Exercise Recovery";
        description = "Whey protein consumed post-exercise significantly reduces exercise-induced muscle damage markers (CK, LDH), attenuates delayed onset muscle soreness (DOMS), and restores muscle function faster than carbohydrate controls.";
        evidenceLevel = #strong;
        sourceCitation = "Cockburn E et al. (2010). Acute milk-based protein-CHO supplementation attenuates exercise-induced muscle damage. Applied Physiology, Nutrition and Metabolism.";
      },
      {
        id = 3;
        title = "Supports Weight Management and Fat Loss";
        description = "Whey protein supplementation during energy restriction preserves lean muscle mass while promoting fat loss, largely through increased satiety (via GLP-1, PYY, CCK), higher thermic effect of food, and muscle preservation that maintains resting metabolic rate.";
        evidenceLevel = #strong;
        sourceCitation = "Miller PE et al. (2014). Effects of whey protein and resistance exercise on body composition: a meta-analysis of randomized controlled trials. J Am Coll Nutr 33(2):163-175.";
      },
      {
        id = 4;
        title = "Improves Strength and Power Output";
        description = "Combined with resistance training, whey protein supplementation produces greater gains in muscle strength and power compared to carbohydrate or soy protein supplementation, primarily due to its superior leucine content and absorption kinetics.";
        evidenceLevel = #strong;
        sourceCitation = "Candow DG et al. (2006). Effect of whey and soy protein supplementation combined with resistance training in young adults. Int J Sport Nutr Exerc Metab.";
      },
      {
        id = 5;
        title = "Reduces Blood Pressure";
        description = "Bioactive peptides in whey protein (particularly lactokinins) act as ACE inhibitors, potentially reducing systolic and diastolic blood pressure. Meta-analyses show modest but significant reductions in hypertensive populations.";
        evidenceLevel = #moderate;
        sourceCitation = "Pal S & Ellis V (2010). The acute effects of four protein meals on insulin, glucose, appetite and energy intake in lean men. Br J Nutr 104(8):1241-1248.";
      },
      {
        id = 6;
        title = "Boosts Immune Function";
        description = "Whey contains immunoglobulins, lactoferrin, and beta-lactoglobulin that support immune defense. Whey protein supplementation has been shown to enhance glutathione production—the body's master antioxidant—supporting immune function under exercise stress.";
        evidenceLevel = #moderate;
        sourceCitation = "Bounous G & Gold P (1991). The biological activity of undenatured dietary whey proteins: role of glutathione. Clin Invest Med 14(4):296-309.";
      },
      {
        id = 7;
        title = "May Reduce Inflammation";
        description = "Chronic low-grade inflammation is linked to many metabolic diseases. Some trials report whey protein supplementation reduces CRP and other inflammatory markers, possibly via antioxidant effects and modulation of NF-κB pathway.";
        evidenceLevel = #preliminary;
        sourceCitation = "Zhou LM et al. (2015). Effect of whey supplementation on circulating C-reactive protein: a meta-analysis of randomized controlled trials. Nutrients 7(2):1131-1143.";
      },
      {
        id = 8;
        title = "Supports Healthy Aging and Muscle Preservation";
        description = "Sarcopenia (age-related muscle loss) begins at ~30 and accelerates after 60. Whey protein, due to its high leucine content and rapid absorption, is particularly effective in older adults for stimulating MPS even at lower doses than required in younger populations.";
        evidenceLevel = #moderate;
        sourceCitation = "Bauer J et al. (2015). Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group. J Am Med Dir Assoc.";
      }
    ];
  };

  public func getSafetyInfo() : [Types.SafetyItem] {
    [
      {
        id = 1;
        category = "allergy";
        title = "Milk Protein Allergy";
        detail = "Whey is derived from cow's milk. Individuals with a diagnosed IgE-mediated milk protein allergy must avoid all whey protein products. Symptoms can include hives, anaphylaxis, swelling, and respiratory distress. This is distinct from lactose intolerance and requires complete avoidance of milk-derived proteins.";
        severity = #severe;
      },
      {
        id = 2;
        category = "kidney";
        title = "Pre-existing Kidney Disease";
        detail = "Individuals with chronic kidney disease (CKD), reduced GFR, or kidney dysfunction should consult a nephrologist before significantly increasing protein intake. While high protein is safe for healthy kidneys, the kidneys must process nitrogen from protein metabolism, which can add burden to already compromised kidney function.";
        severity = #severe;
      },
      {
        id = 3;
        category = "digestive";
        title = "Lactose Intolerance and Digestive Discomfort";
        detail = "Whey protein concentrate contains 4–8% lactose and may cause bloating, gas, cramping, or diarrhea in individuals with lactose intolerance. Switching to whey isolate or hydrolysate (which contain <1% lactose) typically resolves these symptoms. Starting with smaller doses and gradually increasing can also improve tolerance.";
        severity = #mild;
      },
      {
        id = 4;
        category = "skin";
        title = "Acne Exacerbation";
        detail = "Whey protein stimulates IGF-1 and insulin signaling, which can increase sebum production and promote acne in susceptible individuals. Case reports and observational studies show a dose-dependent association. Athletes prone to acne may benefit from reducing dose, switching to plant-based protein, or consulting a dermatologist.";
        severity = #mild;
      },
      {
        id = 5;
        category = "medication";
        title = "Drug and Medication Interactions";
        detail = "Whey protein may interact with Levodopa (used for Parkinson's disease), Alendronate (bisphosphonate for osteoporosis—take 2 hours apart), and some antibiotics (tetracyclines and fluoroquinolones—calcium in whey can reduce absorption). Always inform your physician about supplement use.";
        severity = #moderate;
      },
      {
        id = 6;
        category = "contamination";
        title = "Heavy Metal Contamination Risk";
        detail = "Some protein supplements have tested positive for concerning levels of heavy metals (lead, cadmium, arsenic, mercury) and BPA. A 2018 Clean Label Project study found elevated contaminants in some products. Mitigate this risk by choosing products with third-party certifications (NSF Certified for Sport, Informed Sport) which screen for contaminants.";
        severity = #moderate;
      },
      {
        id = 7;
        category = "pregnancy";
        title = "Pregnancy and Breastfeeding";
        detail = "Plain whey protein powder is generally considered safe in modest amounts during pregnancy as a way to meet elevated protein needs. However, many flavored products contain artificial sweeteners, caffeine additives, or herbs not evaluated for pregnancy safety. Consult your OB/GYN or registered dietitian before using supplements during pregnancy or breastfeeding.";
        severity = #moderate;
      },
      {
        id = 8;
        category = "children";
        title = "Use in Children and Adolescents";
        detail = "The American Academy of Pediatrics generally advises against protein supplement use in children and adolescents without medical need. Growing individuals can typically meet protein needs through whole foods. Excess protein intake during development is not beneficial and may affect kidney development. Consult a pediatric dietitian if protein needs seem unmet through diet.";
        severity = #mild;
      },
      {
        id = 9;
        category = "general-disclaimer";
        title = "General Disclaimer";
        detail = "Whey protein supplements are food products, not medications. They are not intended to diagnose, treat, cure, or prevent any disease. The information provided here is for educational purposes only and is not a substitute for professional medical, nutritional, or clinical advice. Always consult a qualified healthcare provider before starting any supplementation regimen, especially if you have pre-existing medical conditions.";
        severity = #mild;
      }
    ];
  };

  public func getPricingData() : [Types.PricingEntry] {
    [
      {
        id = 1;
        productType = "Whey Protein Concentrate (WPC 70–80%)";
        priceRangePerLb = "$8–$15";
        pricePerServing = "$0.35–$0.65";
        monthlyEstimate = "$11–$20";
        notes = "Best value for healthy adults without lactose sensitivity. Widely available from major brands (Optimum Nutrition, MuscleMilk, Dymatize). 5 lb tubs offer best cost-per-serving.";
      },
      {
        id = 2;
        productType = "Whey Protein Isolate (WPI 90%+)";
        priceRangePerLb = "$15–$25";
        pricePerServing = "$0.65–$1.10";
        monthlyEstimate = "$20–$33";
        notes = "Recommended for lactose-intolerant individuals or those tracking macros strictly. Premium brands include Isopure, Dymatize ISO100, Optimum Nutrition Gold Standard 100% Isolate.";
      },
      {
        id = 3;
        productType = "Whey Protein Hydrolysate (WPH)";
        priceRangePerLb = "$20–$40";
        pricePerServing = "$0.90–$1.80";
        monthlyEstimate = "$27–$54";
        notes = "Premium pricing for pre-digested protein. Used by elite athletes or those with digestive conditions. Often blended with isolate. Used in clinical settings.";
      },
      {
        id = 4;
        productType = "Blended Whey (Concentrate + Isolate)";
        priceRangePerLb = "$12–$20";
        pricePerServing = "$0.50–$0.90";
        monthlyEstimate = "$15–$27";
        notes = "Common in many popular products. Balances cost and purity. Check label percentages—higher isolate ratio indicates better quality in blends.";
      },
      {
        id = 5;
        productType = "Grass-Fed / Organic Whey";
        priceRangePerLb = "$20–$45";
        pricePerServing = "$0.90–$2.00";
        monthlyEstimate = "$27–$60";
        notes = "Higher omega-3 content and potentially higher CLA. Brands: Naked Whey, Organic Valley, BiPro. Nutritional differences are modest but appeal to those prioritizing sourcing quality.";
      },
      {
        id = 6;
        productType = "Budget / Store Brand Whey";
        priceRangePerLb = "$6–$12";
        pricePerServing = "$0.28–$0.55";
        monthlyEstimate = "$8–$17";
        notes = "Costco Kirkland Signature, Walmart Great Value. Quality can be adequate but verify with third-party testing. May lack certifications. Best for cost-constrained athletes who verify label accuracy independently.";
      }
    ];
  };
}
