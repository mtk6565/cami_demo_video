import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepBadge } from "../components/StepBadge";

export const SceneDeposit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Checkmark animation
  const checkDelay = 55;
  const checkFrame = Math.max(0, frame - checkDelay);
  const checkSpring = spring({ frame: checkFrame, fps, config: { damping: 8, mass: 0.5 } });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#00b894" />

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
        <StepBadge step={4} label="Pay Inside WhatsApp" />

        <PhoneMockup contactName="Petverse 🐾">
          <ChatBubble
            sender="bot"
            message="Here's your booking summary:

🐕 Max — Full Groom Package
📅 Wed, 2:00 PM
💰 Deposit: AED 50

Tap below to pay securely 👇"
            delay={5}
          />

          {/* Payment button */}
          <div
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              borderRadius: 12,
              padding: "14px 20px",
              textAlign: "center" as const,
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            💳 Pay AED 50 Deposit
          </div>

          {/* Payment confirmed */}
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
                  background: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  boxShadow: "0 0 30px rgba(37,211,102,0.5)",
                }}
              >
                ✓
              </div>
              <span
                style={{
                  color: "#25D366",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Payment received!
              </span>
            </div>
          )}
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
