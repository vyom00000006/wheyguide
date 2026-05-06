import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const STATS = [
  { value: "40+", label: "Evidence-based facts" },
  { value: "3", label: "Protein types covered" },
  { value: "BV 104", label: "Biological value" },
  { value: "11%", label: "Leucine content" },
];

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.06 190) 0%, oklch(0.30 0.09 185) 40%, oklch(0.25 0.07 200) 100%)",
      }}
    >
      {/* Background hero image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-whey-protein.dim_1200x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 190 / 0.92) 0%, oklch(0.28 0.08 185 / 0.85) 60%, oklch(0.22 0.06 200 / 0.92) 100%)",
        }}
      />

      {/* Decorative molecule dots */}
      <div className="absolute top-16 right-12 w-64 h-64 rounded-full opacity-5 border-2 border-primary" />
      <div className="absolute top-32 right-32 w-32 h-32 rounded-full opacity-8 border border-primary" />
      <div className="absolute bottom-24 left-8 w-48 h-48 rounded-full opacity-5 border-2 border-accent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge
              data-ocid="hero.evidence_badge"
              className="px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "oklch(0.68 0.14 80 / 0.2)",
                color: "oklch(0.9 0.12 80)",
                border: "1px solid oklch(0.68 0.14 80 / 0.35)",
              }}
            >
              Science-Backed Guide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5"
            style={{ color: "oklch(0.97 0.006 230)" }}
          >
            Whey Protein
            <br />
            <span style={{ color: "oklch(0.75 0.13 185)" }}>Decoded.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            style={{ color: "oklch(0.82 0.01 220)" }}
          >
            The complete guide to whey protein — what it is, how it works, which
            type fits your goals, and what the research actually says.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("what-is-it")}
              className="font-display font-semibold text-base px-7 py-3 shadow-lg transition-smooth"
              style={{
                background: "oklch(0.52 0.16 190)",
                color: "oklch(0.97 0.005 190)",
              }}
            >
              Explore the Guide
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("types")}
              className="font-display font-semibold text-base px-7 py-3 transition-smooth"
              style={{
                borderColor: "oklch(0.75 0.13 185 / 0.5)",
                color: "oklch(0.85 0.06 190)",
                background: "oklch(0.28 0.04 190 / 0.3)",
              }}
            >
              Compare Types
            </Button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "oklch(0.75 0.08 185 / 0.15)" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-ocid={`hero.stat.${i + 1}`}
              className="flex flex-col items-center text-center px-6 py-6"
              style={{ background: "oklch(0.28 0.05 190 / 0.45)" }}
            >
              <span
                className="font-display text-3xl font-bold"
                style={{ color: "oklch(0.78 0.14 185)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs mt-1 font-medium uppercase tracking-wide"
                style={{ color: "oklch(0.72 0.04 210)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
