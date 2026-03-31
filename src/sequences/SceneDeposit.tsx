import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneDeposit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Checkmark animation — appears first
  const checkDelay = 5;
  const checkFrame = Math.max(0, frame - checkDelay);
  const checkSpring = spring({ frame: checkFrame, fps, config: { damping: 8, mass: 0.5 } });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#C2F6BA" />

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
          {/* Deposit paid — booking locked (appears first) */}
          {frame >= checkDelay && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transform: `scale(${interpolate(checkSpring, [0, 1], [0, 1])})`,
                opacity: interpolate(checkSpring, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#C2F6BA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  boxShadow: "0 0 30px rgba(194,246,186,0.5)",
                }}
              >
                ✓
              </div>
              <span
                style={{
                  color: "#362A82",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Deposit paid — Booking locked!
              </span>
            </div>
          )}

          <ChatBubble
            sender="bot"
            message={"💳 Paid! Slot locked ✅\n\nSee you on Wednesday at 2 PM — Bella is going to look amazing 🐶✨"}
            delay={30}
          />
        </PhoneMockup>

        <StepProgress currentStep={4} />
      </div>
    </AbsoluteFill>
  );
};
