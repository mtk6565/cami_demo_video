# Refine StepProgress: All 8 Visible + Connector Fill + Pulse

## Context

The current StepProgress component only shows steps 1 through `currentStep` (progressive reveal). In a 1080px portrait frame, the side-by-side layout (phone 480px + steps 280px) works but can be tightened. The user wants to keep the side-by-side layout but:
- Show all 8 steps from the start (future steps dimmed)
- Add connector line fill animation as steps progress
- Add subtle pulse on the active step

## Changes

### 1. StepProgress.tsx — Show all 8 steps, dimmed future states

**File**: `src/components/StepProgress.tsx`

- **Remove** the `visibleSteps` filter — render all 8 `STEPS` always
- Add a third visual state for **upcoming/future** steps:
  - Circle: `border: 2px dashed rgba(124,58,237,0.2)`, no fill (transparent), number in `rgba(124,58,237,0.25)`
  - Label: `rgba(124,58,237,0.2)`, fontSize 13px, fontWeight 500
  - Entrance: all future steps appear immediately at `opacity: 1` but dimmed via colors (no spring delay needed — they're visible from frame 0)
- **Active** step (unchanged): purple gradient circle, glow, scale 1.08x, bold label
- **Completed** step (unchanged): green `#C2F6BA` circle with checkmark

### 2. StepProgress.tsx — Connector line fill animation

- Connector between two **completed** steps: solid purple `rgba(124,58,237,0.4)`, full height instantly
- Connector between **last completed** and **active** step: animates fill from top to bottom over ~15 frames using `interpolate(connectorEntrance, [0, 1], [0, 24])` with the existing spring — change the color to `rgba(124,58,237,0.4)` (brighter than current 0.12)
- Connector between **active** and **first future** step: partial fill — use `interpolateColors` to create a gradient effect (purple fading to dim)
- Connector between two **future** steps: dim `rgba(124,58,237,0.08)`, full height, no animation

### 3. StepProgress.tsx — Active step pulse

- Add a subtle scale oscillation on the active step using sine wave:
  ```
  const pulse = Math.sin(frame * 0.12) * 0.03;
  const scale = isActive ? 1.08 + pulse : ...
  ```
- This creates a gentle breathing effect (1.05x to 1.11x) on the active circle
- Also pulse the `boxShadow` spread on active: `0 0 ${20 + Math.sin(frame * 0.12) * 6}px rgba(124,58,237,0.4)`

### 4. SceneWhatsAppFlow.tsx — Slight layout tuning

**File**: `src/sequences/SceneWhatsAppFlow.tsx`

- Increase phone width to **500px** (from 480px) in PhoneMockup's `width` prop (if it accepts one) or adjust in PhoneMockup.tsx
- Reduce gap to **48px** (from 60px)
- Reduce StepProgress width to **240px** (from 280px) — labels will be slightly smaller but all 8 fit better
- Total: 500 + 48 + 240 = 788px in 1080px frame — balanced margins

### 5. PhoneMockup.tsx — Accept optional width prop

**File**: `src/components/PhoneMockup.tsx`

- Add optional `width` prop (default 480) so SceneWhatsAppFlow can pass `width={500}`

## Files to Modify

1. `src/components/StepProgress.tsx` — main changes (all 8 visible, connector fill, pulse)
2. `src/sequences/SceneWhatsAppFlow.tsx` — layout tuning (gap, width)
3. `src/components/PhoneMockup.tsx` — add optional width prop

## Verification

1. `npm run dev` — open Remotion Studio
2. Scrub through the WhatsApp flow (frames 120–1290) and verify:
   - All 8 steps visible from frame 0 of the flow
   - Future steps are clearly dimmed but readable
   - Active step pulses subtly
   - Connector lines fill with purple as steps progress
   - No layout shifts when steps transition (phone stays fixed)
3. Check phases 5 and 8 — context badges should still appear correctly above the phone
4. Render a quick preview: `npx remotion render CamiWhatsAppAd out/test.mp4 --frames=120-420`
