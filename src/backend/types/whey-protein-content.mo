module {
  public type WheyType = {
    id : Text;
    name : Text;
    proteinPercent : Nat;
    lactoseContent : Text;
    fatContent : Text;
    costRangePerLb : Text;
    bestFor : [Text];
    description : Text;
  };

  public type FaqEntry = {
    id : Nat;
    question : Text;
    answer : Text;
    category : Text;
  };

  public type ProteinCalculationResult = {
    bodyWeightKg : Float;
    fitnessGoal : Text;
    dailyProteinTargetG : Float;
    servingsPerDay : Nat;
    dosePerServingG : Float;
  };

  public type EvidenceLevel = { #strong; #moderate; #preliminary };

  public type BenefitItem = {
    id : Nat;
    title : Text;
    description : Text;
    evidenceLevel : EvidenceLevel;
    sourceCitation : Text;
  };

  public type SeverityLevel = { #mild; #moderate; #severe };

  public type SafetyItem = {
    id : Nat;
    category : Text;
    title : Text;
    detail : Text;
    severity : SeverityLevel;
  };

  public type PricingEntry = {
    id : Nat;
    productType : Text;
    priceRangePerLb : Text;
    pricePerServing : Text;
    monthlyEstimate : Text;
    notes : Text;
  };
}
