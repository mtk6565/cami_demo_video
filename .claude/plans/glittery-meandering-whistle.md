# Plan: Enhance Typing Indicator with "Cami AI is typing" Label

## Context
In Scene 2 (SceneBookingRequest), after the user sends "Hey, can I book Max in for a groom?", a bot typing bubble appears with just three bouncing gray dots. The user wants this to visually indicate that **Cami AI** is typing, and for it to look polished.

## Approach
Enhance the typing indicator area in `SceneBookingRequest.tsx` by adding a small "Cami AI is typing" label that appears just above the typing bubble. This mirrors how WhatsApp and other messengers show "Contact is typing..." as a status line above the chat bubble. The label will fade in with a slight delay before the typing dots appear.

### Changes

**File: `src/sequences/SceneBookingRequest.tsx`**
- Add a small animated label just above the bot typing bubble that reads **"Cami AI is typing..."**
- Style: small text (~14px), color `#667781` (matching WhatsApp secondary text), with a subtle fade-in animation
- Include a small ✨ or 🤖 sparkle/icon to hint at AI — or a small purple dot matching the Cami brand color `#362A82`
- The label appears at the same delay as the typing bubble (frame 40), fading in smoothly

**File: `src/components/ChatBubble.tsx`**
- Enhance the `TypingIndicator` to use the Cami brand purple (`#362A82`) for the bouncing dots instead of plain gray, giving it a branded AI feel
- Add a subtle opacity pulse to the dots for a more polished look

## Verification
- Run `npm run dev` to open Remotion Studio
- Scrub to Scene 2 (~4-7 seconds / frames 120-210)
- Verify the "Cami AI is typing..." label appears above the typing bubble with a smooth fade-in
- Verify the typing dots use the brand purple color and animate smoothly
