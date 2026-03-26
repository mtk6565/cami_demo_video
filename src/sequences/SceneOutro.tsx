import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { Headline } from "../components/Headline";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulsing glow
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03;

  // Logo entrance
  const logoSpring = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });

  return (
    <AbsoluteFill>
      <GlowBackground color="#362A82" intensity={2} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 40px",
          gap: 30,
        }}
      >
        {/* Logo / Brand mark */}
        <div
          style={{
            transform: `scale(${logoSpring * pulse})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 64,
              filter: "drop-shadow(0 0 40px rgba(54,42,130,0.4))",
            }}
          >
            🐾
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#362A82",
              letterSpacing: "-0.03em",
              textShadow: "0 0 60px rgba(54,42,130,0.3)",
            }}
          >
            Cami
          </div>
        </div>

        {/* Tagline */}
        <Headline
          text="Your entire pet business. On WhatsApp."
          fontSize={24}
          accentWords={["WhatsApp."]}
          accentColor="#362A82"
          delay={15}
        />

        {/* CTA */}
        <div
          style={{
            opacity: interpolate(
              spring({
                frame: Math.max(0, frame - 30),
                fps,
                config: { damping: 14 },
              }),
              [0, 1],
              [0, 1],
            ),
            transform: `translateY(${interpolate(
              spring({
                frame: Math.max(0, frame - 30),
                fps,
                config: { damping: 14 },
              }),
              [0, 1],
              [20, 0],
            )}px)`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #362A82, #4a3a9e)",
              borderRadius: 16,
              padding: "16px 40px",
              color: "white",
              fontWeight: 800,
              fontSize: 18,
              textAlign: "center" as const,
              boxShadow: "0 8px 40px rgba(54,42,130,0.4)",
              letterSpacing: "0.02em",
            }}
          >
            Get Started Free →
          </div>
          <div
            style={{
              textAlign: "center" as const,
              marginTop: 14,
              color: "rgba(54,42,130,0.5)",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            cami.app
          </div>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginTop: 10,
            opacity: interpolate(
              spring({
                frame: Math.max(0, frame - 45),
                fps,
                config: { damping: 14 },
              }),
              [0, 1],
              [0, 1],
            ),
          }}
        >
          {[
            "AI Booking",
            "Auto Payments",
            "Smart Reminders",
            "Client Retention",
          ].map((feat, i) => (
            <span
              key={i}
              style={{
                background: "rgba(54,42,130,0.06)",
                border: "1px solid rgba(54,42,130,0.12)",
                borderRadius: 20,
                padding: "6px 14px",
                color: "rgba(54,42,130,0.7)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {feat}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
