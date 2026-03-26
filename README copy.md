# 🐾 Petverse WhatsApp AI Ad — Remotion Project

## 30-Second Ad: Full WhatsApp Booking Journey

A snappy, catchy motion graphics ad showcasing Petverse's AI WhatsApp booking flow — from first message to repeat customer.

---

## ⚡ Quick Setup

### 1. Create a fresh Remotion project

```bash
npx create-video@latest
# Name it: petverse-ad
# Template: Blank
# TailwindCSS: Yes
# Install Skills: Yes
```

### 2. Drop in the source files

Copy the contents of `src/` from this package into your new project's `src/` folder, replacing the defaults:

```bash
# From this project directory:
cp -r src/* /path/to/your/petverse-ad/src/
```

### 3. Install & run

```bash
cd petverse-ad
npm install
npm run dev
```

This opens the Remotion Studio in your browser where you can preview the video.

### 4. Render to MP4

```bash
npx remotion render PetverseWhatsAppAd out/petverse-ad-vertical.mp4
npx remotion render PetverseWhatsAppAd-Landscape out/petverse-ad-landscape.mp4
```

---

## 🎬 Scene Map (30 seconds @ 30fps)

| # | Scene | Duration | What Happens |
|---|-------|----------|-------------|
| 1 | **Hook** | 0–3s | "Still chasing bookings manually?" + pulsing WhatsApp icon |
| 2 | **Booking Request** | 3–6s | Client sends WhatsApp message asking to book |
| 3 | **Cami Reply** | 6–9.5s | AI replies instantly with available time slots |
| 4 | **Slot Pick + Profile** | 9.5–13s | Client picks a slot, pet profile card appears |
| 5 | **Deposit** | 13–16s | Payment button + confirmation inside WhatsApp |
| 6 | **Confirmation + Reminder** | 16–19s | Auto booking confirm + 24h reminder fires |
| 7 | **Grooming Pics** | 19–22s | In-store photos sent to client live |
| 8 | **Thank You** | 22–25s | Star rating + rebook/review prompt |
| 9 | **Repeat Invite** | 25–27.5s | 1-month auto re-engagement with discount |
| 10 | **Outro** | 27.5–30s | Petverse logo + CTA + feature pills |

---

## 🎨 Design System

- **Background**: Dark (#0a0a0a) with animated gradient orbs
- **Primary**: WhatsApp Green (#25D366)
- **Secondary**: Teal (#128C7E)
- **Accent scenes**: Purple (#6c5ce7), Gold (#fdcb6e), Coral (#e17055)
- **Typography**: Plus Jakarta Sans (bold, tight tracking)
- **Phone mockup**: Dark glass-morphism style with WhatsApp chrome

---

## 🤖 Vibe-Coding with Claude Code

Once your project is running, open a second terminal:

```bash
cd petverse-ad
claude
```

### Example prompts to iterate:

**Change the hook text:**
> "Change the hook headline to 'Your clients hate calling. Give them WhatsApp.' and make 'WhatsApp' the accent word in green"

**Add background music:**
> "Add a background music track. I'll put a file called bgm.mp3 in the public folder. Set volume to 0.25 and make it fade out in the last 2 seconds"

**Swap emojis for actual images:**
> "Replace the dog emoji in the pet profile card with an actual golden retriever image. Use a stock photo from public/dog.jpg"

**Adjust timing:**
> "Make scene 1 (hook) 4 seconds instead of 3, and compress scene 9 to 2 seconds"

**Change the color scheme:**
> "Switch the whole ad to a luxury dark gold theme — swap the greens for #D4AF37 gold"

**Add sound effects:**
> "Add a subtle 'pop' sound effect when each chat bubble appears. Use public/pop.mp3"

**Change the CTA:**
> "Update the outro CTA to say 'Book a Demo' instead of 'Get Started Free' and change the URL to petverse.app/demo"

**Make it landscape:**
> "I want to render the landscape version. Adjust the phone mockup to be smaller and add the headline text beside it instead of above"

---

## 📁 File Structure

```
src/
├── Video.tsx              # Composition registration (entry point)
├── PetverseAd.tsx         # Main sequence orchestrator
├── components/
│   ├── PhoneMockup.tsx    # WhatsApp phone frame
│   ├── ChatBubble.tsx     # Chat message bubbles
│   ├── Headline.tsx       # Animated text component
│   ├── StepBadge.tsx      # Step number indicator
│   └── GlowBackground.tsx # Animated gradient background
└── sequences/
    ├── SceneHook.tsx
    ├── SceneBookingRequest.tsx
    ├── SceneCamiReply.tsx
    ├── SceneSlotPick.tsx
    ├── SceneDeposit.tsx
    ├── SceneConfirmation.tsx
    ├── SceneGroomingPics.tsx
    ├── SceneThankYou.tsx
    ├── SceneRepeatInvite.tsx
    └── SceneOutro.tsx
```

---

## 🔧 Customization Checklist

- [ ] Replace emoji avatars with actual Petverse logo/brand assets
- [ ] Add background music (drop `bgm.mp3` in `/public`)
- [ ] Add sound effects for chat bubble pops
- [ ] Swap placeholder pet photos with real grooming shots
- [ ] Update pricing (AED 50 deposit) to match actual pricing
- [ ] Add Petverse website URL
- [ ] Test both vertical (9:16) and landscape (16:9) renders
- [ ] Add Arabic version for GCC market (duplicate scenes, swap text)

---

## 📐 Output Formats

| Format | Resolution | Use Case |
|--------|-----------|----------|
| Vertical (9:16) | 1080×1920 | Instagram Reels, TikTok, Stories |
| Landscape (16:9) | 1920×1080 | YouTube, Website, LinkedIn |

Both are registered as compositions in `Video.tsx`. Render whichever you need.
