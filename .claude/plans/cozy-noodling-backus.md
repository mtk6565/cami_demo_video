# Plan: Enhance getcam.io text animation in outro

## Context
The getcam.io text in `SceneOutro.tsx` currently just fades in with the background — same spring, same timing. It doesn't stand out as the final branding moment. We want it to feel more eye-catching and professional.

## Changes (single file: `src/sequences/SceneOutro.tsx`)

### 1. Separate timing — delay text 10 frames after bg2
```
const textDelay = 25; // bg2 starts at 15, text starts at 25
const textFrame = Math.max(0, frame - textDelay);
```

### 2. Snappier spring with scale + slide-up
```
const textSpring = spring({
  frame: textFrame,
  fps,
  config: { damping: 12, mass: 0.7 },
});

textOpacity:    [0, 1] → [0, 1]
textScale:      [0, 1] → [0.85, 1]    // 15% scale pop
textTranslateY: [0, 1] → [18, 0]      // subtle slide-up
```

Combined transform: `translateX(-50%) translateY(${y}px) scale(${s})`

### 3. Temporary glow bloom behind the logo
A blurred duplicate of the PNG that peaks mid-spring then fades out:
```
glowOpacity: [0, 0.5, 1] → [0, 0.7, 0]   // bloom peaks halfway, gone at rest
filter: "blur(20px) brightness(1.3)"
```

### Timeline (~30fps)
| Frame | Event |
|-------|-------|
| 0 | bg1 visible |
| 15 | bg2 fades in |
| 25 | Text spring starts — scale, slide-up, glow bloom |
| ~32 | Glow peaks |
| ~40 | Logo settled, glow gone, clean final state |

## Verification
- `npm run dev` → open Remotion Studio → scrub to outro scene
- Confirm: bg reveals first, then logo pops in with scale + slide + glow
- Confirm: final resting state looks identical to before (no residual glow/offset)
