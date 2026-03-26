import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface GlowBackgroundProps {
  color?: string;
  intensity?: number;
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  color = "#25D366",
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  // Slow-moving gradient orbs
  const x1 = 30 + Math.sin(frame * 0.02) * 20;
  const y1 = 30 + Math.cos(frame * 0.015) * 15;
  const x2 = 70 + Math.sin(frame * 0.018 + 2) * 20;
  const y2 = 70 + Math.cos(frame * 0.022 + 1) * 15;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Dark base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #050a0e 0%, #0a1628 50%, #0d0d0d 100%)",
        }}
      />

      {/* Floating glow orb 1 */}
      <div
        style={{
          position: "absolute",
          left: `${x1}%`,
          top: `${y1}%`,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}${Math.round(intensity * 15).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating glow orb 2 */}
      <div
        style={{
          position: "absolute",
          left: `${x2}%`,
          top: `${y2}%`,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, #128C7E${Math.round(intensity * 12).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(50px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(37,211,102,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,211,102,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />
    </div>
  );
};
