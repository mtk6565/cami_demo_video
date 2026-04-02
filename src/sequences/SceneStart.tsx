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

export const SceneStart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Exit fade (last 8 frames)
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Text entrance — immediate spring fade-in + slight scale
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.9, 1]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // Text scale pulse — subtle bump after entrance settles
  const textPulse = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 6, mass: 0.8, stiffness: 150 },
  });
  const pulseScale = interpolate(textPulse, [0, 1], [1, 1.12]);

  // Icons entrance — simultaneous slide-up, delayed to appear at ~1.23s
  const iconsSpring = spring({
    frame: Math.max(0, frame - 37),
    fps,
    config: { damping: 12, mass: 0.7 },
  });
  const iconsTranslateY = interpolate(iconsSpring, [0, 1], [40, 0]);
  const iconsOpacity = interpolate(iconsSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#E8F5FC",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 60px",
          gap: 40,
        }}
      >
        {/* Headline image */}
        <Img
          src={staticFile("images/start/Tired of juggling bookings_.svg")}
          style={{
            width: "85%",
            maxWidth: 800,
            transform: `scale(${textScale * pulseScale})`,
            opacity: textOpacity,
          }}
        />

        {/* Social icons row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
            transform: `translateY(${iconsTranslateY}px)`,
            opacity: iconsOpacity,
          }}
        >
          <Img
            src={staticFile("images/start/wa.png")}
            style={{ width: 96, height: 96 }}
          />
          <Img
            src={staticFile("images/start/ig.png")}
            style={{ width: 96, height: 96 }}
          />
          <Img
            src={staticFile("images/start/fb.png")}
            style={{ width: 96, height: 96 }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
