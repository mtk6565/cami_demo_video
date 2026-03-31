import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface QuickReplyButtonsProps {
  buttons: { label: string; emoji?: string }[];
  delay?: number;
}

export const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({
  buttons,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 8,
        paddingLeft: 4,
        flexWrap: "wrap",
      }}
    >
      {buttons.map((btn, i) => {
        const btnDelay = delay + i * 6;
        const adjustedFrame = Math.max(0, frame - btnDelay);

        const pop = spring({
          frame: adjustedFrame,
          fps,
          config: { damping: 14, mass: 0.5, stiffness: 200 },
        });

        const scale = interpolate(pop, [0, 1], [0.5, 1]);
        const opacity = interpolate(pop, [0, 1], [0, 1]);

        if (frame < btnDelay) return null;

        return (
          <div
            key={i}
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #7C3AED",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 16,
              fontWeight: 600,
              color: "#7C3AED",
              transform: `scale(${scale})`,
              opacity,
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
            }}
          >
            {btn.emoji && <span style={{ fontSize: 16 }}>{btn.emoji}</span>}
            {btn.label}
          </div>
        );
      })}
    </div>
  );
};
