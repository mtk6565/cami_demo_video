# Petverse WhatsApp Ad

Animated promotional video for **Petverse**, a pet services platform. The ad showcases an AI-powered WhatsApp booking flow — from a client's first message through appointment confirmation, grooming updates, and rebooking.

Built with [Remotion](https://remotion.dev) 4, React 19, TypeScript, and Tailwind CSS v4.

## What It Does

The video walks through a complete WhatsApp conversation between a pet owner and Petverse's AI assistant "Cami". It demonstrates the full booking lifecycle in 30 seconds:

| Scene | Time | Description |
|-------|------|-------------|
| Hook | 0–3s | "Still chasing bookings manually?" |
| Booking Request | 3–6s | Client sends a WhatsApp message |
| Cami Reply | 6–9.5s | AI replies instantly with available slots |
| Slot Pick | 9.5–13s | Client picks a time + pet profile |
| Deposit | 13–16s | Payment inside WhatsApp |
| Confirmation | 16–19s | Auto-confirm + 24h reminder |
| Grooming Pics | 19–22s | In-store progress photos |
| Thank You | 22–25s | Thanks + rebook/rate prompt |
| Repeat Invite | 25–27.5s | 1-month recurring invite |
| Outro | 27.5–30s | Petverse CTA |

## Output Formats

Two compositions are defined:

- **Portrait** (`PetverseWhatsAppAd`) — 1080x1920 @ 30fps, optimized for WhatsApp/Instagram Stories
- **Landscape** (`PetverseWhatsAppAd-Landscape`) — 1920x1080 @ 30fps, optimized for YouTube/web

Both are 30 seconds (900 frames).

## Project Structure

```
src/
├── index.ts              # Remotion entry point (registerRoot)
├── Root.tsx              # Composition definitions (ids, dimensions, fps, duration)
├── Video.tsx             # Re-exports RemotionRoot
├── PetverseAd.tsx        # Main composition — sequences all scenes together
├── components/           # Reusable UI primitives
│   ├── ChatBubble.tsx    # WhatsApp-style message bubble
│   ├── GlowBackground.tsx# Animated gradient background
│   ├── Headline.tsx      # Animated text headlines
│   ├── PhoneMockup.tsx   # Phone frame overlay
│   └── StepBadge.tsx     # Step indicator badge
└── sequences/            # Individual scenes (one per story beat)
    ├── SceneHook.tsx
    ├── SceneBookingRequest.tsx
    ├── SceneCamiReply.tsx
    ├── SceneSlotPick.tsx
    ├── SceneDeposit.tsx
    ├── SceneConfirmation.tsx
    ├── SceneGroomingPics.tsx
    ├── SceneThankYou.tsx
    ├── SceneRepeatInvite.tsx
    └── SceneOutro.tsx
```

Each scene in `sequences/` is a self-contained React component that handles its own animations and layout. The main `PetverseAd.tsx` composes them using Remotion's `<Series>` component to play them back-to-back.

Shared components in `components/` provide the visual building blocks — chat bubbles, phone frames, glowing backgrounds, and animated text.

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
npx remotion render PetverseWhatsAppAd out/video.mp4

# Render landscape video (1920x1080)
npx remotion render PetverseWhatsAppAd-Landscape out/video-landscape.mp4
```

Output files go to `out/` (gitignored).

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
