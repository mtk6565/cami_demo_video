# Plan: Add Icons to Steps Missing Them

## Context
The StepProgress component in `src/components/StepProgress.tsx` defines 8 steps. Steps 2-4 have emoji icons appended to their labels, but steps 1, 5, 6, 7, and 8 do not. The user wants relatable icons added to match the pattern.

## Change

**File**: `src/components/StepProgress.tsx` (lines 4-13)

Update the STEPS array labels:

| Step | Current | Updated |
|------|---------|---------|
| 1 | `"Client Messages"` | `"Client Messages 💬"` |
| 5 | `"Reminders"` | `"Reminders 🔔"` |
| 6 | `"Live Session Updates"` | `"Live Session Updates 📸"` |
| 7 | `"Thank You & Reviews"` | `"Thank You & Reviews ⭐"` |
| 8 | `"Auto Re-engage"` | `"Auto Re-engage 🔄"` |

## Verification
- `npm run lint` — ensure no type/lint errors
- `npm run dev` — visually confirm icons appear on each step in Remotion Studio
