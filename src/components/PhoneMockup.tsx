import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

/*
 * WhatsApp-style phone mockup that wraps chat content.
 * Drop this around any scene's chat bubbles for a consistent phone frame.
 */

interface PhoneMockupProps {
  children: React.ReactNode;
  contactName?: string;
  contactAvatar?: string; // emoji or URL
  enterFrom?: "bottom" | "right" | "none";
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  contactName = "Cami 🐾",
  contactAvatar = "🐾",
  enterFrom = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 18, mass: 0.8 } });

  const translateY =
    enterFrom === "bottom" ? interpolate(entrance, [0, 1], [120, 0]) : 0;
  const translateX =
    enterFrom === "right" ? interpolate(entrance, [0, 1], [200, 0]) : 0;
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "relative",
        width: 480,
        flexShrink: 0,
        transform: `translateY(${translateY}px) translateX(${translateX}px)`,
        opacity,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          background: "linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%)",
          borderRadius: 40,
          border: "3px solid rgba(54,42,130,0.12)",
          padding: "12px 8px",
          boxShadow:
            "0 25px 80px rgba(54,42,130,0.15), 0 0 40px rgba(54,42,130,0.06)",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 20px 4px",
            fontSize: 13,
            color: "rgba(54,42,130,0.5)",
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <span style={{ display: "flex", gap: 4 }}>
            <span>📶</span>
            <span>🔋</span>
          </span>
        </div>

        {/* WhatsApp header */}
        <div
          style={{
            background: "#362A82",
            borderRadius: "20px 20px 0 0",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 14, color: "white" }}>←</span>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #E7D3FC, #C2F6BA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            {contactAvatar}
          </div>
          <div>
            <div
              style={{ color: "white", fontWeight: 700, fontSize: 16 }}
            >
              {contactName}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              online
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            background: "#E8F5FC",
            minHeight: 320,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {children}
        </div>

        {/* Input bar */}
        <div
          style={{
            background: "#E8F5FC",
            borderRadius: "0 0 20px 20px",
            padding: "8px 12px 14px",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(54,42,130,0.08)",
              borderRadius: 24,
              padding: "10px 16px",
              color: "rgba(54,42,130,0.4)",
              fontSize: 14,
            }}
          >
            Type a message...
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#362A82",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🎤
          </div>
        </div>
      </div>
    </div>
  );
};
