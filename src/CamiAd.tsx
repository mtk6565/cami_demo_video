import React from "react";
import {
  AbsoluteFill,
  Series,
  useVideoConfig,
  Audio,
  staticFile,
} from "remotion";
import { SceneHook } from "./sequences/SceneHook";
import { SceneBookingRequest } from "./sequences/SceneBookingRequest";
import { SceneCamiReply } from "./sequences/SceneCamiReply";
import { SceneSlotPick } from "./sequences/SceneSlotPick";
import { SceneDeposit } from "./sequences/SceneDeposit";
import { SceneConfirmation } from "./sequences/SceneConfirmation";
import { SceneGroomingPics } from "./sequences/SceneGroomingPics";
import { SceneThankYou } from "./sequences/SceneThankYou";
import { SceneRepeatInvite } from "./sequences/SceneRepeatInvite";
import { SceneOutro } from "./sequences/SceneOutro";

/*
 * CAMI WHATSAPP AI AD — SCENE TIMELINE
 * ==========================================
 * Total: 48 seconds (1440 frames @ 30fps)
 *
 * Scene 1: HOOK           (0–4s)     "Still chasing bookings manually?"
 * Scene 2: BOOKING REQ    (4–9s)     Client sends WhatsApp message
 * Scene 3: CAMI REPLY     (9–14s)    AI replies instantly with slots
 * Scene 4: SLOT PICK      (14–19s)   Client picks + pet profile
 * Scene 5: DEPOSIT        (19–24s)   Payment inside WhatsApp
 * Scene 6: CONFIRMATION   (24–29s)   Auto-confirm + 24h reminder
 * Scene 7: GROOMING PICS  (29–34s)   In-store pics updated
 * Scene 8: THANK YOU      (34–39s)   Thanks + rebook/rate prompt
 * Scene 9: REPEAT INVITE  (39–44s)   1-month recurring invite
 * Scene 10: OUTRO         (44–48s)   Cami CTA
 */

export const CamiAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#E8F5FC",
        fontFamily: "'Plus Jakarta Sans', 'SF Pro Display', sans-serif",
      }}
    >
      {/* Optional: background music track — drop a file in public/ */}
      {/* <Audio src={staticFile("bgm.mp3")} volume={0.3} /> */}

      <Series>
        <Series.Sequence durationInFrames={fps * 4}>
          <SceneHook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 3}>
          <SceneBookingRequest />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneCamiReply />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneSlotPick />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneDeposit />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneConfirmation />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneGroomingPics />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneThankYou />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <SceneRepeatInvite />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
