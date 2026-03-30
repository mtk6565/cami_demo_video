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
            message="Hey! It's been a month, Max is probably ready for a fresh cut 🐾"
            delay={10}
            emoji="💈"
          />
          <ChatBubble
            sender="bot"
            message={"🎁 15% off your next one, just for coming back!\n\nGrab a slot 👇"}
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
            🐕{" "}Rebook Max, 15% Off
          </div>
        </PhoneMockup>

        <StepProgress
          currentStep={8}
          extraContent={
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
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                }}
              >
                1 Month Later
              </span>
            </div>
          }
        />
      </div>
    </AbsoluteFill>
  );
};
