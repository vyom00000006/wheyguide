export type WheyTypeKey =
  | "concentrate"
  | "isolate"
  | "hydrolysate"
  | "casein"
  | "plant";

export interface WheyType {
  id: WheyTypeKey;
  name: string;
  description: string;
  proteinPercent: number;
  lactose: "low" | "trace" | "none";
  absorptionRate: "fast" | "medium" | "slow";
  bestFor: string[];
  priceRange: "budget" | "mid" | "premium";
  citation: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  evidence: "strong" | "moderate" | "emerging";
  citation: string;
  icon: string;
}

export interface SafetyItem {
  id: string;
  concern: string;
  verdict: "safe" | "caution" | "myth";
  explanation: string;
  population: string;
  citation: string;
}

export interface PricingTier {
  id: string;
  brand: string;
  type: WheyTypeKey;
  sizeKg: number;
  priceUSD: number;
  proteinPerScoop: number;
  servings: number;
  pricePerServing: number;
  rating: number;
  badge?: string;
}

export interface PricingData {
  tiers: PricingTier[];
  lastUpdated: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: "basics" | "safety" | "dosage" | "pricing";
}

export type FitnessGoal =
  | "muscle_gain"
  | "weight_loss"
  | "maintenance"
  | "endurance"
  | "performance";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "athlete";

export interface ProteinCalculatorInput {
  weightKg: number;
  goal: FitnessGoal;
  activityLevel: ActivityLevel;
}

export interface ProteinCalculatorResult {
  totalProteinG: number;
  wheyProteinG: number;
  servingsPerDay: number;
  timing: string;
  notes: string;
  citation: string;
}

export interface SearchState {
  query: string;
  matchingSections: string[];
}
