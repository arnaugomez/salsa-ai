/**
 * Represents user configuration settings
 */
export interface Configuration {
  /**
   * Selected dance type
   * Example: "salsa", "bachata"
   */
  selectedDance: string;

  /**
   * Selected dance mode
   * Example: "single", "couple"
   */
  selectedMode: string;

  /**
   * Difficulty level (affects timing between steps)
   * Higher values mean more time between steps
   */
  difficulty: number;

  /**
   * IDs of steps selected by the user
   */
  selectedSteps: string[];

  /**
   * Selected voice for audio instructions
   * Example: "es-CU-BelkysNeural"
   */
  selectedVoice: string;
}

/**
 * Get the time between steps based on difficulty
 * @param config - The configuration object
 * @returns Time in milliseconds between steps
 */
export function getTimeBetweenSteps(config: Configuration): number {
  // Base time in milliseconds
  const baseTime = 2000;

  // Adjust based on difficulty (1-5)
  // Higher difficulty = more time between steps
  const multiplier = 1 + config.difficulty * 0.5;

  return baseTime * multiplier;
}

/**
 * Create a default configuration
 * @returns Default configuration object
 */
export function createDefaultConfiguration(): Configuration {
  return {
    selectedDance: "salsa",
    selectedMode: "couple",
    difficulty: 3,
    selectedSteps: [],
    selectedVoice: "es-CU-BelkysNeural",
  };
}
