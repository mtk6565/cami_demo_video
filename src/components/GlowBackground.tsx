import React from "react";
import { useCurrentFrame } from "remotion";

interface GlowBackgroundProps {
  color?: string;
  intensity?: number;
  globalFrame?: number;
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  color = "#7C3AED",
  intensity = 1,
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const frame = globalFrame ?? localFrame;

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
          background: "linear-gradient(160deg, #E8F5FC 0%, #E8F5FC 50%, #E8F5FC 100%)",
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
          background: `radial-gradient(circle, #EDE9FE${Math.round(intensity * 12).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(50px)",
          transform: "translate(-50%, -50%)",
        }}
      />

    </div>
  );
};
