# Plan: Increase Hook Duration from 5s to 6s

## Context
The new hook voiceover text ("Meet Cami — the AI Pet Operating system that automates your bookings, reminders and payments seamlessly.") is 5.71s, exceeding the current 5s max. We need to add 1 second (30 frames) to the hook.

## Changes

### 1. `audio/generate.ts` — Hook maxSeconds
- Change `maxSeconds: 5` → `maxSeconds: 6` for the hook section
- Shift all subsequent `startSeconds` by +1 (phase1: 5→6, phase2: 8.5→9.5, etc.)
- Update outro startSeconds: 32.5→33.5

### 2. `src/Video.tsx` — Total duration
- Change `durationInFrames: 1095` → `1125` on all 3 compositions (36.5s → 37.5s)

### 3. `src/CamiAd.tsx` — Hook scene duration + timeline comment
- Change hook `durationInFrames={fps * 5}` → `fps * 6`
- Update the timeline comment block to reflect new timings (Hook 0–6s, WhatsApp 6–33.5s, Outro 33.5–37.5s)

### 4. `src/sequences/SceneWhatsAppFlow.tsx` — Check if phase timings are relative
- Phase timings inside WhatsAppFlow are relative to the flow start, so they should NOT change. Verify this.

### 5. `audio/script/voiceover.md` — Update hook text and all timestamps
- Update hook text and shift all timestamps by +1s

## Verification
- Run `source .env.local && npm run generate-audio hook` to regenerate just the hook clip
- Confirm it reports within the new 6s max
- Run `npm run dev` to preview in Remotion Studio — verify hook timing and that all subsequent scenes still align
