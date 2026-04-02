# Plan: Fix Floating Bubbles — Layout, Spacing, Tail Removal

## Context

Three issues with the current floating bubbles implementation:
1. The headline "Tired of juggling bookings?" shifted position because the bubble container (400px height) was added inside the flex layout, pushing content around.
2. Bubbles are too spread out — they should cluster tighter to feel like a flood of messages.
3. The tail tip should be removed — only WhatsApp has bubble tails, Instagram and Messenger don't. Since we mix platforms, no tail keeps it consistent.

## Fix 1: Restore headline position — `src/sequences/SceneStart.tsx`

**Problem:** The bubble `<div>` with `height: 400` is inside the flex column, adding 400px + 40px gap to the layout and shifting the headline up.

**Fix:** Remove the bubble container from the flex flow. Place it as an absolute-positioned layer below the icons, outside the flex column. The flex column keeps only headline + icons (unchanged from original).

```
<AbsoluteFill>
  {/* Original centered flex — headline + icons only */}
  <div style={{ display: "flex", flexDirection: "column", ... }}>
    <Img ... />  {/* headline */}
    <div ...>    {/* icons row */}
  </div>

  {/* Bubbles — absolute positioned, below center */}
  <div style={{ position: "absolute", bottom: 100, left: 40, right: 40, height: 300 }}>
    {FLOATING_BUBBLES.map(...)}
  </div>
</AbsoluteFill>
```

## Fix 2: Tighter bubble clustering — `src/sequences/SceneStart.tsx`

Reduce offset spread. Current: X spans 40–560, Y spans 20–320 (520px wide, 300px tall). 

New positions — clustered in ~400px wide × 180px tall zone:

| # | Platform | offsetX | offsetY | rotation |
|---|----------|---------|---------|----------|
| 1 | WhatsApp | 60 | 0 | -3 |
| 2 | WhatsApp | 350 | 40 | 2 |
| 3 | Instagram | 180 | 80 | -2 |
| 4 | Instagram | 450 | 110 | 3 |
| 5 | Messenger | 20 | 130 | -4 |

## Fix 3: Remove tail tip — `src/components/FloatingBubble.tsx`

- Delete the tail `<div>` (CSS triangle at bottom-left)
- Remove `tailColor` from `PLATFORM_STYLES`
- Change `borderRadius` from `"8px 8px 8px 0"` to `"12px"` (uniform rounded, no squared corner)

## Files to modify

- `src/sequences/SceneStart.tsx` — move bubbles out of flex, tighten positions
- `src/components/FloatingBubble.tsx` — remove tail, uniform border-radius

## Verification

1. `npm run dev` — Remotion Studio
2. Confirm headline + icons are in their original centered position (unchanged from before bubbles were added)
3. Confirm bubbles appear clustered below icons, not spread across the screen
4. Confirm no bubble tails visible on any platform
5. Check all 3 compositions for clipping
