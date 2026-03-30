# Plan: Simplify Confirmation Scene to Reminder Only

## Context
The current "Confirm + remind" scene (SceneConfirmation) shows two messages: a booking confirmation, a "24 HOURS BEFORE" time skip divider, then a reminder message. The user wants to simplify this to just show the reminder message and rename the step label to "Confirmation".

## Changes

### 1. `src/sequences/SceneConfirmation.tsx`
- **Remove** the first ChatBubble (booking confirmation message at line 42-46)
- **Remove** the time skip divider block (lines 48-85)
- **Remove** the `timeSkipDelay`/`timeSkipFrame`/`timeSkip` spring variables (lines 19-22) since they're no longer needed
- **Keep** only the reminder ChatBubble ("Quick heads up, Max is in tomorrow at 2 PM!...") — adjust its `delay` from 55 to 5 so it appears promptly

### 2. `src/components/StepProgress.tsx`
- Change step 5 label from `"Confirm + Remind"` to `"Confirmation"` (line 9)

## Verification
- Run `npm run dev` to open Remotion Studio
- Navigate to the confirmation scene and verify only the reminder bubble appears
- Check the step progress indicator shows "Confirmation"
- Run `npm run lint` to ensure no unused imports/variables
