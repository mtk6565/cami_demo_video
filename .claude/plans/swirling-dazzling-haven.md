# Plan: Polish and Update CLAUDE.md

## Context

The CLAUDE.md has drifted from the actual codebase state and can be tightened following best practices (concise, focused on non-obvious info, no duplication of what's readable from code).

## Changes (all in `/Users/mtk/Desktop/Code/demo_video/CLAUDE.md`)

### 1. Fix WhatsApp render command (line 26)
- `720×1280, smaller file` → `960×1080, compact` (matches `Video.tsx` line 28)

### 2. Update Architecture tree (lines 30–57)
- Add `public/fonts/` and `public/images/` as top-level entries under `public/`
- Update `fonts.ts` description: "Font loading — DM Sans (body) + SeasonMix (headline)"
- Mark `Root.tsx` as "STALE — not wired up" inline in tree
- Collapse `audio/artifacts/` (not architecturally significant)
- Remove the standalone `Root.tsx` warning bullet (now redundant with tree annotation)
- Restructure `public/` as its own tree section

### 3. Tighten Scene Timeline (lines 59–75)
- Remove per-phase prose descriptions (obvious from names)
- Keep timing data + note which phases have context badges
- More compact table format

### 4. Add font info to Code Conventions (after line 119)
- `Fonts: DM Sans (body) + SeasonMix (headline) — loaded in fonts.ts`

### 5. Add `.prettierrc` to Key Config (after line 138)
- `2-space indent, bracket spacing, no tabs`

### 6. Memory System section — NO CHANGES
- Keep as-is per user request

## Sections Left Unchanged
- **Product Context** — critical messaging decisions
- **Transition Design** — critical gotchas preventing real bugs
- **Layout Stability Rules** — critical gotchas
- **Audio / Voiceover** — non-obvious patterns
- **Commands** (except dimension fix)

## Verification
- Read final CLAUDE.md to confirm accuracy
- Cross-check render command dimensions against `Video.tsx`
- Run `npm run lint` to ensure no issues
