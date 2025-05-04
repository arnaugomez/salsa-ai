/**
 * Represents a dance step in the application
 */
export interface DanceStep {
  /**
   * Unique identifier for the step in kebab-case
   * Example: "salsa-single-basico"
   */
  id: string;
  
  /**
   * Name of the step in Spanish
   * Example: "Básico"
   */
  name: string;
  
  /**
   * SSML phrases for Azure TTS
   * Each saying is a short instruction that the instructor says for this step
   */
  sayings: string[];
  
  /**
   * Dance type identifier
   * Example: "salsa", "bachata"
   */
  dance: string;
  
  /**
   * Dance mode identifier
   * Example: "single", "couple"
   */
  mode: string;
  
  /**
   * Course identifier
   * Example: "salsa-1", "salsa-2"
   */
  course: string;
  
  /**
   * IDs of possible next steps
   * Used to create natural sequences of dance steps
   */
  nextMoves: string[];
}

/**
 * Get a display name for a dance step
 * @param step - The dance step
 * @returns Formatted display name
 */
export function getDanceStepDisplayName(step: DanceStep): string {
  return step.name;
}

/**
 * Check if a step has valid next moves
 * @param step - The dance step to check
 * @param availableStepIds - Array of available step IDs
 * @returns True if the step has at least one valid next move
 */
export function hasValidNextMoves(step: DanceStep, availableStepIds: string[]): boolean {
  return step.nextMoves.some(nextMoveId => availableStepIds.includes(nextMoveId));
}

/**
 * Get all possible next steps for a dance step
 * @param step - The current dance step
 * @param allSteps - Array of all available dance steps
 * @param availableStepIds - Array of step IDs that are currently available/selected
 * @returns Array of valid next dance steps
 */
export function getNextSteps(
  step: DanceStep, 
  allSteps: DanceStep[], 
  availableStepIds: string[]
): DanceStep[] {
  // Filter steps that are in both nextMoves and availableStepIds
  const validNextMoveIds = step.nextMoves.filter(id => availableStepIds.includes(id));
  
  // Return the actual step objects
  return allSteps.filter(s => validNextMoveIds.includes(s.id));
}
