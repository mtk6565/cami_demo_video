# Update Scene 3 (SceneCamiReply)

## Context
The user wants to update the 3rd frame (SceneCamiReply) with new WhatsApp bubble text and a new right-hand side label. Currently the scene shows a user message + two bot replies + a StepProgress sidebar with an "INSTANT" badge. The update changes the content and replaces the right-side element.

## Changes — `src/sequences/SceneCamiReply.tsx`

### 1. Update WhatsApp chat bubbles
- **Remove** the existing user bubble ("Hey, can I book Max in for a groom? 🐕")
- **First bot bubble**: `"Hey Max, hope you and Yumi are doing well!\nOf course! 👋 Here's what's open this week:"`
- **Second bot bubble**: `"📅 Tue 10 AM  |  Wed 2 PM  |  Thu 11:30 AM  |  Sat 9 AM\n\nJust pick one 👆"`

### 2. Replace right-hand side content
- **Remove** `StepProgress` component and the "INSTANT" badge
- **Replace with** a large animated text: **"CAMI REPLIES INSTANTLY ⚡"**
- Style it similarly to the existing badge aesthetic (purple gradient, bold, uppercase) but as a prominent standalone label
- Use a spring entrance animation consistent with the scene

### Verification
- Run `npm run dev` to open Remotion Studio
- Navigate to frame 3 (SceneCamiReply scene, ~8s mark)
- Confirm two bot bubbles with correct text, no user bubble
- Confirm right-side shows "CAMI REPLIES INSTANTLY ⚡" with entrance animation
