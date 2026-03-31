# Plan: Update Frame 7 (SceneGroomingPics)

## Context

Frame 7 (`SceneGroomingPics`) currently shows emoji icons (🛁, ✂️, 🐕‍🦺) as photo placeholders and a second chat bubble saying "Nearly done, looking fresh ✨". The user wants to replace the emojis with the actual dog image (`bella.jpg`) and remove the second chat bubble. They also want the step label updated.

## Changes

### 1. Update step label in `src/components/StepProgress.tsx`
- **Line 10**: Change `{ step: 6, label: "Live Updates" }` → `{ step: 6, label: "Live Session Updates" }`

### 2. Modify `src/sequences/SceneGroomingPics.tsx`
- **Remove** the `photoCards` emoji array (line 20) and the entire photo grid `<div>` block (lines 47–86) that renders the three emoji cards
- **Remove** the second `<ChatBubble>` with "Nearly done, looking fresh ✨" (lines 88–92)
- **Replace** with a single `<Img>` from `remotion` (or a styled `<img>` with `staticFile`) showing `public/images/bella.jpg`, animated with a spring entrance similar to the existing card animation

## Verification
- Run `npm run dev` to open Remotion Studio
- Scrub to frame 7 (~29s mark) and confirm:
  - The image `bella.jpg` appears instead of emoji cards
  - The "Nearly done, looking fresh" bubble is gone
  - The step progress shows "Live Session Updates"
- Run `npm run lint` to ensure no TS/ESLint errors
