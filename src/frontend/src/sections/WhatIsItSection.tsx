import { motion } from "motion/react";

const PILLARS = [
  {
    icon: "🧀",
    title: "Cheese-Making By-Product",
    body: "When milk coagulates to form cheese, it separates into solid curds (casein) and liquid whey. That liquid — once considered waste — is now filtered, concentrated, and spray-dried into powder form.",
    citation: "Smithers GW. (2008). Int Dairy J. PMID 18710845",
  },
  {
    icon: "🧬",
    title: "Complete Protein Profile",
    body: "Whey contains all 9 essential amino acids (EAAs) the body cannot synthesise itself. With a biological value (BV) of 104 — higher than eggs (BV 100) or beef (BV 80) — it is among the most bioavailable proteins on earth.",
    citation: "Hoffman JR & Falvo MJ. (2004). J Sports Sci Med. PMID 24482589",
  },
  {
    icon: "⚡",
    title: "Leucine — The Anabolic Switch",
    body: "Whey's leucine content (≈11 % by weight) exceeds virtually all whole food proteins. Leucine is the primary activator of mTOR, the intracellular signalling hub that drives muscle protein synthesis.",
    citation: "Norton LE & Layman DK. (2006). J Nutr. PMID 16365087",
  },
  {
    icon: "🏃",
    title: "Superior Bioavailability",
    body: "Whey digests and absorbs within 60–90 minutes of consumption, delivering a rapid plasma amino acid peak. This 'fast protein' characteristic makes it ideal for post-exercise recovery windows.",
    citation: "Boirie Y et al. (1997). PNAS. PMID 9405332",
  },
];

const COMPARISON_ROWS = [
  { label: "Biological Value", whey: "104", egg: "100", beef: "80", soy: "74" },
  {
    label: "Leucine content",
    whey: "11%",
    egg: "8.5%",
    beef: "8%",
    soy: "7.8%",
  },
  {
    label: "Absorption speed",
    whey: "Fast",
    egg: "Medium",
    beef: "Slow",
    soy: "Medium",
  },
  { label: "Complete EAAs", whey: "✓", egg: "✓", beef: "✓", soy: "✓" },
];

export function WhatIsItSection() {
  return (
    <section
      id="what-is-it"
      data-ocid="what_is_it.section"
      className="py-20 bg-background scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl"
        >
          <span className="citation mb-2 block">01 — Foundation</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            What Is Whey Protein?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A liquid by-product of dairy production, transformed into the
            world's most studied sports supplement — backed by decades of
            peer-reviewed research.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`what_is_it.pillar.${i + 1}`}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3 hover:shadow-md transition-smooth"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl leading-none">{pillar.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </div>
              <p className="citation text-xs pl-12">{pillar.citation}</p>
            </motion.div>
          ))}
        </div>

        {/* Bioavailability comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-border overflow-hidden section-zone-muted"
        >
          <div className="px-6 py-5 border-b border-border">
            <h3 className="font-display text-xl font-bold text-foreground">
              Protein Quality Comparison
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Whey vs. common high-protein food sources
            </p>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              data-ocid="what_is_it.comparison_table"
            >
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    Metric
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-primary">
                    Whey 🥇
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    Egg
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    Beef
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    Soy
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-background/50" : ""}
                  >
                    <td className="px-6 py-3 text-muted-foreground font-medium">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-primary">
                      {row.whey}
                    </td>
                    <td className="px-4 py-3 text-center text-foreground">
                      {row.egg}
                    </td>
                    <td className="px-4 py-3 text-center text-foreground">
                      {row.beef}
                    </td>
                    <td className="px-4 py-3 text-center text-foreground">
                      {row.soy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
