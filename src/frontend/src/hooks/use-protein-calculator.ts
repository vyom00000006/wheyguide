import type {
  ActivityLevel,
  FitnessGoal,
  ProteinCalculatorInput,
  ProteinCalculatorResult,
} from "@/types/whey";
import { useState } from "react";

const GOAL_MULTIPLIERS: Record<FitnessGoal, number> = {
  muscle_gain: 2.0,
  weight_loss: 1.8,
  maintenance: 1.4,
  endurance: 1.6,
  performance: 2.2,
};

const ACTIVITY_ADJUSTMENTS: Record<ActivityLevel, number> = {
  sedentary: 0,
  light: 0.1,
  moderate: 0.2,
  active: 0.3,
  athlete: 0.4,
};

const GOAL_TIMING: Record<FitnessGoal, string> = {
  muscle_gain: "Post-workout (within 60 min) + before bed (casein optional)",
  weight_loss: "Morning + post-workout to preserve lean mass",
  maintenance: "Post-workout or any time to fill daily gaps",
  endurance: "Post-workout + with carbohydrates for glycogen replenishment",
  performance: "Post-workout + pre-sleep for maximal 24 h MPS support",
};

const GOAL_NOTES: Record<FitnessGoal, string> = {
  muscle_gain:
    "Distribute across 3–4 meals (0.4–0.55 g/kg/meal) for optimal MPS.",
  weight_loss:
    "High protein supports satiety and preserves lean mass in a caloric deficit.",
  maintenance:
    "Meeting daily targets through food alone is perfectly valid; supplement as needed.",
  endurance: "Pair with carbohydrates post-exercise for complete recovery.",
  performance:
    "Elite athletes may benefit from 2.2–2.8 g/kg; periodise based on training volume.",
};

const GOAL_CITATIONS: Record<FitnessGoal, string> = {
  muscle_gain: "Morton RW et al. (2018). Br J Sports Med. PMID 28698222",
  weight_loss: "Helms ER et al. (2014). Eur J Sport Sci. PMID 24506795",
  maintenance:
    "Phillips SM & Van Loon LJC. (2011). J Sports Sci. PMID 22150425",
  endurance: "Tarnopolsky M. (2004). Nutr. PMID 14697024",
  performance: "Stokes T et al. (2018). Nutrients. PMID 30223571",
};

function calculateResult(
  input: ProteinCalculatorInput,
): ProteinCalculatorResult {
  const { weightKg, goal, activityLevel } = input;
  const base = GOAL_MULTIPLIERS[goal];
  const adjustment = ACTIVITY_ADJUSTMENTS[activityLevel];
  const totalProteinG = Math.round(weightKg * (base + adjustment));
  const wheyProteinG = Math.round(totalProteinG * 0.4);
  const servingsPerDay = Math.max(1, Math.round(wheyProteinG / 25));

  return {
    totalProteinG,
    wheyProteinG,
    servingsPerDay,
    timing: GOAL_TIMING[goal],
    notes: GOAL_NOTES[goal],
    citation: GOAL_CITATIONS[goal],
  };
}

export function useProteinCalculator() {
  const [result, setResult] = useState<ProteinCalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = (input: ProteinCalculatorInput) => {
    setIsCalculating(true);
    // Simulate async (will call actor.calculateProtein once backend exposes it)
    setTimeout(() => {
      setResult(calculateResult(input));
      setIsCalculating(false);
    }, 400);
  };

  const reset = () => setResult(null);

  return { result, isCalculating, calculate, reset };
}
