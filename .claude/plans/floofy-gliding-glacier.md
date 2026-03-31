# Plan: Fix Phone Position Shifting Between Steps

## Context

The phone and step progress shift position between steps. Three root causes:

1. **`alignItems: "center"` in layout row** (`SceneWhatsAppFlow.tsx` line 145) — as StepProgress grows taller with each new step, the flex centering recalculates, pushing the phone vertically
2. **StepProgress circle sizes change** (`StepProgress.tsx` line 100) — active step circle is 44px, completed is 32px. When a step transitions active→completed, it shrinks, shifting everything above/below
3. **Connector `marginLeft` varies** (`StepProgress.tsx` line 112) — active connectors use `marginLeft: 21`, completed use `15`, causing horizontal jitter

## Fix

### File 1: `src/sequences/SceneWhatsAppFlow.tsx`
- Change `alignItems: "center"` → `"flex-start"` on the layout row
- Add `paddingTop` to vertically position content at a fixed point

### File 2: `src/components/StepProgress.tsx`
- Use consistent `circleSize: 44` for all steps (active, completed, and inactive) — no size change between states
- Use consistent `marginLeft: 21` for all connector lines — no horizontal shift
- Differentiate active vs completed purely through color/content (gradient vs green, number vs checkmark), not size

## Verification

1. `npm run lint` — no errors
2. `npm run dev` — scrub through all phases, confirm phone stays in exact same position
