import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface StepBadgeProps {
  step: number;
  label: string;
  delay?: number;
}

export const StepBadge: React.FC<StepBadgeProps> = ({
  step,
  label,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #362A82, #4a3a9e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: 14,
          boxShadow: "0 0 20px rgba(54,42,130,0.3)",
        }}
      >
        {step}
      </div>
      <span
        style={{
          color: "rgba(54,42,130,0.7)",
          fontSize: 14,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
    </div>
  );
};
