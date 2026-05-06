import type { SearchState } from "@/types/whey";
import { createContext, useContext, useState } from "react";

const NAV_SECTIONS = [
  {
    id: "what-is",
    keywords: [
      "what",
      "is",
      "whey",
      "protein",
      "definition",
      "milk",
      "byproduct",
      "types",
    ],
  },
  {
    id: "types",
    keywords: [
      "types",
      "concentrate",
      "isolate",
      "hydrolysate",
      "casein",
      "plant",
      "wpc",
      "wpi",
    ],
  },
  {
    id: "benefits",
    keywords: [
      "benefits",
      "muscle",
      "growth",
      "recovery",
      "strength",
      "immune",
      "weight",
      "body",
    ],
  },
  {
    id: "safety",
    keywords: [
      "safety",
      "safe",
      "kidney",
      "liver",
      "acne",
      "lactose",
      "myth",
      "side effects",
    ],
  },
  {
    id: "dosage",
    keywords: [
      "dosage",
      "dose",
      "how much",
      "calculator",
      "serving",
      "timing",
      "when",
    ],
  },
  {
    id: "pricing",
    keywords: [
      "pricing",
      "price",
      "cost",
      "brand",
      "cheap",
      "best",
      "value",
      "compare",
    ],
  },
  { id: "faq", keywords: ["faq", "question", "answer", "common", "asked"] },
];

function findMatchingSections(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return NAV_SECTIONS.filter((s) =>
    s.keywords.some((kw) => q.includes(kw) || kw.includes(q)),
  ).map((s) => s.id);
}

export interface SearchContextValue {
  searchState: SearchState;
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

export const SearchContext = createContext<SearchContextValue>({
  searchState: { query: "", matchingSections: [] },
  setQuery: () => {},
  clearSearch: () => {},
});

export function useSearchState(): SearchContextValue {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    matchingSections: [],
  });

  const setQuery = (query: string) => {
    setSearchState({
      query,
      matchingSections: findMatchingSections(query),
    });
  };

  const clearSearch = () => setSearchState({ query: "", matchingSections: [] });

  return { searchState, setQuery, clearSearch };
}

export function useSearch() {
  return useContext(SearchContext);
}
