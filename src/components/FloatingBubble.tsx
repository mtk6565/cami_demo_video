import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface FloatingBubbleProps {
  platform: "whatsapp" | "instagram" | "messenger";
  text: string;
  enterFrame: number;
  offsetX: number;
  offsetY: number;
  rotation?: number;
  scale?: number;
}

const PLATFORM_STYLES = {
  whatsapp: {
    background: "#D9FDD3",
    color: "#111B21",
  },
  instagram: {
    background: "linear-gradient(135deg, #833AB4, #405DE6)",
    color: "#FFFFFF",
  },
  messenger: {
    background: "#0084FF",
    color: "#FFFFFF",
  },
} as const;

export const FloatingBubble: React.FC<FloatingBubbleProps> = ({
  platform,
  text,
  enterFrame,
  offsetX,
  offsetY,
  rotation = 0,
  scale: sizeScale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < enterFrame) return null;

  const adjustedFrame = frame - enterFrame;

  const pop = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 200 },
  });

  const popScale = interpolate(pop, [0, 1], [0.2, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  // Subtle sine-wave drift for floating feel
  const driftX = Math.sin(adjustedFrame * 0.04) * 3;
  const driftY = Math.sin(adjustedFrame * 0.06 + 1.5) * 4;

  const style = PLATFORM_STYLES[platform];

  return (
    <div
      style={{
        position: "absolute",
        left: offsetX,
        top: offsetY,
        transform: `translate(${driftX}px, ${driftY}px) scale(${popScale * sizeScale}) rotate(${rotation}deg)`,
        opacity,
        transformOrigin: "center bottom",
        pointerEvents: "none" as const,
      }}
    >
      <div
        style={{
          background: style.background,
          color: style.color,
          borderRadius: 12,
          padding: "12px 20px",
          fontSize: 22,
          lineHeight: 1.35,
          whiteSpace: "nowrap" as const,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {text}
      </div>
    </div>
  );
};
