# Plan: Update Frame 6 (Reminder Scene) — Add 24hr context + reschedule option

## Context
Frame 6 (`SceneConfirmation`) currently shows a single reminder message from Cami. The user wants two improvements:
1. Make it clear this is a **24-hour advance reminder**
2. Let the customer know they can **change/reschedule** if needed

## Changes

### File: `src/sequences/SceneConfirmation.tsx`

Update the existing ChatBubble message and add a second ChatBubble for the reschedule option:

1. **First bubble** — Update message to explicitly mention "24 hours" context:
   - Change: `"Quick heads up, Max is in tomorrow at 2 PM! Can't wait to see him 🐶"`
   - To something like: `"⏰ 24-hour reminder: Max's grooming appointment is tomorrow at 2 PM! Can't wait to see him 🐶"`

2. **Second bubble** — Add a follow-up from Cami offering to reschedule:
   - Message like: `"Need to change anything? Just reply here and I'll help you reschedule 📅"`
   - Sender: `"bot"`, delayed slightly after the first bubble (e.g. `delay={30}`)
   - `showTail={false}` since it's consecutive from the same sender

No component changes needed — `ChatBubble` already supports all required props (`showTail`, `delay`, `emoji`).

## Verification
- Run `npm run dev` to open Remotion Studio
- Scrub to ~24s (frame 720) to preview Scene 6
- Confirm both bubbles animate in sequentially and read clearly
