# CLAUDE.md

## Project

Remotion video project for generating animated promotional ads for **Cami AI**. Built with Remotion 4, React 19, TypeScript, and Tailwind CSS v4.

## Product Context

- **Cami AI** is a product that plugs into a pet business's WhatsApp to automate bookings, payments, reminders, and client retention.
- The video ad shows the experience from a **pet business client's perspective** — they message the business on WhatsApp and Cami AI handles the conversation automatically.
- In the WhatsApp UI, the contact name is the **pet business** (e.g. "Pet Business"), not "Cami". Cami is the underlying AI product powering the chat.
- The WhatsApp header shows **"Powered by Cami AI"** under the contact name to indicate the AI layer.
- Product-level messaging (e.g. "Let Cami handle it", the outro branding, CTA) should reference **Cami** directly — this is the product being sold to pet businesses.
- Scene-level WhatsApp chat content (contact name, typing indicator) should reference the **pet business**, since that's what the end customer sees.

## Commands

- `npm run dev` — Open Remotion Studio (local preview/editing)
- `npm run build` — Bundle the video for rendering
- `npm run lint` — Run ESLint + TypeScript type checking (`eslint src && tsc`)
- `npm run upgrade` — Upgrade Remotion to latest version
- `npx remotion render CamiWhatsAppAd out/video.mp4` — Render the portrait (1080×1920) video
- `npx remotion render CamiWhatsAppAd-Landscape out/video-landscape.mp4` — Render landscape (1920×1080)

## Architecture

```
src/
├── index.ts              # Remotion entry point (registerRoot)
├── Root.tsx              # Composition definitions (ids, dimensions, fps, duration)
├── Video.tsx             # Re-exports RemotionRoot (referenced by index.ts)
├── CamiAd.tsx            # Main composition — sequences scenes together
├── fonts.ts              # Font loading configuration
├── components/           # Reusable UI primitives (GlowBackground, ChatBubble, PhoneMockup, Headline, StepBadge, StepProgress)
└── sequences/            # Individual scenes (SceneHook, SceneBookingRequest, SceneCamiReply, SceneSlotPick, SceneConfirmation, SceneDeposit, SceneGroomingPics, SceneThankYou, SceneRepeatInvite, SceneOutro)
```

- **Compositions** are defined in `Root.tsx` — portrait (1080×1920) and landscape (1920×1080), both 1380 frames at 30fps (46 seconds).
- **Scenes** in `src/sequences/` are self-contained and composed together in `CamiAd.tsx`.
- **Shared components** in `src/components/` are reusable across scenes.

## Code Conventions

- Tailwind CSS v4 via `@remotion/tailwind-v4` (configured in `remotion.config.ts`)
- Functional React components (React.FC)
- Strict TypeScript (`noUnusedLocals`, `strict: true`)
- Remotion ESLint flat config

## Key Config

- `remotion.config.ts` — Video format (jpeg), overwrite output enabled, Tailwind webpack override
- Output directory `out/` is gitignored
