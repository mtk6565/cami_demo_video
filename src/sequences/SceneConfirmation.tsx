import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { QuickReplyButtons } from "../components/QuickReplyButtons";
import { StepProgress } from "../components/StepProgress";

export const SceneConfirmation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "24 hrs before" badge animation
  const badgeEntrance = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0.6, 1]);
  const badgeOpacity = interpolate(badgeEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground />

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
          {/* "24 hrs before" context badge */}
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
            <span style={{ fontSize: 20 }}>⏰</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#362A82",
                letterSpacing: "0.02em",
              }}
            >
              24 hours before appointment
            </span>
          </div>

          <PhoneMockup contactName="Cami 🐾">
            <ChatBubble
              sender="bot"
              message="Hey! Max is in tomorrow at 2 PM, can't wait to see him 🐶"
              delay={5}
              emoji="🔔"
            />
            <QuickReplyButtons
              delay={30}
              buttons={[
                { label: "Confirm", emoji: "✓" },
                { label: "Reschedule", emoji: "📅" },
              ]}
            />
          </PhoneMockup>
        </div>

        <StepProgress currentStep={5} />
      </div>
    </AbsoluteFill>
  );
};
