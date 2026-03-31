# Phase 3 scroll transition + persistent bubble

## Context
Currently Phase 2→3 crossfades (content disappears, new content fades in). Instead, Phase 3 should show the full conversation from Phase 2, add the new user message, scroll up to reveal space, then show the bot reply and deposit button. "Wed 2 PM pls!" becomes a new persistent bubble after the scroll.

## The crossfade problem
Phases use 10-frame exit/entry fades with NO overlap (Phase 2 ends at 269, Phase 3 starts at 270). This creates a ~20-frame dim between phases. For Phases 2→3, we need seamless continuity since the conversation accumulates.

## Approach

**File:** `src/sequences/SceneWhatsAppFlow.tsx`

### 1. Add `skipExitFade` / `skipEntryFade` props to PhaseWrapper

Allow phases to skip their exit/entry fade for seamless hand-offs.

Phase 2 gets `skipExitFade` — it stays at full opacity through frame 269 then stops rendering.

### 2. Extend PersistentBubble (Phase 1 user msg) to not exit-fade

Currently uses `endPhase={PHASES[1]}` which fades out during 259-269. Instead, it should stay at full opacity through frame 269 (same as Phase 2), since Phase 3's scroll component takes over at frame 270 with its own copy.

Add `skipExitFade` prop to PersistentBubble as well.

### 3. New `Phase3Scroll` component (replaces PhaseWrapper for Phase 3)

Self-contained component with two modes:

**Scroll mode (frames 270–308):**
- Renders at opacity 1.0 immediately (no entry fade) — Phase 2 just ended at full opacity with identical content, so the hand-off is seamless
- Shows ALL prior conversation in a tall column inside an `overflow: hidden` container:
  - "Hey, can I book Bella in for a groom? 🐕" (user, static)
  - "Hey Alex, hope you and Bella are doing well!..." (bot, static)
  - "📅 Tue 10 AM | Wed 2 PM..." (bot, static)
  - "Wed 2 PM pls! 🙌" (user, pops in at frame 278)
- **Scroll animation (frames 293–308):** `translateY` on the column slides everything up so "Wed 2 PM pls!" reaches the top. Previous messages scroll off-screen (clipped by overflow:hidden).

**Post-scroll mode (frames 308–419):**
- Cross-dissolve from scroll mode to static mode over ~5 frames
- Static mode: "Wed 2 PM pls!" rendered as a persistent top bubble + bot reply "Great pick!..." + deposit button below (using topOffset like Phases 1-2)
- Exit fade at frames 409-419

### 4. New PersistentBubble for "Wed 2 PM pls!" (Phases 3-4)

After the scroll, "Wed 2 PM pls!" sits at the top as a persistent bubble spanning Phases 3-4. It appears at frame 308 (post-scroll) and persists through Phase 4's end. Uses `skipEntryFade` since it transitions from the scroll content.

### 5. Phase 4 gets `topOffset={78}` to render below the new persistent bubble

## Frame-by-frame timeline for Phase 3 (270-419)

```
270      Phase 3 starts — shows full conversation (identical to Phase 2 view)
278      "Wed 2 PM pls! 🙌" pops in below bot replies
293      Scroll animation begins
308      Scroll complete — "Wed 2 PM pls!" is at top
310      Cross-dissolve to post-scroll static layout
315      Bot reply "Great pick!..." starts appearing
330      QuickReplyButtons "Pay AED 50 Deposit" appears
409-419  Exit fade
```

## Summary of changes

| What | Change |
|------|--------|
| `PhaseWrapper` | Add `skipExitFade`, `skipEntryFade` props |
| `PersistentBubble` | Add `skipExitFade` prop |
| Phase 2 `<PhaseWrapper>` | Add `skipExitFade` |
| Phase 1 PersistentBubble | Add `skipExitFade` |
| Phase 3 | Replace `<PhaseWrapper>` with new `<Phase3Scroll>` component |
| Phase 3-4 | New `<PersistentBubble>` for "Wed 2 PM pls!" starting at frame 308 |
| Phase 4 `<PhaseWrapper>` | Add `topOffset={78}` |

## Verification
- `npm run dev` → Remotion Studio
- Scrub frames 265-275: Phase 2→3 hand-off should be seamless (no dim/flicker)
- Scrub frames 278-290: "Wed 2 PM pls!" should pop in below existing conversation
- Scrub frames 293-310: Smooth scroll-up, "Wed 2 PM pls!" reaches top
- Scrub frames 310-340: Bot reply + deposit button appear below persistent bubble
- Scrub frames 415-425: Phase 3→4 transition works correctly
