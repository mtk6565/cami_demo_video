import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowBackground } from "../components/GlowBackground";
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { QuickReplyButtons } from "../components/QuickReplyButtons";
import { StepProgress } from "../components/StepProgress";

/*
 * Phase timeline (all frames relative to this component's start):
 *
 * Phase 1: Booking Request   (0–119)     step=1
 * Phase 2: Cami Reply        (120–269)   step=2
 * Phase 3: Slot Pick         (270–419)   step=3
 * Phase 4: Deposit           (420–569)   step=4
 * Phase 5: Confirmation      (570–719)   step=5  badge="24 hours before"
 * Phase 6: Grooming Pics     (720–869)   step=6
 * Phase 7: Thank You         (870–1019)  step=7
 * Phase 8: Repeat Invite     (1020–1169) step=8  badge="1 month later"
 */

interface Phase {
  start: number;
  end: number;
  step: number;
  color: string;
  badge?: { emoji: string; text: string };
}

const PHASES: Phase[] = [
  { start: 0, end: 119, step: 1, color: "#7C3AED" },
  { start: 120, end: 269, step: 2, color: "#7C3AED" },
  { start: 270, end: 419, step: 3, color: "#C2F6BA" },
  { start: 420, end: 569, step: 4, color: "#C2F6BA" },
  {
    start: 570,
    end: 719,
    step: 5,
    color: "#7C3AED",
    badge: { emoji: "⏰", text: "24 hours before appointment" },
  },
  { start: 720, end: 869, step: 6, color: "#EDE9FE" },
  { start: 870, end: 1019, step: 7, color: "#F8F96C" },
  {
    start: 1020,
    end: 1169,
    step: 8,
    color: "#EDE9FE",
    badge: { emoji: "🔄", text: "1 month later" },
  },
];

const FADE_FRAMES = 10;

function getPhaseOpacity(frame: number, phase: Phase): number {
  const entry = interpolate(
    frame,
    [phase.start, phase.start + FADE_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const exit = interpolate(
    frame,
    [phase.end - FADE_FRAMES, phase.end],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return entry * exit;
}

function getCurrentPhaseIndex(frame: number): number {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (frame >= PHASES[i].start) return i;
  }
  return 0;
}

function getInterpolatedColor(frame: number): string {
  const idx = getCurrentPhaseIndex(frame);
  const current = PHASES[idx];
  const next = PHASES[idx + 1];

  // Transition to next color near phase boundary
  if (next && frame >= current.end - 15) {
    return interpolateColors(
      frame,
      [current.end - 15, current.end],
      [current.color, next.color],
    );
  }

  // Transition from previous color at start of phase
  const prev = PHASES[idx - 1];
  if (prev && frame <= current.start + 15) {
    return interpolateColors(
      frame,
      [current.start, current.start + 15],
      [prev.color, current.color],
    );
  }

  return current.color;
}

export const SceneWhatsAppFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const phaseIdx = getCurrentPhaseIndex(frame);
  const currentPhase = PHASES[phaseIdx];
  const currentStep = currentPhase.step;
  const glowColor = getInterpolatedColor(frame);

  // Context badge (phases 5 and 8)
  const activeBadge = currentPhase.badge;
  const badgeOpacity = activeBadge ? getPhaseOpacity(frame, currentPhase) : 0;
  const badgeEntrance = activeBadge
    ? spring({
        frame: Math.max(0, frame - currentPhase.start - 15),
        fps,
        config: { damping: 14, mass: 0.6 },
      })
    : 0;

  return (
    <AbsoluteFill>
      <GlowBackground color={glowColor} globalFrame={frame} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          gap: 60,
          padding: "120px 60px 40px",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          {/* Context badge — absolutely positioned above phone */}
          {activeBadge && (
            <div
              style={{
                position: "absolute",
                top: -50,
                left: "50%",
                transform: `translateX(-50%) scale(${interpolate(badgeEntrance, [0, 1], [0.6, 1])})`,
                opacity: badgeOpacity,
                zIndex: 2,
                background: "rgba(124, 58, 237, 0.1)",
                border: "1.5px solid rgba(124, 58, 237, 0.25)",
                borderRadius: 24,
                padding: "8px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 20 }}>{activeBadge.emoji}</span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#7C3AED",
                  letterSpacing: "0.02em",
                }}
              >
                {activeBadge.text}
              </span>
            </div>
          )}

          <PhoneMockup contactName="Pet Business 🐾" chatMinHeight={560}>
            {/* Phase 1: Booking Request */}
            <PhaseWrapper frame={frame} phase={PHASES[0]} durationInFrames={durationInFrames}>
              <ChatBubble
                sender="user"
                message="Hey, can I book Bella in for a groom? 🐕"
                delay={15}
              />
              <CamiTypingLabel frame={frame} showAfter={PHASES[0].start + 38} fps={fps} />
              <ChatBubble sender="bot" message="" typing={true} delay={40} />
            </PhaseWrapper>

            {/* Phase 2: Cami Reply */}
            <PhaseWrapper frame={frame} phase={PHASES[1]} durationInFrames={durationInFrames}>
              <ChatBubble
                sender="bot"
                message={
                  "Hey Alex, hope you and Bella are doing well!\nOf course! 👋 Here's what's open this week:"
                }
                delay={0}
              />
              <ChatBubble
                sender="bot"
                message={
                  "📅 Tue 10 AM  |  Wed 2 PM  |  Thu 11:30 AM  |  Sat 9 AM\n\nJust pick one 👆"
                }
                delay={20}
                showTail={false}
              />
            </PhaseWrapper>

            {/* Phase 3: Slot Pick */}
            <PhaseWrapper frame={frame} phase={PHASES[2]} durationInFrames={durationInFrames}>
              <ChatBubble sender="user" message="Wed 2 PM pls! 🙌" delay={8} />
              <ChatBubble
                sender="bot"
                message={
                  "Great pick! 🙌\n\n🐕 Bella — Full Groom\n📅 Wed, 2 PM\n\nWe'll use her special shampoo too 🧴🐾\n\nJust pay the deposit to lock it in 👇"
                }
                delay={20}
              />
              <QuickReplyButtons
                layout="full"
                buttons={[{ label: "Pay AED 50 Deposit", emoji: "💳" }]}
                delay={35}
              />
            </PhaseWrapper>

            {/* Phase 4: Deposit */}
            <PhaseWrapper frame={frame} phase={PHASES[3]} durationInFrames={durationInFrames}>
              <DepositCheckmark frame={frame} fps={fps} phaseStart={PHASES[3].start} />
              <ChatBubble
                sender="bot"
                message={
                  "💳 Paid! Slot locked ✅\n\nSee you on Wednesday at 2 PM — Bella is going to look amazing 🐶✨"
                }
                delay={30}
              />
            </PhaseWrapper>

            {/* Phase 5: Confirmation */}
            <PhaseWrapper frame={frame} phase={PHASES[4]} durationInFrames={durationInFrames}>
              <ChatBubble
                sender="bot"
                message="Hey! Bella is in tomorrow at 2 PM, can't wait to see her 🐶"
                delay={5}
                emoji="🔔"
              />
              <QuickReplyButtons
                delay={30}
                buttons={[
                  { label: "Confirm", emoji: "✓" },
                  { label: "Reschedule", emoji: "📅" },
                ]}
              />
            </PhaseWrapper>

            {/* Phase 6: Grooming Pics */}
            <PhaseWrapper frame={frame} phase={PHASES[5]} durationInFrames={durationInFrames}>
              <ChatBubble
                sender="bot"
                message="Bella is loving it! Sneak peek 📸"
                delay={5}
              />
              <GroomingImage frame={frame} fps={fps} phaseStart={PHASES[5].start} />
            </PhaseWrapper>

            {/* Phase 7: Thank You */}
            <PhaseWrapper frame={frame} phase={PHASES[6]} durationInFrames={durationInFrames}>
              <ChatBubble
                sender="bot"
                message="Bella is ALL DONE! 🎉 She looks incredible — we're obsessed 🥰"
                delay={5}
              />
              <AfterGroomImage frame={frame} fps={fps} phaseStart={PHASES[6].start} />
              <RatingCard frame={frame} fps={fps} phaseStart={PHASES[6].start} />
              <QuickReplyButtons
                layout="row"
                buttons={[
                  { label: "Rebook Now", emoji: "📅" },
                  { label: "Leave Review", emoji: "⭐" },
                ]}
                delay={60}
              />
            </PhaseWrapper>

            {/* Phase 8: Repeat Invite */}
            <PhaseWrapper frame={frame} phase={PHASES[7]} durationInFrames={durationInFrames}>
              <ChatBubble
                sender="bot"
                message="Hey Alex! 🎊 It's been a month — Bella must be ready for her next fresh cut 🐾"
                delay={10}
                emoji="💈"
              />
              <ChatBubble
                sender="bot"
                message={
                  "⚡ Book THIS Mon or Tue → save 15%\n⏰ Offer expires Sunday midnight"
                }
                delay={30}
              />
              <QuickReplyButtons
                layout="full"
                buttons={[{ label: "Rebook Bella — 15% Off", emoji: "🐕" }]}
                delay={45}
              />
            </PhaseWrapper>
          </PhoneMockup>
        </div>

        <StepProgress
          currentStep={currentStep}
          stepStartFrame={currentPhase.start}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ─── Phase wrapper: crossfades content in/out ─── */

const PhaseWrapper: React.FC<{
  frame: number;
  phase: Phase;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ frame, phase, durationInFrames, children }) => {
  const opacity = getPhaseOpacity(frame, phase);
  if (opacity <= 0) return null;

  // Sequence offsets useCurrentFrame() for children so ChatBubble/QuickReplyButtons
  // delays work relative to phase start (not global frame)
  return (
    <Sequence
      from={phase.start}
      durationInFrames={durationInFrames - phase.start}
      layout="none"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          opacity,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: "16px 12px",
        }}
      >
        {children}
      </div>
    </Sequence>
  );
};

/* ─── Extracted inline elements from original scenes ─── */

const CamiTypingLabel: React.FC<{
  frame: number;
  showAfter: number;
  fps: number;
}> = ({ frame, showAfter, fps }) => {
  if (frame < showAfter) return null;

  const entrance = spring({
    frame: Math.max(0, frame - showAfter),
    fps,
    config: { damping: 20, mass: 0.8, stiffness: 120 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        paddingLeft: 12,
        marginBottom: -2,
        opacity: interpolate(entrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrance, [0, 1], [6, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          lineHeight: 1,
          color: "#FFFFFF",
          fontWeight: 700,
        }}
      >
        AI
      </div>
      <span
        style={{
          fontSize: 13,
          color: "#667781",
          fontStyle: "italic",
          letterSpacing: 0.2,
        }}
      >
        Cami AI is typing
      </span>
    </div>
  );
};


const DepositCheckmark: React.FC<{
  frame: number;
  fps: number;
  phaseStart: number;
}> = ({ frame, fps, phaseStart }) => {
  const localFrame = frame - phaseStart;
  const checkDelay = 5;
  if (localFrame < checkDelay) return null;

  const checkSpring = spring({
    frame: Math.max(0, localFrame - checkDelay),
    fps,
    config: { damping: 8, mass: 0.5 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transform: `scale(${interpolate(checkSpring, [0, 1], [0, 1])})`,
        opacity: interpolate(checkSpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#C2F6BA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: "0 0 30px rgba(194,246,186,0.5)",
        }}
      >
        ✓
      </div>
      <span style={{ color: "#7C3AED", fontWeight: 700, fontSize: 15 }}>
        Deposit paid — Booking locked!
      </span>
    </div>
  );
};

const GroomingImage: React.FC<{
  frame: number;
  fps: number;
  phaseStart: number;
}> = ({ frame, fps, phaseStart }) => {
  const localFrame = frame - phaseStart;
  const imgDelay = 20;
  const imgSpring = spring({
    frame: Math.max(0, localFrame - imgDelay),
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "4px 0",
        transform: `scale(${interpolate(imgSpring, [0, 1], [0, 1])})`,
        opacity: interpolate(imgSpring, [0, 1], [0, 1]),
      }}
    >
      <Img
        src={staticFile("images/bella.jpg")}
        style={{
          width: 260,
          height: 260,
          borderRadius: 12,
          objectFit: "cover",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
};

const AfterGroomImage: React.FC<{
  frame: number;
  fps: number;
  phaseStart: number;
}> = ({ frame, fps, phaseStart }) => {
  const localFrame = frame - phaseStart;
  const imgDelay = 20;
  const imgSpring = spring({
    frame: Math.max(0, localFrame - imgDelay),
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "4px 0",
        transform: `scale(${interpolate(imgSpring, [0, 1], [0, 1])})`,
        opacity: interpolate(imgSpring, [0, 1], [0, 1]),
      }}
    >
      <Img
        src={staticFile("images/bella_after.jpg")}
        style={{
          width: 260,
          height: 260,
          borderRadius: 12,
          objectFit: "cover",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
};

const RatingCard: React.FC<{
  frame: number;
  fps: number;
  phaseStart: number;
}> = ({ frame, fps, phaseStart }) => {
  const localFrame = frame - phaseStart;
  const stars = [0, 1, 2, 3, 4];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        border: "1px solid #E0E0E0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        textAlign: "center" as const,
        opacity: interpolate(
          spring({
            frame: Math.max(0, localFrame - 30),
            fps,
            config: { damping: 14 },
          }),
          [0, 1],
          [0, 1],
        ),
      }}
    >
      <div
        style={{
          color: "#1a1a2e",
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        How was your experience?
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {stars.map((_, i) => {
          const starDelay = 40 + i * 5;
          const starSpring = spring({
            frame: Math.max(0, localFrame - starDelay),
            fps,
            config: { damping: 8, mass: 0.4 },
          });

          return (
            <span
              key={i}
              style={{
                fontSize: 28,
                transform: `scale(${interpolate(starSpring, [0, 1], [0, 1.2])})`,
                opacity: interpolate(starSpring, [0, 1], [0, 1]),
              }}
            >
              ⭐
            </span>
          );
        })}
      </div>
    </div>
  );
};

