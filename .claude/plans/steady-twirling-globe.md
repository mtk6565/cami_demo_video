# Plan: Add "Start" Scene Before Hook

## Context

The video currently opens with the Hook scene ("Meet Cami"). We need a new **Start** scene that introduces the problem — "Tired of juggling bookings?" — before Cami is introduced in the Hook. Assets already exist in `public/images/start/`.

## Changes

### 1. Create `src/sequences/SceneStart.tsx`

New component with:
- **Background**: Solid `#E8F5FC`
- **Text**: Display `Tired of juggling bookings_.png` as an `<Img>` with a spring fade-in + slight scale animation
- **Icons**: Three icons (`wa.png`, `ig.png`, `fb.png`) displayed below the text, all sliding up simultaneously from below while fading in (spring-based `translateY` + opacity)
- **Exit fade**: Standard 8-frame exit opacity interpolation (matches existing scenes)
- **Duration**: 4 seconds (120 frames)
- Animation sequence: text appears first (immediate spring), icons slide up together ~8-10 frames later

### 2. Update `src/CamiAd.tsx`

- Import `SceneStart`
- Add a new `<Series.Sequence durationInFrames={fps * 4}>` **before** the Hook sequence
- Wire up audio: `<Sequence from={AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/start.mp3")} /></Sequence>`

### 3. Update `src/Video.tsx`

- Increase `durationInFrames` from `1365` to `1485` (add 120 frames = 4 seconds) across all three compositions

### 4. Update timeline comment in `CamiAd.tsx`

- Shift all scene timestamps by +4 seconds
- Add "Scene 0: START (0–4s)" entry

## Files to Modify

- **Create**: `src/sequences/SceneStart.tsx`
- **Edit**: `src/CamiAd.tsx` (import, series entry, timeline comment)
- **Edit**: `src/Video.tsx` (durationInFrames: 1365 → 1485)

## Audio Note

`audio/generate.ts` already has the `start` section defined (line 5-9, max 3s). The user needs to run `source .env.local && npm run generate-audio start` to generate `public/audio/start.mp3` before the audio will play.

## Verification

1. `npm run dev` — open Remotion Studio
2. Confirm Start scene renders at frames 0–120 with light blue bg, PNG text, and three icons sliding up
3. Confirm Hook scene follows at frame 120
4. Confirm total duration is 49.5s (1485 frames)
5. Run `npm run lint` to verify no type errors
