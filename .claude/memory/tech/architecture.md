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

Defined in `Video.tsx` — portrait (1080×1920), landscape (1920×1080), and WhatsApp (960×1080), all 1365 frames at 30fps (45.5 seconds).

`CamiAd.tsx` sequences 3 scenes: Hook (6s) → WhatsAppFlow (35.5s) → Outro (4s).

`SceneWhatsAppFlow.tsx` is a single unified component with 8 phases — the phone frame, background, and step progress render once and persist across all phases. Only chat content crossfades between phases.

## Scene Timeline

```
Total: 45.5s (1365 frames @ 30fps)

Hook               0–6s       "Meet Cami"
WhatsApp Flow      6–41.5s    8-phase persistent conversation:
  1. Booking Request   6–9.5s
  2. Cami Reply        9.5–14.5s
  3. Slot Pick         14.5–20.5s
  4. Deposit           20.5–24s
  5. Confirmation      24–28.5s    (context badge: "24h before")
  6. Grooming Pics     28.5–31s
  7. Thank You         31–36.5s
  8. Repeat Invite     36.5–41.5s  (context badge: "1 month later")
Outro              41.5–45.5s  Cami CTA
```

## Key Config

- `remotion.config.ts` — Video format (jpeg), overwrite output enabled, Tailwind webpack override
- Output directory `out/` is gitignored
- `.prettierrc` — 2-space indent, bracket spacing, no tabs
- `.env.local` — ElevenLabs credentials (gitignored, must have `export` prefix for `source` to work)

- **2026-04-02:** Hook scene redesigned: flat #E8F5FC background (matching SceneStart), PNG badges with animated underline highlight (scale pop + purple bar synced with voiceover), logo scale pulse at "Meet Cami". Subheading removed — voiceover covers the message. SceneStart added as a 4s opening scene before hook. Hook duration is `fps * 6 + 6` (6.2s).
