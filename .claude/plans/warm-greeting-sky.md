# Plan: Update Phase 3 VO text

## Context
Add "No back and forth." back into Phase 3 voiceover alongside the pet memory line.

## Change
- `audio/generate.ts` line 27: Update phase3 text to "They pick a time. No back and forth. And don't worry — Cami remembers everything about their pet."
- `audio/artifacts/script/voiceover.md`: Update Phase 3 script line to match

## Verification
- `source .env.local && npm run generate-audio phase3` — confirm fits within 5s max
