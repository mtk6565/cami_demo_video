import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepBadge } from "../components/StepBadge";

export const SceneBookingRequest: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 24,
          padding: "40px 20px",
        }}
      >
        <StepBadge step={1} label="Client Messages" />

        <PhoneMockup contactName="Cami 🐾">
          <ChatBubble
            sender="user"
            message="Hi! I'd like to book a grooming session for my golden retriever, Max 🐕"
            delay={15}
          />
          <ChatBubble
            sender="bot"
            message=""
            typing={true}
            delay={40}
          />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
