import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepBadge } from "../components/StepBadge";

export const SceneRepeatInvite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Calendar loop icon rotation
  const rotation = interpolate(frame, [0, 60], [0, 360], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#E7D3FC" />

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
        <StepBadge step={8} label="Auto Re-engage" />

        {/* Time skip badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: interpolate(
              spring({ frame, fps, config: { damping: 14 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          <div
            style={{
              fontSize: 24,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            🔄
          </div>
          <span
            style={{
              color: "rgba(54,42,130,0.6)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            1 Month Later
          </span>
        </div>

        <PhoneMockup contactName="Cami 🐾">
          <ChatBubble
            sender="bot"
            message="Hey! 🐾 It's been a month since Max's last groom. He's probably due for some pampering!"
            delay={10}
            emoji="💈"
          />
          <ChatBubble
            sender="bot"
            message="🎁 As a returning client, enjoy 15% off your next booking!

Tap below to grab your slot 👇"
            delay={30}
          />

          {/* CTA */}
          <div
            style={{
              background: "linear-gradient(135deg, #362A82, #4a3a9e)",
              borderRadius: 12,
              padding: "14px 20px",
              textAlign: "center" as const,
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 4px 20px rgba(54,42,130,0.3)",
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            🐕 Rebook Max — 15% Off
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
