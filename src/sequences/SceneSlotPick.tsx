import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneSlotPick: React.FC = () => {
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
        <PhoneMockup contactName="Pet Business 🐾">
          <ChatBubble
            sender="user"
            message="Wed 2 PM pls! 🙌"
            delay={8}
          />
          <ChatBubble
            sender="bot"
            message={"Great pick! 🙌\n\n🐕 Bella — Full Groom\n📅 Wed, 2 PM\n\nWe'll use her special shampoo too 🧴🐾\n\nJust pay the deposit to lock it in 👇"}
            delay={20}
          />

          {/* Payment button — WhatsApp business style */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 8,
              padding: "14px 20px",
              textAlign: "center" as const,
              color: "#7C3AED",
              fontWeight: 700,
              fontSize: 15,
              border: "1px solid #E0E0E0",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            💳{" "}Pay AED 50 Deposit
          </div>
        </PhoneMockup>

        <StepProgress currentStep={3} />
      </div>
    </AbsoluteFill>
  );
};
