# Plan: Add per-phase audio generation

## Context
Currently `npm run generate-audio` always generates all 10 audio clips via ElevenLabs. When iterating on a single phase's text, this wastes API calls and time. Adding a CLI filter lets you regenerate just one phase.

## Changes

### `audio/generate.ts`
- Parse `process.argv` for an optional phase ID argument (e.g., `phase3`, `hook`, `outro`)
- If provided, validate it against the known section IDs and filter `SECTIONS` to just that one
- If no argument provided, generate **all** clips (existing behavior, unchanged)
- If invalid ID provided, print available IDs and exit
- Update the log line to reflect how many clips are being generated

No other files need changes. The npm script `generate-audio` already runs `npx tsx audio/generate.ts`, so extra args pass through naturally:
```
source .env.local && npm run generate-audio -- phase3
```

## Verification
- `source .env.local && npm run generate-audio -- phase3` — generates only phase3.mp3
- `source .env.local && npm run generate-audio -- invalid` — prints error with valid IDs
- `source .env.local && npm run generate-audio` — generates all clips (unchanged behavior)
