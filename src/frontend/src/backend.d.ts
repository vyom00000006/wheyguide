import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SafetyItem {
    id: bigint;
    title: string;
    detail: string;
    category: string;
    severity: SeverityLevel;
}
export interface FaqEntry {
    id: bigint;
    question: string;
    answer: string;
    category: string;
}
export interface WheyType {
    id: string;
    name: string;
    fatContent: string;
    proteinPercent: bigint;
    description: string;
    bestFor: Array<string>;
    lactoseContent: string;
    costRangePerLb: string;
}
export interface PricingEntry {
    id: bigint;
    monthlyEstimate: string;
    priceRangePerLb: string;
    pricePerServing: string;
    productType: string;
    notes: string;
}
export interface BenefitItem {
    id: bigint;
    title: string;
    evidenceLevel: EvidenceLevel;
    sourceCitation: string;
    description: string;
}
export interface ProteinCalculationResult {
    fitnessGoal: string;
    dailyProteinTargetG: number;
    bodyWeightKg: number;
    servingsPerDay: bigint;
    dosePerServingG: number;
}
export enum EvidenceLevel {
    strong = "strong",
    preliminary = "preliminary",
    moderate = "moderate"
}
export enum SeverityLevel {
    mild = "mild",
    severe = "severe",
    moderate = "moderate"
}
export interface backendInterface {
    calculateProtein(bodyWeightKg: number, fitnessGoal: string): Promise<ProteinCalculationResult>;
    getBenefits(): Promise<Array<BenefitItem>>;
    getFaqs(): Promise<Array<FaqEntry>>;
    getPricingData(): Promise<Array<PricingEntry>>;
    getSafetyInfo(): Promise<Array<SafetyItem>>;
    getWheyTypes(): Promise<Array<WheyType>>;
}
