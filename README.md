# Cami WhatsApp Ad

Animated promotional video for **Cami AI** — a product that plugs into a pet business's WhatsApp to automate bookings, payments, reminders, and client retention. The ad showcases the experience from a pet business client's perspective, demonstrating the full booking lifecycle in a 47-second WhatsApp conversation.

Built with [Remotion](https://remotion.dev) 4, React 19, TypeScript, and Tailwind CSS v4.

## What It Does

The video walks through a complete WhatsApp conversation between a pet owner and a pet business powered by Cami AI. It demonstrates the full booking lifecycle across 3 scenes:

| Scene | Time | Description |
|-------|------|-------------|
| Hook | 0–4s | "Tired of juggling bookings?" |
| WhatsApp Flow | 4–43s | Unified persistent WhatsApp conversation (8 phases) |
| Outro | 43–47s | Cami CTA |

The WhatsApp Flow scene contains 8 phases that crossfade within a persistent phone frame:

| Phase | Time | Description |
|-------|------|-------------|
| Booking Request | 4–8s | Client sends a WhatsApp message |
| Cami Reply | 8–13s | AI replies instantly with available slots |
| Slot Pick | 13–18s | Client picks a time + pays deposit |
| Deposit | 18–23s | Payment confirmed, slot locked |
| Confirmation | 23–28s | Auto-confirm + 24h reminder |
| Grooming Pics | 28–33s | In-store progress photos |
| Thank You | 33–38s | Thanks + rebook/rate prompt |
| Repeat Invite | 38–43s | 1-month recurring invite |

## Output Formats

Two compositions are defined:

- **Portrait** (`CamiWhatsAppAd`) — 1080x1920 @ 30fps, optimized for WhatsApp/Instagram Stories
- **Landscape** (`CamiWhatsAppAd-Landscape`) — 1920x1080 @ 30fps, optimized for YouTube/web

Both are 47 seconds (1410 frames).

## Project Structure

```
src/
├── index.ts              # Remotion entry point (registerRoot)
├── Root.tsx              # Composition definitions (ids, dimensions, fps, duration)
├── Video.tsx             # Re-exports RemotionRoot
├── CamiAd.tsx            # Main composition — sequences 3 scenes: Hook, WhatsAppFlow, Outro
├── fonts.ts              # Font loading configuration
├── components/           # Reusable UI primitives
│   ├── ChatBubble.tsx    # WhatsApp-style message bubble
│   ├── GlowBackground.tsx# Animated gradient background
│   ├── Headline.tsx      # Animated text headlines
│   ├── PhoneMockup.tsx   # Phone frame overlay
│   ├── QuickReplyButtons.tsx # WhatsApp quick reply buttons
│   ├── StepBadge.tsx     # Step indicator badge
│   └── StepProgress.tsx  # Step progress tracker (persistent across phases)
└── sequences/
    ├── SceneHook.tsx         # Opening hook headline with social icons
    ├── SceneWhatsAppFlow.tsx # Unified WhatsApp conversation (8 phases, persistent phone frame)
    └── SceneOutro.tsx        # Closing CTA and branding
```

`SceneWhatsAppFlow.tsx` is a single unified component — the phone frame, background, and step progress render once and persist across all 8 phases. Only chat content crossfades between phases.

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Open Remotion Studio (live preview + editing)
npm run dev
```

Remotion Studio opens in the browser where you can scrub through the timeline, preview animations, and adjust props in real time.

## Rendering

```bash
# Render portrait video (1080x1920)
npx remotion render CamiWhatsAppAd out/video.mp4

# Render landscape video (1920x1080)
npx remotion render CamiWhatsAppAd-Landscape out/video-landscape.mp4
```
/Users/mtk/Desktop/Code/demo_video/out/CamiWhatsAppAd-WhatsApp.mp4
Output files go to `out/` (gitignored).


https://github.com/user-attachments/assets/74a1f37f-6270-4056-abd4-867b7d8a6549


## Tech Stack

- **[Remotion](https://remotion.dev)** 4.0 — Programmatic video creation with React
- **React** 19 — Component-based scene composition
- **TypeScript** — Strict mode enabled
- **Tailwind CSS** v4 — Styling via `@remotion/tailwind-v4`

## Configuration

- `remotion.config.ts` — Sets JPEG image format, enables output overwrite, and wires up Tailwind CSS v4
- `tsconfig.json` — Strict TypeScript with JSX support
- `eslint.config.mjs` — Remotion's flat ESLint config

## License

UNLICENSED — Private project.
