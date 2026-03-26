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
 * Total: 40 seconds (1200 frames @ 30fps)
 *
 * Scene 1: HOOK           (0–4s)    "Still chasing bookings manually?"
 * Scene 2: BOOKING REQ    (4–8s)    Client sends WhatsApp message
 * Scene 3: CAMI REPLY     (8–12.5s) AI replies instantly with slots
 * Scene 4: SLOT PICK      (12.5–17s) Client picks + pet profile
 * Scene 5: DEPOSIT        (17–21s)  Payment inside WhatsApp
 * Scene 6: CONFIRMATION   (21–25s)  Auto-confirm + 24h reminder
 * Scene 7: GROOMING PICS  (25–29s)  In-store pics updated
 * Scene 8: THANK YOU      (29–33s)  Thanks + rebook/rate prompt
 * Scene 9: REPEAT INVITE  (33–36.5s) 1-month recurring invite
 * Scene 10: OUTRO         (36.5–40s) Cami CTA
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

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneBookingRequest />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 4.5)}>
          <SceneCamiReply />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 4.5)}>
          <SceneSlotPick />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneDeposit />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneConfirmation />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneGroomingPics />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 4}>
          <SceneThankYou />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 3.5)}>
          <SceneRepeatInvite />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 3.5)}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
