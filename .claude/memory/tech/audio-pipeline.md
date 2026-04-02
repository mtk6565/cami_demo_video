# Audio / Voiceover Pipeline

## Generation

- Voiceover is generated via **ElevenLabs API** (`audio/generate.ts`), producing one MP3 per section.
- Each section is a separate API call — no stitching.
- Env vars required: `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID` (in `.env.local` with `export` prefix so `source` works).
- Optional: `ELEVENLABS_SPEED` (default 1.0), `ELEVENLABS_MODEL_ID` (default `eleven_multilingual_v2`).
- Voice settings in `generate.ts`: `stability: 0.45`, `similarity_boost: 0.75`, `style: 0.65` (expressive/upbeat).

## Audio Placement in Remotion

- Each `<Audio>` is embedded **inside** its corresponding `<Series.Sequence>` in `CamiAd.tsx`, wrapped in `<Sequence from={phaseStart + AUDIO_DELAY} layout="none">`. This ensures the delay is relative to the scene/phase start.
- `AUDIO_DELAY` constant (6 frames / 0.2s) is defined at the top of `CamiAd.tsx` — controls the gap between visual appearing and audio starting. Tune this single value to adjust all clips.
- Phase durations are sized to **audio duration + ~0.5s buffer** — keep phases tight to avoid dead air.

## Session Updates

- **2026-04-02:** Full voiceover script rewrite for all 10 sections. Several phases expanded to fit new longer scripts (hook 5→6s, phase2 4→5s, phase3 3→6s, phase5 4→4.5s, phase7 3→5.5s, phase8 4→5s). When adjusting phase durations, 4 files must stay in sync: `generate.ts` (maxSeconds + startSeconds), `SceneWhatsAppFlow.tsx` (PHASES array frame boundaries), `CamiAd.tsx` (flow durationInFrames + audio Sequence from offsets + timeline comment), `Video.tsx` (composition durationInFrames). Each +1s = +30 frames ripple to all downstream phases.
