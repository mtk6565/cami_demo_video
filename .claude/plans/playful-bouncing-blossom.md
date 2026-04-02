# Plan: Clean Up CLAUDE.md + Populate Memory System

## Context

The CLAUDE.md is ~158 lines and mixes behavioral instructions (how Claude should work) with reference documentation (architecture, timelines, patterns). The project memory system (`.claude/memory/`) exists but is empty. We'll move reference content to memory files and slim CLAUDE.md down to just instructions.

Also: `src/Root.tsx` is confirmed stale — duplicate of Video.tsx with outdated frame counts, never imported. Safe to delete.

## Changes

### 1. Delete `src/Root.tsx`
- Confirmed unused — `src/index.ts` imports from `./Video`, nothing references Root.tsx

### 2. Create memory files in `.claude/memory/`

**`.claude/memory/tech/architecture.md`** — File tree, composition structure, scene timeline, key config
- Move: Architecture section (lines 29–57), Scene Timeline (lines 59–75), Key Config (lines 137–141)

**`.claude/memory/tech/transition-patterns.md`** — Persistent shell pattern, conversation continuity, phase transitions, re-animation rules
- Move: Transition Design section (lines 77–103)
- Move: Layout Stability Rules (lines 105–114)

**`.claude/memory/tech/audio-pipeline.md`** — ElevenLabs setup, audio placement pattern, env vars, voice settings
- Move: Audio / Voiceover section (lines 125–133)

**`.claude/memory/project_context/product.md`** — What Cami AI is, target audience, messaging rules
- Move: Product Context section (lines 8–15)

### 3. Update `.claude/memory/README.md` index
- Add entries for all 4 new files

### 4. Rewrite `CLAUDE.md` (target: ~60 lines)

Keep:
- **Project** one-liner (line 5)
- **Product messaging rules** — the DO/DON'T instructions about naming ("AI assistant" not "AI receptionist", contact name = "Pet Business 🐾", etc.) — these are behavioral instructions, not just context
- **Commands** (lines 18–26) — unchanged
- **Critical rules** — condensed DO/DON'T list covering transition design, layout stability, and audio placement (the actionable rules only, not explanatory context)
- **Code Conventions** (lines 116–122) — unchanged

Remove:
- Architecture section → memory
- Scene Timeline → memory
- Transition Design explanatory paragraphs → memory (keep only the DO/DON'T bullets)
- Layout Stability detailed explanations → memory
- Audio/Voiceover full section → memory (keep only the placement DO/DON'T rule)
- Key Config → memory
- Memory System section → remove entirely (auto-memory handles this now; the `/update-memory-mk` skill is still discoverable)
- Root.tsx reference → file deleted

### 5. Create auto-memory entry

Write a `project` type memory to `/Users/mtk/.claude/projects/-Users-mtk-Desktop-Code-demo-video/memory/` noting that this project uses `.claude/memory/` for detailed technical reference docs, so future sessions know to check there.

## Files Modified

- `src/Root.tsx` — **DELETE**
- `.claude/memory/tech/architecture.md` — CREATE
- `.claude/memory/tech/transition-patterns.md` — CREATE
- `.claude/memory/tech/audio-pipeline.md` — CREATE
- `.claude/memory/project_context/product.md` — CREATE
- `.claude/memory/README.md` — UPDATE
- `CLAUDE.md` — REWRITE (158 → ~60 lines)
- Auto-memory MEMORY.md + file — CREATE

## Verification

1. `npm run lint` — ensure deleting Root.tsx doesn't break anything
2. `npm run dev` — Remotion Studio still opens
3. Read final CLAUDE.md — confirm it's concise and all critical rules are preserved
4. Read memory files — confirm full context is preserved there
