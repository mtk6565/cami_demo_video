# Tighten Phase Durations to Match Audio + Fix Hook Audio Delay

## Context

Audio clips have significant dead air in several phases (0.7–1.1s buffer), while the hook is 0.37s over its allocation. This plan tightens phase durations to `audio + ~0.5s buffer`, gives hook more room, and shortens the total video from 38s to 36.5s.

## New Timeline

| Phase | Old Duration | New Duration | Old Frames | New Frames |
|-------|-------------|-------------|------------|------------|
| hook | 4.0s | **5.0s** | 120 | **150** |
| phase1 | 4.0s | **3.5s** | 120 | **105** |
| phase2 | 4.5s | **4.0s** | 135 | **120** |
| phase3 | 3.5s | **3.0s** | 105 | **90** |
| phase4 | 3.5s | 3.5s | 105 | 105 |
| phase5 | 4.0s | 4.0s | 120 | 120 |
| phase6 | 3.0s | **2.5s** | 90 | **75** |
| phase7 | 3.5s | **3.0s** | 105 | **90** |
| phase8 | 4.0s | 4.0s | 120 | 120 |
| outro | 4.0s | 4.0s | 120 | 120 |
| **Total** | **38s** | **36.5s** | **1140** | **1095** |

WhatsApp flow: 900 frames -> **825 frames**

## Files to Modify

### 1. `src/Video.tsx` — Total duration
- Both compositions: `durationInFrames` 1140 -> **1095**

### 2. `src/CamiAd.tsx` — Scene durations + audio offsets

**Scene durations:**
- Hook: `fps * 4` -> `fps * 5` (150 frames)
- WhatsApp: `900` -> `825`
- Outro: `fps * 4` (unchanged)

**Audio `<Sequence from={...}>` values** (hook base = 150):
| Audio | Old | New |
|-------|-----|-----|
| hook.mp3 | `0` | `0` (no delay — hook is the opening, no visual transition to wait for) |
| phase1.mp3 | `120 + 0 + 6` | `150 + 0 + 6` |
| phase2.mp3 | `120 + 120 + 6` | `150 + 105 + 6` |
| phase3.mp3 | `120 + 255 + 6` | `150 + 225 + 6` |
| phase4.mp3 | `120 + 360 + 6` | `150 + 315 + 6` |
| phase5.mp3 | `120 + 465 + 6` | `150 + 420 + 6` |
| phase6.mp3 | `120 + 585 + 6` | `150 + 540 + 6` |
| phase7.mp3 | `120 + 675 + 6` | `150 + 615 + 6` |
| phase8.mp3 | `120 + 780 + 6` | `150 + 705 + 6` |
| outro.mp3 | `1020 + 6` | `975 + 6` |

**Update timeline comment** to reflect new times.

### 3. `src/sequences/SceneWhatsAppFlow.tsx` — Phase boundaries

New `PHASES` array (relative to WhatsApp flow start):
```
Phase 1: 0–104     (105 frames, 3.5s)
Phase 2: 105–224   (120 frames, 4.0s)
Phase 3: 225–314   (90 frames, 3.0s)
Phase 4: 315–419   (105 frames, 3.5s)
Phase 5: 420–539   (120 frames, 4.0s)
Phase 6: 540–614   (75 frames, 2.5s)
Phase 7: 615–704   (90 frames, 3.0s)
Phase 8: 705–824   (120 frames, 4.0s)
```

Update the `PHASES` const and the comment block at the top.

### 4. `audio/generate.ts` — startSeconds + maxSeconds

| Section | Old start | New start | Old max | New max |
|---------|----------|----------|---------|---------|
| hook | 0 | 0 | 4 | **5** |
| phase1 | 4 | **5** | 4 | **3.5** |
| phase2 | 8 | **8.5** | 4.5 | **4** |
| phase3 | 12.5 | 12.5 | 3.5 | **3** |
| phase4 | 16 | **15.5** | 3.5 | 3.5 |
| phase5 | 19.5 | **19** | 4 | 4 |
| phase6 | 23.5 | **23** | 3 | **2.5** |
| phase7 | 26.5 | **25.5** | 3.5 | **3** |
| phase8 | 30 | **28.5** | 4 | 4 |
| outro | 34 | **32.5** | 4 | 4 |

### 5. `CLAUDE.md` — Update Scene Timeline section
Update the timeline comment to match new durations.

## Verification

1. `npm run dev` — open Remotion Studio, scrub through all phases, verify:
   - No dead air gaps between phases
   - Phase transitions still crossfade smoothly
   - Audio aligns with visuals (6-frame delay still feels right)
   - Phase3Scroll animation still works within shorter window
2. `source .env.local && npm run generate-audio` — confirm all clips fit new maxSeconds
3. `npx remotion render CamiWhatsAppAd out/video.mp4` — full render, watch end-to-end
