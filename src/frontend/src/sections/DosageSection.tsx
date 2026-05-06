import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  Dumbbell,
  FlaskConical,
  Scale,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

interface DosageRow {
  label: string;
  value: string;
  note: string;
  highlight?: boolean;
}

const DOSAGE_TABLE: DosageRow[] = [
  {
    label: "Sedentary Adults (RDA)",
    value: "0.8 g/kg/day",
    note: "Minimum to prevent deficiency — not optimal for activity",
  },
  {
    label: "Recreational Athletes",
    value: "1.2–1.6 g/kg/day",
    note: "For regular gym-goers or endurance sport 3–4×/week",
  },
  {
    label: "Muscle Gain / Strength",
    value: "1.6–2.2 g/kg/day",
    note: "Most research-supported range for hypertrophy",
    highlight: true,
  },
  {
    label: "Cutting / Weight Loss",
    value: "1.8–2.4 g/kg/day",
    note: "Higher intake preserves lean mass in a caloric deficit",
  },
  {
    label: "Elite / Power Athletes",
    value: "2.2–2.8 g/kg/day",
    note: "During peak training blocks; periodise with volume",
  },
];

const TIMING_TIPS = [
  {
    icon: Dumbbell,
    title: "Post-Workout",
    desc: "20–40 g within 2 hours after training. Maximises muscle protein synthesis response while muscles remain sensitive.",
    citation:
      "Schoenfeld BJ & Aragon AA (2013). J Int Soc Sports Nutr. PMID 24149627",
    badge: "Practical",
  },
  {
    icon: Clock,
    title: "Morning / Breakfast",
    desc: "Adding whey to breakfast helps achieve daily protein targets and supports satiety through the day.",
    citation: "Leidy HJ et al. (2015). Am J Clin Nutr. PMID 25889354",
    badge: "Convenience",
  },
  {
    icon: FlaskConical,
    title: "Pre-Sleep (Casein)",
    desc: "40 g of slow-digesting casein 30 min before bed drives overnight muscle protein synthesis over a 7–8 h window.",
    citation: "Res PT et al. (2012). Med Sci Sports Exerc. PMID 22330017",
    badge: "Advanced",
  },
];

const MYTHS = [
  {
    myth: "Your body can only absorb 30 g of protein per meal",
    truth:
      "This is physiologically incorrect. The body continues to absorb and utilise protein beyond 30 g — the rate simply slows. Studies using isotope tracing show full absorption even from 70 g+ meals.",
    citation: "Trommelen J et al. (2023). Cell Rep Med. PMID 36787744",
  },
  {
    myth: "Timing is everything — miss the window and gains are lost",
    truth:
      'The "anabolic window" is much wider than believed (up to 2–6 hours). Total daily protein intake has a far greater effect on muscle outcomes than precise timing. Hit your daily target first.',
    citation:
      "Schoenfeld BJ & Aragon AA (2013). J Int Soc Sports Nutr. PMID 24149627",
  },
];

export function DosageSection() {
  return (
    <section
      id="dosage"
      className="section-zone-primary py-16 md:py-24 scroll-mt-20"
      aria-labelledby="dosage-heading"
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
            <Scale className="h-6 w-6 text-primary" aria-hidden="true" />
            <Badge
              variant="secondary"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Research-Backed Guidelines
            </Badge>
          </div>
          <h2
            id="dosage-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Daily Dosage Guide
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Protein requirements vary with body weight, fitness goal, and
            activity level. These ranges are derived from meta-analyses of
            resistance training studies.
          </p>
        </motion.div>

        {/* Dosage table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-border bg-card shadow-subtle overflow-hidden mb-12"
          data-ocid="dosage.table"
        >
          <div className="px-5 py-4 border-b border-border bg-muted/40">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Protein Requirements by Population
            </p>
          </div>
          <div className="divide-y divide-border">
            {DOSAGE_TABLE.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4 ${
                  row.highlight ? "bg-primary/5" : "hover:bg-muted/30"
                } transition-colors`}
                data-ocid={`dosage.table_row.${i + 1}`}
              >
                <div className="flex items-center gap-2">
                  {row.highlight && (
                    <span className="badge-success">Recommended</span>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {row.label}
                  </span>
                </div>
                <div className="flex flex-col sm:items-end gap-0.5">
                  <span className="font-display text-base font-bold text-primary">
                    {row.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {row.note}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border bg-muted/20">
            <p className="citation">
              📚 Stokes T et al. (2018). Nutrients. PMID 29497353 · Morton RW et
              al. (2018). Br J Sports Med. PMID 28698222
            </p>
          </div>
        </motion.div>

        {/* Single serving stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              label: "Single Serving",
              value: "20–40 g",
              desc: "Per shake or meal",
              icon: "🥤",
            },
            {
              label: "Daily Whey Target",
              value: "40–80 g",
              desc: "~2 servings for most athletes",
              icon: "📊",
            },
            {
              label: "Calorie Contribution",
              value: "~100–160 kcal",
              desc: "Per 25 g serving (~4 kcal/g)",
              icon: "🔥",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              data-ocid={`dosage.stat.${i + 1}`}
            >
              <Card className="shadow-subtle text-center py-6">
                <CardContent className="pt-0">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="font-display text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timing tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-5">
            Timing Strategies
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {TIMING_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-ocid={`dosage.timing.${i + 1}`}
                >
                  <Card className="h-full shadow-subtle hover:shadow-md transition-smooth">
                    <CardContent className="pt-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon
                            className="h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="badge-success">{tip.badge}</span>
                      </div>
                      <h4 className="font-display font-semibold text-foreground mb-1.5">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {tip.desc}
                      </p>
                      <p className="citation">📚 {tip.citation}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Myth-busting cards */}
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-5">
            Common Dosage Myths — Debunked
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {MYTHS.map((m, i) => (
              <motion.div
                key={m.myth}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                data-ocid={`dosage.myth.${i + 1}`}
              >
                <Card className="shadow-subtle border-l-4 border-destructive/40 hover:shadow-md transition-smooth">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-2 mb-3">
                      <XCircle
                        className="h-4 w-4 text-destructive shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-semibold text-destructive leading-snug">
                        MYTH: &ldquo;{m.myth}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-semibold text-emerald-700">
                          FACT:{" "}
                        </span>
                        {m.truth}
                      </p>
                    </div>
                    <p className="citation">📚 {m.citation}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
