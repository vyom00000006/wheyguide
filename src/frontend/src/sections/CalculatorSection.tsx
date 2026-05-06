import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProteinCalculator } from "@/hooks/use-protein-calculator";
import type {
  ActivityLevel,
  FitnessGoal,
  ProteinCalculatorInput,
} from "@/types/whey";
import { Calculator, RefreshCw, TrendingUp, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const GOAL_OPTIONS: { value: FitnessGoal; label: string; emoji: string }[] = [
  { value: "maintenance", label: "Maintenance", emoji: "⚖️" },
  { value: "muscle_gain", label: "Muscle Gain", emoji: "💪" },
  { value: "weight_loss", label: "Weight Loss", emoji: "🔥" },
  { value: "endurance", label: "Endurance", emoji: "🏃" },
  { value: "performance", label: "Peak Performance", emoji: "🏆" },
];

const ACTIVITY_OPTIONS: {
  value: ActivityLevel;
  label: string;
  desc: string;
}[] = [
  { value: "sedentary", label: "Sedentary", desc: "Little to no exercise" },
  { value: "light", label: "Light", desc: "1–3 days/week" },
  { value: "moderate", label: "Moderate", desc: "3–5 days/week" },
  { value: "active", label: "Active", desc: "6–7 days/week" },
  { value: "athlete", label: "Athlete", desc: "2× training daily" },
];

export function CalculatorSection() {
  const { result, isCalculating, calculate, reset } = useProteinCalculator();
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState<FitnessGoal>("muscle_gain");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = Number.parseFloat(weight);
    if (!weight || Number.isNaN(raw) || raw <= 0) {
      setError("Please enter a valid body weight.");
      return;
    }
    const weightKg = unit === "kg" ? raw : raw / 2.205;
    if (weightKg < 30 || weightKg > 300) {
      setError(
        "Please enter a realistic body weight (30–300 kg / 66–660 lbs).",
      );
      return;
    }
    setError("");
    const input: ProteinCalculatorInput = {
      weightKg,
      goal,
      activityLevel: activity,
    };
    calculate(input);
  };

  const handleReset = () => {
    reset();
    setWeight("");
    setError("");
  };

  const calorieContribution = result ? result.wheyProteinG * 4 : 0;
  const gramsPerServing = result
    ? Math.round(result.wheyProteinG / result.servingsPerDay)
    : 0;

  return (
    <section
      id="calculator"
      className="section-zone-accent py-16 md:py-24"
      aria-labelledby="calculator-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
            <Badge
              variant="secondary"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Personalised Guidance
            </Badge>
          </div>
          <h2
            id="calculator-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Protein Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Calculate your personalised daily protein target and recommended
            whey intake based on body weight, fitness goal, and activity level.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input form card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                  Enter Your Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Weight input */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="calc-weight"
                      className="text-sm font-medium"
                    >
                      Body Weight
                    </Label>
                    <div className="flex gap-2">
                      <input
                        id="calc-weight"
                        type="number"
                        min="1"
                        step="0.5"
                        placeholder={unit === "kg" ? "e.g. 75" : "e.g. 165"}
                        value={weight}
                        onChange={(e) => {
                          setWeight(e.target.value);
                          setError("");
                        }}
                        onBlur={() => {
                          const raw = Number.parseFloat(weight);
                          if (weight && (Number.isNaN(raw) || raw <= 0)) {
                            setError("Please enter a valid body weight.");
                          }
                        }}
                        data-ocid="calculator.weight_input"
                        className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        aria-describedby={error ? "calc-error" : undefined}
                      />
                      <div className="flex rounded-lg border border-input overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setUnit("kg")}
                          data-ocid="calculator.unit_kg.toggle"
                          aria-pressed={unit === "kg"}
                          className={`px-3 py-2 text-sm font-medium transition-colors ${
                            unit === "kg"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          kg
                        </button>
                        <button
                          type="button"
                          onClick={() => setUnit("lbs")}
                          data-ocid="calculator.unit_lbs.toggle"
                          aria-pressed={unit === "lbs"}
                          className={`px-3 py-2 text-sm font-medium transition-colors ${
                            unit === "lbs"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          lbs
                        </button>
                      </div>
                    </div>
                    {error && (
                      <p
                        id="calc-error"
                        role="alert"
                        className="text-xs text-destructive font-medium"
                        data-ocid="calculator.weight_field_error"
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Fitness goal */}
                  <div className="space-y-1.5">
                    <Label htmlFor="calc-goal" className="text-sm font-medium">
                      Fitness Goal
                    </Label>
                    <Select
                      value={goal}
                      onValueChange={(v) => setGoal(v as FitnessGoal)}
                    >
                      <SelectTrigger
                        id="calc-goal"
                        data-ocid="calculator.goal_select"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOAL_OPTIONS.map((g) => (
                          <SelectItem key={g.value} value={g.value}>
                            {g.emoji} {g.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Activity level */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="calc-activity"
                      className="text-sm font-medium"
                    >
                      Activity Level
                    </Label>
                    <Select
                      value={activity}
                      onValueChange={(v) => setActivity(v as ActivityLevel)}
                    >
                      <SelectTrigger
                        id="calc-activity"
                        data-ocid="calculator.activity_select"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACTIVITY_OPTIONS.map((a) => (
                          <SelectItem key={a.value} value={a.value}>
                            {a.label} — {a.desc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button
                      type="submit"
                      disabled={isCalculating}
                      data-ocid="calculator.submit_button"
                      className="flex-1 font-semibold"
                    >
                      {isCalculating ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                          Calculating…
                        </span>
                      ) : (
                        "Calculate My Intake"
                      )}
                    </Button>
                    {result && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        data-ocid="calculator.reset_button"
                        aria-label="Reset calculator"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results panel */}
          <AnimatePresence mode="wait">
            {isCalculating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                data-ocid="calculator.loading_state"
              >
                <Card className="shadow-subtle">
                  <CardContent className="pt-6 space-y-4">
                    {["h-8 w-2/3", "h-24", "h-12", "h-12", "h-16"].map(
                      (cls) => (
                        <div
                          key={cls}
                          className={`${cls} rounded-lg bg-muted animate-pulse`}
                        />
                      ),
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                data-ocid="calculator.result_panel"
              >
                <Card className="shadow-subtle border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <TrendingUp
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      Your Personalised Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="rounded-xl bg-primary/10 border border-primary/20 p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Daily Protein Target
                      </p>
                      <p className="font-display text-4xl font-bold text-primary">
                        {result.totalProteinG}g
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        total protein per day
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "From Whey",
                          value: `${result.wheyProteinG}g`,
                          desc: "whey supplement",
                          ocid: "calculator.whey_protein_result",
                        },
                        {
                          label: "Servings/Day",
                          value: `${result.servingsPerDay}`,
                          desc: `~${gramsPerServing}g each`,
                          ocid: "calculator.servings_result",
                        },
                        {
                          label: "Whey Calories",
                          value: `${calorieContribution} kcal`,
                          desc: "from whey only",
                          ocid: "calculator.calories_result",
                        },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-border bg-muted/30 p-3 text-center"
                          data-ocid={m.ocid}
                        >
                          <p className="font-display text-xl font-bold text-foreground">
                            {m.value}
                          </p>
                          <p className="text-xs font-medium text-foreground">
                            {m.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {m.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-foreground">
                        Recommended Timing
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.timing}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-foreground">
                        Goal-Specific Notes
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.notes}
                      </p>
                    </div>

                    <p className="citation">📚 {result.citation}</p>

                    <p className="text-xs text-muted-foreground border-t border-border pt-3">
                      <strong>Note:</strong> These are evidence-based estimates.
                      Individual needs vary. Consult a registered dietitian for
                      personalised advice.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-subtle border-dashed">
                  <CardContent className="pt-12 pb-12 flex flex-col items-center text-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calculator
                        className="h-7 w-7 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-display font-semibold text-foreground">
                      Your results will appear here
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Fill in your body weight, goal, and activity level, then
                      click &ldquo;Calculate My Intake&rdquo; to see
                      personalised recommendations.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Based on peer-reviewed sports nutrition research.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
