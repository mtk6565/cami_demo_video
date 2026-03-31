import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, spring, staticFile } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneGroomingPics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Image entrance animation
  const imgDelay = 20;
  const imgFrame = Math.max(0, frame - imgDelay);
  const imgSpring = spring({
    frame: imgFrame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#E7D3FC" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 60,
          padding: "40px 60px",
        }}
      >
        <PhoneMockup contactName="Cami 🐾">
          <ChatBubble
            sender="bot"
            message="Max is loving it! Sneak peek 📸"
            delay={5}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "4px 0",
              transform: `scale(${interpolate(imgSpring, [0, 1], [0, 1])})`,
              opacity: interpolate(imgSpring, [0, 1], [0, 1]),
            }}
          >
            <Img
              src={staticFile("images/bella.jpg")}
              style={{
                width: 260,
                height: 260,
                borderRadius: 12,
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </PhoneMockup>

        <StepProgress currentStep={6} />
      </div>
    </AbsoluteFill>
  );
};
