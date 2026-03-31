# Per-Section Audio Generation + Remotion Integration

## Context

A single ElevenLabs generation can't fit the 47s timeline — it either runs too long or sounds rushed. Splitting into separate clips per section gives exact control: each clip starts at the right frame in Remotion, and silent phases (3, 6, 7) simply have no clip.

## Approach

### 1. Rewrite `audio/generate.ts` — generate 7 separate clips

Define sections as a typed array with `id`, `text`, and `startSeconds`:

```
hook       (0s)   "You know the drill. Clients on WhatsApp, Instagram, phone — all at once. What if you never had to juggle that again?"
phase1     (4s)   "A client messages on WhatsApp. Cami picks it up instantly."
phase2     (8s)   "Greets them by name, checks your calendar, offers open slots — in seconds."
phase4     (18s)  "Deposit? Collected right in the chat. Slot locked. Done."
phase5     (23s)  "Twenty-four hours before, Cami sends a reminder. No more no-shows."
phase8     (38s)  "A month later? Cami brings them back. Rebooking, on autopilot."
outro      (43s)  "Cami. Your entire pet business — automated, on WhatsApp."
```

Phases 3, 6, 7 — no audio (visual-only).

Loop through sections, call ElevenLabs API for each, save as `audio/output/{id}.mp3`. Log each clip's duration to verify it fits within its time window.

### 2. Copy clips to `public/audio/`

The script copies each generated MP3 to `public/audio/{id}.mp3` so Remotion can serve them via `staticFile()`.

### 3. Update `CamiAd.tsx` — multiple `<Audio>` with frame offsets

Replace the single `<Audio>` with one per section using Remotion's `<Sequence>` for timing:

```tsx
<Sequence from={0 * fps}><Audio src={staticFile("audio/hook.mp3")} /></Sequence>
<Sequence from={4 * fps}><Audio src={staticFile("audio/phase1.mp3")} /></Sequence>
<Sequence from={8 * fps}><Audio src={staticFile("audio/phase2.mp3")} /></Sequence>
<Sequence from={18 * fps}><Audio src={staticFile("audio/phase4.mp3")} /></Sequence>
<Sequence from={23 * fps}><Audio src={staticFile("audio/phase5.mp3")} /></Sequence>
<Sequence from={38 * fps}><Audio src={staticFile("audio/phase8.mp3")} /></Sequence>
<Sequence from={43 * fps}><Audio src={staticFile("audio/outro.mp3")} /></Sequence>
```

## Cleanup

Move old single-file artifacts to `audio/artifacts/`:
- `audio/output/voiceover.mp3` → `audio/artifacts/voiceover.mp3`
- `audio/output/timestamps.json` → `audio/artifacts/timestamps.json`
- `audio/script/elevenlabs-paste.txt` → `audio/artifacts/elevenlabs-paste.txt`
- `public/voiceover.mp3` → `audio/artifacts/voiceover-public.mp3`

Keep in place:
- `audio/script/voiceover.md` — still useful as the full annotated reference script

## Files to modify

| File | Action |
|------|--------|
| `audio/generate.ts` | **Rewrite** — loop generating 7 clips + copy to public/audio/ |
| `src/CamiAd.tsx` | **Edit** — replace single `<Audio>` with 7 `<Sequence>`+`<Audio>` |
| `public/audio/` | **Created by script** — 7 MP3 files |
| `audio/artifacts/` | **Create** — move old files here |

## Verification

1. `source .env.local && npm run generate-audio` — generates 7 clips, logs durations
2. Check each clip fits its time window (e.g., hook < 4s, phase1 < 4s, outro < 4s)
3. `npm run dev` — preview in Remotion Studio, verify audio aligns with visuals
4. Silence during phases 3, 6, 7 — visuals breathe
