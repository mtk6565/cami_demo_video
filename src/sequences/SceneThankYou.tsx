import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepBadge } from "../components/StepBadge";

export const SceneThankYou: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Star rating animation
  const stars = [0, 1, 2, 3, 4];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#fdcb6e" />

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
        <StepBadge step={7} label="Thank & Rebook" />

        <PhoneMockup contactName="Petverse 🐾">
          <ChatBubble
            sender="bot"
            message="Thanks for visiting! 🎉 Max looks amazing. Hope you both loved the experience!"
            delay={5}
          />

          {/* Rating prompt */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a2a35, #162430)",
              borderRadius: 16,
              padding: 16,
              border: "1px solid rgba(253,203,110,0.2)",
              textAlign: "center" as const,
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div style={{ color: "white", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
              How was your experience?
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {stars.map((_, i) => {
                const starDelay = 40 + i * 5;
                const starFrame = Math.max(0, frame - starDelay);
                const starSpring = spring({
                  frame: starFrame,
                  fps,
                  config: { damping: 8, mass: 0.4 },
                });

                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 28,
                      transform: `scale(${interpolate(starSpring, [0, 1], [0, 1.2])})`,
                      opacity: interpolate(starSpring, [0, 1], [0, 1]),
                    }}
                  >
                    ⭐
                  </span>
                );
              })}
            </div>
          </div>

          {/* Rebook button */}
          <div
            style={{
              display: "flex",
              gap: 8,
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div
              style={{
                flex: 1,
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                borderRadius: 10,
                padding: "10px 12px",
                textAlign: "center" as const,
                color: "white",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              📅 Rebook Now
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "10px 12px",
                textAlign: "center" as const,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: 13,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              ⭐ Leave Review
            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
