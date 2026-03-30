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

  // Pet profile card animation
  const cardDelay = 50;
  const cardFrame = Math.max(0, frame - cardDelay);
  const cardSpring = spring({ frame: cardFrame, fps, config: { damping: 14 } });

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
            message="Wednesday 2:00 PM works! 🙌"
            delay={8}
          />
          <ChatBubble
            sender="bot"
            message="Great choice! Let me set up Max's profile real quick 🐾"
            delay={20}
          />

          {/* Pet Profile Card */}
          {frame >= cardDelay && (
            <div
              style={{
                background: "linear-gradient(135deg, #ffffff, #f0f4ff)",
                borderRadius: 16,
                padding: 16,
                border: "1px solid rgba(54,42,130,0.15)",
                transform: `scale(${interpolate(cardSpring, [0, 1], [0.5, 1])})`,
                opacity: interpolate(cardSpring, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 32 }}>🐕</span>
                <div>
                  <div style={{ color: "#1a1a2e", fontWeight: 700, fontSize: 16 }}>
                    Max
                  </div>
                  <div style={{ color: "rgba(54,42,130,0.5)", fontSize: 12 }}>
                    Golden Retriever • 3 yrs
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Full Groom", "Nail Trim", "Ear Clean"].map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(54,42,130,0.1)",
                      color: "#362A82",
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 20,
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </PhoneMockup>

        <StepProgress currentStep={3} />
      </div>
    </AbsoluteFill>
  );
};
