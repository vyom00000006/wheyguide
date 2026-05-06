import { Footer } from "@/components/Footer";
import { SearchContext, useSearchState } from "@/hooks/use-search";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { BackToTop } from "./BackToTop";

const NAV_LINKS = [
  { label: "What Is It", href: "#what-is-it" },
  { label: "Types", href: "#types" },
  { label: "Benefits", href: "#benefits" },
  { label: "Safety", href: "#safety" },
  { label: "Dosage", href: "#dosage" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.slice(1);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <a
      href={href}
      onClick={handleClick}
      data-ocid={`nav.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
    >
      {label}
    </a>
  );
}

function Header() {
  const { searchState, setQuery, clearSearch } = useSearchState();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.logo.link"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold font-display">
              W
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              WheyGuide
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          {/* Search */}
          <div className="relative flex-1 max-w-xs hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics…"
              value={searchState.query}
              onChange={(e) => setQuery(e.target.value)}
              data-ocid="nav.search_input"
              className="w-full rounded-lg border border-input bg-background pl-9 pr-8 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
            {searchState.query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
            {searchState.matchingSections.length > 0 && searchState.query && (
              <div className="absolute top-full mt-1 w-full rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                {searchState.matchingSections.map((sid) => {
                  const link = NAV_LINKS.find((l) => l.href === `#${sid}`);
                  if (!link) return null;
                  return (
                    <button
                      key={sid}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors text-foreground"
                      onClick={() => {
                        clearSearch();
                        document.getElementById(sid)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    >
                      Jump to:{" "}
                      <span className="font-semibold">{link.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            data-ocid="nav.mobile_menu.toggle"
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics…"
              value={searchState.query}
              onChange={(e) => setQuery(e.target.value)}
              data-ocid="nav.mobile_search_input"
              className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors text-foreground"
              onClick={() => {
                setMobileOpen(false);
                const id = l.href.slice(1);
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const searchValue = useSearchState();

  return (
    <SearchContext.Provider value={searchValue}>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </SearchContext.Provider>
  );
}
