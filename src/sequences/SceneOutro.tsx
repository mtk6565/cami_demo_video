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
      <GlowBackground color="#7C3AED" intensity={2} />

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
              filter: "drop-shadow(0 0 40px rgba(124,58,237,0.4))",
            }}
          >
            🐾
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#7C3AED",
              letterSpacing: "-0.03em",
              textShadow: "0 0 60px rgba(124,58,237,0.3)",
            }}
          >
            Cami
          </div>
        </div>

        {/* Tagline */}
        <Headline
          text="Your entire pet business."
          fontSize={24}
          accentColor="#7C3AED"
          delay={15}
        />
        <Headline
          text="Automated. On WhatsApp."
          fontSize={24}
          accentWords={["Automated.", "WhatsApp."]}
          accentColor="#7C3AED"
          delay={20}
        />

        {/* Start today */}
        <div
          style={{
            opacity: interpolate(
              spring({
                frame: Math.max(0, frame - 25),
                fps,
                config: { damping: 14 },
              }),
              [0, 1],
              [0, 1],
            ),
            fontSize: 20,
            fontWeight: 700,
            color: "#7C3AED",
            textAlign: "center" as const,
          }}
        >
          Start today.
        </div>

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
              background: "linear-gradient(135deg, #7C3AED, #9333EA)",
              borderRadius: 16,
              padding: "16px 40px",
              color: "white",
              fontWeight: 800,
              fontSize: 18,
              textAlign: "center" as const,
              boxShadow: "0 8px 40px rgba(124,58,237,0.4)",
              letterSpacing: "0.02em",
            }}
          >
            Get Started today at cami.io
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
            "📅 AI Bookings",
            "💳 Auto Payments",
            "🔔 Smart Reminders",
            "🔄 Client Retention",
          ].map((feat, i) => (
            <span
              key={i}
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1.5px solid rgba(124,58,237,0.3)",
                borderRadius: 20,
                padding: "8px 18px",
                color: "#7C3AED",
                fontSize: 15,
                fontWeight: 700,
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
