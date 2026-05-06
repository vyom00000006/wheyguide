import { useBenefits } from "@/hooks/use-backend";
import type { Benefit } from "@/types/whey";
import { motion } from "motion/react";

const EVIDENCE_CONFIG = {
  strong: {
    label: "Strong Evidence",
    className: "badge-success",
    bar: "bg-primary w-full",
  },
  moderate: {
    label: "Moderate Evidence",
    className: "badge-warning",
    bar: "bg-accent w-2/3",
  },
  emerging: {
    label: "Emerging Research",
    className:
      "inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold",
    bar: "bg-muted-foreground w-1/3",
  },
} satisfies Record<
  Benefit["evidence"],
  { label: string; className: string; bar: string }
>;

interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
  const config = EVIDENCE_CONFIG[benefit.evidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`benefits.card.${index + 1}`}
      className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-smooth group"
    >
      {/* Icon + evidence badge row */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl shrink-0"
          style={{ background: "oklch(0.95 0.025 190 / 0.5)" }}
        >
          {benefit.icon}
        </div>
        <span className={config.className}>{config.label}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-foreground leading-snug">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {benefit.description}
      </p>

      {/* Evidence strength bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground font-medium">
            Evidence strength
          </span>
          <span className="font-semibold text-foreground capitalize">
            {benefit.evidence}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className={`h-full rounded-full ${config.bar}`} />
        </div>
      </div>

      {/* Citation */}
      <p className="citation text-xs border-t border-border pt-3">
        📚 {benefit.citation}
      </p>
    </motion.div>
  );
}

export function BenefitsSection() {
  const { data: benefits = [], isLoading } = useBenefits();

  const strong = benefits.filter((b) => b.evidence === "strong");
  const others = benefits.filter((b) => b.evidence !== "strong");

  return (
    <section
      id="benefits"
      data-ocid="benefits.section"
      className="py-20 bg-background scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="citation mb-2 block">03 — Benefits</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Health Benefits
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Every benefit below is graded by the quality and volume of
            peer-reviewed evidence. Strong = multiple RCTs and meta-analyses.
            Moderate = consistent observational + some RCT support. Emerging =
            early-stage data.
          </p>
        </motion.div>

        {/* Evidence legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-10"
          data-ocid="benefits.evidence_legend"
        >
          <span className="badge-success">Strong Evidence</span>
          <span className="badge-warning">Moderate Evidence</span>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            Emerging Research
          </span>
          <span className="text-xs text-muted-foreground self-center pl-2">
            — Graded per available RCT and meta-analysis data
          </span>
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="benefits.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((k) => (
              <div
                key={k}
                className="h-64 rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Strong evidence section */}
            {strong.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                  Strong Evidence ({strong.length})
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {strong.map((b, i) => (
                    <BenefitCard key={b.id} benefit={b} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Moderate + emerging */}
            {others.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                  Moderate & Emerging Evidence ({others.length})
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {others.map((b, i) => (
                    <BenefitCard
                      key={b.id}
                      benefit={b}
                      index={strong.length + i}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 rounded-2xl section-zone-muted border border-border px-6 py-5"
          data-ocid="benefits.disclaimer"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> All
            benefits listed are based on published peer-reviewed research.
            Effect sizes vary by individual, training status, diet, and dosage.
            Supplementation does not replace a balanced diet or medical advice.
            Consult a registered dietitian or physician for personalised
            recommendations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
