import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWheyTypes } from "@/hooks/use-backend";
import type { WheyType } from "@/types/whey";
import { motion } from "motion/react";

const PRICE_LABEL: Record<WheyType["priceRange"], string> = {
  budget: "$ Budget",
  mid: "$$ Mid-range",
  premium: "$$$ Premium",
};

const LACTOSE_LABEL: Record<WheyType["lactose"], string> = {
  low: "Low",
  trace: "Trace",
  none: "None",
};

const ABSORB_LABEL: Record<WheyType["absorptionRate"], string> = {
  fast: "Fast",
  medium: "Medium",
  slow: "Slow",
};

const ABSORB_COLOR: Record<WheyType["absorptionRate"], string> = {
  fast: "text-primary",
  medium: "text-accent-foreground",
  slow: "text-muted-foreground",
};

const PROTEIN_BAR_COLORS = [
  "bg-primary",
  "bg-primary",
  "bg-primary",
  "bg-muted-foreground",
  "bg-muted-foreground",
];

const WHEY_TYPES_ORDER = [
  "concentrate",
  "isolate",
  "hydrolysate",
  "casein",
  "plant",
];

interface TypeCardProps {
  type: WheyType;
  colorClass: string;
}

function TypeDetailCard({ type, colorClass }: TypeCardProps) {
  return (
    <div className="grid md:grid-cols-5 gap-6">
      {/* Main info */}
      <div className="md:col-span-3 rounded-2xl border border-border bg-card p-7 flex flex-col gap-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            {type.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {type.description}
          </p>
        </div>

        {/* Protein bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground font-medium">
              Protein content
            </span>
            <span className="font-bold text-foreground">
              {type.proteinPercent}%
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-smooth ${colorClass}`}
              style={{ width: `${type.proteinPercent}%` }}
            />
          </div>
        </div>

        {/* Best for */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">
            Best for:
          </p>
          <div className="flex flex-wrap gap-2">
            {type.bestFor.map((use) => (
              <Badge key={use} variant="secondary" className="text-xs">
                {use}
              </Badge>
            ))}
          </div>
        </div>

        <p className="citation text-xs">{type.citation}</p>
      </div>

      {/* Stats column */}
      <div className="md:col-span-2 flex flex-col gap-4">
        {[
          {
            label: "Protein %",
            value: `${type.proteinPercent}%`,
            note: "Per serving dry weight",
          },
          {
            label: "Lactose",
            value: LACTOSE_LABEL[type.lactose],
            note:
              type.lactose === "none"
                ? "Virtually eliminated"
                : type.lactose === "trace"
                  ? "<0.1g per serving"
                  : "~2–3g per serving",
          },
          {
            label: "Absorption",
            value: ABSORB_LABEL[type.absorptionRate],
            note:
              type.absorptionRate === "fast"
                ? "~60–90 min peak"
                : type.absorptionRate === "slow"
                  ? "7–8 hours"
                  : "2–4 hours",
            valueClass: ABSORB_COLOR[type.absorptionRate],
          },
          {
            label: "Price tier",
            value: PRICE_LABEL[type.priceRange],
            note:
              type.priceRange === "budget"
                ? "~$0.40–$0.80/serving"
                : type.priceRange === "mid"
                  ? "~$0.80–$1.40/serving"
                  : "~$1.40–$2.50/serving",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-5 py-4"
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              {stat.label}
            </p>
            <p
              className={`font-display font-bold text-xl text-foreground ${stat.valueClass ?? ""}`}
            >
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonTableFull({ types }: { types: WheyType[] }) {
  const ordered = WHEY_TYPES_ORDER.map((id) =>
    types.find((t) => t.id === id),
  ).filter(Boolean) as WheyType[];

  return (
    <div
      className="overflow-x-auto rounded-2xl border border-border"
      data-ocid="types.comparison_table"
    >
      <table className="w-full text-sm">
        <thead className="section-zone-muted border-b border-border">
          <tr>
            <th className="text-left px-5 py-4 font-semibold text-foreground">
              Type
            </th>
            <th className="text-center px-4 py-4 font-semibold text-foreground">
              Protein %
            </th>
            <th className="text-center px-4 py-4 font-semibold text-foreground">
              Lactose
            </th>
            <th className="text-center px-4 py-4 font-semibold text-foreground">
              Absorption
            </th>
            <th className="text-center px-4 py-4 font-semibold text-foreground">
              Price
            </th>
            <th className="text-left px-4 py-4 font-semibold text-foreground hidden lg:table-cell">
              Best For
            </th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((type, i) => (
            <tr
              key={type.id}
              data-ocid={`types.table_row.${i + 1}`}
              className={`border-b border-border last:border-0 ${
                i % 2 === 0 ? "bg-background" : "bg-muted/20"
              }`}
            >
              <td className="px-5 py-4">
                <p className="font-semibold text-foreground">{type.name}</p>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="font-bold text-primary">
                  {type.proteinPercent}%
                </span>
              </td>
              <td className="px-4 py-4 text-center text-muted-foreground">
                {LACTOSE_LABEL[type.lactose]}
              </td>
              <td
                className={`px-4 py-4 text-center font-medium ${ABSORB_COLOR[type.absorptionRate]}`}
              >
                {ABSORB_LABEL[type.absorptionRate]}
              </td>
              <td className="px-4 py-4 text-center text-muted-foreground">
                {PRICE_LABEL[type.priceRange]}
              </td>
              <td className="px-4 py-4 hidden lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {type.bestFor.slice(0, 2).map((b) => (
                    <Badge key={b} variant="secondary" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypesComparisonSection() {
  const { data: types = [], isLoading } = useWheyTypes();
  const ordered = WHEY_TYPES_ORDER.map((id) =>
    types.find((t) => t.id === id),
  ).filter(Boolean) as WheyType[];

  return (
    <section
      id="types"
      data-ocid="types.section"
      className="py-20 section-zone-muted scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="citation mb-2 block">02 — Types</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Whey Protein Types
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Not all whey is created equal. Each variant has distinct processing
            levels, macronutrient profiles, and use cases. Choose based on your
            goals and budget — not marketing.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="types.loading_state"
            className="h-64 rounded-2xl bg-muted animate-pulse"
          />
        ) : (
          <Tabs
            defaultValue="compare"
            data-ocid="types.tabs"
            className="w-full"
          >
            <TabsList className="mb-8 h-auto flex-wrap gap-1 bg-muted/60 p-1 rounded-xl">
              <TabsTrigger
                value="compare"
                data-ocid="types.tab.compare"
                className="font-display font-semibold text-sm px-4 py-2"
              >
                Full Comparison
              </TabsTrigger>
              {ordered.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  data-ocid={`types.tab.${type.id}`}
                  className="font-display font-medium text-sm px-4 py-2"
                >
                  {type.id === "concentrate"
                    ? "Concentrate"
                    : type.id === "isolate"
                      ? "Isolate"
                      : type.id === "hydrolysate"
                        ? "Hydrolysate"
                        : type.id === "casein"
                          ? "Casein"
                          : "Plant-Based"}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="compare" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <ComparisonTableFull types={ordered} />
              </motion.div>
            </TabsContent>

            {ordered.map((type, i) => (
              <TabsContent key={type.id} value={type.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <TypeDetailCard
                    type={type}
                    colorClass={PROTEIN_BAR_COLORS[i] ?? "bg-primary"}
                  />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
}
