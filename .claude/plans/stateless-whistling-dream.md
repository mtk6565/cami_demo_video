# Plan: Progressive Step Indicator + Layout Fix

## Context

After moving the step badge to the right of the phone (landscape layout), two issues emerged:
1. **Massive gap** between phone and badge — `PhoneMockup` uses `width: "92%"` + `margin: "0 auto"` which fights with the flex row layout
2. **Need progressive steps** — instead of showing a single step number, show all steps up to the current one (e.g. scene 5 shows steps 1-5)

## Approach

### 1. Fix PhoneMockup sizing
**File:** `src/components/PhoneMockup.tsx`

Change the outer div:
- Remove `width: "92%"`, `maxWidth: 580`, `margin: "0 auto"`
- Add `width: 480`, `flexShrink: 0`

This gives the phone a fixed 480px width instead of trying to fill 92% of the row.

### 2. Create `StepProgress` component
**New file:** `src/components/StepProgress.tsx`

A vertical timeline showing all steps up to the current one:

- **Step data** defined as constant array (8 steps with labels)
- **Completed steps** (< current): 36px green circle with checkmark, dimmed label
- **Active step** (= current): 48px branded purple circle with number, bold label, glow shadow
- **Future steps**: not rendered
- **Connector lines**: 2px vertical lines between steps, animated draw-down
- **Animation**: staggered spring entrance — completed steps appear fast (4-frame stagger), current step enters last with scale pulse
- **`extraContent` prop**: for scene-specific extras ("INSTANT" badge, "1 Month Later" badge) rendered below the step list

**Vertical space check**: 8 steps at ~76px each = 608px, fits within 1080px - 80px padding = 1000px.

### 3. Update all 8 scene files

Replace `<StepBadge>` with `<StepProgress currentStep={N}>` in:

| Scene | Step | Extra Content |
|-------|------|---------------|
| SceneBookingRequest | 1 | — |
| SceneCamiReply | 2 | "INSTANT" badge → `extraContent` prop |
| SceneSlotPick | 3 | — |
| SceneDeposit | 4 | — |
| SceneConfirmation | 5 | — |
| SceneGroomingPics | 6 | — |
| SceneThankYou | 7 | — |
| SceneRepeatInvite | 8 | "1 Month Later" badge → `extraContent` prop |

Also adjust scene layout: `gap: 60`, `padding: "40px 60px"`.

### 4. Files to modify
- `src/components/PhoneMockup.tsx` — fix width
- `src/components/StepProgress.tsx` — **create** new component
- `src/sequences/SceneBookingRequest.tsx`
- `src/sequences/SceneCamiReply.tsx`
- `src/sequences/SceneSlotPick.tsx`
- `src/sequences/SceneDeposit.tsx`
- `src/sequences/SceneConfirmation.tsx`
- `src/sequences/SceneGroomingPics.tsx`
- `src/sequences/SceneThankYou.tsx`
- `src/sequences/SceneRepeatInvite.tsx`

### 5. Verification
- Run `npm run dev` and open Remotion Studio
- Check the **CamiWhatsAppAd-Landscape** composition
- Verify: phone sits left, step timeline sits right with no massive gap
- Verify: each scene progressively shows more steps (scene 8 shows all 8)
- Run `npx tsc --noEmit` to confirm no type errors
