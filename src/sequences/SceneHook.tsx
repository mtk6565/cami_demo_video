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

const InstagramIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)" />
  </svg>
);

const WhatsAppIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.16-1.34A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.19-1.78 1.26-.5.07-1.13.1-1.82-.11a16.6 16.6 0 01-1.65-.61c-2.9-1.25-4.79-4.18-4.93-4.37-.15-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.59-.36.78-.36h.56c.18 0 .42-.07.66.5.24.57.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.47-.15.17-.31.37-.44.5-.15.15-.3.31-.13.6.18.3.79 1.3 1.69 2.1 1.16 1.04 2.14 1.36 2.44 1.51.3.15.48.13.66-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.14 1.34z"
      fill="#25D366"
    />
  </svg>
);

const FacebookIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"
      fill="#1877F2"
    />
    <path
      d="M15.89 14.89l.44-2.89h-2.78v-1.87c0-.79.39-1.56 1.63-1.56h1.26V6.11s-1.15-.2-2.24-.2c-2.29 0-3.78 1.39-3.78 3.89V12H7.9v2.89h2.54v6.99a10.1 10.1 0 003.12 0v-6.99h2.34z"
      fill="white"
    />
  </svg>
);

const SOCIAL_ICONS = [
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: WhatsAppIcon, label: "WhatsApp" },
  { Icon: FacebookIcon, label: "Facebook" },
] as const;

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

  const pulse = 1 + Math.sin(frame * 0.15) * 0.05;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <GlowBackground color="#7C3AED" intensity={1.5} />

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
        {/* Social media icons row */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {SOCIAL_ICONS.map(({ Icon, label }, i) => {
            const entrance = spring({
              frame,
              fps,
              delay: i * 4,
              config: { damping: 12 },
            });
            return (
              <div
                key={label}
                style={{
                  transform: `scale(${entrance * pulse})`,
                  opacity: entrance,
                  filter: "drop-shadow(0 0 40px rgba(124,58,237,0.4))",
                }}
              >
                <Icon size={60} />
              </div>
            );
          })}
        </div>

        {/* Hook headline */}
        <Headline
          text="Tired of juggling bookings across WhatsApp, Instagram & phone?"
          fontSize={38}
          accentWords={["WhatsApp,", "Instagram", "phone?"]}
          accentColor="#7C3AED"
          delay={10}
        />

        {/* Sub-hook */}
        <Headline
          text="Let Cami handle it."
          fontSize={30}
          accentWords={["Cami"]}
          accentColor="#7C3AED"
          delay={30}
          style={{ marginTop: -20 }}
        />
      </div>
    </AbsoluteFill>
  );
};
