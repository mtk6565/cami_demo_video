# Programmatic ElevenLabs v3 Audio Generation

## Context

The voiceover script for the Cami AI video ad (47s) runs ~60s at natural speaking speed. We need to generate a **single audio file** programmatically via the ElevenLabs API with pacing controls to fit the 47s timeline. No stitching separate clips.

## Approach

### 1. Trim the script (~140 words target)

At `speed: 1.15`, ~140 words produces roughly 47s of audio. The current script is ~170 words. We'll cut filler while keeping the message intact and use v3 audio tags for pacing.

**Trimmed script with v3 audio tags:**

```
You know the drill. Clients on WhatsApp, Instagram, phone — all at once. [pause] What if you never had to juggle that again?

A client messages on WhatsApp. Cami picks it up instantly.

She greets them by name, checks your calendar, and offers open slots — in seconds.

They pick a time. No back and forth. No phone tag. [pause]

Deposit? Collected right in the chat. Slot locked. Done.

Twenty-four hours before, Cami sends a reminder automatically. No more no-shows.

During the visit, share photos — they love seeing their pet pampered.

After the groom, Cami follows up. Rating, review — all hands-free.

[pause] A month later? Cami brings them back with a personal offer. Rebooking, on autopilot.

[deliberate] Cami. Your entire pet business — automated, on WhatsApp.
```

~138 words + audio tags for natural pacing.

### 2. Create generation script: `audio/generate.ts`

A Node.js/TypeScript script that:
1. Reads the trimmed script text
2. Calls ElevenLabs TTS **with-timestamps** endpoint (single call, one audio file)
3. Uses `speed: 1.15` to compress ~140 words into ~47s
4. Saves the MP3 to `audio/output/voiceover.mp3`
5. Saves timestamp alignment data to `audio/output/timestamps.json` (for verifying sync with video phases)
6. Logs the total audio duration so we can iterate on speed if needed

**API details:**
- Endpoint: `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps`
- Package: `@elevenlabs/elevenlabs-js` (v2.41.0) — OR raw `fetch` (simpler, no extra dep)
- Model: `eleven_multilingual_v2` (supports SSML breaks) OR user's preferred v3 model
- Env vars: `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`

**Using raw fetch** to avoid adding a dependency — the API is a single POST call.

### 3. File structure

```
audio/
├── script/
│   ├── voiceover.md          # (exists) Full annotated script with notes
│   └── elevenlabs-paste.txt  # (exists) Previous plain text version
├── output/
│   ├── voiceover.mp3         # Generated audio file
│   └── timestamps.json       # Character-level timing data
└── generate.ts               # Generation script
```

### 4. Add npm script

In `package.json`, add:
```json
"generate-audio": "npx tsx audio/generate.ts"
```

Requires `tsx` (already available via npx, no install needed).

## Files to create/modify

| File | Action |
|------|--------|
| `audio/generate.ts` | **Create** — ElevenLabs API call script |
| `audio/script/elevenlabs-paste.txt` | **Update** — trimmed script with v3 audio tags |
| `package.json` | **Edit** — add `generate-audio` script |
| `.env.local` | **Create** — `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` placeholders |
| `.gitignore` | **Edit** — add `.env.local` and `audio/output/` |

## Verification

1. Run `npm run generate-audio` 
2. Check logged duration — should be ~45-49s
3. If too long: bump `speed` to `1.2`. If too short: drop to `1.1`
4. Play `audio/output/voiceover.mp3` and compare against video timeline
5. Check `timestamps.json` to verify pacing aligns with phase boundaries
