# Improve getcami.io entrance transition

## Context
The getcami.io CTA now has a pulsing glow/breathing idle animation (similar to active step in StepProgress), but its entrance animation is too subtle — soft 0.85→1 scale and 18px slide-up that doesn't match the energy of the pulsing idle state. The handoff from "arriving" to "alive" feels jarring.

## Changes — `src/sequences/SceneOutro.tsx`

### 1. Bolder scale-in
- Change scale range from `[0.85, 1]` → `[0, 1]` so it enters from nothing

### 2. Bouncier spring with overshoot
- Lower damping (e.g. `damping: 8`) and increase mass slightly (e.g. `mass: 0.8`) so the spring overshoots ~1.05-1.08 before settling to 1.0
- This creates a natural handoff into the ±3% breathing pulse

### 3. Remove vertical slide
- Remove `textTranslateY` entirely — pure scale-in pairs better with the pulsing idle

### 4. Fix glow ramp
- Instead of peaking at 0.7 mid-entrance then dipping to glowPulse (~0.45), ramp smoothly from 0 up to the pulse range: `interpolate(textSpring, [0, 1], [0, glowPulse])`
- This avoids the brightness dip at the critical moment

## Verification
- `npm run dev` → scrub to outro scene
- Confirm the CTA pops in from zero scale with a slight overshoot bounce
- Confirm the glow ramps up smoothly into the breathing pulse (no brightness dip)
- Confirm no vertical jump — pure centered scale-in
