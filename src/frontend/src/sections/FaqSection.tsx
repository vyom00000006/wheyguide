import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFaqs } from "@/hooks/use-backend";
import type { FaqEntry } from "@/types/whey";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

const EXTRA_FAQS: FaqEntry[] = [
  {
    id: "lactose-intolerance",
    question: "I'm lactose intolerant — can I still use whey?",
    answer:
      "Yes. Switch to Whey Protein Isolate (WPI) or Hydrolysed Whey (WPH), which have had virtually all lactose removed through additional processing. Most lactose-intolerant individuals tolerate WPI without GI symptoms. If in doubt, start with a half-scoop and assess tolerance. Plant-based blends (pea + rice) are a fully dairy-free alternative with comparable amino acid profiles when combined (Banaszek A et al., 2019).",
    category: "safety",
  },
  {
    id: "medication-interactions",
    question: "Does whey protein interact with medications?",
    answer:
      "Whey protein can affect the absorption of certain medications, including levodopa (Parkinson's medication) and some antibiotics. High-protein diets can also influence drug metabolism via CYP450 enzyme activity. If you are on any prescription medication, consult your pharmacist or physician before adding a protein supplement. This is especially relevant for immunosuppressants and blood-thinning medications.",
    category: "safety",
  },
  {
    id: "whole-food-vs-supplement",
    question: "Is whey better than whole food protein sources?",
    answer:
      "Neither is strictly better — they're complementary. Whole foods (chicken, eggs, Greek yoghurt, lentils) provide fibre, micronutrients, and bioactive compounds not found in a shake. Whey's advantage is convenience, speed of absorption, and precise dosing. Research by Devries & Phillips (2015) confirms whole-food and whey protein produce equivalent muscle protein synthesis when protein amounts are matched. Use food as your foundation; supplement strategically.",
    category: "basics",
  },
  {
    id: "vegan-options",
    question: "What are the best vegan alternatives to whey?",
    answer:
      "Pea protein isolate + brown rice protein in a ~70:30 blend creates a near-complete amino acid profile. Look for products delivering ≥2.5 g leucine per serving (same trigger as whey for mTOR activation). Top third-party tested options include Garden of Life Sport and Orgain Organic Sport. Soy protein is also a complete protein but has hormonal concerns at very high doses — a balanced diet-level soy intake is fine for most people.",
    category: "basics",
  },
  {
    id: "cost-benefit",
    question: "Is whey protein actually worth the cost?",
    answer:
      "On a per-gram-of-protein basis, quality WPC typically costs $0.03–$0.06/g, comparable to or cheaper than chicken breast. A 2024 independent analysis by Labdoor found the top 10 whey products delivered 85–105% of label-claimed protein. The real value proposition is convenience and rapid absorption post-workout — not a magical anabolic effect. If you consistently hit protein targets through food, supplementation offers marginal additional benefit.",
    category: "pricing",
  },
  {
    id: "mixing-tips",
    question: "How do I mix whey without clumps?",
    answer:
      "Use a shaker bottle with a wire whisk ball for best results. Add liquid (water or milk) first, then the powder — this prevents powder from sticking to the bottom. Blend at room temperature; cold liquid slows dissolution. Blenders produce the smoothest result. For cooking, WPI dissolves better in hot liquids than WPC due to its lower fat content. Avoid overheating protein powder (>70°C) as it can denature the proteins, though the amino acid content remains bioavailable.",
    category: "basics",
  },
  {
    id: "kidney-myths",
    question: "Why do people say protein damages kidneys?",
    answer:
      "This belief originates from studies on patients with pre-existing chronic kidney disease (CKD), where high protein intake accelerates decline. For healthy individuals, kidneys adapt efficiently — a process called hyperfiltration — with no lasting harm. The International Society of Sports Nutrition's 2017 position stand confirmed protein intakes up to 3.4 g/kg/day are safe for healthy, resistance-trained adults over a 1-year period (Antonio J et al., 2016). If you have risk factors (diabetes, hypertension, family history of CKD), consult a nephrologist.",
    category: "safety",
  },
  {
    id: "older-adults",
    question: "Is whey protein beneficial for older adults?",
    answer:
      "Yes — arguably more so than for younger people. Sarcopenia (age-related muscle loss) accelerates after age 50, and older muscles show 'anabolic resistance', requiring more leucine per dose to trigger MPS. Research supports 30–40 g of high-quality protein per meal (including whey) for adults over 60. A meta-analysis by Cermak et al. (2012) found protein supplementation in conjunction with resistance exercise significantly increased lean mass and strength in older adults.",
    category: "safety",
  },
];

const CATEGORY_LABELS: Record<FaqEntry["category"], string> = {
  basics: "Basics",
  safety: "Safety",
  dosage: "Dosage",
  pricing: "Pricing",
};

const CATEGORY_COLORS: Record<FaqEntry["category"], string> = {
  basics: "border-primary/30 text-primary bg-primary/5",
  safety: "border-green-300 text-green-700 bg-green-50",
  dosage: "border-amber-300 text-amber-700 bg-amber-50",
  pricing: "border-purple-300 text-purple-700 bg-purple-50",
};

const ALL_CATEGORIES: Array<FaqEntry["category"] | "all"> = [
  "all",
  "basics",
  "safety",
  "dosage",
  "pricing",
];

export function FaqSection() {
  const { data: baseFaqs = [] } = useFaqs();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    FaqEntry["category"] | "all"
  >("all");

  const allFaqs = useMemo(() => [...baseFaqs, ...EXTRA_FAQS], [baseFaqs]);

  const filtered = useMemo(() => {
    let result = allFaqs;
    if (activeCategory !== "all") {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q),
      );
    }
    return result;
  }, [allFaqs, query, activeCategory]);

  return (
    <section id="faq" className="bg-background py-16 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-3 text-primary border-primary/30 font-semibold text-xs tracking-wide uppercase"
          >
            FAQ
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Common Questions, Straight Answers
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Evidence-based answers to the questions athletes and beginners ask
            most. No bro-science.
          </p>
        </div>

        {/* Search + filter bar */}
        <div
          className="flex flex-col sm:flex-row gap-3 mb-8"
          data-ocid="faq.search_bar"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-ocid="faq.search_input"
              className="pl-9 pr-9"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap" aria-label="Filter by category">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`faq.filter.${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                  activeCategory === cat
                    ? cat === "all"
                      ? "bg-primary text-primary-foreground border-primary"
                      : `${CATEGORY_COLORS[cat as FaqEntry["category"]]} border-current font-bold`
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat === "all"
                  ? "All"
                  : CATEGORY_LABELS[cat as FaqEntry["category"]]}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {query && (
          <p className="text-xs text-muted-foreground mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
            {query}"
          </p>
        )}

        {/* Accordion */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-xl border border-dashed border-border"
            data-ocid="faq.empty_state"
          >
            <p className="text-muted-foreground text-lg">
              🔍 No questions match your search.
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Try different keywords or clear the filter.
            </p>
          </div>
        ) : (
          <Accordion
            type="multiple"
            className="space-y-3"
            data-ocid="faq.accordion"
          >
            {filtered.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                data-ocid={`faq.item.${i + 1}`}
                className="rounded-xl border border-border bg-card shadow-subtle overflow-hidden px-0"
              >
                <AccordionTrigger
                  className="px-5 py-4 text-left hover:no-underline hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/30"
                  data-ocid={`faq.trigger.${i + 1}`}
                >
                  <div className="flex items-start gap-3 pr-2">
                    <Badge
                      variant="outline"
                      className={`shrink-0 mt-0.5 text-xs font-semibold ${CATEGORY_COLORS[faq.category]}`}
                    >
                      {CATEGORY_LABELS[faq.category]}
                    </Badge>
                    <span className="font-display font-semibold text-foreground text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-1">
                  <div className="pl-0 sm:pl-[calc(theme(spacing.16)+theme(spacing.3))]">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Count footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          {allFaqs.length} questions covering basics, safety, dosage & pricing
        </p>
      </div>
    </section>
  );
}
