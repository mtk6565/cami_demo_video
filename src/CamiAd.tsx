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
 * Total: 47 seconds (1410 frames @ 30fps)
 *
 * Scene 1: HOOK             (0–4s)      "Still chasing bookings manually?"
 * Scene 2: WHATSAPP FLOW    (4–43s)     Unified persistent WhatsApp conversation
 *   Phase 1: Booking Request  (4–8s)    Client sends WhatsApp message
 *   Phase 2: Cami Reply       (8–13s)   AI replies instantly with slots
 *   Phase 3: Slot Pick        (13–18s)  Client picks + pays deposit
 *   Phase 4: Deposit          (18–23s)  Payment confirmed, slot locked
 *   Phase 5: Confirmation     (23–28s)  Auto-confirm + 24h reminder
 *   Phase 6: Grooming Pics    (28–33s)  In-store pics updated
 *   Phase 7: Thank You        (33–38s)  Thank You & Reviews
 *   Phase 8: Repeat Invite    (38–43s)  1-month recurring invite
 * Scene 3: OUTRO             (43–47s)   Cami CTA
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
      {/* Voiceover clips — one per section, timed to phase starts */}
      <Sequence from={0 * fps} layout="none"><Audio src={staticFile("audio/hook.mp3")} /></Sequence>
      <Sequence from={4 * fps} layout="none"><Audio src={staticFile("audio/phase1.mp3")} /></Sequence>
      <Sequence from={8 * fps} layout="none"><Audio src={staticFile("audio/phase2.mp3")} /></Sequence>
      {/* Phase 3 (13–18s): silence — slot pick visual */}
      <Sequence from={18 * fps} layout="none"><Audio src={staticFile("audio/phase4.mp3")} /></Sequence>
      <Sequence from={23 * fps} layout="none"><Audio src={staticFile("audio/phase5.mp3")} /></Sequence>
      {/* Phase 6 (28–33s): silence — grooming pics */}
      {/* Phase 7 (33–38s): silence — thank you + review */}
      <Sequence from={38 * fps} layout="none"><Audio src={staticFile("audio/phase8.mp3")} /></Sequence>
      <Sequence from={43 * fps} layout="none"><Audio src={staticFile("audio/outro.mp3")} /></Sequence>

      <Series>
        <Series.Sequence durationInFrames={fps * 4}>
          <SceneHook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 39}>
          <SceneWhatsAppFlow />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
