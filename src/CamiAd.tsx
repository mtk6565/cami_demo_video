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
 * Total: 36.5 seconds (1095 frames @ 30fps)
 *
 * Scene 1: HOOK             (0–5s)       "Introducing Cami"
 * Scene 2: WHATSAPP FLOW    (5–32.5s)    Unified persistent WhatsApp conversation
 *   Phase 1: Booking Request  (5–8.5s)   Client sends WhatsApp message
 *   Phase 2: Cami Reply       (8.5–12.5s) AI replies instantly with slots
 *   Phase 3: Slot Pick        (12.5–15.5s) Client picks a time
 *   Phase 4: Deposit          (15.5–19s) Payment confirmed, slot locked
 *   Phase 5: Confirmation     (19–23s)   Auto-confirm + 24h reminder
 *   Phase 6: Grooming Pics    (23–25.5s) In-store pics
 *   Phase 7: Thank You        (25.5–28.5s) Thank You & Reviews
 *   Phase 8: Repeat Invite    (28.5–32.5s) 1-month recurring invite
 * Scene 3: OUTRO             (32.5–36.5s) Cami CTA
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
      {/* Hook starts at absolute frame 0, WhatsApp flow starts at frame 150 */}
      <Sequence from={0} layout="none"><Audio src={staticFile("audio/hook.mp3")} /></Sequence>
      <Sequence from={150 + 0 + 6} layout="none"><Audio src={staticFile("audio/phase1.mp3")} /></Sequence>
      <Sequence from={150 + 105 + 6} layout="none"><Audio src={staticFile("audio/phase2.mp3")} /></Sequence>
      <Sequence from={150 + 225 + 6} layout="none"><Audio src={staticFile("audio/phase3.mp3")} /></Sequence>
      <Sequence from={150 + 315 + 6} layout="none"><Audio src={staticFile("audio/phase4.mp3")} /></Sequence>
      <Sequence from={150 + 420 + 6} layout="none"><Audio src={staticFile("audio/phase5.mp3")} /></Sequence>
      <Sequence from={150 + 540 + 6} layout="none"><Audio src={staticFile("audio/phase6.mp3")} /></Sequence>
      <Sequence from={150 + 615 + 6} layout="none"><Audio src={staticFile("audio/phase7.mp3")} /></Sequence>
      <Sequence from={150 + 705 + 6} layout="none"><Audio src={staticFile("audio/phase8.mp3")} /></Sequence>
      <Sequence from={975 + 6} layout="none"><Audio src={staticFile("audio/outro.mp3")} /></Sequence>

      <Series>
        <Series.Sequence durationInFrames={fps * 5}>
          <SceneHook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={825}>
          <SceneWhatsAppFlow />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
