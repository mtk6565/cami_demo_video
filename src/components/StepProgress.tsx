import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const STEPS = [
  { step: 1, label: "Client Messages 💬" },
  { step: 2, label: "Replies Instantly ⚡" },
  { step: 3, label: "Pick & Pay 💳" },
  { step: 4, label: "Slot Locked ✅" },
  { step: 5, label: "Reminders 🔔" },
  { step: 6, label: "Live Updates 📸" },
  { step: 7, label: "Thank You ⭐" },
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: 240,
        flexShrink: 0,
      }}
    >
      {STEPS.map((s, i) => {
        const isActive = s.step === currentStep;
        const isCompleted = s.step < currentStep;
        const isFuture = s.step > currentStep;

        // --- Entrance animation ---
        let entrance: number;
        if (isFuture) {
          // Future steps: visible immediately, no animation
          entrance = 1;
        } else if (stepStartFrame !== undefined) {
          if (isCompleted) {
            entrance = 1;
          } else {
            const adjustedFrame = Math.max(0, frame - stepStartFrame - 8);
            entrance = spring({
              frame: adjustedFrame,
              fps,
              config: { damping: 14, mass: 0.5 },
            });
          }
        } else {
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

        // --- Scale with pulse for active ---
        const pulse = isActive ? Math.sin(frame * 0.12) * 0.03 : 0;
        const scale = isActive
          ? interpolate(entrance, [0, 1], [0, 1.08]) + pulse
          : isFuture
            ? 1
            : interpolate(entrance, [0, 1], [0, 1]);

        const opacity = isFuture ? 1 : interpolate(entrance, [0, 1], [0, 1]);

        // --- Connector line ---
        const showConnector = i > 0;
        const prevCompleted = s.step - 1 < currentStep;
        const prevActive = s.step - 1 === currentStep;

        let connectorHeight: number;
        let connectorColor: string;

        if (isFuture && !prevActive) {
          // Between two future steps: dim, full height
          connectorHeight = 20;
          connectorColor = "rgba(124,58,237,0.08)";
        } else if (isCompleted && prevCompleted) {
          // Between two completed steps: bright, full height
          connectorHeight = 20;
          connectorColor = "rgba(124,58,237,0.4)";
        } else if (isActive || (isFuture && prevActive)) {
          // Connector leading into or out of active step: animated
          let connectorEntrance: number;
          if (stepStartFrame !== undefined) {
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

          if (isActive) {
            // Connector from completed to active: animated fill
            connectorHeight = interpolate(connectorEntrance, [0, 1], [0, 20]);
            connectorColor = "rgba(124,58,237,0.4)";
          } else {
            // Connector from active to first future: dim
            connectorHeight = 20;
            connectorColor = "rgba(124,58,237,0.12)";
          }
        } else {
          connectorHeight = 20;
          connectorColor = "rgba(124,58,237,0.12)";
        }

        // --- Circle styles ---
        const circleSize = 40;
        let circleBackground: string;
        let circleColor: string;
        let circleBorder: string | undefined;
        let circleShadow: string;
        let circleFontSize: number;

        if (isActive) {
          circleBackground = "linear-gradient(135deg, #7C3AED, #9333EA)";
          circleColor = "white";
          circleBorder = undefined;
          const shadowSpread = 20 + Math.sin(frame * 0.12) * 6;
          circleShadow = `0 0 ${shadowSpread}px rgba(124,58,237,0.4)`;
          circleFontSize = 18;
        } else if (isCompleted) {
          circleBackground = "#C2F6BA";
          circleColor = "#2d6a2e";
          circleBorder = undefined;
          circleShadow = "none";
          circleFontSize = 14;
        } else {
          // Future
          circleBackground = "transparent";
          circleColor = "rgba(124,58,237,0.25)";
          circleBorder = "2px dashed rgba(124,58,237,0.2)";
          circleShadow = "none";
          circleFontSize = 14;
        }

        // --- Label styles ---
        let labelColor: string;
        let labelFontSize: number;
        let labelFontWeight: number;

        if (isActive) {
          labelColor = "#7C3AED";
          labelFontSize = 15;
          labelFontWeight = 800;
        } else if (isCompleted) {
          labelColor = "rgba(124,58,237,0.45)";
          labelFontSize = 13;
          labelFontWeight = 600;
        } else {
          labelColor = "rgba(124,58,237,0.2)";
          labelFontSize = 13;
          labelFontWeight = 500;
        }

        return (
          <React.Fragment key={s.step}>
            {showConnector && (
              <div
                style={{
                  width: 2,
                  height: connectorHeight,
                  background: connectorColor,
                  marginLeft: circleSize / 2 - 1,
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
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
                  background: circleBackground,
                  border: circleBorder,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: circleColor,
                  fontWeight: 800,
                  fontSize: circleFontSize,
                  flexShrink: 0,
                  boxShadow: circleShadow,
                }}
              >
                {isCompleted ? "✓" : s.step}
              </div>
              <span
                style={{
                  color: labelColor,
                  fontSize: labelFontSize,
                  fontWeight: labelFontWeight,
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
