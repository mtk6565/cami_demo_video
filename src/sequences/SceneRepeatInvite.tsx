import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneRepeatInvite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "1 month later" badge animation
  const badgeEntrance = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0.6, 1]);
  const badgeOpacity = interpolate(badgeEntrance, [0, 1], [0, 1]);

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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {/* "1 month later" context badge */}
          <div
            style={{
              background: "rgba(54, 42, 130, 0.1)",
              border: "1.5px solid rgba(54, 42, 130, 0.25)",
              borderRadius: 24,
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: `scale(${badgeScale})`,
              opacity: badgeOpacity,
            }}
          >
            <span style={{ fontSize: 20 }}>🔄</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#362A82",
                letterSpacing: "0.02em",
              }}
            >
              1 month later
            </span>
          </div>

          <PhoneMockup contactName="Pet Business 🐾">
            <ChatBubble
              sender="bot"
              message="Hey Alex! 🎊 It's been a month — Bella must be ready for her next fresh cut 🐾"
              delay={10}
              emoji="💈"
            />
            <ChatBubble
              sender="bot"
              message={"⚡ Book THIS Mon or Tue → save 15%\n⏰ Offer expires Sunday midnight"}
              delay={30}
            />

            {/* CTA — WhatsApp business style */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 8,
                padding: "14px 20px",
                textAlign: "center" as const,
                color: "#362A82",
                fontWeight: 700,
                fontSize: 15,
                border: "1px solid #E0E0E0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                opacity: interpolate(
                  spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 14 } }),
                  [0, 1],
                  [0, 1]
                ),
              }}
            >
              🐕 Rebook Bella — 15% Off
            </div>
          </PhoneMockup>
        </div>

        <StepProgress currentStep={8} />
      </div>
    </AbsoluteFill>
  );
};
