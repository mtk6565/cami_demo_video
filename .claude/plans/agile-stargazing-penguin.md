# Outro Visual Redesign

## Context
Replace the current text/emoji-based outro with an image-based design using the four new assets in `public/images/outro/`. The current outro uses GlowBackground, Headline components, a paw emoji, and feature pills. The new design layers images with staggered spring animations.

## Animation Sequence (120 frames / 4 seconds at 30fps)

| Element | Start | Animation | Position |
|---|---|---|---|
| `background.png` | frame 0 | Fast fade-in (5 frames) + subtle Ken Burns scale 1.0→1.02 | Full screen cover |
| `top_cloud.png` | frame 8 | Spring slide-down from -60px + fade | Top-center |
| `main_render.png` | frame 25 | Spring scale 0.85→1.0 + fade | Center, slightly below middle |
| `getcami.io.png` | frame 55 | Spring fade + slide up from +20px | Bottom-center |

All elements visible for the last ~65 frames (~2s) before video ends.

## Changes

### File: `src/sequences/SceneOutro.tsx` (full rewrite)

**Remove:**
- `GlowBackground` and `Headline` imports
- All current JSX (emoji, text, CTA button, feature pills)

**Add:**
- `Img`, `staticFile` imports from remotion
- Four image layers with spring-driven animations
- Layout: `AbsoluteFill` with absolutely-positioned children stacked by DOM order

**Spring configs** (matching project conventions):
- Cloud: `{ damping: 14, mass: 0.6 }`
- Main render: `{ damping: 12, mass: 0.8 }`
- CTA logo: `{ damping: 14 }`

**Positioning:**
- Background: `width/height: 100%`, `objectFit: "cover"`
- Cloud: `top: 0`, horizontally centered, ~315px wide
- Main render: centered with width ~680px, vertically centered or slightly below
- getcami.io: `bottom: ~30px`, horizontally centered, natural size (~253×51)

### No changes needed:
- `src/CamiAd.tsx` — audio and sequence timing remain the same

## Verification
1. `npm run dev` — open Remotion Studio, scrub through the outro scene
2. Confirm: background appears immediately, cloud slides down, main render scales in, getcami.io fades in last
3. Confirm audio still plays correctly with 6-frame delay
4. `npm run lint` — no type/lint errors
