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
  step: DanceStep,
  voice: Voice,
  filePath: string
): Promise<void> {
  const ssmlWithVoice = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-ES">
      <voice name="${voice.id}">
        ¡${step.sayings[0]}!
      </voice>
  </speak>`;
//   const ssmlWithVoice = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
//     <voice name="en-US-SaraNeural">
//         <mstts:express-as style="cheerful" styledegree="2">
//             That'd be just amazing!
//         </mstts:express-as>
//         <mstts:express-as style="my-custom-style" styledegree="0.01">
//             What's next?
//         </mstts:express-as>
//     </voice>
// </speak>`
  

  const audioConfig = AudioConfig.fromAudioFileOutput(filePath);
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  await new Promise((resolve, reject) => {
    // synthesizer.speakTextAsync(
    //   step.name,
    //   (result) => {
    //     if (result.reason === ResultReason.SynthesizingAudioCompleted) {
    //       console.log(`Audio generated successfully: ${filePath}`);
    //       resolve(null);
    //     } else {
    //       console.error(
    //         `Error generating audio for ${filePath}: ${result.errorDetails}`
    //       );
    //       reject(new Error(result.errorDetails));
    //     }
    //     synthesizer.close();
    //   },
    //   (err) => {
    //     console.error(`Speech synthesis error for ${filePath}: ${err}`);
    //     reject(err);
    //   }
    // );
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
        synthesizer.close();
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

  for (const step of allSteps) {
    for (const voice of availableVoices) {
      // Assuming the first saying is the one to use

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
        await generateAudio(step, voice, filePath);
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
