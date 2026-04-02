# Transition Design & Layout Stability

## Persistent Shell Pattern

The WhatsApp flow uses a **persistent shell** pattern to avoid jarring jumps between phases:

- `PhoneMockup`, `GlowBackground`, and `StepProgress` are rendered once for the entire flow. Only chat content inside the phone changes.
- Chat content crossfades between phases using opacity transitions (10 frames fade in/out).
- Each phase's chat content is wrapped in a Remotion `<Sequence>` with `layout="none"` to offset `useCurrentFrame()` so `ChatBubble` delay props work relative to the phase start.
- Phase content divs use `position: absolute` inside the chat area to overlay during crossfade.
- `GlowBackground` accepts a `globalFrame` prop to maintain continuous orb motion across phases.
- `GlowBackground` color transitions use `interpolateColors` to smoothly blend between phase colors.

## Conversation Continuity Pattern

Some phase transitions accumulate messages rather than crossfading (to feel like a real WhatsApp thread):

- **PersistentBubble**: Renders a chat bubble across multiple phases without flickering. Uses its own opacity (fade in with start phase, fade out with end phase). Other phase content uses `topOffset` to render below it.
- **skipExitFade**: PhaseWrapper and PersistentBubble accept `skipExitFade` to stay at full opacity until their end frame — used when the next phase takes over seamlessly with identical content.
- **Phase3Scroll (scroll transition)**: Instead of crossfading, Phase 3 shows the full conversation from Phases 1-2, adds a new user message, then scrolls up via `translateY` + `overflow: hidden`. After the scroll, bot reply and deposit button appear in the same flex column.

## Avoiding Re-animation on Phase Transitions

When a phase duplicates messages from a previous phase (e.g., Phase3Scroll showing Phase 2's messages):

- Leave already-visible messages outside any Sequence. At frame 270+ with `delay={0}`, the global frame is high enough that the spring is fully settled — no animation.
- Wrap only NEW messages (that need animated entry) in `<Sequence from={phase.start}>` so their `delay` props work relative to the phase start.

## Layout Stability Rules

To prevent the phone/steps from shifting position between phases:

- The layout row must use `alignItems: "flex-start"` (not `"center"`) — centering causes vertical shifts as StepProgress grows taller.
- `StepProgress` must have a fixed `width` with `flexShrink: 0` — varying label widths cause horizontal shifts via `justifyContent: "center"`.
- Step circles must use a **consistent size** for all states (active, completed, inactive) — size changes between states shift the layout.
- Connector line `marginLeft` must be **consistent** across all states — varying margins cause horizontal jitter.
- Context badges (phases 5 and 8) must be `position: absolute` above the phone — putting them in the flex flow pushes the phone down.
- `PhoneMockup` `chatMinHeight` should be a fixed value that accommodates the tallest phase content.
