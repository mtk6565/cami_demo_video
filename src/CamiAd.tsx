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
 * Total: 41.5 seconds (1245 frames @ 30fps)
 *
 * Scene 1: HOOK             (0–6s)       "Meet Cami"
 * Scene 2: WHATSAPP FLOW    (6–37.5s)    Unified persistent WhatsApp conversation
 *   Phase 1: Booking Request  (6–9.5s)   Client sends WhatsApp message
 *   Phase 2: Cami Reply       (9.5–14.5s) AI replies instantly with slots
 *   Phase 3: Slot Pick        (14.5–20.5s) Client picks a time + pet preferences
 *   Phase 4: Deposit          (20.5–24s) Payment confirmed, slot locked
 *   Phase 5: Confirmation     (24–28s)   Auto-confirm + 24h reminder
 *   Phase 6: Grooming Pics    (28–30.5s) In-store pics
 *   Phase 7: Thank You        (30.5–33.5s) Thank You & Reviews
 *   Phase 8: Repeat Invite    (33.5–37.5s) 1-month recurring invite
 * Scene 3: OUTRO             (37.5–41.5s) Cami CTA
 */

/** Frames to delay audio after its visual phase starts — lets animations land first */
const AUDIO_DELAY = 6;

export const CamiAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAFBFC",
        fontFamily: FONT_BODY,
      }}
    >
      {/*
       * Audio is embedded INSIDE each Series.Sequence so AUDIO_DELAY
       * is relative to the scene/phase start — not a global absolute frame.
       */}
      <Series>
        <Series.Sequence durationInFrames={fps * 6}>
          <SceneHook />
          <Sequence from={AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/hook.mp3")} /></Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={945}>
          <SceneWhatsAppFlow />
          {/* Phase audio — offset = phase start + AUDIO_DELAY */}
          <Sequence from={0 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase1.mp3")} /></Sequence>
          <Sequence from={105 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase2.mp3")} /></Sequence>
          <Sequence from={255 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase3.mp3")} /></Sequence>
          <Sequence from={435 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase4.mp3")} /></Sequence>
          <Sequence from={540 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase5.mp3")} /></Sequence>
          <Sequence from={660 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase6.mp3")} /></Sequence>
          <Sequence from={735 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase7.mp3")} /></Sequence>
          <Sequence from={825 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase8.mp3")} /></Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneOutro />
          <Sequence from={AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/outro.mp3")} /></Sequence>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
