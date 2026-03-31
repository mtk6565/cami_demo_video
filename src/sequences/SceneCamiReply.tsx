import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneCamiReply: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );


  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#7C3AED" intensity={1.2} />

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
            sender="bot"
            message={"Hey Alex, hope you and Bella are doing well!\nOf course! 👋 Here's what's open this week:"}
            delay={0}
          />
          <ChatBubble
            sender="bot"
            message={"📅 Tue 10 AM  |  Wed 2 PM  |  Thu 11:30 AM  |  Sat 9 AM\n\nJust pick one 👆"}
            delay={20}
            showTail={false}
          />
        </PhoneMockup>

        <StepProgress currentStep={2} />
      </div>
    </AbsoluteFill>
  );
};
