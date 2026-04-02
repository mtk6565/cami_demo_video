# Design Decisions

Design principles and rationale for the Cami demo video.

---

- **2026-04-02:** Visual-audio sync principle — highlight visual elements (badges, logo) at the exact frame the voiceover mentions them. Creates a polished, intentional feel.
- **2026-04-02:** Avoid redundant on-screen text when voiceover covers the same message. The "everything automated" subheading was removed because the voiceover already says "automates your bookings, reminders and payments seamlessly" while badges highlight. Triple-redundancy (see + hear + read) dilutes attention.
- **2026-04-02:** Badge highlight uses animated purple underline bar + scale pop, not CSS filter colorization. SVGs loaded via `<Img>` were unreliable; PNGs with CSS-based effects are more dependable in Remotion.
- **2026-04-02:** Hero elements (logo, headline) use scale pulse for emphasis. Secondary elements (badges) use underline bar. Different visual language for different hierarchy levels.
