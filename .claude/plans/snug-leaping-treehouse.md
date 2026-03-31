# Update SceneHook: New headline + social media icons

## Context
The first frame of the Cami WhatsApp ad needs to better hook the target audience (receptionists/salon staff) with a pain-point headline and include official social media icons (Instagram, WhatsApp, Facebook) to visually reinforce the multi-platform booking problem.

## Changes

### 1. Add social media icon SVGs to SceneHook (`src/sequences/SceneHook.tsx`)

Add inline SVG components for the three official icons:
- **Instagram** — official gradient logo mark
- **WhatsApp** — official green logo mark  
- **Facebook** — official blue logo mark

These will be defined as small functional components or inline SVGs within SceneHook (no new files needed — consistent with the project's pattern of inline SVGs in PhoneMockup.tsx and ChatBubble.tsx).

### 2. Replace the 💬 emoji with a row of 3 social icons

**Remove:** The current `💬` emoji div (lines 45-54)

**Add:** A horizontal row of IG, WA, FB icons above the headline:
- Each icon ~56-64px, spaced evenly in a flex row with ~24px gap
- Each icon gets a staggered spring entrance animation (similar to current `iconEntrance`, but offset by ~4 frames per icon)
- Subtle pulse animation on each icon (reuse existing `pulse` logic)
- Drop shadow matching current style (`rgba(54,42,130,0.4)`)

### 3. Update headline text

**Primary headline** (line 57-63):
- `text`: `"Still chasing bookings manually?"` → `"Tired of juggling bookings across WhatsApp, Instagram & phone?"`
- `fontSize`: `44` → `38` (slightly smaller to fit the longer text)
- `accentWords`: `["manually?"]` → `["WhatsApp,", "Instagram", "phone?"]` (highlight the channel names)

**Sub-headline** (line 66-73):
- `text`: `"Your clients want WhatsApp."` → `"Let Cami handle it."`
- `accentWords`: `["WhatsApp."]` → `["Cami"]`
- `fontSize`: `28` → `30` (slightly larger for confidence/CTA feel)

### 4. Accent word matching fix

The Headline component's accent matching strips non-alpha chars (`/[^a-z]/g`), so `"WhatsApp,"` in accentWords will match `"WhatsApp,"` in text after stripping the comma. This already works correctly.

## Files to modify
- `src/sequences/SceneHook.tsx` — all changes in this single file

## Verification
1. Run `npm run dev` to open Remotion Studio
2. Verify the first scene (0-4s) shows:
   - Three social icons (IG, WA, FB) in a row, animating in with staggered springs
   - New headline text with channel names highlighted in accent color
   - "Let Cami handle it." sub-headline with "Cami" highlighted
3. Run `npm run lint` to ensure no TypeScript/ESLint errors
