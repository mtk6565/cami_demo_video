import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { SceneHook } from "./sequences/SceneHook";
import { SceneWhatsAppFlow } from "./sequences/SceneWhatsAppFlow";
import { SceneOutro } from "./sequences/SceneOutro";
import { FONT_BODY } from "./fonts";

/*
 * CAMI WHATSAPP AI AD — SCENE TIMELINE
 * ==========================================
 * Total: 38 seconds (1140 frames @ 30fps)
 *
 * Scene 1: HOOK             (0–4s)       "Introducing Cami"
 * Scene 2: WHATSAPP FLOW    (4–34s)      Unified persistent WhatsApp conversation
 *   Phase 1: Booking Request  (4–8s)     Client sends WhatsApp message
 *   Phase 2: Cami Reply       (8–12.5s)  AI replies instantly with slots
 *   Phase 3: Slot Pick        (12.5–16s) Client picks a time
 *   Phase 4: Deposit          (16–19.5s) Payment confirmed, slot locked
 *   Phase 5: Confirmation     (19.5–23.5s) Auto-confirm + 24h reminder
 *   Phase 6: Grooming Pics    (23.5–26.5s) In-store pics
 *   Phase 7: Thank You        (26.5–30s) Thank You & Reviews
 *   Phase 8: Repeat Invite    (30–34s)   1-month recurring invite
 * Scene 3: OUTRO             (34–38s)    Cami CTA
 */

export const CamiAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#E8F5FC",
        fontFamily: FONT_BODY,
      }}
    >
      {/* Voiceover clips — 6 frame (0.2s) delay lets visual transitions land first */}
      {/* Hook starts at absolute frame 0, WhatsApp flow starts at frame 120 */}
      <Sequence from={0} layout="none"><Audio src={staticFile("audio/hook.mp3")} /></Sequence>
      <Sequence from={120 + 0 + 6} layout="none"><Audio src={staticFile("audio/phase1.mp3")} /></Sequence>
      <Sequence from={120 + 120 + 6} layout="none"><Audio src={staticFile("audio/phase2.mp3")} /></Sequence>
      <Sequence from={120 + 255 + 6} layout="none"><Audio src={staticFile("audio/phase3.mp3")} /></Sequence>
      <Sequence from={120 + 360 + 6} layout="none"><Audio src={staticFile("audio/phase4.mp3")} /></Sequence>
      <Sequence from={120 + 465 + 6} layout="none"><Audio src={staticFile("audio/phase5.mp3")} /></Sequence>
      <Sequence from={120 + 585 + 6} layout="none"><Audio src={staticFile("audio/phase6.mp3")} /></Sequence>
      <Sequence from={120 + 675 + 6} layout="none"><Audio src={staticFile("audio/phase7.mp3")} /></Sequence>
      <Sequence from={120 + 780 + 6} layout="none"><Audio src={staticFile("audio/phase8.mp3")} /></Sequence>
      <Sequence from={1020 + 6} layout="none"><Audio src={staticFile("audio/outro.mp3")} /></Sequence>

      <Series>
        <Series.Sequence durationInFrames={fps * 4}>
          <SceneHook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={900}>
          <SceneWhatsAppFlow />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
