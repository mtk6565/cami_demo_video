# Plan: Rework Scene 4 (SceneSlotPick) for Seamless Booking Confirmation

## Context

Scene 4 currently does two awkward things: the customer picks a time slot, then a pet profile card animates in with "Setting up Max's profile now." This feels disjointed — "Pick and Profile" doesn't flow naturally from Scene 3 (Cami offers slots) into Scene 5 (payment/deposit).

The goal is to make Scene 4 feel like an **instant booking confirmation** — the customer picks a slot and the booking is confirmed automatically, reinforcing that Cami handles everything seamlessly.

## Changes to `src/sequences/SceneSlotPick.tsx`

1. **Keep** the user message: `"Wed 2 PM pls! 🙌"` (delay 8)

2. **Replace** the bot message from `"Done! Setting up Max's profile now 🐾"` → something like:
   `"Booked! ✅\n\n🐕 Max — Full Groom\n📅 Wed, 2 PM\n\nAnd don't worry, we'll use his special shampoo 🧴🐾"` (delay 20)

   This is the key moment: Cami doesn't just confirm — it remembers Max's preferences and proactively reassures the owner. Feels personal and warm, selling the AI's intelligence without being clinical.

3. **Remove** the pet profile card entirely — the personalized note inside the chat bubble is more natural for WhatsApp and more impactful than a generic profile card

4. **Add** a confirmation checkmark animation (similar to Scene 5's payment checkmark) that appears after the bot message — a green ✅ circle with "Booking confirmed!" text, using a spring animation (delay ~50 frames)

5. **Update** the glow background to green `#C2F6BA` (matching Scene 5's success color) to visually signal "confirmed"

This creates the flow:
- Scene 3: Cami offers slots → Scene 4: Customer picks, **instantly confirmed** → Scene 5: Deposit payment

## Files to Modify

- `src/sequences/SceneSlotPick.tsx` — the only file that needs changes

## Verification

- Run `npm run dev` to open Remotion Studio
- Scrub to Scene 4 (frames 420–570, i.e. 14–19 seconds)
- Confirm: user message → bot confirmation bubble with booking details → green checkmark animation
- Confirm smooth transitions from Scene 3 and into Scene 5
