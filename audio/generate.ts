import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

const SCRIPT = `You know the drill. Clients on WhatsApp, Instagram, phone — all at once. What if you never had to juggle that again?

A client messages on WhatsApp. Cami picks it up instantly.

She greets them by name, checks your calendar, and offers open slots — in seconds.

They pick a time. No back and forth. No phone tag. 

Deposit? Collected right in the chat. Slot locked. Done.

Twenty-four hours before, Cami sends a reminder automatically. No more no-shows.

During the visit, share photos — they love seeing their pet pampered.

After the groom, Cami follows up. Rating, review — all hands-free.

A month later? Cami brings them back with a personal offer. Rebooking, on autopilot.

Cami. Your entire pet business — automated, on WhatsApp.`;

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";
const SPEED = Number(process.env.ELEVENLABS_SPEED ?? "1.15");

if (!API_KEY || !VOICE_ID) {
  console.error(
    "Missing env vars. Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID.\n" +
      "Example:\n" +
      "  ELEVENLABS_API_KEY=sk-... ELEVENLABS_VOICE_ID=abc123 npm run generate-audio",
  );
  process.exit(1);
}

const OUTPUT_DIR = resolve(
  dirname(new URL(import.meta.url).pathname),
  "output",
);
const AUDIO_PATH = resolve(OUTPUT_DIR, "voiceover.mp3");
const TIMESTAMPS_PATH = resolve(OUTPUT_DIR, "timestamps.json");

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Generating audio with ElevenLabs...`);
  console.log(`  Model: ${MODEL_ID}`);
  console.log(`  Voice: ${VOICE_ID}`);
  console.log(`  Speed: ${SPEED}`);
  console.log(
    `  Words: ~${SCRIPT.split(/\s+/).filter((w) => !w.startsWith("[")).length}`,
  );
  console.log();

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: SCRIPT,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.75,
        style: 0.35,
        speed: SPEED,
        use_speaker_boost: true,
      },
      output_format: "mp3_44100_128",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`ElevenLabs API error (${res.status}): ${errText}`);
    process.exit(1);
  }

  const data = (await res.json()) as {
    audio_base64: string;
    alignment: {
      characters: string[];
      character_start_times_seconds: number[];
      character_end_times_seconds: number[];
    };
  };

  // Save audio
  const audioBuffer = Buffer.from(data.audio_base64, "base64");
  writeFileSync(AUDIO_PATH, audioBuffer);
  console.log(
    `Audio saved: ${AUDIO_PATH} (${(audioBuffer.length / 1024).toFixed(0)} KB)`,
  );

  // Calculate duration from timestamps
  const endTimes = data.alignment.character_end_times_seconds;
  const duration = endTimes[endTimes.length - 1];
  console.log(`Duration: ${duration.toFixed(2)}s (target: 47s)`);

  if (duration > 49) {
    console.log(
      `\n⚠ Audio is ${(duration - 47).toFixed(1)}s over. Try increasing ELEVENLABS_SPEED (current: ${SPEED})`,
    );
  } else if (duration < 44) {
    console.log(
      `\n⚠ Audio is ${(47 - duration).toFixed(1)}s short. Try decreasing ELEVENLABS_SPEED (current: ${SPEED})`,
    );
  } else {
    console.log(`\n✓ Duration is within target range!`);
  }

  // Save timestamps
  writeFileSync(TIMESTAMPS_PATH, JSON.stringify(data.alignment, null, 2));
  console.log(`Timestamps saved: ${TIMESTAMPS_PATH}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
