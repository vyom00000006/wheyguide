import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePricingData } from "@/hooks/use-backend";
import type { PricingTier, WheyTypeKey } from "@/types/whey";
import { CheckCircle2, ShieldCheck, Star, TrendingDown } from "lucide-react";

const TYPE_LABELS: Record<WheyTypeKey, string> = {
  concentrate: "Concentrate",
  isolate: "Isolate",
  hydrolysate: "Hydrolysate",
  casein: "Casein",
  plant: "Plant-Based",
};

const TYPE_COLORS: Record<WheyTypeKey, string> = {
  concentrate: "bg-primary/10 text-primary border-primary/20",
  isolate: "bg-accent/15 text-amber-700 border-accent/30",
  hydrolysate: "bg-purple-50 text-purple-700 border-purple-200",
  casein: "bg-blue-50 text-blue-700 border-blue-200",
  plant: "bg-green-50 text-green-700 border-green-200",
};

const TIER_OVERVIEW = [
  {
    key: "concentrate" as WheyTypeKey,
    label: "Concentrate (WPC)",
    priceRange: "$0.40 – $0.90 / serving",
    monthlyEst: "$12 – $27",
    quality: "Budget",
    protein: "70–80%",
    description: "Best value for most athletes. Slight lactose; rich flavour.",
    highlight: false,
  },
  {
    key: "isolate" as WheyTypeKey,
    label: "Isolate (WPI)",
    priceRange: "$0.90 – $1.40 / serving",
    monthlyEst: "$27 – $42",
    quality: "Mid–Premium",
    protein: "≥90%",
    description:
      "Lactose-minimal, lean macros. Ideal for cutting or sensitive guts.",
    highlight: true,
  },
  {
    key: "hydrolysate" as WheyTypeKey,
    label: "Hydrolysate (WPH)",
    priceRange: "$2.00 – $3.50 / serving",
    monthlyEst: "$60 – $105",
    quality: "Premium",
    protein: "≥90%",
    description:
      "Pre-digested, fastest absorption. Worth it only for elite athletes.",
    highlight: false,
  },
];

const QUALITY_TIERS = [
  {
    tier: "Budget",
    range: "< $0.70/serving",
    icon: "💰",
    desc: "WPC from reputable brands with verified third-party testing. Good for most gym-goers.",
    color: "border-primary/30 bg-primary/5",
  },
  {
    tier: "Mid-Range",
    range: "$0.70 – $1.40/serving",
    icon: "⚖️",
    desc: "WPC or WPI with higher purity, better taste, and often Informed Sport certified.",
    color: "border-accent/40 bg-accent/10",
  },
  {
    tier: "Premium",
    range: "> $1.40/serving",
    icon: "🏆",
    desc: "WPH or specialty formulations. For competitive athletes with strict dietary protocols.",
    color: "border-purple-200 bg-purple-50",
  },
];

const QUALITY_GUIDE = [
  {
    icon: ShieldCheck,
    title: "NSF Certified for Sport",
    text: "The gold standard for athletes in tested sports. NSF screens for 270+ banned substances and verifies label accuracy.",
    color: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "Informed Sport / Informed Choice",
    text: "Batch-tested by LGC Group. Widely accepted by WADA, NCAA, and professional leagues. Look for the shield logo.",
    color: "text-primary",
  },
  {
    icon: TrendingDown,
    title: "Avoid Proprietary Blends",
    text: 'Blends that list a "Protein Matrix" without per-ingredient weights may be hiding underdosed components. Demand full transparency.',
    color: "text-amber-600",
  },
  {
    icon: Star,
    title: "What to Check on Labels",
    text: "Protein per serving (≥20 g), serving size, ingredients list (whey should be first), sugar content, and the presence of a third-party seal.",
    color: "text-primary",
  },
];

function PricingCard({ tier }: { tier: PricingTier; index: number }) {
  const monthlyEstimate = (tier.pricePerServing * 30).toFixed(2);
  return (
    <div
      className={`relative rounded-xl border p-4 transition-smooth hover:shadow-md ${
        tier.badge === "Best Value"
          ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20"
          : tier.badge === "Editor's Pick"
            ? "border-accent/40 bg-accent/8 ring-1 ring-accent/20"
            : "border-border bg-card"
      }`}
    >
      {tier.badge && (
        <span
          className={`absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-xs font-semibold ${
            tier.badge === "Best Value"
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-white"
          }`}
        >
          {tier.badge}
        </span>
      )}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="font-display font-semibold text-sm text-foreground leading-snug">
            {tier.brand}
          </p>
          <span
            className={`inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-xs font-medium border ${TYPE_COLORS[tier.type]}`}
          >
            {TYPE_LABELS[tier.type]}
          </span>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-muted-foreground">{tier.sizeKg} kg</p>
          <p className="font-display font-bold text-foreground">
            ${tier.priceUSD}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-muted/50 px-2 py-1.5">
          <p className="text-xs text-muted-foreground">Per serving</p>
          <p className="text-sm font-semibold text-foreground">
            ${tier.pricePerServing.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 px-2 py-1.5">
          <p className="text-xs text-muted-foreground">Monthly</p>
          <p className="text-sm font-semibold text-foreground">
            ${monthlyEstimate}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 px-2 py-1.5">
          <p className="text-xs text-muted-foreground">Protein</p>
          <p className="text-sm font-semibold text-foreground">
            {tier.proteinPerScoop}g
          </p>
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const { data: pricingData } = usePricingData();

  return (
    <section id="pricing" className="section-zone-muted py-16 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-3 text-primary border-primary/30 font-semibold text-xs tracking-wide uppercase"
          >
            Pricing Comparison
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Know What You're Paying For
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transparent cost breakdown across all whey types — budget to premium
            — so you can make a confident, informed purchase.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Prices as of {pricingData?.lastUpdated ?? "May 2026"}
          </p>
        </div>

        {/* Type Comparison Table */}
        <div
          className="overflow-x-auto rounded-xl border border-border bg-card shadow-subtle mb-12"
          data-ocid="pricing.comparison_table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="font-display font-semibold text-foreground w-40">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Protein %
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Price / Serving
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Monthly (1×/day)
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Quality Tier
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Best For
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TIER_OVERVIEW.map((row, i) => (
                <TableRow
                  key={row.key}
                  data-ocid={`pricing.type_row.${i + 1}`}
                  className={row.highlight ? "bg-primary/5 font-medium" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {row.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      <span
                        className={`font-semibold text-sm ${row.highlight ? "text-primary" : "text-foreground"}`}
                      >
                        {row.label}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {row.protein}
                  </TableCell>
                  <TableCell className="text-sm font-semibold">
                    {row.priceRange}
                  </TableCell>
                  <TableCell className="text-sm">{row.monthlyEst}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        row.quality === "Budget"
                          ? "border-primary/30 text-primary bg-primary/5"
                          : row.quality.includes("Mid")
                            ? "border-amber-300 text-amber-700 bg-amber-50"
                            : "border-purple-300 text-purple-700 bg-purple-50"
                      }`}
                    >
                      {row.quality}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                    {row.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Best Value callout */}
        <div
          className="rounded-xl border-2 border-primary/30 bg-primary/5 px-6 py-4 flex flex-col sm:flex-row items-center gap-4 mb-12"
          data-ocid="pricing.best_value_callout"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl">
            🏅
          </div>
          <div>
            <p className="font-display font-bold text-foreground">
              Best Value Pick: Whey Concentrate (WPC)
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              For most people training 3–5× per week, a high-quality WPC from an
              Informed Sport–certified brand delivers excellent muscle-building
              results at under $0.90/serving. Upgrade to WPI only if you're
              lactose-sensitive or in a caloric deficit where every gram of fat
              matters.
            </p>
          </div>
        </div>

        {/* Product cards grid */}
        {pricingData && (
          <div className="mb-12">
            <h3 className="font-display font-bold text-xl text-foreground mb-6">
              Independently Ranked Products
            </h3>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              data-ocid="pricing.products_grid"
            >
              {pricingData.tiers.map((tier, i) => (
                <PricingCard
                  key={tier.id}
                  tier={tier}
                  index={i}
                  data-ocid={`pricing.product_card.${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quality tier guide */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-xl text-foreground mb-5">
            Quality Tier Explained
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUALITY_TIERS.map((qt) => (
              <div
                key={qt.tier}
                className={`rounded-xl border p-5 ${qt.color}`}
              >
                <div className="text-2xl mb-2">{qt.icon}</div>
                <p className="font-display font-bold text-foreground">
                  {qt.tier}
                </p>
                <p className="text-xs text-primary font-semibold mb-1.5 font-mono">
                  {qt.range}
                </p>
                <p className="text-sm text-muted-foreground">{qt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Quality Guide */}
        <div
          className="rounded-2xl border border-border bg-card shadow-subtle p-6 sm:p-8"
          data-ocid="pricing.quality_guide"
        >
          <div className="mb-6">
            <Badge
              variant="outline"
              className="mb-2 text-primary border-primary/30 font-semibold text-xs tracking-wide uppercase"
            >
              Label Intelligence
            </Badge>
            <h3 className="font-display font-bold text-xl text-foreground">
              Product Quality Guide
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              What separates a trustworthy supplement from an overhyped one.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {QUALITY_GUIDE.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4">
                  <div className={`mt-0.5 shrink-0 ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-xl bg-muted/60 px-5 py-4 flex gap-3 items-start">
            <span className="text-xl shrink-0">⚠️</span>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                Proprietary Blend Red Flag:
              </strong>{" "}
              If the label says "Protein Matrix" or "Amino Acid Complex" without
              listing individual gram amounts, the manufacturer may be hiding
              underdosed ingredients. Always choose brands with full label
              transparency and third-party batch testing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
