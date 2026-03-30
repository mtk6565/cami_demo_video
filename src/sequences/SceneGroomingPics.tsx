import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
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

  // Photo cards stagger animation
  const photoCards = ["🛁", "✂️", "🐕‍🦺"];

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

          {/* Photo grid */}
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              padding: "4px 0",
            }}
          >
            {photoCards.map((emoji, i) => {
              const cardDelay = 20 + i * 12;
              const cardFrame = Math.max(0, frame - cardDelay);
              const cardSpring = spring({
                frame: cardFrame,
                fps,
                config: { damping: 12, mass: 0.6 },
              });

              return (
                <div
                  key={i}
                  style={{
                    width: 85,
                    height: 85,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, #ffffff, #f0f4ff)`,
                    border: "1px solid rgba(54,42,130,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    transform: `scale(${interpolate(cardSpring, [0, 1], [0, 1])}) rotate(${interpolate(cardSpring, [0, 1], [15, 0])}deg)`,
                    opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                    boxShadow: "0 4px 15px rgba(54,42,130,0.12)",
                  }}
                >
                  {emoji}
                </div>
              );
            })}
          </div>

          <ChatBubble
            sender="bot"
            message="Nearly done, looking fresh ✨"
            delay={60}
          />
        </PhoneMockup>

        <StepProgress currentStep={6} />
      </div>
    </AbsoluteFill>
  );
};
