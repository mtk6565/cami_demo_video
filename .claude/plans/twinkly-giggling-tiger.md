# Fix: Rebook & Leave Review buttons appear simultaneously

## Context
In Phase 7 (Thank You scene), the "Rebook Now" and "Leave Review" buttons currently appear with a 6-frame stagger (`i * 6`), making them pop in sequentially like chat messages. They should appear together at the same time.

## Change
**File:** `src/components/QuickReplyButtons.tsx` (line 29)

```diff
- const btnDelay = delay + i * 6;
+ const btnDelay = delay;
```

This removes the per-button stagger so both buttons pop in simultaneously at the same frame.

## Verification
- `npm run dev` → scrub to Phase 7 (~frame 840) and confirm both buttons appear at the same instant
- `npm run lint` → no errors
