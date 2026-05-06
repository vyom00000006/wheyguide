import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

const NAV_SECTIONS = [
  { label: "What Is Whey", id: "what-is-it" },
  { label: "Types", id: "types" },
  { label: "Benefits", id: "benefits" },
  { label: "Safety", id: "safety" },
  { label: "Dosage Calculator", id: "dosage" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

const SOURCES = [
  "International Society of Sports Nutrition Position Stands",
  "PubMed peer-reviewed literature",
  "NSF International / Informed Sport",
  "Labdoor Independent Rankings (2024)",
];

function FooterNavLink({ label, id }: { label: string; id: string }) {
  const handleClick = () => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      data-ocid={`footer.nav.${id}.link`}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
    >
      {label}
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-base font-bold font-display">
                W
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                WheyGuide
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The evidence-based resource for athletes, coaches, and curious
              minds who want science-backed guidance on whey protein
              supplementation — from composition to cost.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>
                References drawn from peer-reviewed sports nutrition research
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-display font-semibold text-foreground text-sm mb-3 uppercase tracking-wide">
              Contents
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_SECTIONS.map((s) => (
                <FooterNavLink key={s.id} label={s.label} id={s.id} />
              ))}
            </nav>
          </div>

          {/* Sources */}
          <div>
            <p className="font-display font-semibold text-foreground text-sm mb-3 uppercase tracking-wide">
              Data Sources
            </p>
            <ul className="flex flex-col gap-2">
              {SOURCES.map((src) => (
                <li
                  key={src}
                  className="text-sm text-muted-foreground flex items-start gap-1.5"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                  {src}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Disclaimer */}
        <div
          className="rounded-xl bg-muted/50 border border-border px-5 py-4 mb-6"
          data-ocid="footer.disclaimer"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">
              Medical Disclaimer:
            </strong>{" "}
            The content on WheyGuide is for educational and informational
            purposes only and does not constitute medical advice, diagnosis, or
            treatment. Information provided is based on peer-reviewed research
            and expert consensus as of the publication date. Always consult a
            qualified healthcare professional — including a registered dietitian
            or physician — before making significant changes to your diet or
            supplementation regime, especially if you have pre-existing health
            conditions or take prescription medications.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {year} WheyGuide. All information is educational, not medical
            advice.
          </p>
          <p>
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
