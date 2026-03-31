# Plan: Update Frame 9 (SceneRepeatInvite)

## Context
User wants two changes to frame 9 (SceneRepeatInvite):
1. Update the chat message text to match a new copy
2. Move the "1 Month Later" badge above the phone (like frame 6's "24 hours before appointment" badge pattern)

## Changes — `src/sequences/SceneRepeatInvite.tsx`

### 1. Add "1 Month Later" badge above phone (matching frame 6 pattern)
- Wrap `<PhoneMockup>` in a column flex container with a badge above it (same as SceneConfirmation lines 46-88)
- Badge style: purple-tinted pill (`rgba(54, 42, 130, 0.1)` bg, rounded, spring animation)
- Use `🔄` emoji + "1 Month Later" text in the badge
- Add spring animation for badge entrance (same as frame 6's `badgeEntrance`)

### 2. Update chat bubble text
Replace current messages with:
- Bubble 1: `"Hey Alex! 🎊 It's been a month — Max must be ready for his next fresh cut 🐾"`
- Bubble 2: `"⚡ Book THIS Mon or Tue → save 15%\n⏰ Offer expires Sunday midnight"`
- CTA button: `"🐕 Rebook Max — 15% Off"`

### 3. Remove "1 Month Later" from StepProgress `extraContent`
- Since the badge is now above the phone, remove the `extraContent` prop from `<StepProgress>` (and the associated `rotation` interpolation)

## Files to modify
- `src/sequences/SceneRepeatInvite.tsx` — single file change

## Verification
- Run `npm run dev` to open Remotion Studio
- Navigate to frame 9 (SceneRepeatInvite) around 39-44s
- Confirm "1 Month Later" badge appears above phone with spring animation
- Confirm new message text matches the requested copy
- Run `npm run lint` to verify no type/lint errors
