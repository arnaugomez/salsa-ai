/**
 * Represents a dance type in the application
 */
export interface Dance {
  /**
   * Unique identifier for the dance
   * Example: "salsa", "bachata"
   */
  id: string;
  
  /**
   * Name of the dance in Spanish
   * Example: "Salsa", "Bachata"
   */
  name: string;
  
  /**
   * Available modes for this dance
   * Example: ["single", "couple"]
   */
  availableModes: string[];
}

/**
 * Represents a dance mode
 */
export interface DanceMode {
  /**
   * Unique identifier for the mode
   * Example: "single", "couple"
   */
  id: string;
  
  /**
   * Name of the mode in Spanish
   * Example: "Individual", "Pareja"
   */
  name: string;
}

/**
 * Get a display name for a dance
 * @param dance - The dance
 * @returns Formatted display name
 */
export function getDanceDisplayName(dance: Dance): string {
  return dance.name;
}

/**
 * Get a display name for a dance mode
 * @param mode - The dance mode
 * @returns Formatted display name
 */
export function getDanceModeDisplayName(mode: DanceMode): string {
  return mode.name;
}
