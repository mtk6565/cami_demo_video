import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { SceneStart } from "./sequences/SceneStart";
import { SceneHook } from "./sequences/SceneHook";
import { SceneWhatsAppFlow } from "./sequences/SceneWhatsAppFlow";
import { SceneOutro } from "./sequences/SceneOutro";
import { FONT_BODY } from "./fonts";

/*
 * CAMI WHATSAPP AI AD — SCENE TIMELINE
 * ==========================================
 * Total: 49.67 seconds (1490 frames @ 30fps)
 *
 * Scene 0: START             (0–4.17s)    "Tired of juggling bookings?" + floating bubbles
 * Scene 1: HOOK              (4.17–10.37s) "Meet Cami"
 * Scene 2: WHATSAPP FLOW     (10.37–45.87s) Unified persistent WhatsApp conversation
 *   Phase 1: Booking Request  (10–13.5s)  Client sends WhatsApp message
 *   Phase 2: Cami Reply       (13.5–18.5s) AI replies instantly with slots
 *   Phase 3: Slot Pick        (18.5–24.5s) Client picks a time + pet preferences
 *   Phase 4: Deposit          (24.5–28s)  Payment confirmed, slot locked
 *   Phase 5: Confirmation     (28–32.5s)  Auto-confirm + 24h reminder
 *   Phase 6: Grooming Pics    (32.5–35s)  In-store pics
 *   Phase 7: Thank You        (35–40.5s)  Thank You & Reviews
 *   Phase 8: Repeat Invite    (40.5–45.5s) 1-month recurring invite
 * Scene 3: OUTRO             (45.5–49.5s) Cami CTA
 */

/** Frames to delay audio after its visual phase starts — lets animations land first */
const AUDIO_DELAY = 6;

export const CamiAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#E8F5FC",
        fontFamily: FONT_BODY,
      }}
    >
      {/*
       * Audio is embedded INSIDE each Series.Sequence so AUDIO_DELAY
       * is relative to the scene/phase start — not a global absolute frame.
       */}
      <Series>
        <Series.Sequence durationInFrames={125}>
          <SceneStart />
          <Sequence from={AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/start.mp3")} /></Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 6 + 6}>
          <SceneHook />
          <Sequence from={AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/hook.mp3")} /></Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={1065}>
          <SceneWhatsAppFlow />
          {/* Phase audio — offset = phase start + AUDIO_DELAY */}
          <Sequence from={0 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase1.mp3")} /></Sequence>
          <Sequence from={105 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase2.mp3")} /></Sequence>
          <Sequence from={255 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase3.mp3")} /></Sequence>
          <Sequence from={435 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase4.mp3")} /></Sequence>
          <Sequence from={540 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase5.mp3")} /></Sequence>
          <Sequence from={675 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase6.mp3")} /></Sequence>
          <Sequence from={750 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase7.mp3")} /></Sequence>
          <Sequence from={915 + AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/phase8.mp3")} /></Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneOutro />
          <Sequence from={AUDIO_DELAY} layout="none"><Audio src={staticFile("audio/outro.mp3")} /></Sequence>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
