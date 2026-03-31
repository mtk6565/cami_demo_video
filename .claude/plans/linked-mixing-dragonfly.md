# Plan: Brighten Purple Brand Color

## Context
The current primary purple `#362A82` (RGB 54,42,130) is too dark for an ads video. It needs to be more vibrant and eye-catching. This color is used extensively as the brand accent throughout the entire project.

## Color Change

| Role | Current | New |
|------|---------|-----|
| Primary purple | `#362A82` | `#7C3AED` (vibrant violet) |
| Gradient end | `#4a3a9e` | `#9333EA` |
| Gradient end (alt) | `#5B4CBF` | `#A855F7` |
| RGBA base | `rgba(54,42,130,...)` | `rgba(124,58,237,...)` (matching #7C3AED) |
| Light purple tint | `#E7D3FC` | `#EDE9FE` (lighter violet wash) |

`#7C3AED` is Tailwind's violet-600 — punchy, saturated, and great on both light and dark backgrounds. Much more ad-friendly than the current near-black indigo.

## Files to modify

1. **`src/components/GlowBackground.tsx`** — default color prop, rgba grid lines, lavender orb
2. **`src/components/PhoneMockup.tsx`** — header bg, mic button, border/shadow rgba
3. **`src/components/Headline.tsx`** — default accentColor prop
4. **`src/components/StepBadge.tsx`** — gradient bg, text color rgba
5. **`src/components/StepProgress.tsx`** — gradient, border rgba, text color
6. **`src/components/ChatBubble.tsx`** — "Powered by Cami" badge bg
7. **`src/components/QuickReplyButtons.tsx`** — border & text color
8. **`src/sequences/SceneHook.tsx`** — GlowBackground color, accentColor props, drop-shadow rgba
9. **`src/sequences/SceneBookingRequest.tsx`** — gradient background
10. **`src/sequences/SceneCamiReply.tsx`** — GlowBackground color
11. **`src/sequences/SceneSlotPick.tsx`** — text color
12. **`src/sequences/SceneConfirmation.tsx`** — bg/border rgba, text color
13. **`src/sequences/SceneDeposit.tsx`** — text color
14. **`src/sequences/SceneThankYou.tsx`** — text color
15. **`src/sequences/SceneRepeatInvite.tsx`** — GlowBackground, bg/border rgba, text color
16. **`src/sequences/SceneGroomingPics.tsx`** — GlowBackground color
17. **`src/sequences/SceneOutro.tsx`** — GlowBackground, gradient, text, drop-shadow, bg/border rgba

## Approach
Global find-and-replace for each color value:
- `#362A82` → `#7C3AED` (all occurrences)
- `#4a3a9e` → `#9333EA` (all occurrences)
- `#5B4CBF` → `#A855F7` (all occurrences)
- `rgba(54,42,130,` → `rgba(124,58,237,` (all occurrences)
- `rgba(54, 42, 130,` → `rgba(124, 58, 237,` (all occurrences with spaces)
- `#E7D3FC` → `#EDE9FE` (all occurrences)

## Verification
- `npm run dev` — preview in Remotion Studio to confirm the new purple looks vibrant
- `npm run lint` — ensure no TypeScript/lint errors
