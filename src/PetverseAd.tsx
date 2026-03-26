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
 * PETVERSE WHATSAPP AI AD — SCENE TIMELINE
 * ==========================================
 * Total: 30 seconds (900 frames @ 30fps)
 *
 * Scene 1: HOOK           (0–3s)    "Still chasing bookings manually?"
 * Scene 2: BOOKING REQ    (3–6s)    Client sends WhatsApp message
 * Scene 3: CAMI REPLY     (6–9.5s)  AI replies instantly with slots
 * Scene 4: SLOT PICK      (9.5–13s) Client picks + pet profile
 * Scene 5: DEPOSIT        (13–16s)  Payment inside WhatsApp
 * Scene 6: CONFIRMATION   (16–19s)  Auto-confirm + 24h reminder
 * Scene 7: GROOMING PICS  (19–22s)  In-store pics updated
 * Scene 8: THANK YOU      (22–25s)  Thanks + rebook/rate prompt
 * Scene 9: REPEAT INVITE  (25–27.5s) 1-month recurring invite
 * Scene 10: OUTRO         (27.5–30s) Petverse CTA
 */

export const PetverseAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        fontFamily: "'Plus Jakarta Sans', 'SF Pro Display', sans-serif",
      }}
    >
      {/* Optional: background music track — drop a file in public/ */}
      {/* <Audio src={staticFile("bgm.mp3")} volume={0.3} /> */}

      <Series>
        <Series.Sequence durationInFrames={fps * 3}>
          <SceneHook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 3}>
          <SceneBookingRequest />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 3.5)}>
          <SceneCamiReply />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 3.5)}>
          <SceneSlotPick />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 3}>
          <SceneDeposit />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 3}>
          <SceneConfirmation />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 3}>
          <SceneGroomingPics />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 3}>
          <SceneThankYou />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 2.5)}>
          <SceneRepeatInvite />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.round(fps * 2.5)}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
