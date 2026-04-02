# Plan: Memory Update

## Context
Capturing session learnings into the memory system.

## Changes

### 1. Append to `tech/architecture.md`
Add note about hook scene redesign: Start scene added (4s), hook scene restructured with flat background, PNG badges with underline highlight, logo scale pulse, subheading removed.

### 2. Append to `tech/transition-patterns.md`
Add scale pulse pattern: spring config `{ damping: 6, mass: 0.8, stiffness: 150 }`, scale 1.0→1.12, used on Start headline and Hook logo synced with voiceover.

### 3. Create `project_context/design-decisions.md`
Design principles established: visual-audio sync, avoid redundant on-screen text, badge highlight via underline bar (not CSS filters), PNG over SVG for reliability.

### 4. Update `project_context/` section in README.md
Add entry for the new design-decisions.md file.
