# Plan: Add bella_after.jpg to Scene 8 (SceneThankYou)

## Context

Scene 7 (SceneGroomingPics) already shows a mid-grooming "sneak peek" photo (`bella.jpg`) inside the WhatsApp chat. Scene 8 (SceneThankYou) has the bot saying "Max is all done! 🎉 He looks incredible." but currently has **no photo** — just the text message, a star rating card, and rebook/review buttons.

## Best Spot

**Insert the `bella_after.jpg` as a WhatsApp-style image attachment right after the "Max is all done!" chat bubble**, before the rating card. This mirrors the pattern already used in Scene 7 and feels natural — a groomer would send a finished photo along with the "all done" message.

## Changes

**File:** `src/sequences/SceneThankYou.tsx`

1. Add `Img`, `staticFile`, and `spring` imports from `remotion` (Img and staticFile are missing)
2. Add an image entrance animation (spring-based, same pattern as SceneGroomingPics — delay ~20 frames after the chat bubble)
3. Insert the `<Img src={staticFile("images/bella_after.jpg")} />` block between the ChatBubble and the rating card, wrapped in a container with scale/opacity animation
4. Size: ~260×260 with rounded corners, matching Scene 7's styling for visual consistency

## Verification

- Run `npm run dev` and scrub to Scene 8 (frame ~1020, around 34s mark)
- Confirm the groomed dog photo appears after the chat bubble with a smooth spring animation
- Confirm the rating card and buttons still appear below the photo
- Check nothing overflows the phone mockup
