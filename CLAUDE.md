# CLAUDE.md

## Project

Remotion video project for generating animated promotional ads for **Cami AI**. Built with Remotion 4, React 19, TypeScript, and Tailwind CSS v4.

## Product Messaging Rules

- **Target audience**: Receptionists at pet businesses. Do NOT use language that implies replacing them (e.g. "AI receptionist"). Position Cami as an "AI assistant" that helps them.
- WhatsApp UI contact name is always **"Pet Business 🐾"**, not "Cami".
- Product-level messaging (intro, outro, CTA) references **Cami** directly.
- Scene-level chat content (contact name, typing indicator) references the **pet business**.

## Commands

- `npm run dev` — Open Remotion Studio (local preview/editing)
- `npm run build` — Bundle the video for rendering
- `npm run lint` — Run ESLint + TypeScript type checking (`eslint src && tsc`)
- `npm run upgrade` — Upgrade Remotion to latest version
- `source .env.local && npm run generate-audio` — Generate voiceover clips via ElevenLabs API
- `npx remotion render CamiWhatsAppAd out/video.mp4` — Render portrait (1080×1920)
- `npx remotion render CamiWhatsAppAd-Landscape out/video-landscape.mp4` — Render landscape (1920×1080)
- `npx remotion render CamiWhatsAppAd-WhatsApp out/video-whatsapp.mp4` — Render WhatsApp-optimized (960×1080)

## Critical Rules

### Transition Design

- **DO NOT** use separate `Series.Sequence` entries for WhatsApp scenes — this remounts the phone frame, background, and step progress.
- **DO** keep `PhoneMockup`, `GlowBackground`, and `StepProgress` rendered once for the entire flow. Only chat content changes.
- **DO NOT** wrap static/already-visible messages in a `<Sequence>` — this resets `useCurrentFrame()` to 0, replaying spring animations.
- **DO** wrap only NEW messages in `<Sequence from={phase.start}>` so delay props work relative to phase start.

### Layout Stability

- Layout row: `alignItems: "flex-start"` (not `"center"`) — centering causes vertical shifts.
- `StepProgress`: fixed `width` + `flexShrink: 0` — prevents horizontal shifts.
- Step circles + connector margins: **consistent size** across all states.
- Context badges (phases 5, 8): `position: absolute` — do not put in flex flow.

### Audio Placement

- **DO** embed `<Audio>` inside its `<Series.Sequence>`, wrapped in `<Sequence from={phaseStart + AUDIO_DELAY} layout="none">`.
- **DO NOT** place audio as top-level siblings of the `<Series>` — Remotion does not reliably apply frame offsets outside the visual timing context.

## Code Conventions

- Tailwind CSS v4 via `@remotion/tailwind-v4` (configured in `remotion.config.ts`)
- Functional React components (React.FC)
- Strict TypeScript (`noUnusedLocals`, `strict: true`)
- Remotion ESLint flat config
- Fonts: DM Sans (body) + SeasonMix (headline) — loaded in `fonts.ts` via `@remotion/fonts`

## Reference

Detailed architecture, timelines, transition patterns, and audio pipeline docs are in `.claude/memory/`. Check `.claude/memory/README.md` for the index.
