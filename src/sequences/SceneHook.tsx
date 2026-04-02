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

const BADGE_ITEMS = [
  { src: "images/hook/bookings.png", highlightFrame: 95 },
  { src: "images/hook/reminders.png", highlightFrame: 120 },
  { src: "images/hook/payments.png", highlightFrame: 134 },
] as const;

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Exit fade (last 8 frames)
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Logo entrance — immediate spring scale + opacity
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.9, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Logo scale pulse — synced with "Meet Cami" at 4.16s (frame 5 into hook)
  const logoPulse = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 6, mass: 0.8, stiffness: 150 },
  });
  const pulseScale = interpolate(logoPulse, [0, 1], [1, 1.12]);

  // Badges entrance — all together, slightly after logo
  const badgesEntrance = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 12, mass: 0.7 },
  });
  const badgesTranslateY = interpolate(badgesEntrance, [0, 1], [40, 0]);
  const badgesEntranceOpacity = interpolate(badgesEntrance, [0, 1], [0, 1]);

  // Determine which badge is currently highlighted
  const activeIndex =
    frame >= BADGE_ITEMS[2].highlightFrame
      ? 2
      : frame >= BADGE_ITEMS[1].highlightFrame
        ? 1
        : frame >= BADGE_ITEMS[0].highlightFrame
          ? 0
          : -1;

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
          gap: 72,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("images/hook/logo.png")}
          style={{
            width: 400,
            transform: `scale(${logoScale * pulseScale})`,
            opacity: logoOpacity,
          }}
        />

        {/* Badges row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
            transform: `translateY(${badgesTranslateY}px)`,
            opacity: badgesEntranceOpacity,
          }}
        >
          {BADGE_ITEMS.map(({ src, highlightFrame }, i) => {
            const highlight = spring({
              frame: Math.max(0, frame - highlightFrame),
              fps,
              config: { damping: 14, mass: 0.8 },
            });

            const isActive = activeIndex === i;
            const anyActive = activeIndex >= 0;

            const scale = isActive
              ? interpolate(highlight, [0, 1], [1, 1.15])
              : 1;

            const dimOpacity = isActive || !anyActive ? 1 : 0.4;

            // Underline bar: grows in via scaleX when active
            const underlineScaleX = isActive ? highlight : 0;

            return (
              <div
                key={src}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `scale(${scale})`,
                  opacity: dimOpacity,
                }}
              >
                <Img
                  src={staticFile(src)}
                  style={{ height: 180 }}
                />
                <div
                  style={{
                    height: 4,
                    width: "80%",
                    backgroundColor: "#7C3AED",
                    borderRadius: 2,
                    transform: `scaleX(${underlineScaleX})`,
                    transformOrigin: "center",
                    marginTop: 8,
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </AbsoluteFill>
  );
};
