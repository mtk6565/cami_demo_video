# Architecture & Timeline

## File Structure

```
src/
├── index.ts              # Remotion entry point (registerRoot)
├── Video.tsx             # Composition definitions — source of truth for ids, dimensions, fps, duration
├── CamiAd.tsx            # Main composition — sequences Hook, WhatsAppFlow, Outro + audio
├── fonts.ts              # Font loading — DM Sans (body) + SeasonMix (headline)
├── components/           # UI primitives (GlowBackground, ChatBubble, PhoneMockup, Headline, StepBadge, StepProgress, QuickReplyButtons)
└── sequences/
    ├── SceneHook.tsx         # Opening hook headline with social icons
    ├── SceneWhatsAppFlow.tsx # Unified WhatsApp conversation (8 phases, persistent phone frame)
    ├── SceneOutro.tsx        # Closing CTA and branding
    └── Scene*.tsx            # Legacy individual scenes (unused)

audio/
├── generate.ts           # ElevenLabs TTS generation — produces per-section MP3 clips
├── output/               # Generated MP3 clips (gitignored)
└── script/voiceover.md   # Full annotated voiceover script with delivery notes

public/
├── audio/                # MP3 clips copied here by generate.ts for Remotion's staticFile()
├── fonts/                # DM Sans (variable ttf) + SeasonMix (woff2 per weight)
└── images/               # In-scene images (bella.jpg, bella_after.jpg)
```

## Compositions

Defined in `Video.tsx` — portrait (1080×1920), landscape (1920×1080), and WhatsApp (960×1080), all 1095 frames at 30fps (36.5 seconds).

`CamiAd.tsx` sequences 3 scenes: Hook (5s) → WhatsAppFlow (27.5s) → Outro (4s).

`SceneWhatsAppFlow.tsx` is a single unified component with 8 phases — the phone frame, background, and step progress render once and persist across all phases. Only chat content crossfades between phases.

## Scene Timeline

```
Total: 36.5s (1095 frames @ 30fps)

Hook               0–5s       "Introducing Cami"
WhatsApp Flow      5–32.5s    8-phase persistent conversation:
  1. Booking Request   5–8.5s
  2. Cami Reply        8.5–12.5s
  3. Slot Pick         12.5–15.5s
  4. Deposit           15.5–19s
  5. Confirmation      19–23s      (context badge: "24h before")
  6. Grooming Pics     23–25.5s
  7. Thank You         25.5–28.5s
  8. Repeat Invite     28.5–32.5s  (context badge: "1 month later")
Outro              32.5–36.5s  Cami CTA
```

## Key Config

- `remotion.config.ts` — Video format (jpeg), overwrite output enabled, Tailwind webpack override
- Output directory `out/` is gitignored
- `.prettierrc` — 2-space indent, bracket spacing, no tabs
- `.env.local` — ElevenLabs credentials (gitignored, must have `export` prefix for `source` to work)
