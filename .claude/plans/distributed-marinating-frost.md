# Plan: Add Custom Fonts (DM Sans + SeasonMix)

## Context

The project has two font families in `public/fonts/` that are currently unused. The root composition references "Plus Jakarta Sans" / "SF Pro Display" which are never loaded. This plan integrates the local fonts using Remotion's `@remotion/fonts` package (the official best practice for local font loading).

- **Body font:** DM Sans (variable TTF, all weights 100-900)
- **Headline font:** SeasonMix (woff2, discrete weight files)

## Steps

### 1. Install `@remotion/fonts`

```bash
npx remotion add @remotion/fonts
```

### 2. Create `src/fonts.ts`

New file that loads both font families and exports constants:

- **DM Sans** — load the two variable font TTFs (normal + italic) with `weight: "100 900"` range syntax
- **SeasonMix** — load 5 woff2 files for weights used in project: 400, 500, 600, 700, 800
- Export `FONT_BODY = "'DM Sans', sans-serif"` and `FONT_HEADLINE = "'SeasonMix', sans-serif"`
- Uses top-level `await` (Remotion supports ESM module evaluation)

### 3. Update `src/CamiAd.tsx`

- Import `FONT_BODY` from `./fonts`
- Replace `fontFamily: "'Plus Jakarta Sans', 'SF Pro Display', sans-serif"` with `fontFamily: FONT_BODY`
- All child components inherit DM Sans via CSS inheritance — no per-scene changes needed

### 4. Update `src/components/Headline.tsx`

- Import `FONT_HEADLINE` from `../fonts`
- Add `fontFamily: FONT_HEADLINE` to the span style (alongside existing `fontWeight: 800`)
- Only `Headline.tsx` needs the override — it's the single gateway for all headline text

## Files

| File | Action |
|---|---|
| `src/fonts.ts` | **Create** — font loading + constants |
| `src/CamiAd.tsx` | **Edit** — import fonts, swap fontFamily |
| `src/components/Headline.tsx` | **Edit** — add SeasonMix fontFamily |
| `package.json` | Auto-updated by `npx remotion add` |

## Verification

1. `npm run lint` — confirm no TypeScript or ESLint errors
2. `npm run dev` — open Remotion Studio, visually confirm:
   - Headlines (SceneHook, SceneOutro) render in SeasonMix Heavy
   - All other text (chat bubbles, badges, buttons, brand name) renders in DM Sans
   - Font weights look correct across all 10 scenes
