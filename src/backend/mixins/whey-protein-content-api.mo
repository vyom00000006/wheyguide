import Types "../types/whey-protein-content";
import WheyLib "../lib/whey-protein-content";

mixin () {
  public query func getWheyTypes() : async [Types.WheyType] {
    WheyLib.getWheyTypes();
  };

  public query func getFaqs() : async [Types.FaqEntry] {
    WheyLib.getFaqs();
  };

  public query func calculateProtein(bodyWeightKg : Float, fitnessGoal : Text) : async Types.ProteinCalculationResult {
    WheyLib.calculateProteinNeeds(bodyWeightKg, fitnessGoal);
  };

  public query func getBenefits() : async [Types.BenefitItem] {
    WheyLib.getBenefits();
  };

  public query func getSafetyInfo() : async [Types.SafetyItem] {
    WheyLib.getSafetyInfo();
  };

  public query func getPricingData() : async [Types.PricingEntry] {
    WheyLib.getPricingData();
  };
}
