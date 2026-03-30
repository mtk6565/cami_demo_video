import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "bot";
  delay?: number; // frames before appearing
  typing?: boolean;
  emoji?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  delay = 0,
  typing = false,
  emoji,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const pop = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 180 },
  });

  const scale = interpolate(pop, [0, 1], [0.3, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);
  const translateY = interpolate(pop, [0, 1], [20, 0]);

  if (frame < delay) return null;

  const isBot = sender === "bot";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        transformOrigin: isBot ? "left bottom" : "right bottom",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          background: isBot
            ? "linear-gradient(135deg, #ffffff, #f0f4ff)"
            : "#362A82",
          borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
          padding: "10px 14px",
          color: isBot ? "#1a1a2e" : "white",
          fontSize: 21,
          lineHeight: 1.5,
          boxShadow: "0 2px 8px rgba(54,42,130,0.12)",
          position: "relative" as const,
        }}
      >
        {emoji && (
          <span style={{ fontSize: 28, marginRight: 6 }}>{emoji}</span>
        )}
        {typing ? <TypingIndicator frame={adjustedFrame} /> : message}
        <div
          style={{
            fontSize: 14,
            color: isBot ? "rgba(54,42,130,0.4)" : "rgba(255,255,255,0.4)",
            textAlign: "right" as const,
            marginTop: 4,
          }}
        >
          {isBot ? "Cami AI" : ""} ✓✓
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div style={{ display: "flex", gap: 5, padding: "4px 8px" }}>
      {[0, 1, 2].map((i) => {
        const bounce = Math.sin((frame * 0.3 + i * 1.2) % (Math.PI * 2));
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(54,42,130,0.4)",
              transform: `translateY(${bounce * 4}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
