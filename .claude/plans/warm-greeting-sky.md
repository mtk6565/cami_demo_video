# Plan: Update Phase 7 VO text + increase to 5s

## Context
Phase 7 getting new VO: "After every visit, Cami follows up — collects a review and invites them to rebook. All hands-free." (~17 words, needs ~4.5s). Bump phase 7 from 3s to 5s (+2s / +60 frames).

## Changes

### 1. `audio/generate.ts`
- Phase 7: `maxSeconds: 3` → `5`, update text
- Shift downstream: phase8 34→36, outro 38→40

### 2. `src/sequences/SceneWhatsAppFlow.tsx`
Phase 7 currently: `start: 750, end: 839` (3s). New end: 899 (+60).
- Phase 7: end 839→899
- Phase 8: 840,959 → 900,1019
- Update comment

### 3. `src/CamiAd.tsx`
- Flow duration: 960→1020
- Audio offset: phase8 840→900
- Update comment (total 44s)

### 4. `src/Video.tsx`
- All compositions: 1260→1320 (44s)

## Verification
- `source .env.local && npm run generate-audio phase7`
- `npm run dev` to preview
