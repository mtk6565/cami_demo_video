import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
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

  // "24h later" time skip effect
  const timeSkipDelay = 40;
  const timeSkipFrame = Math.max(0, frame - timeSkipDelay);
  const timeSkip = spring({ frame: timeSkipFrame, fps, config: { damping: 14 } });

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
        <PhoneMockup contactName="Cami 🐾">
          <ChatBubble
            sender="bot"
            message="✅ You're booked!

🐕 Max, Full Groom
📅 Wed, 2 PM
📍 Cami Studio
💰 Paid ✓

See you then!"
            delay={5}
          />

          {/* Time skip divider */}
          {frame >= timeSkipDelay && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
                opacity: interpolate(timeSkip, [0, 1], [0, 1]),
                transform: `scaleX(${interpolate(timeSkip, [0, 1], [0, 1])})`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(54,42,130,0.12)",
                }}
              />
              <span
                style={{
                  color: "rgba(54,42,130,0.5)",
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                ⏰ 24 HOURS BEFORE
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(54,42,130,0.12)",
                }}
              />
            </div>
          )}

          <ChatBubble
            sender="bot"
            message="Quick heads up, Max is in tomorrow at 2 PM! Can't wait to see him 🐶"
            delay={55}
            emoji="🔔"
          />
        </PhoneMockup>

        <StepProgress currentStep={5} />
      </div>
    </AbsoluteFill>
  );
};
