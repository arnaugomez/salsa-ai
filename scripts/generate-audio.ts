import * as fs from "fs";
import * as path from "path";
import {
  SpeechConfig,
  SpeechSynthesizer,
  ResultReason,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";
import { allSteps } from "../src/domains/dance/data/repositories/data/steps";
import { availableVoices } from "../src/domains/configuration/data/repositories/data/voices";
import { DanceStep } from "../src/domains/dance/domain/entities";
import { Voice } from "../src/domains/configuration/data/repositories/data/voices";

const AZURE_AI_SPEECH_KEY = process.env.AZURE_AI_SPEECH_KEY;
const AZURE_AI_SPEECH_REGION = process.env.AZURE_AI_SPEECH_REGION;

if (!AZURE_AI_SPEECH_KEY || !AZURE_AI_SPEECH_REGION) {
  console.error(
    "Azure AI Speech key or region not found in environment variables."
  );
  process.exit(1);
}

const speechConfig = SpeechConfig.fromSubscription(
  AZURE_AI_SPEECH_KEY,
  AZURE_AI_SPEECH_REGION
);

const outputDir = path.resolve(__dirname, "../public/sounds/");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateAudio(
  ssml: string,
  voiceName: string,
  filePath: string
): Promise<void> {
  // SSML needs to specify the voice
  const ssmlWithVoice = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="${voiceName}">
        ${ssml.replace(/<speak>|<\/speak>/gi, "")}
    </voice>
</speak>`;
  console.log(ssmlWithVoice);

  const audioConfig = AudioConfig.fromAudioFileOutput(filePath);
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  await new Promise((resolve, reject) => {
    synthesizer.speakSsmlAsync(
      ssmlWithVoice,
      (result) => {
        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          console.log(`Audio generated successfully: ${filePath}`);
          resolve(null);
        } else {
          console.error(
            `Error generating audio for ${filePath}: ${result.errorDetails}`
          );
          reject(new Error(result.errorDetails));
        }
      },
      (err) => {
        console.error(`Speech synthesis error for ${filePath}: ${err}`);
        reject(err);
      }
    );
  });
}

async function main() {
  console.log("Starting audio generation process...");
  console.log(`Output directory: ${outputDir}`);

  for (const step of allSteps as DanceStep[]) {
    for (const voice of availableVoices as Voice[]) {
      // Assuming the first saying is the one to use
      const ssml = step.sayings[0];
      if (!ssml) {
        console.warn(
          `No saying found for step: ${step.id}, voice: ${voice.id}. Skipping.`
        );
        continue;
      }

      const fileName = `${voice.id}_${step.id}_0.mp3`;
      const filePath = path.join(outputDir, fileName);

      if (fs.existsSync(filePath)) {
        console.log(`Audio already exists, skipping: ${filePath}`);
        continue;
      }

      try {
        console.log(
          `Generating audio for: ${step.name} with voice ${voice.name} (${voice.id})`
        );
        await generateAudio(ssml, voice.id, filePath);
      } catch (error) {
        console.error(
          `Failed to generate audio for step ${step.id} with voice ${voice.id}:`,
          error
        );
      }
      console.log("After generated");
    }
  }
  console.log("Audio generation process finished.");
}

main().catch((error) => {
  console.error("Unhandled error in main function:", error);
  process.exit(1);
});
