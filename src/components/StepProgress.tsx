import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const STEPS = [
  { step: 1, label: "Client Messages 💬" },
  { step: 2, label: "Replies Instantly ⚡" },
  { step: 3, label: "Pick & Pay 💳" },
  { step: 4, label: "Slot Locked ✅" },
  { step: 5, label: "Reminders 🔔" },
  { step: 6, label: "Live Session Updates 📸" },
  { step: 7, label: "Thank You & Reviews ⭐" },
  { step: 8, label: "Auto Re-engage 🔄" },
];

interface StepProgressProps {
  currentStep: number;
  extraContent?: React.ReactNode;
  /** Frame at which the current step became active (for persistent mode) */
  stepStartFrame?: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  extraContent,
  stepStartFrame,
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

        // In persistent mode (stepStartFrame provided), completed steps appear instantly
        // and only the active step animates from when it became active
        let entrance: number;
        if (stepStartFrame !== undefined) {
          if (isCompleted) {
            entrance = 1; // Already visible, no animation
          } else {
            // Active step: animate from when this step became active
            const adjustedFrame = Math.max(0, frame - stepStartFrame - 8);
            entrance = spring({
              frame: adjustedFrame,
              fps,
              config: { damping: 14, mass: 0.5 },
            });
          }
        } else {
          // Legacy mode: all steps animate with stagger
          const staggerDelay = i * 4;
          const activeDelay = (currentStep - 1) * 4 + 8;
          const delay = isActive ? activeDelay : staggerDelay;
          const adjustedFrame = Math.max(0, frame - delay);
          entrance = spring({
            frame: adjustedFrame,
            fps,
            config: { damping: 14, mass: 0.5 },
          });
        }

        const scale = isActive
          ? interpolate(entrance, [0, 1], [0, 1.08])
          : interpolate(entrance, [0, 1], [0, 1]);
        const opacity = interpolate(entrance, [0, 1], [0, 1]);

        // Connector line (between steps)
        const showConnector = i > 0;
        let connectorEntrance: number;
        if (stepStartFrame !== undefined && isCompleted) {
          connectorEntrance = 1;
        } else if (stepStartFrame !== undefined && isActive) {
          const connectorFrame = Math.max(0, frame - stepStartFrame - 4);
          connectorEntrance = spring({
            frame: connectorFrame,
            fps,
            config: { damping: 18, mass: 0.4 },
          });
        } else {
          const staggerDelay = i * 4;
          const connectorDelay = staggerDelay - 2;
          const connectorFrame = Math.max(0, frame - connectorDelay);
          connectorEntrance = spring({
            frame: connectorFrame,
            fps,
            config: { damping: 18, mass: 0.4 },
          });
        }

        const circleSize = 44;

        return (
          <React.Fragment key={s.step}>
            {showConnector && (
              <div
                style={{
                  width: 2,
                  height: interpolate(connectorEntrance, [0, 1], [0, 24]),
                  background: isActive
                    ? "rgba(124,58,237,0.3)"
                    : "rgba(124,58,237,0.12)",
                  marginLeft: 21,
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
                    ? "linear-gradient(135deg, #7C3AED, #9333EA)"
                    : "#C2F6BA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "white" : "#2d6a2e",
                  fontWeight: 800,
                  fontSize: isActive ? 20 : 15,
                  flexShrink: 0,
                  boxShadow: isActive
                    ? "0 0 24px rgba(124,58,237,0.4)"
                    : "none",
                }}
              >
                {isCompleted ? "✓" : s.step}
              </div>
              <span
                style={{
                  color: isActive ? "#7C3AED" : "rgba(124,58,237,0.45)",
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
