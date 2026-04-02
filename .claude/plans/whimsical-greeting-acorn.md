# Plan: Logo Glow Highlight at "Meet Cami"

## Context
Adding a visual highlight to the Cami logo synced with the voiceover saying "Meet Cami" at 4.16s. Creates visual-audio sync similar to the badge highlights.

## File to modify
- `src/sequences/SceneHook.tsx`

## Changes

### Add logo glow pulse at frame 5 (4.16s absolute = 0.16s into hook)
- Spring-animated `filter: drop-shadow()` on the logo
- Glow color: `rgba(124, 58, 237, 0.4)` (purple, matching project accent)
- Spring config: `{ damping: 10, mass: 0.6 }` — slightly bouncier/faster than other springs so the glow blooms and naturally fades back
- The spring drives glow radius from 0 → ~30px and back as the spring overshoots and settles
- Use `interpolate` with spring to control the glow: peak at spring overshoot, then settle to a subtle residual glow (~10px)

```typescript
const logoGlow = spring({
  frame: Math.max(0, frame - 5),
  fps,
  config: { damping: 10, mass: 0.6 },
});
const glowRadius = interpolate(logoGlow, [0, 1], [0, 20]);
const glowOpacity = interpolate(logoGlow, [0, 1], [0, 0.4]);
// Apply as: filter: `drop-shadow(0 0 ${glowRadius}px rgba(124,58,237,${glowOpacity}))`
```

### No other changes
- Badge highlights, sizing, gap, entrance animations all stay the same

## Verification
1. `npm run dev` — preview in Remotion Studio
2. At ~frame 5 into hook: logo gets a purple glow bloom that settles
3. Badge highlights still work at their frames (95, 120, 134)
