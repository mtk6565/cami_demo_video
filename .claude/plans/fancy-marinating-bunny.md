# Plan: Make Chat Screens Match Official WhatsApp Style

## Context

The Remotion video's chat screens currently use a custom purple/blue color scheme that doesn't look like real WhatsApp. The goal is to make it instantly recognizable as WhatsApp while keeping the Cami purple header for brand identity.

## Design Decisions

- **Header**: Keep Cami purple `#362A82`
- **Outgoing bubbles**: WhatsApp light green `#D9FDD3` with dark text
- **Incoming bubbles**: White `#FFFFFF` with dark text
- **Chat background**: WhatsApp beige `#ECE5DD` with subtle pattern
- **Input bar**: WhatsApp-style with emoji, attachment, camera icons

---

## Step 1: Update `ChatBubble.tsx`

**File:** `src/components/ChatBubble.tsx`

### Colors

- Bot (incoming): solid `#FFFFFF` background, `#111B21` text
- User (outgoing): solid `#D9FDD3` background, `#111B21` text
- Box shadow: `0 1px 1px rgba(0,0,0,0.08)` (subtle, WhatsApp-like)

### Add bubble tails

WhatsApp's signature triangular tails using CSS border tricks:

- Incoming tail: top-left, pointing left, `#FFFFFF` colored
- Outgoing tail: top-right, pointing right, `#D9FDD3` colored
- Add `showTail` prop (default `true`) and `timestamp` prop (default `"9:41 AM"`)

### Border radius

- With tail (incoming): `0 8px 8px 8px`
- With tail (outgoing): `8px 0 8px 8px`
- Without tail: `8px` all around

### Timestamps & read receipts

- Every bubble gets a small timestamp at bottom-right inside the bubble
- Font: 11px, color `#667781`
- Bot bubbles: timestamp only (no checkmarks)
- Remove "Cami AI" label

**User bubble read receipt states** (add `status` prop: `"sent"` | `"delivered"` | `"read"`, default `"read"`):

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| `sent` | Single check `✓` | `#667781` (gray) | Message sent to server |
| `delivered` | Double check `✓✓` | `#667781` (gray) | Message delivered to recipient |
| `read` | Double check `✓✓` | `#53BDEB` (blue) | Message read by recipient |

- Checks render inline after the timestamp, separated by a 4px gap
- Check icon size: 16px wide, stroke-width ~1.5px
- Use SVG paths for the checkmarks (not text characters) to match WhatsApp's rounded style
- The second check in double-check overlaps the first slightly (offset ~4px left)

### Sizing

- Line height: `1.5` → `1.35`
- Padding: `10px 14px` → `6px 12px`

### Typing indicator

- Dot color: `rgba(54,42,130,0.4)` → `#667781`

---

## Step 2: Update `PhoneMockup.tsx`

**File:** `src/components/PhoneMockup.tsx`

### Status bar

Replace emoji indicators (📶 🔋) with styled divs:

- Signal bars: 4 small rectangles of increasing height
- Battery: rectangle with inner fill + nub
- Color: `#1a1a1a`, font-weight 600

### WhatsApp header (keep purple `#362A82`)

- Replace `←` text with SVG back arrow
- Add right-side icons: video call SVG, phone call SVG, three-dot menu
- Reduce avatar to 36px, use `#DFE5E7` background (WhatsApp default avatar gray)
- Tighten padding: `14px 16px` → `10px 12px`

### Chat area background

- Color: `#E8F5FC` → `#ECE5DD` (WhatsApp beige)
- Add subtle CSS-gradient dot pattern overlay at low opacity for texture
- Reduce gap: `10` → `6`

### Input bar

- Background: match `#ECE5DD`
- White pill input with: emoji smiley SVG (left), placeholder text, attachment clip SVG, camera SVG
- Icon color: `#8696A0` (WhatsApp gray)
- Mic button: keep purple `#362A82`, use SVG mic icon instead of 🎤 emoji

---

## Step 3: Update scene inline elements

Update buttons and cards in scenes to look like WhatsApp interactive messages.

### Buttons (SceneDeposit, SceneRepeatInvite, SceneThankYou)

WhatsApp business buttons are white with colored text:

- Background: `#FFFFFF`
- Text color: `#362A82` (brand purple)
- Border: `1px solid #E0E0E0`
- Border radius: `8px`
- Subtle shadow: `0 1px 2px rgba(0,0,0,0.06)`

**Files:**

- `src/sequences/SceneDeposit.tsx` — "Pay AED 50 Deposit" button + payment confirmed styling
- `src/sequences/SceneRepeatInvite.tsx` — "Rebook Max" button
- `src/sequences/SceneThankYou.tsx` — "Rebook Now" and "Leave Review" buttons

### Cards (SceneSlotPick, SceneThankYou)

- Background: solid `#FFFFFF` (remove gradient)
- Border: `1px solid #E0E0E0`
- Shadow: `0 1px 2px rgba(0,0,0,0.06)`
- Tag pills: `#E7F5E3` background (light green) with `#111B21` text

**Files:**

- `src/sequences/SceneSlotPick.tsx` — Pet profile card
- `src/sequences/SceneThankYou.tsx` — Rating card

### Photo grid (SceneGroomingPics)

- `src/sequences/SceneGroomingPics.tsx` — Update photo placeholders to white bg + subtle border

---

## Step 4: Visual QA

- Run `npm run dev` to open Remotion Studio
- Scrub through all 10 scenes and compare against real WhatsApp
- Fine-tune padding/sizing if elements overflow the phone mockup

---

## Verification

1. `npm run lint` — Ensure no TypeScript/ESLint errors
2. Open Remotion Studio (`npm run dev`) and check each scene visually
3. Key visual checks:
   - Bubble tails render correctly on both sides
   - Timestamps + blue ticks visible in every bubble
   - Chat background is beige with subtle texture
   - Input bar has emoji/clip/camera icons
   - Header has video/phone/menu icons
   - All scene-specific cards and buttons use white WhatsApp style
