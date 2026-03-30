import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneCamiReply: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "Instant" badge animation
  const badgeDelay = 25;
  const badgeFrame = Math.max(0, frame - badgeDelay);
  const badgeSpring = spring({ frame: badgeFrame, fps, config: { damping: 10 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#362A82" intensity={1.2} />

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
            message="Hi! I'd like to book a grooming for Max 🐕"
            delay={0}
          />
          <ChatBubble
            sender="bot"
            message="Hey there! 👋 I'd love to help book Max in! Here are the available slots this week:"
            delay={10}
            emoji="🤖"
          />
          <ChatBubble
            sender="bot"
            message="📅 Tue 10:00 AM
📅 Wed 2:00 PM
📅 Thu 11:30 AM
📅 Sat 9:00 AM

Just tap the one that works!"
            delay={30}
          />
        </PhoneMockup>

        <StepProgress
          currentStep={2}
          extraContent={
            frame >= badgeDelay ? (
              <div
                style={{
                  transform: `scale(${badgeScale}) rotate(-8deg)`,
                  background: "linear-gradient(135deg, #362A82, #4a3a9e)",
                  borderRadius: 16,
                  padding: "8px 18px",
                  color: "white",
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: "0 8px 30px rgba(54,42,130,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                ⚡ INSTANT
              </div>
            ) : undefined
          }
        />
      </div>
    </AbsoluteFill>
  );
};
