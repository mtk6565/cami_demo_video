# Plan: Update SceneOutro with new copy

## Context
The user wants to update the final frame (outro scene) of the Cami WhatsApp ad video with new promotional copy that better highlights the product's features.

## File to modify
- `src/sequences/SceneOutro.tsx`

## Changes

Update the text content in `SceneOutro.tsx` to match the requested copy:

1. **Tagline** (Headline component): Change from `"Your entire pet business. On WhatsApp."` to two lines:
   - `"Your entire pet business."`
   - `"Automated. On WhatsApp."`

2. **Feature pills**: Update with emoji prefixes to match the requested format:
   - `"📅 AI Bookings"` (was "AI Booking")
   - `"💳 Auto Payments"` (unchanged concept)
   - `"🔔 Smart Reminders"` (unchanged concept)
   - `"🔄 Client Retention"` (unchanged concept)

3. **CTA button**: Change text from `"Get Started Free →"` to `"Get Started today at cami.io"`

4. **Sub-CTA text**: Add `"Start today."` line above the CTA button, and change the URL below from `"cami.app"` to `"cami.io"`

## Approach
- Keep the existing animation structure (logo spring, CTA spring, feature pills spring)
- Use two `<Headline>` components for the two-line tagline, or a single one with a line break approach
- Since `Headline` splits on spaces and animates word-by-word, using two separate `<Headline>` calls with staggered delays will look cleanest for the two-line tagline
- Accent words: `"Automated."` and `"WhatsApp."` highlighted

## Verification
- Run `npm run dev` to open Remotion Studio
- Scrub to the outro scene (frames 1320–1410, ~44–47s) and verify the new copy renders correctly
- Check that animations still work smoothly
- Run `npm run lint` to verify no TypeScript/ESLint errors
