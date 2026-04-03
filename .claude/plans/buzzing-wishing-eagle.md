# Plan: Redesign Start Scene Floating Bubbles for Overwhelm Effect

## Context
The start scene ("Tired of juggling bookings?") has 7 floating message bubbles all clustered in a bottom container. This reads as tidy rather than chaotic. The goal is to convey **overwhelmingness** — messages coming from everywhere, a receptionist who can't keep up.

## Changes

**File: `src/sequences/SceneStart.tsx`**

1. **Remove the bottom-anchored container** — Replace the `position: absolute; bottom: 100; height: 300` wrapper with a full-screen absolute container so bubbles can be placed anywhere.

2. **Reposition bubbles: 3 top, 3 bottom, 1 mid-overlap**
   - Top cluster (3): scattered across upper ~15% of frame, varied X positions
   - Bottom cluster (3): scattered across lower ~15% of frame, varied X positions  
   - Mid-overlap (1): positioned to slightly overlap/intrude near the headline area
   - 2 bubbles bleed off-screen edges (~30-40% clipped) — one top-left, one bottom-right

3. **Vary bubble sizes** — Add different `scale` values to each bubble:
   - 2 large (~1.4-1.5x)
   - 3 medium (~1.15-1.25x)
   - 2 at current size or slightly above (~1.0-1.1x)
   
   This means increasing base `fontSize` and `padding` in `FloatingBubble.tsx`, then using the existing `scale` prop for variation.

**File: `src/components/FloatingBubble.tsx`**

4. **Increase base bubble size** — Bump `fontSize` from 16 to ~22 and `padding` from `8px 14px` to ~`12px 20px`. The `scale` prop already exists and works, so per-bubble variation is handled via the data array.

## Positioning Strategy (portrait 1080×1920)

| Bubble | Position | Scale | Off-screen? |
|--------|----------|-------|-------------|
| 1 (WA) | top-left | 1.3 | yes, ~35% left bleed |
| 2 (WA) | top-center-right | 1.15 | no |
| 3 (IG) | top-right | 1.0 | no |
| 4 (IG) | mid-right, near headline | 1.2 | no |
| 5 (MSG) | bottom-left | 1.1 | no |
| 6 (MSG) | bottom-center | 1.4 | no |
| 7 (WA) | bottom-right | 1.25 | yes, ~30% right bleed |

## Verification
- `npm run dev` — preview in Remotion Studio, scrub through first 125 frames
- Confirm bubbles appear scattered top and bottom, not clustered
- Confirm 1-2 bubbles bleed off edges convincingly (not too much)
- Confirm varied sizes create chaotic feel
- Confirm headline remains readable between the clusters
- Check exit fade still works cleanly with new positions
