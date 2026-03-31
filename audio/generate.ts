import { copyFileSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

const SECTIONS = [
  {
    id: "hook",
    startSeconds: 0,
    maxSeconds: 5,
    text: "Introducing Cami. Bookings, payments, reminders — automated.",
  },
  {
    id: "phase1",
    startSeconds: 5,
    maxSeconds: 3.5,
    text: "A client messages. Cami picks it up instantly.",
  },
  {
    id: "phase2",
    startSeconds: 8.5,
    maxSeconds: 4,
    text: "Greets them by name, offers open slots — in seconds.",
  },
  {
    id: "phase3",
    startSeconds: 12.5,
    maxSeconds: 3,
    text: "They pick a time. No back and forth.",
  },
  {
    id: "phase4",
    startSeconds: 15.5,
    maxSeconds: 3.5,
    text: "Deposit collected. Slot locked. No chasing payments.",
  },
  {
    id: "phase5",
    startSeconds: 19,
    maxSeconds: 4,
    text: "Cami sends reminders automatically. No more no-shows.",
  },
  {
    id: "phase6",
    startSeconds: 23,
    maxSeconds: 2.5,
    text: "Sneak peeks sent right to the client.",
  },
  {
    id: "phase7",
    startSeconds: 25.5,
    maxSeconds: 3,
    text: "Ratings and reviews — hands-free.",
  },
  {
    id: "phase8",
    startSeconds: 28.5,
    maxSeconds: 4,
    text: "A month later? Cami brings them back. Effortlessly.",
  },
  {
    id: "outro",
    startSeconds: 32.5,
    maxSeconds: 4,
    text: "Cami. More time with the furry friends — less time on the phone.",
  },
];

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";
const SPEED = Number(process.env.ELEVENLABS_SPEED ?? "1.0");

if (!API_KEY || !VOICE_ID) {
  console.error(
    "Missing env vars. Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID.\n" +
      "Example:\n" +
      "  source .env.local && npm run generate-audio",
  );
  process.exit(1);
}

const BASE_DIR = dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = resolve(BASE_DIR, "output");
const PUBLIC_AUDIO_DIR = resolve(BASE_DIR, "..", "public", "audio");

async function generateClip(section: (typeof SECTIONS)[number]) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: section.text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.75,
        style: 0.65,
        speed: SPEED,
        use_speaker_boost: true,
      },
      output_format: "mp3_44100_128",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `ElevenLabs API error for "${section.id}" (${res.status}): ${errText}`,
    );
  }

  const data = (await res.json()) as {
    audio_base64: string;
    alignment: {
      characters: string[];
      character_start_times_seconds: number[];
      character_end_times_seconds: number[];
    };
  };

  const audioBuffer = Buffer.from(data.audio_base64, "base64");
  const endTimes = data.alignment.character_end_times_seconds;
  const duration = endTimes[endTimes.length - 1];

  return { audioBuffer, duration };
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(PUBLIC_AUDIO_DIR, { recursive: true });

  console.log(`Generating ${SECTIONS.length} audio clips with ElevenLabs...`);
  console.log(`  Model: ${MODEL_ID} | Speed: ${SPEED}`);
  console.log();

  let allOk = true;

  for (const section of SECTIONS) {
    process.stdout.write(`  ${section.id.padEnd(8)} — generating... `);

    const { audioBuffer, duration } = await generateClip(section);

    // Save to output dir
    const outputPath = resolve(OUTPUT_DIR, `${section.id}.mp3`);
    writeFileSync(outputPath, audioBuffer);

    // Copy to public dir for Remotion
    const publicPath = resolve(PUBLIC_AUDIO_DIR, `${section.id}.mp3`);
    copyFileSync(outputPath, publicPath);

    const fits = duration <= section.maxSeconds;
    const status = fits ? "OK" : "OVER";
    if (!fits) allOk = false;

    console.log(
      `${duration.toFixed(2)}s / ${section.maxSeconds}s max — ${status}`,
    );
  }

  console.log();
  if (allOk) {
    console.log("All clips fit their time windows!");
  } else {
    console.log(
      "Some clips are over their max duration. Try increasing ELEVENLABS_SPEED (current: " +
        SPEED +
        ")",
    );
  }

  console.log(`\nFiles saved to: ${OUTPUT_DIR}`);
  console.log(`Copied to: ${PUBLIC_AUDIO_DIR}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
