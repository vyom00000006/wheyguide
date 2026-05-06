# Design Brief

## Direction

Whey Protein: Science-Based Guide — educational showcase applying rigorous information architecture and typographic hierarchy to complex fitness nutrition science.

## Tone

Modern, evidence-backed, premium yet accessible—scientific credibility without clinical coldness; clarity-focused like contemporary health media (Huberman Lab aesthetic).

## Differentiation

Color-coded content zones (teal for science, amber for emphasis, sage for safety) separate complex information into scannable regions, building trust through structure.

## Color Palette

| Token      | OKLCH        | Role                             |
| ---------- | ------------ | -------------------------------- |
| background | 0.98 0.008 230 | Clean light, cool-white off-tone |
| foreground | 0.18 0.015 230 | Deep cool-grey for readability   |
| card       | 1.0 0.004 230 | Pure white cards for depth       |
| primary    | 0.50 0.16 190 | Athletic teal (science/action)   |
| accent     | 0.68 0.14 80  | Warm amber (highlights, CTAs)    |
| muted      | 0.94 0.01 230 | Subtle grey dividers             |

## Typography

- Display: Space Grotesk — modern, athletic, strong hierarchy at all sizes
- Body: Figtree — warm, highly legible body copy; citations and callouts
- Mono: Geist Mono — research citations, dosage breakdowns, code-like elements
- Scale: hero `text-6xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base leading-relaxed`

## Elevation & Depth

Subtle elevated shadows on cards only; no ambient blur or background textures. Surface hierarchy through background color zones and 1–2px borders, not shadow proliferation.

## Structural Zones

| Zone       | Background     | Border | Notes                                          |
| ---------- | -------------- | ------ | ---------------------------------------------- |
| Header     | bg-card border-bottom | Sticky nav, logo, section links      |
| Hero       | bg-background  | —      | Full-width hero with typography + CTA         |
| Sections   | Alternating bg-background & .section-zone-* | — | What Is (teal), Safety (sage), Dosage (amber) |
| FAQ        | bg-muted/10    | —      | Accordion-based searchable Q&A                |
| Footer     | bg-card border-top | Credit, links, contact                    |

## Spacing & Rhythm

Spacious gaps between sections (8–12 rem), conservative micro-spacing (0.5–1 rem) within cards. Every section breathes. Content density balanced by white space and typography scale.

## Component Patterns

- Buttons: rounded-lg, primary teal bg, warm amber accent variant, high contrast, no shadow
- Cards: rounded-lg, white background, subtle border, 1px top accent stripe (color-coded by section)
- Badges: rounded-full, outline style with primary/accent/muted variants
- Accordion: smooth height transitions, icon rotation on toggle

## Motion

- Entrance: fade-in on scroll (Intersection Observer), staggered by 50ms per element
- Hover: button text opacity ↓10%, card border darkens, link underline slides in
- Decorative: none (clean, minimal)

## Constraints

- No full-page gradients; no floating orbs or blur effects
- All text must meet WCAG AA+ contrast on all backgrounds
- Max-width 1200px for content, centered container
- Mobile-first responsive: sm (640px), md (768px), lg (1024px)

## Signature Detail

Color-coded section strips—each major content zone (What, Types, Safety, Dosage, Pricing) opens with a 4px left border in its assigned color (teal/amber/sage), anchoring visual identity and aiding rapid scannability.
