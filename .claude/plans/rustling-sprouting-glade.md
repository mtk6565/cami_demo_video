# Plan: Align Frame 4 & Frame 5 Content Flow

## Context

Frame 4 (SceneSlotPick) currently confirms the booking prematurely — it says "Booked! ✅" with a full summary and "Booking confirmed!" checkmark, *before* payment happens. Frame 5 (SceneDeposit) then redundantly repeats the same booking details and adds payment. This creates a disjointed flow where the booking feels "done" twice.

The fix: Frame 4 acknowledges the slot pick and prompts payment. Frame 5 confirms payment and locks the booking. Each frame has one clear job, no repeated content.

## Changes

### 1. `src/sequences/SceneSlotPick.tsx` — Slot pick + payment prompt

**User message** (unchanged): `"Wed 2 PM pls! 🙌"`

**Bot message** (changed from "Booked! ✅..." to):
```
"Great pick! 🙌\n\n🐕 Max — Full Groom\n📅 Wed, 2 PM\n\nWe'll use his special shampoo too 🧴🐾\n\nJust pay the deposit to lock it in 👇"
```
This keeps the special shampoo detail (currently in Frame 4) while naturally bridging to the payment prompt.

**Add:** Payment button (moved from SceneDeposit) — `💳 Pay AED 50 Deposit` with spring animation appearing after bot message (~frame 30).

**Remove:** The "Booking confirmed!" checkmark animation (lines 53-90). No checkmark on this frame — the booking isn't confirmed until payment.

### 2. `src/sequences/SceneDeposit.tsx` — Payment confirmed + locked in

**Remove:** The bot ChatBubble with the redundant summary and the payment button (both moved to Frame 4).

**New bot message:**
```
"💳 Paid! Slot locked ✅\n\nSee you Wednesday — Max is going to look amazing 🐶✨"
```

**Checkmark label:** Change from `"Payment received!"` to `"Deposit paid — Booking locked!"`

### 3. `src/components/StepProgress.tsx` — Update step labels (STEPS array, line 4)

- Step 3 (index 2): `"Automated Booking Confirmation ✅"` → `"Pick & Pay 💳"`
- Step 4 (index 3): `"Pay via WhatsApp"` → `"Slot Locked ✅"`

These labels appear in the right-side StepProgress panel that tracks progress through the flow.

### 4. `src/CamiAd.tsx` — Update timeline comment

Update the comment block (lines 29-30) to reflect new scene descriptions:
- Scene 4: `Client picks + pays deposit`
- Scene 5: `Payment confirmed, slot locked`

No duration changes needed — 5s each is fine.

## Files to Modify

- `src/sequences/SceneSlotPick.tsx`
- `src/sequences/SceneDeposit.tsx`
- `src/components/StepProgress.tsx`
- `src/CamiAd.tsx` (comment only)

## Verification

1. Run `npm run dev` to open Remotion Studio
2. Scrub through frames 4-5 (14s–24s mark) and verify:
   - Frame 4: user picks slot → bot prompts payment → payment button appears (no checkmark)
   - Frame 5: bot confirms payment + locked → checkmark animation plays
   - No repeated booking details between frames
3. Run `npm run lint` to ensure no TS/lint errors
