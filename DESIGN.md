# Design Brief

## Direction

Pixel Love — intimate romantic luxury experience with wine red primary, deep burgundy foundation, gold accents, soft pink highlights.

## Tone

Refined contemporary romantic aesthetic — precision over ornament, classy dark theme with elevated card surfaces and warm micro-interactions.

## Differentiation

Parallax scrolling with floating heart animations and cursor sparkle trail creates memorable, tactile intimacy unique to couple experiences.

## Color Palette

| Token      | OKLCH             | Role                    |
| ---------- | ----------------- | ----------------------- |
| background | 7.2 0.02 0        | Deep burgundy base      |
| foreground | 90.2 0.045 1      | Soft pink text          |
| card       | 10.5 0.015 0      | Elevated card surfaces  |
| primary    | 41.8 0.145 15     | Wine red accents        |
| accent     | 72.8 0.145 66     | Gold highlights         |
| muted      | 15 0.025 0        | Subtle dividers         |

## Typography

- Display: Fraunces — elegant serif for hero titles, romantic mood
- Body: DM Sans — clean, modern sans for body text and labels
- Scale: hero 3xl/4xl, h2 2xl, label sm/base, body base

## Elevation & Depth

Layered surface hierarchy with glass-effect overlays (frosted transparency) on cards; ambient shadows create depth without harshness; parallax movement adds visual stratification.

## Structural Zones

| Zone    | Background         | Border          | Notes                    |
| ------- | ------------------ | --------------- | ------------------------ |
| Header  | bg-background      | border-primary  | Wine red accent divider  |
| Content | bg-card w/ shadow  | border-muted    | Alternating card rhythm  |
| Footer  | glass-effect       | border-primary  | Subtle gold accent line  |

## Spacing & Rhythm

Generous vertical rhythm (48px gaps between sections), intimate horizontal margins (24px on mobile, 32px on desktop); card padding 20–28px for breathing room.

## Component Patterns

- Buttons: wine red bg, soft pink hover, no border, rounded 12px, smooth transition
- Cards: 12px radius, dark card bg with subtle shadow, 1px muted border
- Text: serif display for titles, sans-serif body; accent color sparingly on CTAs/highlights

## Motion

- Entrance: fade-in 0.6s with staggered delay; parallax on scroll
- Hover: smooth color shift (0.3s), subtle scale lift
- Decorative: floating hearts (2s ease-out), cursor sparkles (0.8s fade)

## Constraints

- No rainbow gradients; wine red + gold only for accents
- Avoid bright whites; use soft pink for all foreground text
- Preserve intimacy: keep interactive elements close, avoid sprawling layouts
- Single-page; smooth scroll, no jarring transitions

## Signature Detail

Floating heart particles on click and sparkle cursor trail transform ordinary interaction into romantic micro-moment (category: micro-interaction choreography).
