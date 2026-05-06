import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSafetyInfo } from "@/hooks/use-backend";
import type { SafetyItem } from "@/types/whey";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const VERDICT_CONFIG = {
  myth: {
    label: "Myth Debunked",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    badgeClass: "badge-success",
    borderClass: "border-l-4 border-emerald-400",
    bgClass: "bg-emerald-50/50",
  },
  caution: {
    label: "Use Caution",
    icon: AlertTriangle,
    iconClass: "text-amber-600",
    badgeClass: "badge-warning",
    borderClass: "border-l-4 border-amber-400",
    bgClass: "bg-amber-50/50",
  },
  safe: {
    label: "Generally Safe",
    icon: ShieldCheck,
    iconClass: "text-primary",
    badgeClass: "badge-success",
    borderClass: "border-l-4 border-primary",
    bgClass: "bg-primary/5",
  },
} as const;

function SafetyCard({ item, index }: { item: SafetyItem; index: number }) {
  const config = VERDICT_CONFIG[item.verdict];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Card
        className={`group relative overflow-hidden shadow-subtle hover:shadow-md transition-smooth ${config.borderClass}`}
        data-ocid={`safety.item.${index + 1}`}
      >
        <div className={`absolute inset-0 ${config.bgClass} opacity-60`} />
        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Icon
                className={`h-5 w-5 shrink-0 ${config.iconClass}`}
                aria-hidden="true"
              />
              <CardTitle className="text-base font-display font-semibold text-foreground leading-snug">
                {item.concern}
              </CardTitle>
            </div>
            <span className={config.badgeClass}>{config.label}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-7">
            Population:{" "}
            <span className="font-medium text-foreground">
              {item.population}
            </span>
          </p>
        </CardHeader>
        <CardContent className="relative pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {item.explanation}
          </p>
          <p className="citation">📚 {item.citation}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"] as const;

function SafetySkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {SKELETON_KEYS.map((k, i) => (
        <div
          key={k}
          className="h-44 rounded-lg bg-muted animate-pulse"
          data-ocid={`safety.loading_state.${i + 1}`}
        />
      ))}
    </div>
  );
}

export function SafetySection() {
  const { data: safetyItems, isLoading } = useSafetyInfo();

  return (
    <section
      id="safety"
      className="section-zone-muted py-16 md:py-24"
      aria-labelledby="safety-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Medical disclaimer banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 flex gap-3 items-start"
          data-ocid="safety.disclaimer_banner"
          role="alert"
        >
          <AlertTriangle
            className="h-5 w-5 text-amber-600 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Medical Disclaimer
            </p>
            <p className="text-sm text-amber-800 mt-0.5 leading-relaxed">
              This content is for educational purposes only and does not
              constitute medical advice. Always consult a qualified physician or
              registered dietitian before starting any supplement regimen,
              especially if you have pre-existing medical conditions, take
              prescription medications, or have kidney, liver, or cardiovascular
              disease.
            </p>
          </div>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            <Badge
              variant="secondary"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Evidence-Based Review
            </Badge>
          </div>
          <h2
            id="safety-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Safety &amp; Side Effects
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Separating science from myth. Each entry is graded by scientific
            verdict and backed by peer-reviewed research.
          </p>
        </motion.div>

        {/* Verdict key */}
        <div className="flex flex-wrap gap-3 mb-8" aria-label="Verdict legend">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-medium text-muted-foreground">
              Myth Debunked — concern unsupported by evidence
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-medium text-muted-foreground">
              Caution — applies to specific populations
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Safe — well-established safety profile
            </span>
          </div>
        </div>

        {isLoading ? (
          <SafetySkeleton />
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {(safetyItems ?? []).map((item, i) => (
              <SafetyCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Warnings list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-xl border border-border bg-card shadow-subtle p-6"
          data-ocid="safety.warnings_panel"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
            Who Should Consult a Doctor First
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Chronic kidney disease (CKD) or kidney damage",
              "Liver cirrhosis or hepatic encephalopathy",
              "Severe lactose intolerance",
              "Phenylketonuria (PKU)",
              "Taking immunosuppressants or blood thinners",
              "Pregnancy or breastfeeding",
            ].map((warning, i) => (
              <li
                key={warning}
                className="flex items-start gap-2.5"
                data-ocid={`safety.warning.${i + 1}`}
              >
                <span className="badge-warning mt-0.5 shrink-0">!</span>
                <span className="text-sm text-foreground">{warning}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground border-t border-border pt-4">
            <strong className="text-foreground">Drug interactions:</strong> High
            protein intakes may affect absorption of levodopa, tetracycline
            antibiotics, and bisphosphonates. Always disclose all supplements to
            your prescribing physician.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
