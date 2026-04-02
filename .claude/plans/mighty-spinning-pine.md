# Plan: Add WhatsApp-Friendly Video Composition

## Context

The video is being sent directly to pet business receptionists via WhatsApp. The current compositions (1080x1920 portrait, 1920x1080 landscape) are optimized for Reels/TikTok/YouTube — they produce large files that WhatsApp will heavily compress, degrading quality. A dedicated WhatsApp composition with optimized dimensions will look better after WhatsApp's compression.

## WhatsApp Video Constraints

- **Max file size**: 16MB (most regions)
- **Supported**: MP4 (H.264 + AAC)
- **WhatsApp compresses all videos** — sending a smaller, optimized file means less quality loss
- **Portrait works well** — WhatsApp chats are viewed on phones

## Approach

Add a new `CamiWhatsAppAd-WhatsApp` composition at **720x1280** (9:16 portrait) — this is the sweet spot for WhatsApp:
- Half the pixels of 1080x1920 → much smaller file size
- Still 9:16 portrait → fills the chat preview nicely
- WhatsApp applies less aggressive compression to already-small files
- No layout changes needed — `CamiAd` already adapts via flexbox

### Files to modify

1. **`src/Video.tsx`** — Add new composition:
   ```tsx
   <Composition
     id="CamiWhatsAppAd-WhatsApp"
     component={CamiAd}
     durationInFrames={1095}
     fps={30}
     width={720}
     height={1280}
   />
   ```

2. **`CLAUDE.md`** — Add render command for the new composition:
   ```
   npx remotion render CamiWhatsAppAd-WhatsApp out/video-whatsapp.mp4
   ```

## Verification

1. `npm run dev` — Open Remotion Studio, select the `CamiWhatsAppAd-WhatsApp` composition, visually confirm it looks correct at 720x1280
2. Render: `npx remotion render CamiWhatsAppAd-WhatsApp out/video-whatsapp.mp4`
3. Check output file size is under 16MB
4. If still too large, can add `--codec h264 --crf 28` flags to reduce further
