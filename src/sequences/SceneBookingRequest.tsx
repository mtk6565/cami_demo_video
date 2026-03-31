import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneBookingRequest: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
            sender="user"
            message="Hey, can I book Max in for a groom? 🐕"
            delay={15}
          />
          {/* Cami AI typing label */}
          {frame >= 38 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingLeft: 12,
                marginBottom: -2,
                opacity: interpolate(
                  spring({
                    frame: Math.max(0, frame - 38),
                    fps,
                    config: { damping: 20, mass: 0.8, stiffness: 120 },
                  }),
                  [0, 1],
                  [0, 1]
                ),
                transform: `translateY(${interpolate(
                  spring({
                    frame: Math.max(0, frame - 38),
                    fps,
                    config: { damping: 20, mass: 0.8, stiffness: 120 },
                  }),
                  [0, 1],
                  [6, 0]
                )}px)`,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #362A82 0%, #5B4CBF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  lineHeight: 1,
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              >
                AI
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: "#667781",
                  fontStyle: "italic",
                  letterSpacing: 0.2,
                }}
              >
                Cami AI is typing
              </span>
            </div>
          )}
          <ChatBubble
            sender="bot"
            message=""
            typing={true}
            delay={40}
          />
        </PhoneMockup>

        <StepProgress currentStep={1} />
      </div>
    </AbsoluteFill>
  );
};
