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
import { FloatingBubble } from "../components/FloatingBubble";

const FLOATING_BUBBLES = [
  // Top cluster — 3 bubbles in upper region (above headline)
  { platform: "whatsapp" as const, text: "Can I book a grooming appt?", offsetX: 90, offsetY: 110, enterFrame: 45, rotation: -3, scale: 1.3 },
  { platform: "whatsapp" as const, text: "Is Mike free to trim Yumi at 2pm?", offsetX: 400, offsetY: 190, enterFrame: 51, rotation: 2, scale: 1.15 },
  { platform: "instagram" as const, text: "Hi! Do you have availability?", offsetX: 550, offsetY: 80, enterFrame: 57, rotation: -2, scale: 1.0 },
  // Bottom cluster — 4 bubbles in lower region (below icons)
  { platform: "instagram" as const, text: "Bella needs a nail trim plz!", offsetX: 90, offsetY: 770, enterFrame: 63, rotation: 3, scale: 1.2 },
  { platform: "messenger" as const, text: "Any slots this Saturday?", offsetX: 500, offsetY: 830, enterFrame: 69, rotation: -4, scale: 1.1 },
  { platform: "messenger" as const, text: "Can I bring 2 dogs?", offsetX: 290, offsetY: 910, enterFrame: 75, rotation: 2, scale: 1.15 },
  { platform: "whatsapp" as const, text: "Is there a waitlist?", offsetX: 600, offsetY: 990, enterFrame: 81, rotation: -2, scale: 1.25 },
];

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

      {/* Floating chat bubbles — full-screen absolute layer, outside flex flow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        {FLOATING_BUBBLES.map((bubble, i) => (
          <FloatingBubble key={i} {...bubble} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
