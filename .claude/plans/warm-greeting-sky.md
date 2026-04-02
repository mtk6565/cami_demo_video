# Plan: Increase Phase 5 to 4.5s

## Context
Phase 5 audio is 4.17s, exceeding the 4s max. Bump to 4.5s (+0.5s / +15 frames).

## Changes

### 1. `audio/generate.ts`
- Phase 5: `maxSeconds: 4` → `4.5`
- Shift downstream: phase6 28→28.5, phase7 30.5→31, phase8 33.5→34, outro 37.5→38

### 2. `src/sequences/SceneWhatsAppFlow.tsx`
Current phase 5: `start: 540, end: 659`. New end: 674 (+15).
- Phase 5: end 659→674
- Phase 6: 660,734 → 675,749
- Phase 7: 735,824 → 750,839
- Phase 8: 825,944 → 840,959
- Update comment

### 3. `src/CamiAd.tsx`
- Flow duration: 945→960
- Audio offsets: phase6 660→675, phase7 735→750, phase8 825→840
- Update comment

### 4. `src/Video.tsx`
- All compositions: 1245→1260 (42s)

## Verification
- `source .env.local && npm run generate-audio phase5`
- `npm run dev` to preview
