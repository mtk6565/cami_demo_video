import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface QuickReplyButtonsProps {
  buttons: { label: string; emoji?: string }[];
  delay?: number;
  layout?: "inline" | "row" | "full";
}

export const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({
  buttons,
  delay = 0,
  layout = "inline",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: layout === "inline" ? "flex-start" : undefined,
        gap: 8,
        paddingLeft: layout === "inline" ? 4 : undefined,
        flexWrap: layout === "inline" ? "wrap" : undefined,
      }}
    >
      {buttons.map((btn, i) => {
        const btnDelay = delay;
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
              flex: layout === "row" ? 1 : undefined,
              background: "#FFFFFF",
              border: "1px solid #E0E0E0",
              borderRadius: 8,
              padding: layout === "full" ? "14px 20px" : "10px 16px",
              fontSize: 15,
              fontWeight: 700,
              color: "#7C3AED",
              textAlign: layout !== "inline" ? ("center" as const) : undefined,
              transform: `scale(${scale})`,
              opacity,
              display: "flex",
              alignItems: "center",
              justifyContent: layout !== "inline" ? "center" : undefined,
              gap: 6,
              whiteSpace: "nowrap",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            {btn.emoji && <span style={{ fontSize: 15 }}>{btn.emoji}</span>}
            {btn.label}
          </div>
        );
      })}
    </div>
  );
};
