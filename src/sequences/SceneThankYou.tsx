import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, spring, staticFile } from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { StepProgress } from "../components/StepProgress";

export const SceneThankYou: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // After-grooming photo animation
  const imgDelay = 20;
  const imgFrame = Math.max(0, frame - imgDelay);
  const imgSpring = spring({
    frame: imgFrame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  // Star rating animation
  const stars = [0, 1, 2, 3, 4];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#F8F96C" />

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
            message="Bella is ALL DONE! 🎉 She looks incredible — we're obsessed 🥰"
            delay={5}
          />

          {/* After-grooming photo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "4px 0",
              transform: `scale(${interpolate(imgSpring, [0, 1], [0, 1])})`,
              opacity: interpolate(imgSpring, [0, 1], [0, 1]),
            }}
          >
            <Img
              src={staticFile("images/bella_after.jpg")}
              style={{
                width: 260,
                height: 260,
                borderRadius: 12,
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
          </div>

          {/* Rating card — WhatsApp style */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              border: "1px solid #E0E0E0",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              textAlign: "center" as const,
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div style={{ color: "#1a1a2e", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
              How was your experience?
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {stars.map((_, i) => {
                const starDelay = 40 + i * 5;
                const starFrame = Math.max(0, frame - starDelay);
                const starSpring = spring({
                  frame: starFrame,
                  fps,
                  config: { damping: 8, mass: 0.4 },
                });

                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 28,
                      transform: `scale(${interpolate(starSpring, [0, 1], [0, 1.2])})`,
                      opacity: interpolate(starSpring, [0, 1], [0, 1]),
                    }}
                  >
                    ⭐
                  </span>
                );
              })}
            </div>
          </div>

          {/* Rebook button */}
          <div
            style={{
              display: "flex",
              gap: 8,
              opacity: interpolate(
                spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div
              style={{
                flex: 1,
                background: "#FFFFFF",
                borderRadius: 8,
                padding: "10px 12px",
                textAlign: "center" as const,
                color: "#362A82",
                fontWeight: 700,
                fontSize: 13,
                border: "1px solid #E0E0E0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              }}
            >
              📅{" "}Rebook Now
            </div>
            <div
              style={{
                flex: 1,
                background: "#FFFFFF",
                borderRadius: 8,
                padding: "10px 12px",
                textAlign: "center" as const,
                color: "#362A82",
                fontWeight: 600,
                fontSize: 13,
                border: "1px solid #E0E0E0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              }}
            >
              ⭐{" "}Leave Review
            </div>
          </div>
        </PhoneMockup>

        <StepProgress currentStep={7} />
      </div>
    </AbsoluteFill>
  );
};
