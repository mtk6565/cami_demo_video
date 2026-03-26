import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepBadge } from "../components/StepBadge";

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 24,
          padding: "40px 20px",
        }}
      >
        <StepBadge step={5} label="Auto Confirm + Remind" />

        <PhoneMockup contactName="Cami 🐾">
          <ChatBubble
            sender="bot"
            message="✅ Booking Confirmed!

🐕 Max — Full Groom
📅 Wednesday, 2:00 PM
📍 Cami Grooming Studio
💰 Deposit paid ✓

See you soon! 🎉"
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
            message="Hey! 👋 Just a friendly reminder — Max's grooming is tomorrow at 2:00 PM. Can't wait to see him!"
            delay={55}
            emoji="🔔"
          />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
