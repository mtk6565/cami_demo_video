import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HeadlineProps {
  text: string;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  accentWords?: string[]; // words to highlight
  delay?: number;
  style?: React.CSSProperties;
}

export const Headline: React.FC<HeadlineProps> = ({
  text,
  fontSize = 48,
  color = "#ffffff",
  accentColor = "#25D366",
  accentWords = [],
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "8px 12px",
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * 3;
        const adjustedFrame = Math.max(0, frame - wordDelay);

        const entrance = spring({
          frame: adjustedFrame,
          fps,
          config: { damping: 16, mass: 0.7 },
        });

        const translateY = interpolate(entrance, [0, 1], [40, 0]);
        const opacity = interpolate(entrance, [0, 1], [0, 1]);
        const blur = interpolate(entrance, [0, 1], [8, 0]);

        const isAccent = accentWords.some(
          (aw) => word.toLowerCase().replace(/[^a-z]/g, "") === aw.toLowerCase()
        );

        return (
          <span
            key={i}
            style={{
              fontSize,
              fontWeight: 800,
              color: isAccent ? accentColor : color,
              transform: `translateY(${translateY}px)`,
              opacity,
              filter: `blur(${blur}px)`,
              display: "inline-block",
              textShadow: isAccent
                ? `0 0 30px ${accentColor}40`
                : "none",
              letterSpacing: "-0.02em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
