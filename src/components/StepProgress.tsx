import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const STEPS = [
  { step: 1, label: "Client Messages" },
  { step: 2, label: "Cami Replies" },
  { step: 3, label: "Pick & Profile" },
  { step: 4, label: "Pay via WhatsApp" },
  { step: 5, label: "Reminders" },
  { step: 6, label: "Live Updates" },
  { step: 7, label: "Thank & Rebook" },
  { step: 8, label: "Auto Re-engage" },
];

interface StepProgressProps {
  currentStep: number;
  extraContent?: React.ReactNode;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  extraContent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleSteps = STEPS.filter((s) => s.step <= currentStep);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {visibleSteps.map((s, i) => {
        const isActive = s.step === currentStep;
        const isCompleted = s.step < currentStep;
        const staggerDelay = i * 4;
        const activeDelay = (currentStep - 1) * 4 + 8;
        const delay = isActive ? activeDelay : staggerDelay;

        const adjustedFrame = Math.max(0, frame - delay);
        const entrance = spring({
          frame: adjustedFrame,
          fps,
          config: { damping: 14, mass: 0.5 },
        });

        const scale = isActive
          ? interpolate(entrance, [0, 1], [0, 1.08])
          : interpolate(entrance, [0, 1], [0, 1]);
        const opacity = interpolate(entrance, [0, 1], [0, 1]);

        // Connector line (between steps)
        const showConnector = i > 0;
        const connectorDelay = staggerDelay - 2;
        const connectorFrame = Math.max(0, frame - connectorDelay);
        const connectorEntrance = spring({
          frame: connectorFrame,
          fps,
          config: { damping: 18, mass: 0.4 },
        });

        const circleSize = isActive ? 44 : 32;

        return (
          <React.Fragment key={s.step}>
            {showConnector && (
              <div
                style={{
                  width: 2,
                  height: interpolate(connectorEntrance, [0, 1], [0, 24]),
                  background: isActive
                    ? "rgba(54,42,130,0.3)"
                    : "rgba(54,42,130,0.12)",
                  marginLeft: isActive ? 21 : (currentStep > s.step ? 15 : 21),
                  opacity: interpolate(connectorEntrance, [0, 1], [0, 1]),
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                transform: `scale(${scale})`,
                opacity,
                transformOrigin: "left center",
              }}
            >
              <div
                style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: "50%",
                  background: isActive
                    ? "linear-gradient(135deg, #362A82, #4a3a9e)"
                    : "#C2F6BA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "white" : "#2d6a2e",
                  fontWeight: 800,
                  fontSize: isActive ? 20 : 15,
                  flexShrink: 0,
                  boxShadow: isActive
                    ? "0 0 24px rgba(54,42,130,0.4)"
                    : "none",
                }}
              >
                {isCompleted ? "✓" : s.step}
              </div>
              <span
                style={{
                  color: isActive ? "#362A82" : "rgba(54,42,130,0.45)",
                  fontSize: isActive ? 18 : 14,
                  fontWeight: isActive ? 800 : 600,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {s.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}

      {extraContent && (
        <div style={{ marginTop: 20 }}>{extraContent}</div>
      )}
    </div>
  );
};
