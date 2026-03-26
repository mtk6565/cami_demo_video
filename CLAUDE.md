# CLAUDE.md

## Project

Remotion video project for generating animated promotional ads (currently a "Petverse" WhatsApp ad). Built with Remotion 4, React 19, TypeScript, and Tailwind CSS v4.

## Commands

- `npm run dev` — Open Remotion Studio (local preview/editing)
- `npm run build` — Bundle the video for rendering
- `npm run lint` — Run ESLint + TypeScript type checking (`eslint src && tsc`)
- `npm run upgrade` — Upgrade Remotion to latest version
- `npx remotion render PetverseWhatsAppAd out/video.mp4` — Render the portrait (1080×1920) video
- `npx remotion render PetverseWhatsAppAd-Landscape out/video-landscape.mp4` — Render landscape (1920×1080)

## Architecture

```
src/
├── index.ts              # Remotion entry point (registerRoot)
├── Root.tsx              # Composition definitions (ids, dimensions, fps, duration)
├── Video.tsx             # Re-exports RemotionRoot (referenced by index.ts)
├── PetverseAd.tsx        # Main composition — sequences scenes together
├── components/           # Reusable UI primitives (GlowBackground, ChatBubble, PhoneMockup, etc.)
└── sequences/            # Individual scenes (SceneHook, SceneBookingRequest, SceneConfirmation, etc.)
```

- **Compositions** are defined in `Root.tsx` — portrait (1080×1920) and landscape (1920×1080), both 900 frames at 30fps (30 seconds).
- **Scenes** in `src/sequences/` are self-contained and composed together in `PetverseAd.tsx`.
- **Shared components** in `src/components/` are reusable across scenes.

## Code Conventions

- Tailwind CSS v4 via `@remotion/tailwind-v4` (configured in `remotion.config.ts`)
- Functional React components (React.FC)
- Strict TypeScript (`noUnusedLocals`, `strict: true`)
- Remotion ESLint flat config

## Key Config

- `remotion.config.ts` — Video format (jpeg), overwrite output enabled, Tailwind webpack override
- Output directory `out/` is gitignored
