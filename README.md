# Cami AI — Animated WhatsApp Ad

A programmatic animated ad built entirely in code using **React** and **Remotion**. No After Effects, no drag-and-drop editors — every frame is rendered from React components with spring physics, precise timing, and pixel-level control.

The ad promotes **Cami AI**, a product that plugs into a pet business's WhatsApp to automate bookings, payments, reminders, and client retention. The video showcases the full booking lifecycle from a client's perspective in a 47-second WhatsApp conversation.

## Demo

https://github.com/user-attachments/assets/74a1f37f-6270-4056-abd4-867b7d8a6549

## Why Code-Based Video?

- **Version controlled** — every animation change is a git diff
- **Pixel-perfect** — Spring physics, eased transitions, and frame-accurate timing via Remotion's declarative API
- **Multi-format from one source** — portrait (1080x1920), landscape (1920x1080), and WhatsApp-optimized (960x1080) all render from the same components
- **Iterative** — tweak timing, copy, or colors and re-render in seconds

## What the Ad Shows

The video walks through a realistic WhatsApp conversation between a pet owner and a pet business powered by Cami AI:

| Scene         | Time   | What Happens                       |
| ------------- | ------ | ---------------------------------- |
| Hook          | 0–4s   | "Tired of juggling bookings?"      |
| WhatsApp Flow | 4–43s  | Full booking lifecycle in 8 phases |
| Outro         | 43–47s | Cami CTA                           |

The WhatsApp flow is a **single persistent component** — the phone frame, background glow, and step progress bar render once and stay mounted. Only the chat content crossfades between phases:

1. **Booking Request** — Client messages asking to book
2. **AI Reply** — Instant response with available time slots
3. **Slot Pick** — Client selects a time and pays deposit
4. **Deposit Confirmed** — Payment locked, appointment set
5. **Auto-Confirmation** — 24-hour reminder sent automatically
6. **Grooming Pics** — In-store progress photos shared
7. **Thank You** — Thanks + rebook/rate prompt
8. **Repeat Invite** — 1-month recurring booking invite

## Tech Stack

| Tool                               | Purpose                                 |
| ---------------------------------- | --------------------------------------- |
| [Remotion](https://remotion.dev) 4 | Programmatic video rendering with React |
| React 19                           | Component-based scene composition       |
| TypeScript                         | Strict mode, full type safety           |
| Tailwind CSS v4                    | Styling via `@remotion/tailwind-v4`     |
| ElevenLabs                         | AI voiceover generation                 |

## Project Structure

```
src/
├── CamiAd.tsx                # Main composition — sequences Hook, WhatsAppFlow, Outro
├── fonts.ts                  # DM Sans (body) + SeasonMix (headline) font loading
├── components/
│   ├── ChatBubble.tsx        # WhatsApp-style message bubbles with spring animations
│   ├── GlowBackground.tsx    # Animated gradient background
│   ├── PhoneMockup.tsx       # Phone frame overlay
│   ├── StepProgress.tsx      # Persistent step tracker across all phases
│   └── ...                   # Quick replies, badges, headlines
└── sequences/
    ├── SceneHook.tsx          # Opening hook with social icons
    ├── SceneWhatsAppFlow.tsx  # Unified 8-phase WhatsApp conversation
    └── SceneOutro.tsx         # Closing CTA and branding
```

## Getting Started

```bash
# Install dependencies
npm install

# Open Remotion Studio (live preview + timeline scrubbing)
npm run dev
```

## Rendering

```bash
# Portrait (1080x1920) — Instagram/WhatsApp Stories
npx remotion render CamiWhatsAppAd out/video.mp4

# Landscape (1920x1080) — YouTube/web
npx remotion render CamiWhatsAppAd-Landscape out/video-landscape.mp4

# WhatsApp-optimized (960x1080)
npx remotion render CamiWhatsAppAd-WhatsApp out/video-whatsapp.mp4
```

## Output Formats

All three compositions render from the same source at 30fps / 47 seconds (1410 frames):

| Format    | Resolution | Use Case                   |
| --------- | ---------- | -------------------------- |
| Portrait  | 1080x1920  | Instagram/WhatsApp Stories |
| Landscape | 1920x1080  | YouTube, web embeds        |
| WhatsApp  | 960x1080   | WhatsApp status/sharing    |

## License

MIT
