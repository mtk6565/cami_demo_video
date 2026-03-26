import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { Headline } from "../components/Headline";

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Pulsing WhatsApp icon
  const pulse = 1 + Math.sin(frame * 0.15) * 0.05;
  const iconEntrance = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#25D366" intensity={1.5} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 40px",
          gap: 40,
        }}
      >
        {/* Big WhatsApp icon */}
        <div
          style={{
            fontSize: 80,
            transform: `scale(${iconEntrance * pulse})`,
            filter: `drop-shadow(0 0 40px rgba(37,211,102,0.5))`,
          }}
        >
          💬
        </div>

        {/* Hook headline */}
        <Headline
          text="Still chasing bookings manually?"
          fontSize={44}
          accentWords={["manually?"]}
          accentColor="#ff4757"
          delay={10}
        />

        {/* Sub-hook */}
        <Headline
          text="Your clients want WhatsApp."
          fontSize={28}
          accentWords={["WhatsApp."]}
          accentColor="#25D366"
          delay={30}
          style={{ marginTop: -20 }}
        />
      </div>
    </AbsoluteFill>
  );
};
