# CLAUDE.md

## Project

Remotion video project for generating animated promotional ads for **Cami AI**. Built with Remotion 4, React 19, TypeScript, and Tailwind CSS v4.

## Product Context

- **Cami AI** is a product that plugs into a pet business's WhatsApp to automate bookings, payments, reminders, and client retention.
- The video ad shows the experience from a **pet business client's perspective** — they message the business on WhatsApp and Cami AI handles the conversation automatically.
- In the WhatsApp UI, the contact name is always **"Pet Business 🐾"**, not "Cami". Cami is the underlying AI product powering the chat.
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
├── CamiAd.tsx            # Main composition — sequences 3 scenes: Hook, WhatsAppFlow, Outro
├── fonts.ts              # Font loading configuration
├── components/           # Reusable UI primitives (GlowBackground, ChatBubble, PhoneMockup, Headline, StepBadge, StepProgress, QuickReplyButtons)
└── sequences/
    ├── SceneHook.tsx         # Opening hook headline with social icons
    ├── SceneWhatsAppFlow.tsx # Unified WhatsApp conversation (8 phases, persistent phone frame)
    ├── SceneOutro.tsx        # Closing CTA and branding
    └── Scene*.tsx            # Legacy individual scenes (no longer used in CamiAd.tsx)
```

- **Compositions** are defined in `Root.tsx` — portrait (1080×1920) and landscape (1920×1080), both 1410 frames at 30fps (47 seconds).
- `CamiAd.tsx` sequences 3 scenes: Hook (4s) → WhatsAppFlow (39s) → Outro (4s).
- `SceneWhatsAppFlow.tsx` is a single unified component with 8 phases — the phone frame, background, and step progress render once and persist across all phases. Only chat content crossfades between phases.

## Scene Timeline

```
Scene 1: HOOK             (0–4s)      "Tired of juggling bookings?"
Scene 2: WHATSAPP FLOW    (4–43s)     Unified persistent WhatsApp conversation
  Phase 1: Booking Request  (4–8s)    Client sends WhatsApp message
  Phase 2: Cami Reply       (8–13s)   AI replies instantly with slots
  Phase 3: Slot Pick        (13–18s)  Client picks + pays deposit
  Phase 4: Deposit          (18–23s)  Payment confirmed, slot locked
  Phase 5: Confirmation     (23–28s)  Auto-confirm + 24h reminder (badge)
  Phase 6: Grooming Pics    (28–33s)  In-store photos
  Phase 7: Thank You        (33–38s)  Thank You & Reviews
  Phase 8: Repeat Invite    (38–43s)  1-month recurring invite (badge)
Scene 3: OUTRO             (43–47s)   Cami CTA
```

## Transition Design (Critical)

The WhatsApp flow uses a **persistent shell** pattern to avoid jarring jumps between phases:

- **DO NOT** use separate `Series.Sequence` entries for WhatsApp scenes — this causes the phone frame, background, and step progress to remount and re-animate at every transition.
- **DO** keep `PhoneMockup`, `GlowBackground`, and `StepProgress` rendered once for the entire flow. Only chat content inside the phone changes.
- Chat content crossfades between phases using opacity transitions (10 frames fade in/out).
- Each phase's chat content is wrapped in a Remotion `<Sequence>` with `layout="none"` to offset `useCurrentFrame()` so `ChatBubble` delay props work relative to the phase start.
- Phase content divs use `position: absolute` inside the chat area to overlay during crossfade.
- `GlowBackground` accepts a `globalFrame` prop to maintain continuous orb motion across phases.
- `GlowBackground` color transitions use `interpolateColors` to smoothly blend between phase colors.

### Conversation Continuity Pattern

Some phase transitions accumulate messages rather than crossfading (to feel like a real WhatsApp thread):

- **PersistentBubble**: Renders a chat bubble across multiple phases without flickering. Uses its own opacity (fade in with start phase, fade out with end phase). Other phase content uses `topOffset` to render below it.
- **skipExitFade**: PhaseWrapper and PersistentBubble accept `skipExitFade` to stay at full opacity until their end frame — used when the next phase takes over seamlessly with identical content.
- **Phase3Scroll (scroll transition)**: Instead of crossfading, Phase 3 shows the full conversation from Phases 1-2, adds a new user message, then scrolls up via `translateY` + `overflow: hidden`. After the scroll, bot reply and deposit button appear in the same flex column.

### Avoiding Re-animation on Phase Transitions

When a phase duplicates messages from a previous phase (e.g., Phase3Scroll showing Phase 2's messages):

- **DO NOT** wrap static/already-visible messages in a `<Sequence>` — this resets `useCurrentFrame()` to 0, causing ChatBubble's spring animation to replay.
- **DO** leave already-visible messages outside any Sequence. At frame 270+ with `delay={0}`, the global frame is high enough that the spring is fully settled — no animation.
- **DO** wrap only NEW messages (that need animated entry) in `<Sequence from={phase.start}>` so their `delay` props work relative to the phase start.

## Layout Stability Rules

To prevent the phone/steps from shifting position between phases:

- The layout row must use `alignItems: "flex-start"` (not `"center"`) — centering causes vertical shifts as StepProgress grows taller.
- `StepProgress` must have a fixed `width` with `flexShrink: 0` — varying label widths cause horizontal shifts via `justifyContent: "center"`.
- Step circles must use a **consistent size** for all states (active, completed, inactive) — size changes between states shift the layout.
- Connector line `marginLeft` must be **consistent** across all states — varying margins cause horizontal jitter.
- Context badges (phases 5 and 8) must be `position: absolute` above the phone — putting them in the flex flow pushes the phone down.
- `PhoneMockup` `chatMinHeight` should be a fixed value that accommodates the tallest phase content. Use the `chatMinHeight` prop to adjust per-phase only if absolutely necessary.

## Code Conventions

- Tailwind CSS v4 via `@remotion/tailwind-v4` (configured in `remotion.config.ts`)
- Functional React components (React.FC)
- Strict TypeScript (`noUnusedLocals`, `strict: true`)
- Remotion ESLint flat config

## Key Config

- `remotion.config.ts` — Video format (jpeg), overwrite output enabled, Tailwind webpack override
- Output directory `out/` is gitignored
