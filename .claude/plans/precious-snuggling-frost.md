# Plan: Add "Powered by Cami AI" to WhatsApp screen

## Context
Cami AI is plugged into a pet business's WhatsApp. The WhatsApp contact name already shows "Pet Business" but we need a visible "Powered by Cami AI" indicator on the WhatsApp screen.

## Change

### Add "Powered by Cami AI" to the WhatsApp header in PhoneMockup
- `src/components/PhoneMockup.tsx` — In the header section (lines 137-144), replace the "online" status text with "Powered by Cami AI". This sits naturally under the contact name in the WhatsApp header bar, visible across all scenes.

```
// Current (line 141-143):
<div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
  online
</div>

// New:
<div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
  Powered by Cami AI
</div>
```

Single file change, applies everywhere PhoneMockup is used.

## Verification
- `npm run lint` to confirm no errors
- `npm run dev` to visually confirm "Powered by Cami AI" appears in the WhatsApp header across all scenes
