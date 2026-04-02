import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // bg2 fades in over bg1
  const bg2Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14 },
  });
  const bg2Opacity = interpolate(bg2Spring, [0, 1], [0, 1]);

  // getcami.io text — delayed spring with scale + slide-up + glow
  const textFrame = Math.max(0, frame - 25);
  const textSpring = spring({
    frame: textFrame,
    fps,
    config: { damping: 12, mass: 1.2 },
  });
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textScale =
    interpolate(textSpring, [0, 1], [0, 1]) +
    Math.sin(frame * 0.12) * 0.03 * textSpring;

  // Pulsing glow similar to active step highlight
  const glowPulse = 0.45 + Math.sin(frame * 0.12) * 0.2;
  const glowOpacity = interpolate(textSpring, [0, 1], [0, glowPulse]);

  return (
    <AbsoluteFill>
      {/* Layer 1: Plain gradient background */}
      <Img
        src={staticFile("images/outro/bg1.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Layer 2: Background with app screenshot + clouds */}
      <Img
        src={staticFile("images/outro/bg2.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bg2Opacity,
        }}
      />

      {/* Layer 3: getcami.io text */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: `translateX(-50%) scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        {/* Glow bloom layer */}
        <Img
          src={staticFile("images/outro/getcami.io.png")}
          style={{
            width: 253,
            position: "absolute",
            top: 0,
            left: 0,
            filter: `blur(${20 + Math.sin(frame * 0.12) * 6}px) brightness(1.3)`,
            opacity: glowOpacity,
          }}
        />
        <Img
          src={staticFile("images/outro/getcami.io.png")}
          style={{ width: 253, position: "relative" }}
        />
      </div>
    </AbsoluteFill>
  );
};
