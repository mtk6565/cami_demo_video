import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "bot";
  delay?: number;
  typing?: boolean;
  emoji?: string;
  showTail?: boolean;
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  delay = 0,
  typing = false,
  emoji,
  showTail = true,
  timestamp = "9:41 AM",
  status = "read",
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
          background: isBot ? "#FFFFFF" : "#D9FDD3",
          borderRadius: showTail
            ? isBot
              ? "0 8px 8px 8px"
              : "8px 0 8px 8px"
            : 8,
          padding: "6px 12px",
          color: "#111B21",
          fontSize: 21,
          lineHeight: 1.35,
          whiteSpace: "pre-wrap" as const,
          boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
          position: "relative" as const,
        }}
      >
        {/* Bubble tail */}
        {showTail && (
          <div
            style={{
              position: "absolute",
              top: 0,
              ...(isBot
                ? {
                    left: -8,
                    width: 0,
                    height: 0,
                    borderTop: "0 solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "8px solid #FFFFFF",
                  }
                : {
                    right: -8,
                    width: 0,
                    height: 0,
                    borderTop: "0 solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "8px solid #D9FDD3",
                  }),
            }}
          />
        )}

        {emoji && (
          <span style={{ fontSize: 28, marginRight: 6 }}>{emoji}</span>
        )}
        {typing ? (
          <TypingIndicator frame={adjustedFrame} />
        ) : (
          <>
            {message}
            <span
              style={{
                float: "right" as const,
                marginLeft: 8,
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "#667781",
                lineHeight: 1,
              }}
            >
              {timestamp}
              {!isBot && <CheckMark status={status} />}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const CheckMark: React.FC<{ status: "sent" | "delivered" | "read" }> = ({
  status,
}) => {
  const color = status === "read" ? "#53BDEB" : "#667781";
  const isDouble = status === "delivered" || status === "read";

  return (
    <svg
      width={isDouble ? 20 : 14}
      height={14}
      viewBox={isDouble ? "0 0 20 14" : "0 0 14 14"}
      fill="none"
    >
      <path
        d={isDouble ? "M4 7l3 3 7-7" : "M3 7l3 3 5-5"}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {isDouble && (
        <path
          d="M8 7l3 3 7-7"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
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
              background: "#667781",
              transform: `translateY(${bounce * 4}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
