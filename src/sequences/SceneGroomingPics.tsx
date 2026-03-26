import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepBadge } from "../components/StepBadge";

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
      <GlowBackground color="#e17055" />

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
        <StepBadge step={6} label="Live Updates" />

        <PhoneMockup contactName="Petverse 🐾">
          <ChatBubble
            sender="bot"
            message="Max is having a blast! Here's a sneak peek 📸"
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
                    background: `linear-gradient(135deg, #1a2a35, #1f3545)`,
                    border: "1px solid rgba(37,211,102,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    transform: `scale(${interpolate(cardSpring, [0, 1], [0, 1])}) rotate(${interpolate(cardSpring, [0, 1], [15, 0])}deg)`,
                    opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  {emoji}
                </div>
              );
            })}
          </div>

          <ChatBubble
            sender="bot"
            message="Almost done! He's looking fabulous ✨"
            delay={60}
          />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
