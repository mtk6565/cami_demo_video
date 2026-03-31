# Standardize Button-Like Elements (Phases 3, 5, 7, 8)

## Context

Four phases in `SceneWhatsAppFlow.tsx` have button-like elements with inconsistent styling:
- **Phase 3** (`PaymentButton`, line 411): card style, single full-width
- **Phase 5** (`QuickReplyButtons` component): pill style, inline wrap — the outlier
- **Phase 7** (`RebookButtons`, line 632): card style, two equal-width side by side
- **Phase 8** (`RebookCTA`, line 691): card style, single full-width

User chose **card style** as the standard: `borderRadius: 8`, `border: 1px solid #E0E0E0`, `fontSize: 15`, `fontWeight: 700`, `padding: 14px 20px`, white background, purple text, subtle shadow, fade-in spring animation.

## Plan

### Step 1: Update `QuickReplyButtons` component

File: `src/components/QuickReplyButtons.tsx`

Restyle from pill to card:
- `borderRadius`: 20 → **8**
- `border`: `1.5px solid #7C3AED` → **`1px solid #E0E0E0`**
- `padding`: `6px 16px` → **`10px 16px`** (slightly smaller than full-width to work for inline buttons)
- `fontSize`: 16 → **15**
- `fontWeight`: 600 → **700**
- Add `boxShadow: "0 1px 2px rgba(0,0,0,0.06)"`
- Keep the staggered pop animation (it works well for multi-button layouts)

Add a `layout` prop to support different arrangements:
- `"inline"` (default): current flex-start wrap behavior — used by Phase 5
- `"row"`: equal-width side by side (`flex: 1`) — used by Phase 7
- `"full"`: single full-width button — used by Phases 3 and 8

### Step 2: Replace inline button components in `SceneWhatsAppFlow.tsx`

- **Phase 3**: Replace `<PaymentButton>` with `<QuickReplyButtons layout="full" buttons={[{label: "Pay AED 50 Deposit", emoji: "💳"}]} delay={35} />`
- **Phase 5**: Already uses `<QuickReplyButtons>` — just benefits from the style update (no code change needed)
- **Phase 7**: Replace `<RebookButtons>` with `<QuickReplyButtons layout="row" buttons={[{label: "Rebook Now", emoji: "📅"}, {label: "Leave Review", emoji: "⭐"}]} delay={60} />`
- **Phase 8**: Replace `<RebookCTA>` with `<QuickReplyButtons layout="full" buttons={[{label: "Rebook Bella — 15% Off", emoji: "🐕"}]} delay={45} />`

### Step 3: Remove dead code

Delete `PaymentButton`, `RebookButtons`, and `RebookCTA` inline components from `SceneWhatsAppFlow.tsx` (lines 411–724).

## Files to modify

1. `src/components/QuickReplyButtons.tsx` — restyle + add `layout` prop
2. `src/sequences/SceneWhatsAppFlow.tsx` — swap in `QuickReplyButtons`, remove inline components

## Verification

1. `npm run lint` — ensure no TypeScript/ESLint errors
2. `npm run dev` — visually verify in Remotion Studio:
   - Phase 3: single full-width "Pay AED 50 Deposit" button, card style
   - Phase 5: two inline buttons "Confirm" / "Reschedule", card style
   - Phase 7: two equal-width "Rebook Now" / "Leave Review", card style  
   - Phase 8: single full-width "Rebook Bella — 15% Off", card style
   - All buttons share: white bg, gray border, 8px radius, purple text, 15px font, 700 weight, subtle shadow
   - Animations still feel smooth with staggered pop entrance
