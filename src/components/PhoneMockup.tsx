import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface PhoneMockupProps {
  children: React.ReactNode;
  contactName?: string;
  contactAvatar?: string;
  enterFrom?: "bottom" | "right" | "none";
  chatMinHeight?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  contactName = "Pet Business 🐾",
  enterFrom = "bottom",
  chatMinHeight = 420,
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
          border: "3px solid rgba(124,58,237,0.12)",
          padding: "12px 8px",
          boxShadow:
            "0 25px 80px rgba(124,58,237,0.15), 0 0 40px rgba(124,58,237,0.06)",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 20px 4px",
            fontSize: 13,
            color: "#1a1a1a",
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <span
            style={{ display: "flex", gap: 6, alignItems: "center" }}
          >
            {/* Signal bars */}
            <svg width={16} height={12} viewBox="0 0 16 12">
              <rect x={0} y={9} width={3} height={3} rx={0.5} fill="#1a1a1a" />
              <rect x={4} y={6} width={3} height={6} rx={0.5} fill="#1a1a1a" />
              <rect x={8} y={3} width={3} height={9} rx={0.5} fill="#1a1a1a" />
              <rect x={12} y={0} width={3} height={12} rx={0.5} fill="#1a1a1a" />
            </svg>
            {/* Battery */}
            <svg width={22} height={11} viewBox="0 0 22 11">
              <rect
                x={0}
                y={0}
                width={19}
                height={11}
                rx={2}
                stroke="#1a1a1a"
                strokeWidth={1}
                fill="none"
              />
              <rect x={2} y={2} width={15} height={7} rx={1} fill="#1a1a1a" />
              <rect x={20} y={3} width={2} height={5} rx={1} fill="#1a1a1a" />
            </svg>
          </span>
        </div>

        {/* WhatsApp header — purple */}
        <div
          style={{
            background: "#7C3AED",
            borderRadius: "20px 20px 0 0",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Back arrow */}
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>

          {/* Avatar */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#DFE5E7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Default person silhouette */}
            <svg width={20} height={20} viewBox="0 0 24 24" fill="#8696A0">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
              {contactName}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              Powered by Cami AI
            </div>
          </div>

          {/* Right-side icons */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Video call */}
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={1} y={5} width={15} height={14} rx={2} />
              <path d="M16 10l5-3v10l-5-3" />
            </svg>
            {/* Phone call */}
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {/* Three-dot menu */}
            <svg width={18} height={18} viewBox="0 0 24 24" fill="white">
              <circle cx={12} cy={5} r={1.5} />
              <circle cx={12} cy={12} r={1.5} />
              <circle cx={12} cy={19} r={1.5} />
            </svg>
          </div>
        </div>

        {/* Chat area — WhatsApp beige */}
        <div
          style={{
            background: "#ECE5DD",
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            minHeight: chatMinHeight,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            position: "relative",
          }}
        >
          {children}
        </div>

        {/* Input bar */}
        <div
          style={{
            background: "#ECE5DD",
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
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Emoji smiley */}
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8696A0"
              strokeWidth={1.5}
            >
              <circle cx={12} cy={12} r={10} />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1={9} y1={9} x2={9.01} y2={9} strokeWidth={2.5} strokeLinecap="round" />
              <line x1={15} y1={9} x2={15.01} y2={9} strokeWidth={2.5} strokeLinecap="round" />
            </svg>
            <span style={{ flex: 1, color: "#8696A0", fontSize: 14 }}>
              Type a message...
            </span>
            {/* Attachment clip */}
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8696A0"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
            {/* Camera */}
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8696A0"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx={12} cy={13} r={4} />
            </svg>
          </div>
          {/* Mic button — purple */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={9} y={1} width={6} height={11} rx={3} />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1={12} y1={19} x2={12} y2={23} />
              <line x1={8} y1={23} x2={16} y2={23} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
