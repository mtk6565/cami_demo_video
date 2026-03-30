# Simplify SceneConfirmation to confirmation only

## Context
Scene 6 (SceneConfirmation) currently shows both a booking confirmation and a 24-hour reminder with a time-skip divider. The user wants to simplify it to just the confirmation, which makes the scene cleaner and lets the "You're booked!" moment land without rushing into a second concept.

## Changes

### `src/sequences/SceneConfirmation.tsx`
- Remove the "24 HOURS BEFORE" time skip divider (lines 48-85)
- Remove the reminder ChatBubble ("Quick heads up...") (lines 87-92)
- Remove unused `timeSkipDelay` / `timeSkipFrame` / `timeSkip` variables (lines 20-22)
- Keep the confirmation ChatBubble and StepProgress as-is

No other files need changes — CamiAd.tsx sequence timing and other scenes remain untouched.

## Verification
- Run `npm run dev` and preview Scene 6 (SceneConfirmation) around the 24-29s mark
- Confirm only the "✅ You're booked!" message appears, no time skip or reminder
- Run `npm run lint` to ensure no unused imports/variables
